# Redesign verification

Reviewed 8 September 2026. Built on `codex/portfolio-redesign`; production was not published or merged.

## Design review

Independent finish verdict: **pass** after one consolidated correction batch. Self-hosted Archivo resolved the typography finding; the compact desktop hero now introduces selected work within a 1440×1000 view; the full BroxStudies screenshot is preserved on desktop and mobile. Role spacing and CV wording were also corrected. All findings were marked resolved in the final review. The user delegated direction; implementation used authentic assets directly, with no generated or approved image comp. This is a documented workflow limitation, not a claim of comp approval. The mechanical design detector returned no findings.

## Application checks

Nine `unittest` checks passed: server-rendered homepage content; combined archive search/category filtering; empty search and HTML escaping; unknown-category recovery; unique project slugs and required case-study assets; existing PDF, image and favicon routes; explainer input validation and local fallback; Vercel content bundling.

## Browser checks

Chromium desktop 1440×1000, tablet 768×1024, mobile 390×844 and small mobile 320×740: no horizontal overflow, all page images loaded, no JavaScript exceptions. Tested skip link, keyboard-operated native project details, contact anchor, archive search/category submission, no-result recovery and PDF download. Content, details and server filtering also worked with JavaScript disabled. Copy email succeeded with permission and displayed a useful fallback when clipboard writes were denied.

The original live portfolio was opened and screenshot-inspected. Initial computer-use and sandboxed network failures were resolved using the available browser CLI and network access. Automated checks are not a full assistive-technology audit; Safari, Firefox, real-device screen readers and production API credentials were not tested.

## Content and external links

Public repositories, selected implementation files, the repository CV and relevant dated emails were inspected. The newer Gmail CV attachment was marked supported but its reader failed; it was not read or substituted. The existing downloadable PDF is labelled earlier CV.

BroxStudies, BM Archives and Kooqs public interfaces were observed working. The linked public source repositories were accessible through GitHub. Other old live links returned errors, loading screens or empty Streamlit shells, so they were not presented as verified live releases. External availability can change. No third-party transaction, email, application or project submission was performed.

Private research and unresolved factual questions are kept outside the repository. No private correspondence or private repository URLs are included in public content. Research appointments, unconfirmed offers, application approvals and unverified competition wins are not claimed. The original job-matching dataset is generated example data; the screenshot caption and project notes make that explicit.

## Preview build

The first branch build exposed an existing exact Python 3.12.0 pin that Vercel could not resolve. Changing `.python-version` to `3.12` allowed the preview to build successfully with the available patch release. The Flask runtime and requirements remain unchanged. See [Vercel Python runtime documentation](https://vercel.com/docs/functions/runtimes/python).
