CREATE TABLE IF NOT EXISTS public.blood_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    hospital_name TEXT NOT NULL,
    hospital_registration TEXT,
    location TEXT,
    blood_group TEXT NOT NULL,
    units INTEGER NOT NULL CHECK (units > 0),
    urgency TEXT NOT NULL CHECK (urgency IN ('Emergency', 'Urgent', 'Normal')),
    required_date DATE NOT NULL,
    ward TEXT NOT NULL,
    contact TEXT NOT NULL,
    reference TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'fulfilled', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read open blood requests" ON public.blood_requests;
CREATE POLICY "Anyone can read open blood requests"
    ON public.blood_requests
    FOR SELECT
    TO anon, authenticated
    USING (status = 'open');

DROP POLICY IF EXISTS "Hospitals can create their own blood requests" ON public.blood_requests;
CREATE POLICY "Hospitals can create their own blood requests"
    ON public.blood_requests
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = hospital_id);

DROP POLICY IF EXISTS "Hospitals can update their own blood requests" ON public.blood_requests;
CREATE POLICY "Hospitals can update their own blood requests"
    ON public.blood_requests
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = hospital_id)
    WITH CHECK (auth.uid() = hospital_id);

DROP POLICY IF EXISTS "Hospitals can delete their own blood requests" ON public.blood_requests;
CREATE POLICY "Hospitals can delete their own blood requests"
    ON public.blood_requests
    FOR DELETE
    TO authenticated
    USING (auth.uid() = hospital_id);

CREATE INDEX IF NOT EXISTS blood_requests_created_at_idx
    ON public.blood_requests (created_at DESC);

CREATE INDEX IF NOT EXISTS blood_requests_status_idx
    ON public.blood_requests (status);

CREATE TABLE IF NOT EXISTS public.completed_blood_requests (
    id UUID PRIMARY KEY,
    hospital_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    hospital_name TEXT NOT NULL,
    hospital_registration TEXT,
    location TEXT,
    blood_group TEXT NOT NULL,
    units INTEGER NOT NULL CHECK (units > 0),
    urgency TEXT NOT NULL,
    required_date DATE NOT NULL,
    ward TEXT NOT NULL,
    contact TEXT NOT NULL,
    reference TEXT,
    notes TEXT,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.completed_blood_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Hospitals can read their completed requests" ON public.completed_blood_requests;
CREATE POLICY "Hospitals can read their completed requests"
    ON public.completed_blood_requests
    FOR SELECT
    TO authenticated
    USING (auth.uid() = hospital_id);

DROP POLICY IF EXISTS "Hospitals can archive their requests" ON public.completed_blood_requests;
CREATE POLICY "Hospitals can archive their requests"
    ON public.completed_blood_requests
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = hospital_id);

CREATE INDEX IF NOT EXISTS completed_blood_requests_hospital_id_idx
    ON public.completed_blood_requests (hospital_id);

CREATE INDEX IF NOT EXISTS completed_blood_requests_completed_at_idx
    ON public.completed_blood_requests (completed_at DESC);

CREATE TABLE IF NOT EXISTS public.donation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    hospital_name TEXT,
    donation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    units INTEGER NOT NULL DEFAULT 1 CHECK (units > 0),
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.donation_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Donors can read their own donation history" ON public.donation_history;
CREATE POLICY "Donors can read their own donation history"
    ON public.donation_history
    FOR SELECT
    TO authenticated
    USING (auth.uid() = donor_id);

DROP POLICY IF EXISTS "Donors can record their own donation history" ON public.donation_history;
CREATE POLICY "Donors can record their own donation history"
    ON public.donation_history
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = donor_id);

DROP POLICY IF EXISTS "Donors can update their own donation history" ON public.donation_history;
CREATE POLICY "Donors can update their own donation history"
    ON public.donation_history
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = donor_id)
    WITH CHECK (auth.uid() = donor_id);

CREATE INDEX IF NOT EXISTS donation_history_donor_id_idx
    ON public.donation_history (donor_id);

CREATE OR REPLACE FUNCTION public.get_public_donation_summary()
RETURNS TABLE (
    donation_count BIGINT,
    total_units BIGINT
)
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT
        COUNT(*)::BIGINT,
        COALESCE(SUM(units), 0)::BIGINT
    FROM public.donation_history
    WHERE status = 'completed';
$$;

GRANT EXECUTE ON FUNCTION public.get_public_donation_summary() TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_public_donor_count()
RETURNS BIGINT
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT COUNT(*)::BIGINT
    FROM public.donor_profiles;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_donor_count()
TO anon, authenticated;

DO $$
BEGIN
    IF to_regclass('public.donations') IS NOT NULL THEN
        INSERT INTO public.donation_history (
            id,
            donor_id,
            hospital_name,
            donation_date,
            units,
            status,
            created_at
        )
        SELECT
            id,
            donor_id,
            hospital_name,
            donation_date,
            units,
            status,
            created_at
        FROM public.donations
        ON CONFLICT (id) DO NOTHING;
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.admin_profiles
        WHERE id = auth.uid()
          AND role = 'admin'
    );
