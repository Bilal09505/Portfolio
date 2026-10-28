# Portfolio content & screenshot guide

This guide combines the supplied CV, existing portfolio, public GitHub repository review and read-only inspection of `D:/Projects/cambridge-school` and `D:/Projects/hafiz-baba`. Updated 28 October 2026.

## Where each project belongs

| Priority / section | Project | Reason and content |
| --- | --- | --- |
| Featured first | Cambridge School — **In progress** | Your current school finance work. Explain fees, remaining dues, salary/expense payments, role access and class-scoped results. Keep separate from the older Next.js `school` project. |
| Featured second | Hafiz Auto — **In progress** | Your current car-parts inventory work. Explain products, lots, purchases, sales, suppliers, reports and offline operation handling. It is distinct from Metallix. |
| Featured third | API Documentation Portal | Strong developer-tooling example: schema → generated form → API request → response viewer. Your actual screenshot is already integrated. |
| More from the workshop | Metallix | Angular/NestJS full-stack architecture, modular services, authentication and RBAC. |
| More from the workshop | School Management System | Earlier Next.js/Express/MySQL system, student records and attendance. |
| More from the workshop | E-Commerce & Shopping | Product discovery, cart, ordering and Firebase integration. |
| More from the workshop | Doctor Appointment | Angular/Ionic scheduling with distinct web and mobile repositories. |
| More from the workshop | 2048 & Interactive Games | JavaScript fundamentals, game logic and responsive interactions. |
| Candidate for a later update | AI Job Hunter | Public README describes Angular/NestJS AI workflows. Confirm which described features actually run and capture working screens before promoting it. README alone does not establish completeness. |

No users, traffic, client-country totals or performance percentages were invented. The home bento uses eight selected project entries, two in-progress projects, end-to-end scope and your location. These are not claims of eight shipped products.

## What to capture

Use a desktop viewport around **1440 × 900**, browser zoom **100%**, and consistent crop sizes. For mobile use **390 × 844** (the site itself is checked at 375px). Prefer a demo account with synthetic records. Do not submit real operations merely to obtain screenshots.

| Project | Cover image | Gallery images / short demo | Redact before sharing |
| --- | --- | --- | --- |
| Cambridge School | Dashboard overview | Fees screen; remaining dues; expenses with partial-payment history; teacher results view; one mobile fees screen | Student/guardian/staff names, phone numbers, IDs, fee amounts, salaries, school account email, record details |
| Hafiz Auto | Dashboard or products/lots overview | Purchase form; sales form; supplier payment history; monthly report; sync status with demo queued operation; mobile inventory | Supplier/customer names, phones, purchase costs, profits, balances, invoice numbers and private stock details |
| API Documentation Portal | Current `images/api-doc.png` | Nested form; safe demo request and response; generated cURL | Tokens, authorization headers, API keys, private endpoint hosts and response data |
| Metallix | Main application dashboard | Main business workflow; role-aware UI; sample API request if useful | Client data, identities, tokens and confidential business figures |
| School Management System | Administrative dashboard | Student list; attendance; mobile view | Names, IDs, attendance and contact details |
| E-Commerce & Shopping | Product listing | Product detail; cart; order workflow | Account information, addresses and order/payment data |
| Doctor Appointment | Booking screen | Service/doctor selection; appointment details; Ionic mobile view | Patient information, real appointment details, medical data and phones |
| 2048 | Mid-game board | 10–15 second muted gameplay video, plus mobile screen | Usually none; remove any personal browser UI |

Cambridge and Hafiz covers currently use **labelled workflow illustrations**, not fake product screenshots. About uses a designed BH monogram until you supply a portrait. No fictitious phone mockups or client locations are shown.

## Exact folders and code fields

Original images go under **`media/raw/`**, which is gitignored:

