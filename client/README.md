# Talentele website

Marketing website for [Talentele](https://talentele.in), a training institute in Nayapalli, Bhubaneswar.

Built with Next.js 16 (App Router, Cache Components, Partial Prefetching), React 19, TypeScript and Tailwind CSS 4.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Checks:

```bash
npx tsc --noEmit   # type check (run `npx next typegen` first on a fresh clone)
npm run lint
```

## Configuration

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL used for canonical URLs, sitemap and structured data. Defaults to `https://talentele.in`. |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | **Option 1** for enquiry delivery: email through [Resend](https://resend.com). The from-address must be on a domain verified in Resend. |
| `ENQUIRY_WEBHOOK_URL`, `ENQUIRY_WEBHOOK_SECRET` | **Option 2**: POST each enquiry as JSON to a webhook (CRM, Google Apps Script, Zapier…). The secret is sent in the `X-Enquiry-Secret` header. |

If no delivery option is configured, the contact form tells visitors that online enquiries are temporarily unavailable and shows the phone number and email address. It never reports a false success.

## Project structure

```
src/
  app/                  Routes (each page.tsx exports its own metadata)
    contact/actions.ts  Enquiry server action (validation, spam checks, delivery, thank-you cookie)
    sitemap.ts, robots.ts, opengraph-image.tsx
  components/
    common/             Buttons, sections, page hero, breadcrumbs, FAQ, CTA band, legal layout
    layout/             Header, mobile navigation, footer
    home/               Homepage sections
    courses/ blog/ contact/
    seo/JsonLd.tsx
  data/                 All site content (typed): site facts, courses, posts, faculty, placements, gallery, FAQs
  lib/                  SEO helpers, validation, enquiry delivery, utilities
  assets/images/        Licensed stock photography (Unsplash licence), statically imported
public/brand/           Original Talentele logo files (unaltered)
```

### Editing content

- **Courses**: `src/data/courses.ts`. Add the slug to `src/data/slugs.ts` too — type checking enforces this, and old `/<slug>-course/` URLs redirect automatically.
- **Blog posts**: `src/data/posts.ts` (plus the slug in `src/data/slugs.ts`). Article bodies are structured blocks; inline text supports `[link](/path/)` and `**bold**`.
- **Gallery**: add genuine, consented photos to `src/data/gallery.ts`. The page shows an honest empty state until then.
- **Placement outcomes**: add verified, consented entries to `placementOutcomes` in `src/data/placements.ts`.

## Notes

- Course and article pages are fully static (`ensureStatic = "navigation"`), so unknown slugs return a real HTTP 404.
- Legacy URLs from the previous site (`/about-us/`, `/contact-us/`, `/placement/`, `/<course>-course/`, …) redirect permanently. See `next.config.ts`.
- Photos marked "Illustrative" are licensed stock images and don't show Talentele students or events.
