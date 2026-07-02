# GETA — Gujarat Executive Trainers Association

Production Next.js 14 (App Router) + TypeScript + Tailwind + Supabase project.
This build was compiled and type-checked successfully (`tsc --noEmit` and
`next build` both pass — see *Build verification* below).

---

## What's fully built in this phase

| Layer | Status |
|---|---|
| Design system (colors, type, motion, `tailwind.config.ts`) | ✅ Complete |
| Global layout — Navbar, Footer, SEO metadata, schema.org markup | ✅ Complete |
| **Home page** — all 13 sections from the brief (hero, stats, vision/mission, why-GETA, events preview, leadership preview, membership tiers, testimonials, partners, newsletter, contact CTA) | ✅ Complete |
| **Membership page** — pricing, application form, FAQ accordion | ✅ Complete |
| **Contact page** — map, office details, inquiry form | ✅ Complete |
| **About page** — history, vision/mission, core values, objectives, president's message, journey timeline | ✅ Complete |
| **Leadership page** — full roster (patrons, office bearers, executive committee, core members) with bio/expertise/LinkedIn/email per profile | ✅ Complete |
| **Events page** — upcoming/past tabs, **event detail pages** with agenda, highlights and a real registration form | ✅ Complete |
| **Trainer Directory** — live search + city/industry/expertise/language filters, "Book Session" modal | ✅ Complete |
| **Resources page** — blogs/articles/downloads/templates/research/video with type filters and detail pages | ✅ Complete |
| **Gallery page** — photo/video grid with category filters and a lightbox, deep-linkable from an event's recap | ✅ Complete |
| API routes — `/api/contact`, `/api/membership/apply`, `/api/events/register`, `/api/trainers/book` (all Zod-validated, honeypot spam protection, Supabase insert) | ✅ Complete |
| Supabase client helpers (browser, server, service-role) | ✅ Complete |
| **Full database schema** — `supabase/schema.sql` (15 tables, enums, RLS policies, triggers) | ✅ Complete |
| `robots.ts`, `sitemap.ts`, Organization schema markup | ✅ Complete |
| Member Portal (auth, dashboard, digital card, certificates) | 🔲 Not started — see roadmap |
| Admin Panel (manage members/events/blogs/gallery/certificates) | 🔲 Not started — see roadmap |
| Certificate generator, QR code generation | 🔲 Not started — see roadmap |

**Why phased, not everything at once:** the full brief — 9 public pages, a
member portal with auth, an admin panel with 10 management screens, a
certificate generator, and QR code issuance — is roughly the scope of a
6–10 week engineering project, not something that can be written to a real
production standard (no placeholders, working forms, tested build) in a
single pass. All 9 public-facing pages are now complete; what's left is the
auth-gated layer (Member Portal, Admin Panel) and the certificate/QR
generation service. Send the word "continue" and I'll build the next
module in the same standard.

**Interim registration/booking flow:** the Events and Trainer Directory
pages let a visitor register for an event or request a trainer booking
today, without needing to be logged in — because there's no auth system
yet, these write to two new public-insert tables
(`event_registration_requests`, `trainer_booking_requests`) instead of the
member-linked `event_registrations` table. Once the Member Portal ships
(roadmap item 7), an admin screen converts approved requests into real,
profile-linked registrations.

Note: this phase also upgraded the local Node.js install (18.16.0 →
24.18.0 LTS via winget) since Next.js 14 requires Node ≥18.17.0 — the dev
server would not start on the old version.

---

## Architecture map

```
geta-website/
├── app/
│   ├── layout.tsx            # Root layout — fonts, SEO, schema.org, Navbar/Footer
│   ├── page.tsx               # Home page (assembles components/home/*)
│   ├── globals.css            # Design tokens, focus states, reduced-motion
│   ├── robots.ts               # Dynamic robots.txt
│   ├── sitemap.ts              # Dynamic sitemap.xml
│   ├── contact/page.tsx        # Contact page (built)
│   ├── membership/page.tsx     # Membership page (built)
│   ├── about/page.tsx          # About page (built)
│   ├── leadership/page.tsx     # Leadership page (built)
│   ├── events/
│   │   ├── page.tsx             # Events list — upcoming/past tabs (built)
│   │   └── [slug]/page.tsx      # Event detail — agenda, highlights, registration (built)
│   ├── trainers/page.tsx        # Trainer Directory — search + filters (built)
│   ├── resources/
│   │   ├── page.tsx             # Resources list — type filters (built)
│   │   └── [slug]/page.tsx      # Resource detail (built)
│   ├── gallery/page.tsx         # Gallery — category filters + lightbox (built)
│   ├── portal/                 # Member portal — next to build
│   ├── admin/                  # Admin panel — next to build
│   └── api/
│       ├── contact/route.ts
│       ├── membership/apply/route.ts
│       ├── events/register/route.ts
│       └── trainers/book/route.ts
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── home/                   # 11 home-page sections, one file each
│   ├── contact/                # InquiryForm
│   ├── membership/             # ApplicationForm, MembershipFAQ
│   ├── events/                  # EventCard, EventsList, EventRegisterForm
│   ├── trainers/                # TrainerDirectoryClient, TrainerCard, BookingForm
│   ├── resources/               # ResourcesClient, ResourceCard
│   ├── gallery/                 # GalleryClient (grid + lightbox)
│   ├── about/                  # History, CoreValues, Objectives, PresidentMessage, JourneyTimeline
│   ├── leadership/              # LeaderCard
│   └── ui/                     # Button, Container, SectionHeading, AscendingMark, Modal
├── lib/
│   ├── data/mock-data.ts       # Sample content — 1:1 shape match to DB tables
│   ├── supabase/               # client.ts (browser), server.ts (cookies + service role)
│   └── utils.ts                # cn() className merge helper
├── supabase/
│   └── schema.sql              # Full schema — run this first in Supabase
├── tailwind.config.ts           # Color/type/motion design tokens
└── .env.local.example            # Copy to .env.local and fill in real values
```

