# GETA — Gujarat Executive Trainers Association

Production Next.js 14 (App Router) + TypeScript + Tailwind + Supabase project,
deployed on **Vercel**. GitHub (`pareekpiyush97/gita`) is source control only
— pushing there does not publish anything by itself; deploys happen via
`vercel --prod` (see *Deployment instructions* below).
This build was compiled and type-checked successfully (`tsc --noEmit`,
`next lint`, and `next build` all pass — see *Build verification* below).

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
| **Member Portal — Login, Forgot/Reset Password, Dashboard** — Supabase Auth, client-side session guard, shows profile + membership status | ✅ Complete |
| All 4 public forms (contact, membership application, event registration, trainer booking) — insert directly to Supabase from the browser, Zod-validated, honeypot-protected | ✅ Complete |
| Supabase browser client helper | ✅ Complete |
| **Full database schema** — `supabase/schema.sql` (15 tables, enums, RLS policies, triggers) | ✅ Complete |
| `robots.ts`, `sitemap.ts`, Organization schema markup | ✅ Complete |
| **Live on Vercel** — https://geta-website-steel.vercel.app | ✅ Complete |
| Member Portal — digital membership card (QR), renewal, certificate downloads, registered events, profile settings | 🔲 Not started — see roadmap |
| Admin Panel (manage members/events/blogs/gallery/certificates) | 🔲 Not started — see roadmap |
| Certificate generator, QR code generation, member sign-up/invite flow | 🔲 Not started — see roadmap |

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
today, without needing to be logged in — these write to two public-insert
tables (`event_registration_requests`, `trainer_booking_requests`) instead
of the member-linked `event_registrations` table. Once the Admin Panel
ships, an admin screen converts approved requests into real,
profile-linked registrations.

**A brief detour, now reverted:** this project was converted to a fully
static export (`output: "export"`) for a period so it could be hosted on
GitHub Pages instead of Vercel. That's been reverted — it's back to a
normal Next.js deployment on Vercel, `next.config.js` no longer sets
`output`/`basePath`, and the GitHub Actions Pages workflow was removed.
Two changes from that detour were **kept** because they're good
regardless of host:
1. **The 4 public forms call the Supabase browser client directly**
   (contact, membership application, event registration, trainer
   booking) instead of going through a Next.js API route. This is safe
   because every one of those tables has an explicit
   `for insert with check (true)` RLS policy (see `supabase/schema.sql`)
   — the database enforces what's allowed, not a server route. The
   trade-off: server-side Zod re-validation and the honeypot check are
   client-side only now, so a bot hitting the Supabase REST API directly
   bypasses them. This could be moved back to API routes now that Vercel
   (which supports them) is the host again, if that server-side
   revalidation layer is wanted back.
2. **The Member Portal dashboard checks auth client-side**
   (`supabase.auth.getSession()` in a `useEffect`) rather than via a
   server-rendered cookie check + redirect. Both work fine on Vercel;
   this one just happens to also be simpler.

