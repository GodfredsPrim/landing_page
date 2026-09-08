# Updating the portfolio

Run with Python 3.10 or newer:

```sh
python -m pip install -r requirements.txt
python -m flask --app app run --port 5050
python -m unittest discover -s tests -v
```

Open `http://127.0.0.1:5050`. The project archive is `/projects`.

## Content

Edit `content/portfolio.json`. It contains `profile`, `projects`, `experience`, `achievements` and `capabilities`. Jinja renders it on the server; no build step is needed. Keep the JSON valid and restart the server after template or Python changes.

- **Projects:** give each a permanent, unique `slug`, `name`, `category`, `status`, `summary`, `stack` list and public `source` URL. `live` is optional; use `null` when a release is unavailable or unverified. `related` holds version links without duplicating products. Only link repositories confirmed public.
- **Selected work:** set `featured: true`, and provide `problem`, `role`, `contribution`, `built`, `decision`, `outcome`, `image`, `image_alt` and `caption`. The first featured project receives the wide layout. Remaining entries use the paired layout. Keep the selection small.
- **Experience and achievements:** include the date, role/organisation, a specific description and a precise status. Invitations are not attendance, offers are not completed employment, and participation certificates are not professional certifications.
- **Profile:** contact links, education, introduction and journey text live together. Update `cv_label` and `cv_note` after verifying a current CV.
- **Current work:** no active-project section is published until specific projects and their public suitability are confirmed. Add a structured list and render it when those facts are available.

Search and category filters are ordinary GET requests, so filtered views are bookmarkable and usable with scripts disabled. Categories are derived from content.

## Images and CV

Use genuine screenshots without personal records or confidential data. Keep sample or generated data labelled in the caption. `static/images/work/` contains the optimised project images; `static/images/portrait-*.webp` contains responsive versions of the original `hero.jpeg`. Preserve originals when producing replacements. Update width/height in the image macro if image proportions change.

The existing PDF remains at `static/Godfred_Bio_Conquest_Resume.pdf`. It was text-checked but is undated and missing newer experience, so the site labels it **earlier CV**. Replace it only after reviewing the new document for ownership, currency and public-safe details. Keep the filename to preserve incoming links.

Social metadata uses `static/images/social-preview.jpg`, made from the real portrait and identity text. If the production domain changes, update the canonical and social URLs in `templates/base.html`.

## Structure and preserved behaviour

- `app.py`: home, archive, existing `/profile-image` and `/api/explain` routes.
- `templates/base.html`: shared metadata, navigation and footer.
- `templates/macros.html`: SVG arrow and selected-work rendering.
- `templates/index.html`: homepage composition; `archive.html`: archive and empty state.
- `static/css/portfolio.css`: responsive layout and visual tokens; `static/fonts/` holds self-hosted Archivo and its licence.
- `static/js/portfolio.js`: optional copy-email and navigation indication.
- `vercel.json`: explicitly bundles `content/**` alongside templates and assets.

The old CSS, animation files, QR assets and unused partials remain as reversible legacy files but are not loaded. The redesign replaces QR-only interactions with direct links, removes cosmetic theme switching to preserve one deliberate visual identity, and removes the custom cursor, visitor counter, skill percentages and perpetual animation. Alpine, CDN Tailwind and GSAP are no longer needed by the page. Flask/Jinja remain unchanged as the application stack.

## Before release

Run the tests, inspect desktop and mobile, exercise the archive and keyboard focus, check all image/CV URLs, and verify external links without treating an HTTP 200 loading page as a working product. Check pending factual questions in the private working inventory, stored outside this repository. Do not commit correspondence, private repository links, tokens or third-party details. A preview branch and draft PR are review surfaces; merging and production release require owner approval.