```text
media/raw/cambridge-school/dashboard.png
media/raw/cambridge-school/fees.png
media/raw/cambridge-school/expenses.png
media/raw/hafiz-auto/dashboard.png
media/raw/hafiz-auto/sales.png
media/raw/hafiz-auto/sync.png
media/raw/metallix/dashboard.png
media/raw/doctor/mobile.png
media/raw/2048/demo.mp4
```

Copy `media/manifest.example.json` to `media/manifest.json`. Replace the sample crop box with your actual sensitive regions, measured in **original-image pixels**. `blur` entries have `left`, `top`, `width`, `height`. The example coordinates are not a real privacy review. Inspect every generated image; use solid redaction or demo data if blur could leave content identifiable.

Run `npm run media -- media/manifest.json`. It generates WebP files in `public/media/<slug>/` at 640, 1280 and 1920px, without enlarging small inputs. Each manifest entry is a single named image: use a different slug such as `cambridge-school-fees` for additional screens to prevent overwriting a cover. Video entries use `video: true` and need ffmpeg on PATH; output is muted H.264 plus a poster.

Then update `src/data/projects.ts`:

```ts
image: '/media/cambridge-school/cover-1280.webp'
```

The current gallery displays the supplied cover. Multiple-image carousels and video players should be wired to actual supplied media, rather than empty controls. No video is currently supplied.

| Content | Location |
| --- | --- |
| Name, location, contact links, experience, education | `src/data/site.ts` |
| Titles, status, platforms, problems, features, flow, engineering notes, GitHub links | `src/data/projects.ts` |
| Tool categories | `src/data/stack.ts` |
| PDF résumé download | `public/bilal-cv.pdf` |
| Portrait, once provided | `public/media/bilal-portrait.webp`, then replace the monogram in `src/components/home.tsx` |
| Existing EmailJS service/template/public key | `src/components/contact.tsx` |

## Details worth supplying next

- Portrait with permission to use it; transparent PNG/WebP is ideal.
- Sanitized screenshots for Cambridge School and Hafiz Auto first.
- Your exact role and client name/country only where you want them public.
- Verified impact figures with context and a baseline; otherwise keep descriptive outcomes.
- Whether either in-progress app may have a public demo link. Private source repositories and authenticated operational systems are not linked publicly in the portfolio.
- Any discrepancy between CV and current role/dates.

## Sources and caveats

- Supplied CV: `D:/Family/bilal_cv.pdf`. It lists `malikbilal121212@gmail.com`; at your request the website retains the original contact address `mc180406267@gmail.com` and EmailJS integration. The downloadable CV is unchanged.
- [API Documentation Portal](https://github.com/Bilal09505/api-documentation-portal): a detailed README supports schema-driven rendering and execution. OpenAPI import, testing history and proxy integration are listed as future work, not claimed as shipped.
- [Metallix Frontend](https://github.com/Bilal09505/Metallix-Frontend) and [Backend](https://github.com/Bilal09505/Metallix-backend): frontend README currently repeats backend documentation; improve it before using it as an interview reference.
- [School](https://github.com/Bilal09505/school) has a minimal starter README. Add setup, screenshots, real features and architecture. Pair it with [backend-school](https://github.com/Bilal09505/backend-school).
- [Doctor web](https://github.com/Bilal09505/doctor) and [mobile](https://github.com/Bilal09505/doctor-mobile-app) are separate repositories; the old portfolio linked both buttons to the web repository.
- [AI Job Hunter](https://github.com/Bilal09505/AI-Job-Hunter) is a promising candidate; inspect implementation before repeating every README claim.
- Cambridge and Hafiz details come from local README files, route definitions and source inspection. Hafiz documentation records outstanding verification and permission issues, so the portfolio explicitly presents it as ongoing work.

## Intentionally waiting for evidence/media

Client-country globe arcs, impact number counters, portrait cutout, screenshot carousels, floating phone previews and a playable project video require your real content. The globe currently shows your home location, with decorative rotation and drag. No client relationships or delivery results are implied.