**Member accounts today:** there's no sign-up or invite UI yet (that's
part of the still-unbuilt Admin Panel — "review membership application →
create Supabase Auth user → email invite"). Until then, create a member's
login directly in Supabase Dashboard → Authentication → Add User; the
`handle_new_user()` trigger auto-creates their `profiles` row, and
`/portal` will work for them immediately.

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
│   ├── portal/
│   │   ├── page.tsx              # Member Login (built)
│   │   ├── forgot-password/page.tsx  # Request a reset link (built)
│   │   ├── reset-password/page.tsx   # Set new password from email link (built)
│   │   └── dashboard/page.tsx    # Client-side auth-gated dashboard (built)
│   └── admin/                  # Admin panel — next to build
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
│   ├── portal/                  # LoginForm, ForgotPasswordForm, ResetPasswordForm, DashboardClient, SignOutButton
│   └── ui/                     # Button, Container, SectionHeading, AscendingMark, Modal
├── lib/
│   ├── data/mock-data.ts       # Sample content — 1:1 shape match to DB tables
│   ├── supabase/client.ts      # Browser client — the only Supabase client in this app now
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
npx next lint         # ✅ passes, zero warnings
npx next build        # ✅ passes — all 33 routes compile and prerender
```

This has been verified end-to-end on this machine, and the production
build was deployed to Vercel and spot-checked live (home, member login,
and an event detail page all return 200).

If you run `next build` while a `next dev` server is already running
against the same `.next` folder, delete `.next` before restarting the dev
server — the two write incompatible artifacts to the same directory.

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
7. **Member Portal** — ~~Login, Forgot/Reset Password, Dashboard (profile + membership status)~~ ✅ done. Still missing: digital membership card with QR (the `qrcode` package is already in `package.json`), renewal payment flow, certificate downloads, registered-events list, profile settings editing.
8. **Admin Panel** — protected by the `is_admin()` policy already in the schema; CRUD screens for every content table (including turning `event_registration_requests`/`trainer_booking_requests` into real member-linked rows, and creating member accounts on membership approval), plus an analytics dashboard (`recharts` is already installed for this)
9. **Certificate generator** — PDF generation service issuing to the `certificates` table

All 9 public pages from the brief are now complete, plus Member Login.
What's left: the rest of the Member Portal, the Admin Panel, and
certificate/QR generation (items 7–9 above).

Each of these follows the same pattern already established: a typed data
shape in `lib/data/`, Zod-validated forms, RLS-protected Supabase queries,
and components broken out per section like `components/home/`.

---

## Deployment instructions (Vercel)

The site is already live at **https://geta-website-steel.vercel.app**
under the Vercel project `piyushs-projects-6d610127/geta-website`.

1. **Create the Supabase project** at supabase.com, then open the SQL
   editor and run `supabase/schema.sql` top to bottom.
2. **Environment variables** — in the Vercel project, go to
   Settings → Environment Variables and add the values from
   `.env.local.example` (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.), sourced from Supabase →
   Settings → API. Without these, the site still deploys and renders
   fine — only the login/forms will fail until they're set.
3. **Deploy**: from inside `geta-website/`, run `npx vercel --prod`
   (first run will prompt a one-time browser login). Every subsequent
   run of that command redeploys the current code to production. There's
   no auto-deploy-on-push wired up yet — GitHub is version control only.
4. **Local dev**: `npm install && npm run dev` → http://localhost:3000
5. **Storage buckets** (only needed once file uploads are wired up in a
   later phase) — create `avatars`, `certificates`, `gallery`, and
   `resources` buckets in Supabase Storage for the schema's `*_url`
   columns.
6. **Custom domain**: Vercel project → Settings → Domains, then point
   your domain's DNS per Vercel's instructions.

## Security notes

- There is **no service-role key anywhere in this app currently** — the
  4 public forms and the Member Portal both write/read through the
  public anon key only, scoped entirely by RLS policies (see
  `supabase/schema.sql`). If the Admin Panel (still unbuilt) needs
  elevated writes later, that's the point to reintroduce a service-role
  key — and it must only ever live in server-only code (a Vercel API
  route or Server Action), never in a Client Component or anything
  bundled to the browser.
- The 4 public forms (contact, membership application, event
  registration, trainer booking) validate with Zod and include a
  honeypot field client-side. Since they write directly to Supabase
  rather than through a server route, a determined bot could bypass both
  by calling the Supabase REST API directly — the real backstop is the
  RLS policy shape (insert-only, public tables reviewed by an admin
  before anything downstream trusts them), not the client-side checks.
  Moving these back behind Vercel API routes (straightforward now that
  Vercel is the host) would restore server-side re-validation if spam
  becomes a real problem.
- Every content table has RLS enabled with an explicit policy — there is
  no table relying on "no policy = deny by default" as its only protection;
  each is intentional (see `supabase/schema.sql`).
