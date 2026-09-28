# Community-Blood-Donation-Management-System


Project Description

The Community Blood Donation Management System is a web-based
platform designed to connect blood donors, hospitals, blood banks,
and patients.

The system aims to simplify blood donor searching, blood request
management, emergency notifications, donation history tracking,
and administrative reporting.

Main Features

- User registration and authentication
- Donor management
- Hospital and blood bank management
- Patient/requester management
- Blood request management
- Donor search
- Emergency notifications
- Donation history
- Administrative management
- Reports and analytics

User Roles

- Donor
- Hospital/Blood Bank Staff
- System Administrator

Technologies

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- To be implemented

Database:
- Supabase

Database setup:
- Open the Supabase SQL Editor for the configured project.
- Run `supabase-blood-requests.sql` to create the blood request table, indexes, and RLS policies.
- Hospital users must be authenticated before creating a request.

Admin setup:
- Open `pages/Admin Interface/admin-dashboard.html` through Live Server.
- Create or use an Auth account, then add it to `public.admin_profiles` in Supabase:
	`INSERT INTO public.admin_profiles (id, email) SELECT id, email FROM auth.users WHERE email = 'admin@example.com';`
- Run the complete SQL file before using the admin page so the admin policies and `admin_delete_user` function exist.
- The admin page can view and delete donor profiles, hospital profiles, blood requests, and donation history.
- New Auth accounts should be created through Supabase Auth or the existing registration page. A service-role key must never be placed in frontend code.

Team
6880 RMTV KARUNARATHNA
6882 SADPR SURAWEERA
6883 AD RANAWAKA
6945 SPOV KARUNATHILAKA

This project is developed as a group project for the RAD/Scrum
assignment.
