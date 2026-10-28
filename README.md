# Bilal Hassan — portfolio

Next.js App Router, TypeScript and Tailwind v4. Static export for **GitHub Pages**, with the existing **EmailJS** service. No Firebase runtime or hosting configuration.

## Run

Use Node 24 and npm. `npm ci`, then `npm run build` and `npm run preview`. Preview: `http://127.0.0.1:3000/`. For development, run `node scripts/prepare-assets.mjs` once before `npm run dev`.

`npm run build` prepares fonts, globe points, responsive screenshot assets and Open Graph PNGs, compiles all pages and creates `out/`. `npm run typecheck` checks TypeScript. All fonts are bundled locally. The globe dynamically loads Three.js, handles missing WebGL, and pauses drawing while off screen. Lenis and GSAP are disabled for reduced motion.

## GitHub Pages

In the repository, set **Settings → Pages → Source → GitHub Actions**. The existing workflow now installs dependencies, builds and uploads only `out/`. A push to `main` deploys; pull requests build without deploying. No repository push or live deployment is performed by editing these files.

The workflow obtains the Pages URL and base path from `actions/configure-pages`. For a local repository-path build:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/Portfolio'
$env:NEXT_PUBLIC_SITE_URL='https://bilal09505.github.io/Portfolio'
npm run build
npm run preview
```

Then open `http://127.0.0.1:3000/Portfolio/`. Omit the base path for a custom domain or account-root site. `NEXT_PUBLIC_SITE_URL` is the complete deployed base URL without a trailing slash. A root local build defaults its SEO origin to `https://bilal09505.github.io`; production workflow overrides it.

## Contact

The form retains service `service_syronxp`, template `template_tilc503` and public key `8WechvJQ6H6bEuOAx`. It sends the same `name`, `email`, `subject`, `message` fields through EmailJS's API. Service chips populate `subject`. It includes validation, a honeypot, loading state, success only after a successful API response, and an email fallback on error.

The EmailJS account must still have its mail service enabled and allow your Pages origin. Public keys are expected in client-side EmailJS integrations; never add private keys. Actual email delivery was not tested by sending a message during implementation.

## Content

See [CONTENT-GUIDE.md](CONTENT-GUIDE.md) for project order, screenshot checklists, privacy redaction, exact media paths and missing content. The original static `index.html`, `styles.css` and `script.js` are retained as a migration reference; the deployment uses `src/app` and `out/`.

The supplied résumé is unchanged. Its email differs from the original website email, which was retained at your request. In-progress projects are marked explicitly. Illustrations are labelled; no fabricated client statistics or screenshots are used.
