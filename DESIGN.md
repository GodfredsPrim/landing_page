---
name: Godfred Bio Conquest Portfolio
description: A personal software exhibition with real work and a dated journey.
colors:
  blue: "#002fa7"
  paper: "#fff"
  ink: "#202124"
  muted: "#5b5e64"
  line: "#d9dce2"
  well: "#f7f7f8"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(62px,7.3vw,96px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(39px,4.4vw,62px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(27px,3vw,39px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  square: "0"
spacing:
  gutter: "clamp(22px,5vw,80px)"
  section: "104px"
  section-mobile: "64px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  text-link:
    textColor: "{colors.ink}"
    padding: "10px 0"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "10px 13px"
    height: "52px"
  status:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    padding: "6px 9px"
  work:
    rounded: "{rounded.square}"
  navigation:
    textColor: "{colors.ink}"
  project-details:
    textColor: "{colors.ink}"
---

# Design System: Godfred Bio Conquest Portfolio

## Overview

**Creative North Star: "The Working Studio Field"**

The page behaves like field notes from a working software studio: the person establishes the signal, real interfaces become evidence, and the visitor moves from first impression to build notes to contact without decorative claims.

The system is cinematic, technical and direct. Archivo carries the hierarchy; near-black surfaces, warm paper text, acid-lime signal color, hard rules and genuine project captures create the world. No generated or user-approved image comp is claimed.

**Key Characteristics:**
- Split-screen hero with the portrait treated as an anchored artifact.
- One self-hosted type family with very large, compact display scale.
- Full-width signal band and project evidence as the page's visual material.
- Hard rules, restrained controls, visible focus and authored motion.

## Colors

Acid lime is the studio signal against a near-black field.

### Primary
- **Signal lime** (`lime`): name emphasis, primary actions, links on hover, focus outlines and the contact section.

### Neutral
- **Near-black** (`black`): primary canvas and navigation field.
- **Warm paper** (`paper`): headings, body text and reversed signal text.
- **Quiet grey** (`muted`): supporting descriptions, captions and dates.
- **Studio line** (`line`): section dividers and disclosure rules.
- **Panel** (`panel`): screenshot mounting surface and experience band.

**The Clear Emphasis Rule.** Use the accent to identify emphasis or action; keep supporting text and separators neutral.

## Typography

**Display and body font:** Archivo, self-hosted as a Latin variable WOFF2 with Helvetica Neue, Helvetica, Arial and sans-serif fallbacks. The CSS uses `font-display: swap`.

The tightly spaced display and relaxed body copy share one voice. The frontmatter records desktop display, section headline, project title, body and status-label roles. Other recurring supporting sizes are 15px descriptions, 12px technology labels and 11px captions. Paragraphs are capped at 70ch; individual introductory and project statements use shorter measures.

Mobile body text is 16px. At widths up to 680px, the hero uses `clamp(54px,12.8vw,82px)`, section headings use 42px and project titles use 30px. Preserve purposeful wrapping rather than shrinking everything uniformly.

## Layout

The shared container is `min(1280px, calc(100% - var(--space)*2))`, centred with fluid side gutters. Section rhythm comes from the frontmatter spacing values. Grids use meaningful unequal columns: the desktop hero uses 1.5fr/1fr with a 9% gap; selected lead work uses 1.05fr/1fr; the archive uses 1fr/1.5fr. Paired work and about content use two columns.

The shared container is `min(1320px, calc(100% - var(--space)*2))`, centred with fluid side gutters. The desktop hero uses an unequal text/portrait split. Featured work becomes a horizontal snap rail with a deliberate next-slide peek; touch, buttons and arrow keys share the same sequence. At 680px and below, the rail uses near-full-width slides, the hero becomes one column, and navigation wraps beneath the wordmark. Archive fields stack with a full-width submit button.

## Elevation & Depth

Depth comes from image wells, one restrained image shadow and the contrast between black, panel and lime surfaces. Fine rules do most of the structural work. Screenshot links use captions beneath the image; the portrait has a thin lime edge and no glow.

**The Flat Surface Rule.** Establish hierarchy with spacing, type and tonal contrast before adding another container.

## Shapes

Controls and status labels are mostly square; the theme control and rail arrows are circular utility exceptions. One-pixel rules delimit rows and disclosure panels. The portrait uses a 4:5 crop. Project screenshots preserve their full source frame inside dark panel wells.

## Components

### Buttons and text links

Primary actions are lime with near-black text, a matching one-pixel border and a minimum 50px height. Hover reverses to a transparent near-black button with lime text. Secondary actions are text links. Inline SVG arrows communicate direction.

Interactive controls use a three-pixel blue focus outline with five-pixel offset; contact-section focus reverses to white. Button and screenshot-caption colour transitions last 180ms with ease-out only when reduced motion is not requested.

### Inputs / Fields

Archive search and category controls are white, square, 52px high, with a one-pixel grey border and explicit visible labels. Search is submitted with GET and works without JavaScript. Empty results retain the search context and a clear reset action. No custom error or disabled visual variants are established.

### Status labels

Small outlined rectangular labels communicate project or experience status. They are static text, with quiet grey type and rule-grey borders, not interactive chips. Technology names form an unboxed inline list with small dot separators.

### Navigation

The G mark and full name sit left in a sticky, translucent header. Header links use tracked uppercase text and the lime signal for hover/current states. A keyboard-visible skip link precedes the header. The header remains compact at 78px desktop and wraps its navigation on mobile.

### Selected work

Each project is an open article with a genuine capture, caption, title, status, summary, contribution, technologies and working source links. The article has no perimeter card border or shadow. Screenshot hover changes its source-link caption from white to blue. Preserve captions that identify prototypes and example data.

### Project disclosure

Native `details` and `summary` create a ruled disclosure row with a plus/minus indicator. The expanded content describes contribution, implementation, technical approach and current status. It works with keyboard interaction and without JavaScript.

The authored motion is the studio reveal: hero copy arrives through a clipped upward reveal, while the active project settles into full opacity and scale as neighboring work recedes. The rail uses a progress line and numbered position for orientation. Content is never initially hidden. Reduced-motion preference disables animation, transitions and smooth scrolling.

## Do's and Don'ts

### Do:
- Do use the original portrait and genuine project captures with accurate captions.
- Do preserve generous whitespace, square controls and fine rules.
- Do retain visible keyboard focus and readable content without optional scripts.
- Do apply the established one-column mobile layouts and check narrow screens.

### Don't:
- Don't introduce gradients, portrait glows or custom cursors.
- Don't replace evidence with decorative counters or arbitrary skill percentages.
- Don't add shadows or rounded card wrappers to every content section.
- Don't hide essential content behind entrance animations.

The hero portrait uses an AI-edited backdrop of small language, framework and developer-tool icons, requested by the owner. The original photograph remains in the repository. This background is decorative and is not evidence of a real setting.
