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

**Creative North Star: "The Software Exhibition Catalogue"**

An open, typographic catalogue makes the person and his actual software the visual material. White space, charcoal text, deep blue emphasis and fine rules organize substantial information without disguising it as a dashboard.

The system is assured, personal and restrained. A single grotesk family provides the hierarchy; an original colour portrait and genuine product captures provide specificity. Direction was delegated by the user and recorded from the implemented, reviewed site. No generated or user-approved image comp is claimed.

**Key Characteristics:**
- Open asymmetric grids and fine dividing rules.
- One self-hosted type family with a strong scale contrast.
- Real photography and readable software screenshots.
- Square controls, visible focus and optional subtle motion.

## Colors

Deep blue gives a clear emphasis to a mostly neutral page.

### Primary
- **Exhibition blue** (`blue`): name emphasis, primary actions, links on hover, focus outlines and the contact section.

### Neutral
- **Paper** (`paper`): main canvas, controls and reversed text.
- **Charcoal** (`ink`): headings, body text and primary-button hover.
- **Quiet grey** (`muted`): supporting descriptions, captions and dates.
- **Rule grey** (`line`): section dividers and status outlines.
- **Display well** (`well`): screenshot mounting surface and experience background.

**The Clear Emphasis Rule.** Use the accent to identify emphasis or action; keep supporting text and separators neutral.

## Typography

**Display and body font:** Archivo, self-hosted as a Latin variable WOFF2 with Helvetica Neue, Helvetica, Arial and sans-serif fallbacks. The CSS uses `font-display: swap`.

The tightly spaced display and relaxed body copy share one voice. The frontmatter records desktop display, section headline, project title, body and status-label roles. Other recurring supporting sizes are 15px descriptions, 12px technology labels and 11px captions. Paragraphs are capped at 70ch; individual introductory and project statements use shorter measures.

Mobile body text is 16px. At widths up to 680px, the hero uses `clamp(54px,12.8vw,82px)`, section headings use 42px and project titles use 30px. Preserve purposeful wrapping rather than shrinking everything uniformly.

## Layout

The shared container is `min(1280px, calc(100% - var(--space)*2))`, centred with fluid side gutters. Section rhythm comes from the frontmatter spacing values. Grids use meaningful unequal columns: the desktop hero uses 1.5fr/1fr with a 9% gap; selected lead work uses 1.05fr/1fr; the archive uses 1fr/1.5fr. Paired work and about content use two columns.

At 1000px and below, gaps contract and dated experience shifts to two columns. At 680px and below, the main content grids become one column and side gutters become 22px. Navigation remains visible and wraps; archive fields stack with a full-width submit button. At 1500px and above, the portrait grows to a 400px maximum. Use the actual responsive CSS as the source for component-specific exceptions.

## Elevation & Depth

The system has no shadow vocabulary. Fine borders, whitespace and the pale display well distinguish regions. Screenshot links use a small solid caption overlay; the portrait has no glow or decorative frame.

**The Flat Surface Rule.** Establish hierarchy with spacing, type and tonal contrast before adding another container.

## Shapes

Controls, image wells and status labels have square corners. One-pixel rules delimit rows and disclosure panels. The desktop portrait uses a 4:5 crop; mobile uses 5:4 with a deliberate face-preserving position. Lead product screenshots preserve the full source frame on desktop; tall secondary captures are contained inside a pale well.

## Components

### Buttons and text links

Primary actions are blue with white text, a matching one-pixel border and a minimum 50px height. Hover changes the background and border to charcoal. Mobile padding is 13px 18px. Secondary actions are underlined text links, not another filled button. Inline SVG arrows communicate direction.

Interactive controls use a three-pixel blue focus outline with five-pixel offset; contact-section focus reverses to white. Button and screenshot-caption colour transitions last 180ms with ease-out only when reduced motion is not requested.

### Inputs / Fields

Archive search and category controls are white, square, 52px high, with a one-pixel grey border and explicit visible labels. Search is submitted with GET and works without JavaScript. Empty results retain the search context and a clear reset action. No custom error or disabled visual variants are established.

### Status labels

Small outlined rectangular labels communicate project or experience status. They are static text, with quiet grey type and rule-grey borders, not interactive chips. Technology names form an unboxed inline list with small dot separators.

### Navigation

The compact GBC wordmark uses weight 750 and a blue full stop. Header links use 15px text on desktop and 12px on mobile. Hover and current-section states use blue; current-section links are underlined. A keyboard-visible skip link precedes the header. The header is in normal document flow.

### Selected work

Each project is an open article with a genuine capture, caption, title, status, summary, contribution, technologies and working source links. The article has no perimeter card border or shadow. Screenshot hover changes its source-link caption from white to blue. Preserve captions that identify prototypes and example data.

### Project disclosure

Native `details` and `summary` create a ruled disclosure row with a plus/minus indicator. The expanded content describes contribution, implementation, technical approach and current status. It works with keyboard interaction and without JavaScript.

The only entrance motion moves hero text upward by 10px over 550ms using `cubic-bezier(.16,1,.3,1)`. Content is never initially hidden. Reduced-motion preference disables animation, transitions and smooth scrolling.

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
