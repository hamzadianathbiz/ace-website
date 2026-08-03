# ACE — AI Deployment Co.

Marketing site for ACE: AI advisory and deployment for lower-mid and mid-market private capital.

Production: https://acedeployed.com

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS. No animation library — every transition is hand-rolled CSS driven by mount-triggered React state, which is the convention throughout.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint with Next.js Core Web Vitals and TypeScript rules |
| `npm run typecheck` | TypeScript validation without emitting files |
| `npm run check` | Lint, typecheck and production build |

## Routes

| Route | File | Notes |
| --- | --- | --- |
| `/` | `app/page.tsx` | The whole marketing story, one page, section anchors |
| `/company` | `app/company/page.tsx` | Case studies, fulfillment partner and company story |
| `/partners` | `app/partners/page.tsx` | Partner Program — separate audience, so a separate route |
| `/legal/terms` | `app/legal/terms/page.tsx` | Terms & Conditions |
| `/legal/privacy` | `app/legal/privacy/page.tsx` | Privacy Policy |
| `/robots.txt` | `app/robots.ts` | Search-engine crawling rules |
| `/sitemap.xml` | `app/sitemap.ts` | Canonical public routes |

## Where things live

```
app/
  layout.tsx      fonts, shared metadata, skip link
  page.tsx        home page composition
  globals.css     the type scale, button, label, accordion and stat classes
  company/        company route
  legal/          terms and privacy routes
  partners/       partner program route
components/       one file per section
lib/links.ts      every outbound URL on the site
lib/site.ts       canonical host and shared site metadata
public/assets/web logos and hero imagery
```

### `lib/links.ts` — read this first

Every href on the site resolves from this one file. Nothing hardcodes a URL of its own.

- `DISCOVERY_CALL` — the Cal.com link behind every discovery CTA. Change it here, every button follows.
- `SECTIONS` — in-page anchors. They are absolute (`/#services`, not `#services`) so they still resolve from other routes. The ids live on the sections themselves; keep the two in step.

### The type scale — `app/globals.css`

Cardo (serif) carries anything at heading rank, Schibsted Grotesk carries running text, IBM Plex Mono carries eyebrows, ordinals and captions. Sizes live in `globals.css` so the scale is one decision, not something each section restates:

| Class | Use |
| --- | --- |
| `.display-xl` | Page headline (hero h1, partners h1) |
| `.display-lg` | Section statement (mission, feature tiles) |
| `.display-md` | Second-rank statement in a narrow column (thesis) |
| `.display-sm` | Item heading (accordion, partner pillars, client rows) |
| `.label` | Eyebrow, mono uppercase |

**Cardo ships 400 and 700 only.** Do not apply `font-medium` or `font-semibold` to it — the browser synthesises the weight and it reads visibly heavier than the rest of the page.

### Buttons

One class, `.pill`, matching the hero CTA spec: black fill, 12px radius, 19/10 padding, two stacked shadows. `.solid` is an alias. `.on-film` flips it to white for dark surfaces (partner card, footer). All CTAs render through `components/CallCta.tsx`.

Not named `invert` — that is a Tailwind filter utility and the collision silently inverts the element's paint.

## The hero opening

`components/Hero.tsx`. The image lands full-bleed over the whole viewport, holds, then shrinks into its card while the copy rises in.

Worth knowing before you touch it:

- The card div stays in flow and reserves its box the entire time. Only the image's own frame moves, from `position: fixed`. Nothing reflows.
- It transitions `top/left/width/height` together with `border-radius` rather than scaling a rounded rect, which would distort the corners.
- The hold starts on image **load**, not on mount. Counting from mount spends the full-bleed moment showing the blur placeholder while the file decodes. A 3s bail covers a slow or failed image.
- `cover` is the server-rendered state, so first paint is already full-bleed with no flash of the settled layout during hydration. The `<noscript>` rule drops the image into its card for anyone without JS, who would otherwise be stuck on a permanent full-screen image.
- Scroll is locked until the image is home.
- The whole sequence is skipped under `prefers-reduced-motion`.

Timing knobs live in `DESKTOP_TIMING` and `MOBILE_TIMING` at the top of the file.

## Fonts

All three come from Google Fonts via `next/font`, so there is nothing to install.

The body face is a stand-in. The design calls for **Neue Haas Grotesk Text**, and the only cuts available were trial-license, so they were removed and Schibsted Grotesk put in their place. To swap in licensed NHG: drop the files in `app/fonts/` and replace the `Schibsted_Grotesk` block in `app/layout.tsx` with `next/font/local`. Nothing else changes.

## Deployment

Vercel, project `ace-website` under the `hamzas-projects-7610de2b` scope.

The project is **not** connected to this repo — deploys are run from the CLI, so pushing to `main` does not ship anything:

```bash
vercel deploy --prod --scope hamzas-projects-7610de2b
```

Connecting the repo in the Vercel dashboard would give you push-to-deploy and preview URLs per branch, and is worth doing.

The framework preset **must** stay set to Next.js. With no preset, Vercel runs the build and then publishes `public/` as a static directory — assets serve fine and every page 404s. This bit the project once already.

`metadataBase` in `app/layout.tsx` points at the production alias. Update it when a custom domain is attached, or Open Graph and canonical URLs will resolve against the wrong host.

## Release checks still requiring an owner decision

- Confirm every public case study and named fulfillment-partner claim against signed engagement records before production promotion.
- `acedeployed.com` is the canonical site host. Preserve the existing `partners.acedeployed.com` and email DNS records when changing DNS for the apex or `www` host.
- Add the ACE privacy-policy URL to the Cal.com and Tally collection points, and correct any duplicated currency symbols in the Cal.com qualification labels.

## Maintenance notes

- Reference assets that are not imported by the site remain under `public/assets/web`. They can be removed in a dedicated asset-cleanup change after the final content set is locked.
- No Prettier config is committed. Running Prettier with its defaults does not match the established source style.
