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