# GETA — Gujarat Executive Trainers Association

Production Next.js 14 (App Router) + TypeScript + Tailwind + Supabase project,
built as a **fully static site** (`output: "export"`) so it can be hosted
directly on **GitHub Pages** — push to `main` and a GitHub Actions workflow
builds and publishes it automatically, no separate hosting account needed.
This build was compiled and type-checked successfully (`tsc --noEmit`,
`next lint`, and a static-export `next build` all pass — see *Build
verification* below).

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
| **Static export + GitHub Pages Actions workflow** | ✅ Complete |
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

**Why this is a fully static site now:** the site was originally built as
a Next.js hybrid app (API routes + server-rendered pages) deployed to
Vercel. It was converted to `output: "export"` (a 100% static build) so it
can be hosted directly on GitHub Pages — "push to GitHub" is the entire
publish step, with no separate hosting account required. This had three
real consequences, all handled:
1. **No server-side API routes.** The 4 public forms now call the
   Supabase browser client directly, using the public anon key. This is
   safe because every one of those tables already has an explicit
   `for insert with check (true)` RLS policy (see `supabase/schema.sql`)
   — the database enforces what's allowed, not a server route. The one
   real trade-off: server-side Zod re-validation and the honeypot check
   are now client-side only, so a bot hitting the Supabase REST API
   directly bypasses them. Acceptable for this phase; revisit if spam
   becomes a problem (e.g. add a Postgres check constraint or a
   CAPTCHA on the form).
2. **No cookie-based server auth.** `lib/supabase/server.ts` (which
   needed `next/headers` cookies — incompatible with static export) was
   removed. The Member Portal dashboard now checks the session
   client-side (`supabase.auth.getSession()` in a `useEffect`) and
   redirects to `/portal` if there isn't one, instead of a server-side
   redirect.
3. **`basePath: "/gita"` in production.** GitHub Pages serves this repo
   at `pareekpiyush97.github.io/gita/`, not the domain root, so
   `next.config.js` sets `basePath`/`assetPrefix` whenever the
   `GITHUB_PAGES=true` build-time env var is set (only the Actions
   workflow sets it — local dev and any other host still run at `/`).
   Every internal link had to use `next/link`'s `<Link>` (which respects
   `basePath` automatically) instead of a raw `<a href="/...">`, which
   would silently 404 in production.

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
├── .github/workflows/deploy.yml # Builds + deploys to GitHub Pages on every push to main
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
npx tsc --noEmit                     # ✅ passes, zero errors
npx next lint                        # ✅ passes, zero warnings
GITHUB_PAGES=true npx next build     # ✅ passes — static export to ./out, all 33 routes
```

This has been verified end-to-end on this machine, including serving the
actual contents of `./out` from a local static file server mounted under a
`/gita` subpath (mirroring exactly how GitHub Pages serves a project
site) and confirming every route resolves, assets load with the correct
`/gita/_next/...` prefix, and client-side `<Link>` navigation works.

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

## Deployment instructions (GitHub Pages)

1. **Create the Supabase project** at supabase.com, then open the SQL
   editor and run `supabase/schema.sql` top to bottom.
2. **Add two repo secrets** at
   `github.com/pareekpiyush97/gita/settings/secrets/actions`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   Both are from Supabase → Settings → API. These are safe to expose to
   the browser by design (Supabase's anon key is meant to be public — RLS
   is what actually protects data); they're stored as Actions secrets here
   only because they're build-time env vars, not because they're sensitive
   in the way the service role key is.
3. **One-time repo setting**: go to
   `github.com/pareekpiyush97/gita/settings/pages` and set **Source** to
   **GitHub Actions** (not "Deploy from a branch"). This only needs doing
   once, ever.
4. **That's it** — every push to `main` now triggers
   `.github/workflows/deploy.yml`, which builds the static export and
   publishes it to **https://pareekpiyush97.github.io/gita/**. Check the
   Actions tab on the repo to watch a deploy or see why one failed.
5. **Local dev**: `npm install && npm run dev` → http://localhost:3000
   (no basePath locally — `GITHUB_PAGES` is only set by the Actions
   workflow).
6. **Storage buckets** (only needed once file uploads are wired up in a
   later phase) — create `avatars`, `certificates`, `gallery`, and
   `resources` buckets in Supabase Storage for the schema's `*_url`
   columns.
7. **Custom domain**: add a `CNAME` file to `public/` with your domain,
   set `basePath`/`assetPrefix` to `""` in `next.config.js` (a project
   page needs the `/gita` prefix; a custom domain at the root doesn't),
   and point your domain's DNS at GitHub Pages per their docs.

## Security notes

- There is **no service-role key anywhere in this app anymore** — the
  static-export conversion removed the only code that used it
  (`lib/supabase/server.ts` and the API routes). Every write from the
  browser uses the public anon key and is only as permissive as the RLS
  policy on that table (see `supabase/schema.sql`). Do not reintroduce a
  service-role key into any client-facing code if the Admin Panel
  (still unbuilt) needs elevated writes later — that logic needs its own
  server (a serverless function on a host that supports it, since GitHub
  Pages can't run server code), kept separate from this static site.
- The 4 public forms (contact, membership application, event
  registration, trainer booking) validate with Zod and include a
  honeypot field client-side. Since there's no server to re-validate on,
  a determined bot could bypass both by calling the Supabase REST API
  directly — the real backstop is the RLS policy shape (insert-only,
  public tables reviewed by an admin before anything downstream trusts
  them), not the client-side checks.
- Every content table has RLS enabled with an explicit policy — there is
  no table relying on "no policy = deny by default" as its only protection;
  each is intentional (see `supabase/schema.sql`).