$$;

DROP POLICY IF EXISTS "Admins can read their admin profile" ON public.admin_profiles;
CREATE POLICY "Admins can read their admin profile"
    ON public.admin_profiles
    FOR SELECT
    TO authenticated
    USING (id = auth.uid() AND public.is_admin());

DROP POLICY IF EXISTS "Admins can manage donor profiles" ON public.donor_profiles;
CREATE POLICY "Admins can manage donor profiles"
    ON public.donor_profiles
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage staff profiles" ON public.staff_profiles;
CREATE POLICY "Admins can manage staff profiles"
    ON public.staff_profiles
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Hospitals can update their own profile" ON public.staff_profiles;
CREATE POLICY "Hospitals can update their own profile"
    ON public.staff_profiles FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Donors control whether their profile can appear in the public directory.
ALTER TABLE public.donor_profiles
    ADD COLUMN IF NOT EXISTS is_available BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS contact_consent BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.donor_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view consenting available donors" ON public.donor_profiles;
CREATE POLICY "Public can view consenting available donors"
    ON public.donor_profiles FOR SELECT TO anon, authenticated
    USING (is_available = TRUE AND contact_consent = TRUE);
GRANT SELECT (id, full_name, blood_group, city, last_donation, is_available, contact_consent)
    ON public.donor_profiles TO anon, authenticated;
GRANT UPDATE (is_available, contact_consent)
    ON public.donor_profiles TO authenticated;

DROP POLICY IF EXISTS "Donors can update their own directory preferences" ON public.donor_profiles;
CREATE POLICY "Donors can update their own directory preferences"
    ON public.donor_profiles FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE OR REPLACE VIEW public.available_donor_directory
WITH (security_invoker = true)
AS
    SELECT id, full_name, blood_group, city, last_donation, is_available
    FROM public.donor_profiles
    WHERE is_available = TRUE AND contact_consent = TRUE;

GRANT SELECT ON public.available_donor_directory TO anon, authenticated;

CREATE TABLE IF NOT EXISTS public.blood_request_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.blood_requests(id) ON DELETE CASCADE,
    donor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    response TEXT NOT NULL DEFAULT 'interested' CHECK (response IN ('interested', 'withdrawn', 'accepted', 'declined')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (request_id, donor_id)
);

ALTER TABLE public.blood_request_responses ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON public.blood_request_responses TO authenticated;
DROP POLICY IF EXISTS "Donors can view their own request responses" ON public.blood_request_responses;
CREATE POLICY "Donors can view their own request responses"
    ON public.blood_request_responses FOR SELECT TO authenticated
    USING (auth.uid() = donor_id);
DROP POLICY IF EXISTS "Donors can respond to open requests" ON public.blood_request_responses;
CREATE POLICY "Donors can respond to open requests"
    ON public.blood_request_responses FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() = donor_id
        AND EXISTS (
            SELECT 1 FROM public.donor_profiles d
            WHERE d.id = auth.uid() AND d.is_available AND d.contact_consent
        )
        AND EXISTS (
            SELECT 1 FROM public.blood_requests r
            WHERE r.id = request_id AND r.status = 'open'
        )
    );
DROP POLICY IF EXISTS "Donors can update their own responses" ON public.blood_request_responses;
CREATE POLICY "Donors can update their own responses"
    ON public.blood_request_responses FOR UPDATE TO authenticated
    USING (auth.uid() = donor_id)
    WITH CHECK (auth.uid() = donor_id);
DROP POLICY IF EXISTS "Hospitals can view responses to their requests" ON public.blood_request_responses;
CREATE POLICY "Hospitals can view responses to their requests"
    ON public.blood_request_responses FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.blood_requests r
        WHERE r.id = request_id AND r.hospital_id = auth.uid()
    ));
CREATE INDEX IF NOT EXISTS blood_request_responses_request_id_idx
    ON public.blood_request_responses(request_id);
DROP POLICY IF EXISTS "Admins can manage request responses" ON public.blood_request_responses;
CREATE POLICY "Admins can manage request responses"
    ON public.blood_request_responses FOR ALL TO authenticated
    USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage blood requests" ON public.blood_requests;
CREATE POLICY "Admins can manage blood requests"
    ON public.blood_requests
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage completed requests" ON public.completed_blood_requests;
CREATE POLICY "Admins can manage completed requests"
    ON public.completed_blood_requests
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage donation history" ON public.donation_history;
CREATE POLICY "Admins can manage donation history"
    ON public.donation_history
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION public.admin_delete_user(target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Administrator access required';
    END IF;

    DELETE FROM auth.users WHERE id = target_user_id;
    RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_delete_user(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_delete_user(UUID) TO authenticated;
