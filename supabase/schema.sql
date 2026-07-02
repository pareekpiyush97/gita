-- ============================================================================
-- GETA — Supabase Schema
-- Run in the Supabase SQL editor, top to bottom, on a fresh project.
-- Uses Supabase Auth (auth.users) as the identity source for members & admins.
-- ============================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------
create type membership_tier as enum ('individual', 'corporate', 'student');
create type membership_status as enum ('pending', 'active', 'expired', 'suspended');
create type app_role as enum ('member', 'editor', 'admin', 'super_admin');
create type event_status as enum ('draft', 'published', 'cancelled', 'completed');
create type registration_status as enum ('registered', 'attended', 'cancelled', 'waitlisted');
create type resource_type as enum ('blog', 'article', 'download', 'template', 'research_paper', 'video');
create type contact_status as enum ('new', 'in_progress', 'resolved');

-- ----------------------------------------------------------------------------
-- PROFILES  (1:1 extension of auth.users — every member AND admin has a row)
-- ----------------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  avatar_url text,
  role app_role not null default 'member',
  city text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- MEMBERSHIP APPLICATIONS  (public intake form — no auth required to submit)
-- An admin reviews these from Admin Panel -> Manage Members, then creates
-- the matching `memberships` row (and invites the applicant) on approval.
-- ----------------------------------------------------------------------------
create table membership_applications (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  tier membership_tier not null,
  organization_name text,
  message text,
  status contact_status not null default 'new',       -- new | in_progress | resolved
  reviewed_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- MEMBERSHIPS  (the paid association membership tied to a profile)
-- ----------------------------------------------------------------------------
create table memberships (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  application_id uuid references membership_applications(id) on delete set null,
  tier membership_tier not null,
  status membership_status not null default 'pending',
  membership_number text unique not null,          -- e.g. GETA-2026-04821
  organization_name text,                            -- populated for corporate tier
  qr_code_url text,                                   -- generated on approval, points to Storage
  started_at date,
  expires_at date,
  amount_paid numeric(10, 2),
  payment_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index memberships_profile_idx on memberships (profile_id);
create index memberships_status_idx on memberships (status);

-- ----------------------------------------------------------------------------
-- LEADERSHIP  (committee, patrons, office bearers — public-facing)
-- ----------------------------------------------------------------------------
create table leadership (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete set null,
  full_name text not null,
  designation text not null,                         -- President, VP, Secretary...
  category text not null default 'executive_committee', -- patron | president | vp | secretary | executive_committee | core_member
  photo_url text,
  biography text,
  expertise text,
  linkedin_url text,
  email text,
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- TRAINER DIRECTORY  (searchable public listing, distinct from leadership)
-- ----------------------------------------------------------------------------
create table trainer_profiles (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  headline text,
  years_experience int,
  city text,
  industries text[] not null default '{}',
  specializations text[] not null default '{}',
  languages text[] not null default '{}',
  certifications text[] not null default '{}',
  hourly_rate numeric(10, 2),
  is_bookable boolean not null default true,
  is_published boolean not null default false,        -- admin approves before it goes live
  created_at timestamptz not null default now()
);
create index trainer_city_idx on trainer_profiles (city);
create index trainer_industries_idx on trainer_profiles using gin (industries);
create index trainer_specializations_idx on trainer_profiles using gin (specializations);

-- ----------------------------------------------------------------------------
-- EVENTS
-- ----------------------------------------------------------------------------
create table events (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  category text not null,
  description text not null,
  cover_image_url text,
  venue text,
  city text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  capacity int,
  price numeric(10, 2) default 0,
  status event_status not null default 'draft',
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index events_starts_at_idx on events (starts_at);
create index events_status_idx on events (status);

create table event_registrations (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references events(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  status registration_status not null default 'registered',
  registered_at timestamptz not null default now(),
  unique (event_id, profile_id)
);

-- ----------------------------------------------------------------------------
-- RESOURCES  (blogs, articles, downloads, templates, research, video)
-- ----------------------------------------------------------------------------
create table resources (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  type resource_type not null,
  summary text,
  body text,                                          -- markdown/rich text for blogs & articles
  file_url text,                                       -- Storage path for downloads/templates/papers
  video_url text,
  cover_image_url text,
  author_id uuid references profiles(id) on delete set null,
  is_member_only boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);
create index resources_type_idx on resources (type);

-- ----------------------------------------------------------------------------
-- GALLERY
-- ----------------------------------------------------------------------------
create table gallery_items (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  media_type text not null default 'photo',           -- photo | video
  media_url text not null,
  category text not null default 'training_programs',  -- awards | conferences | training_programs
  event_id uuid references events(id) on delete set null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- CERTIFICATES
-- ----------------------------------------------------------------------------
create table certificates (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  event_id uuid references events(id) on delete set null,
  title text not null,
  certificate_number text unique not null,
  file_url text not null,
  issued_at date not null default current_date
);

-- ----------------------------------------------------------------------------
-- TESTIMONIALS
-- ----------------------------------------------------------------------------
create table testimonials (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  author_role text,
  quote text not null,
  photo_url text,
  is_published boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- PARTNERS
-- ----------------------------------------------------------------------------
create table partners (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  website_url text,
  display_order int not null default 0
);

-- ----------------------------------------------------------------------------
-- CONTACT / INQUIRY SUBMISSIONS
-- ----------------------------------------------------------------------------
create table contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status contact_status not null default 'new',
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- NEWSLETTER
-- ----------------------------------------------------------------------------
create table newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  subscribed_at timestamptz not null default now(),
  is_active boolean not null default true
);

-- ----------------------------------------------------------------------------
-- EVENT REGISTRATION REQUESTS  (public, pre-auth intake)
-- Until the Member Portal ships, event registration is captured here rather
-- than in `event_registrations` (which requires an authenticated profile_id).
-- An admin converts approved requests into real `event_registrations` rows
-- once the registrant has a member profile.
-- ----------------------------------------------------------------------------
create table event_registration_requests (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete set null,
  event_slug text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  organization_name text,
  message text,
  status contact_status not null default 'new',
  created_at timestamptz not null default now()
);
create index event_registration_requests_slug_idx on event_registration_requests (event_slug);

-- ----------------------------------------------------------------------------
-- TRAINER BOOKING REQUESTS  (public — "Book Session" on the Trainer Directory)
-- ----------------------------------------------------------------------------
create table trainer_booking_requests (
  id uuid primary key default uuid_generate_v4(),
  trainer_profile_id uuid references trainer_profiles(id) on delete set null,
  trainer_name text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  organization_name text,
  message text,
  status contact_status not null default 'new',
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table profiles enable row level security;
alter table membership_applications enable row level security;
alter table memberships enable row level security;
alter table leadership enable row level security;
alter table trainer_profiles enable row level security;
alter table events enable row level security;
alter table event_registrations enable row level security;
alter table resources enable row level security;
alter table gallery_items enable row level security;
alter table certificates enable row level security;
alter table testimonials enable row level security;
alter table partners enable row level security;
alter table contact_submissions enable row level security;
alter table newsletter_subscribers enable row level security;
alter table event_registration_requests enable row level security;
alter table trainer_booking_requests enable row level security;

-- Helper: is the current user an admin?
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'super_admin')
  );
$$ language sql stable security definer;

-- Public read on published/marketing content
create policy "public read published leadership" on leadership for select using (is_published);
create policy "public read published trainers" on trainer_profiles for select using (is_published);
create policy "public read published events" on events for select using (status = 'published' or is_admin());
create policy "public read published resources" on resources for select using (published_at is not null or is_admin());
create policy "public read gallery" on gallery_items for select using (true);
create policy "public read testimonials" on testimonials for select using (is_published);
create policy "public read partners" on partners for select using (true);

-- Anyone can submit a contact form or subscribe — insert only, no read
create policy "anyone can submit contact form" on contact_submissions for insert with check (true);
create policy "anyone can subscribe" on newsletter_subscribers for insert with check (true);
create policy "anyone can submit membership application" on membership_applications for insert with check (true);
create policy "admins read membership applications" on membership_applications for select using (is_admin());
create policy "admins update membership applications" on membership_applications for update using (is_admin());

create policy "anyone can submit event registration request" on event_registration_requests for insert with check (true);
create policy "admins read event registration requests" on event_registration_requests for select using (is_admin());
create policy "admins update event registration requests" on event_registration_requests for update using (is_admin());

create policy "anyone can submit trainer booking request" on trainer_booking_requests for insert with check (true);
create policy "admins read trainer booking requests" on trainer_booking_requests for select using (is_admin());
create policy "admins update trainer booking requests" on trainer_booking_requests for update using (is_admin());

-- Profiles: users manage their own row; admins manage all
create policy "users read own profile" on profiles for select using (auth.uid() = id or is_admin());
create policy "users update own profile" on profiles for update using (auth.uid() = id or is_admin());
create policy "admins insert profiles" on profiles for insert with check (auth.uid() = id or is_admin());

-- Memberships: members see their own; admins see/manage all
create policy "members read own membership" on memberships for select using (profile_id = auth.uid() or is_admin());
create policy "admins manage memberships" on memberships for all using (is_admin()) with check (is_admin());

-- Trainer profiles: owners manage their own listing
create policy "trainers manage own listing" on trainer_profiles for all
  using (profile_id = auth.uid() or is_admin())
  with check (profile_id = auth.uid() or is_admin());

-- Event registrations: members manage their own registrations
create policy "members read own registrations" on event_registrations for select using (profile_id = auth.uid() or is_admin());
create policy "members create own registrations" on event_registrations for insert with check (profile_id = auth.uid());
create policy "members cancel own registrations" on event_registrations for update using (profile_id = auth.uid() or is_admin());

-- Certificates: members read their own only
create policy "members read own certificates" on certificates for select using (profile_id = auth.uid() or is_admin());

-- Admin-only write access on marketing/content tables
create policy "admins manage leadership" on leadership for all using (is_admin()) with check (is_admin());
create policy "admins manage events" on events for all using (is_admin()) with check (is_admin());
create policy "admins manage resources" on resources for all using (is_admin()) with check (is_admin());
create policy "admins manage gallery" on gallery_items for all using (is_admin()) with check (is_admin());
create policy "admins manage certificates" on certificates for all using (is_admin()) with check (is_admin());
create policy "admins manage testimonials" on testimonials for all using (is_admin()) with check (is_admin());
create policy "admins manage partners" on partners for all using (is_admin()) with check (is_admin());
create policy "admins read contact submissions" on contact_submissions for select using (is_admin());
create policy "admins update contact submissions" on contact_submissions for update using (is_admin());
create policy "admins read newsletter" on newsletter_subscribers for select using (is_admin());

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-create a profile row whenever a new auth user signs up
create or replace function handle_new_user() returns trigger as $$
begin
  insert into profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Keep updated_at fresh
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_set_updated_at before update on profiles
  for each row execute function set_updated_at();
create trigger memberships_set_updated_at before update on memberships
  for each row execute function set_updated_at();
create trigger events_set_updated_at before update on events
  for each row execute function set_updated_at();