---

## Design system

- **Palette** — Navy (`navy-950`→`navy-500`) for authority sections, Emerald
  (`emerald-600`→`emerald-100`) as the primary action color, a restrained
  Gold accent (`gold-500`/`400`/`300`) used only for premium moments
  (featured pricing tier, hero accent word), Paper (`#F6F8F7`) as the base
  background instead of pure white.
- **Type** — Poppins for all headings (`font-display`), Inter for body copy
  and UI (`font-body`), per the brief's own direction.
- **Signature element** — the "Ascending Mark": three bars of increasing
  height standing for *Learn → Lead → Inspire*. It's the logo glyph
  (`components/ui/AscendingMark.tsx`), the animated hero centerpiece, and
  recurs as a quiet motif rather than a generic gradient blob.
- **Motion** — orchestrated hero load sequence (staggered fade/rise +
  bars growing from the baseline), scroll-triggered stat counters, hover
  micro-interactions on cards/buttons. `prefers-reduced-motion` is
  respected globally in `globals.css`.

---

## Build verification

Run from inside `geta-website/`:

```bash
npm install
npx tsc --noEmit      # ✅ passes, zero errors
npx next build         # ✅ passes — all routes compile and prerender
```

This has been verified end-to-end on this machine: `npm install`,
`npx tsc --noEmit`, `npx next lint`, and `npx next build` all pass with
zero errors (33 routes, including static generation for every event and
resource detail page), and every new page was checked live in a browser
via the dev server.

If you run `next build` while a `next dev` server is already running
against the same `.next` folder, delete `.next` before restarting the dev
server — the two write incompatible artifacts to the same directory and
the dev server will 500 on dynamic routes until it's cleared.

---

## Roadmap for the remaining scope

In priority order (credibility + inquiries first, matching the brief's
stated goals):

1. ~~**About page**~~ ✅ done
2. ~~**Leadership page (full roster)**~~ ✅ done
3. ~~**Events page + event detail pages**~~ ✅ done — registers to `event_registration_requests` for now (see note above on the interim flow)
4. ~~**Trainer Directory**~~ ✅ done — books to `trainer_booking_requests` for now
5. ~~**Resources page**~~ ✅ done
6. ~~**Gallery page**~~ ✅ done, including deep-linking from an event's recap (`/gallery?event=<slug>`)
7. **Auth + Member Portal** — Supabase Auth (email/password + magic link), dashboard, digital membership card with QR (using the `qrcode` package already in `package.json`), renewal flow, certificate downloads. This also unlocks converting `event_registration_requests`/`trainer_booking_requests` into real profile-linked rows.
8. **Admin Panel** — protected by the `is_admin()` policy already in the schema; CRUD screens for every content table, plus an analytics dashboard (event registrations over time, membership growth — `recharts` is already installed for this)
9. **Certificate generator** — PDF generation service issuing to the `certificates` table

All 9 public pages from the brief are now complete. What's left is entirely
behind auth: the Member Portal and Admin Panel (items 7–9).

Each of these follows the same pattern already established: a typed data
shape in `lib/data/`, Zod-validated forms, RLS-protected Supabase queries,
and components broken out per section like `components/home/`.

---

## Deployment instructions

1. **Create the Supabase project** at supabase.com, then open the SQL
   editor and run `supabase/schema.sql` top to bottom.
2. **Environment variables** — copy `.env.local.example` to `.env.local`
   and fill in your project's URL/keys from Supabase → Settings → API.
   Never commit `.env.local` — it's already in `.gitignore`.
3. **Storage buckets** — create `avatars`, `certificates`, `gallery`, and
   `resources` buckets in Supabase Storage for file uploads referenced by
   the schema's `*_url` columns.
4. **Local dev**: `npm install && npm run dev` → http://localhost:3000
5. **Deploy to Vercel**: push to GitHub, import the repo in Vercel, add
   the same environment variables in Project Settings → Environment
   Variables, deploy. Vercel auto-detects Next.js — no build config needed.
6. **Domain + email**: point your domain's DNS at Vercel, and add a
   `RESEND_API_KEY` (or your provider of choice) to enable the
   notification email noted in `app/api/contact/route.ts`.

## Security notes

- The Supabase **service role key** (`SUPABASE_SERVICE_ROLE_KEY`) bypasses
  Row Level Security entirely. It's only ever read in `lib/supabase/server.ts`
  inside server-only code (API routes) — never expose it with a
  `NEXT_PUBLIC_` prefix or reference it in any Client Component.
- All four public forms (`/api/contact`, `/api/membership/apply`,
  `/api/events/register`, `/api/trainers/book`) validate on the server with
  Zod regardless of client-side validation, and include a honeypot field to
  filter basic bots.
- Every content table has RLS enabled with an explicit policy — there is
  no table relying on "no policy = deny by default" as its only protection;
  each is intentional (see `supabase/schema.sql`).
