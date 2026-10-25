# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences the site serves equally, confirmed by the owner:

- **Homeowners in Utah County** (Orem, Provo, Lehi and surrounding cities) replacing or installing
  a driveway, sidewalk, patio or RV pad. Typically a one-time, multi-thousand-dollar decision made
  after comparing two or three local contractors; many are Spanish-speaking, and a large share of
  the local market reads Spanish first.
- **Commercial and multi-family property decision-makers** — business owners, property managers,
  HOA boards — responsible for parking lots, striping, ADA ramps and recurring maintenance.

Neither audience is prioritized over the other; the site must let each one self-identify quickly.

## Product Purpose

A marketing site for Geo Construction LLC, an asphalt and concrete paving contractor. Its single
job is to turn a local search or a shared link into a request for a free on-site estimate (phone
call, text, or the quote form). Success is a qualified estimate request with enough detail — city,
service, property type, project description — for the crew to schedule a visit.

## Positioning

The differentiator the owner builds on is **what goes under the surface**: excavation, drainage
grade and a properly compacted road-base before any asphalt or concrete is placed, specified for
Utah's freeze-thaw cycles, snowplows and de-icing salt. The site makes that invisible work visible
(the pavement cross-section, the asphalt-vs-concrete comparison, the process steps) instead of
competing on price alone. Second differentiator: the business operates natively in English and
Spanish, in a market where most competitor sites are English-only.

## Operating Context

- Estimates are done on site: the crew visits, measures, checks drainage and soil, then sends a
  written quote. Nothing is priced from the website.
- Paving season in Utah County runs roughly spring through fall (installation wants temperatures
  consistently above ~50°F); repairs and estimates continue year-round.
- Visitors arrive from local search, a shared link (WhatsApp, text, Facebook), or a yard sign, and
  a large share are on phones, often standing on the driveway in question.
- Services span the full job: excavation and grading, road base, asphalt paving, concrete flatwork,
  sealcoating, crack sealing and patching, parking lots, line striping, curb and gutter, ADA ramps.

## Capabilities and Constraints

- Static site: hand-written HTML, CSS and vanilla JS. No build step, no framework, no backend.
- Hosted on GitHub Pages from `Rolz-Royz/geo-construction` (`main`, root) at
  https://rolz-royz.github.io/geo-construction/. A custom domain is not purchased yet.
- Bilingual EN/ES is a hard requirement, implemented with `data-i18n` keys: English copy lives in
  `index.html`, Spanish in `i18n.js`. Language follows `?lang=`, then the saved choice, then the
  browser language. Every new string must ship in both languages.
- The quote form validates input but has no backend — it submits nowhere. Connecting it (Formspree,
  Netlify Forms or similar) is an open decision.
- **Undecided / placeholder, must not be presented as fact:** phone `(801) 555-0199` and
  `info@geoconstructionutah.com` are placeholders; years in business, license number and insurance
  carrier are unconfirmed; the service-area city list is a reasonable draft, not a confirmed
  coverage map.

## Brand Commitments

- Name: **Geo Construction LLC**. Logo tagline: DRIVEWAYS | SIDEWALKS | CONCRETE WORK.
- Logo is binding and already in `img/` (white, dark, compact, favicon, 1200×1200 social).
  Source of truth: `~/Downloads/GEO_Construction_Logo_Proposal.pdf`.
- Brand orange sampled from the logo: **#F15C04**. The asphalt-black / concrete-gray ground and the
  orange-plus-amber accent system derive from it.
- Both languages are first-class; Spanish copy is written in the Latin American / US-Hispanic
  register the owner's customers use (e.g. "driveway" is kept, not translated).

## Evidence on Hand

**None yet — confirmed by the owner.** There are no project photos, no Google reviews, no
testimonials, no license or insurance documents cleared for display, and no project counts or
years-in-business figures.

Consequences future work must respect:

- **Illustrative photos (added 2026-10-17):** the 11 images in `img/photos/` are AI-generated,
  supplied by the owner and confirmed as such. They show concrete work only (no asphalt). They
  are labeled on the page ("Illustrative photo" on the hero, a note under the build sequence, a
  footer line) and must never be captioned as Geo jobs, crews or customers. Replace them with
  real job photos as they exist, then remove the labels.
- No testimonials, review quotes, star ratings, "500+ driveways", "since 20XX", or award badges may
  be written. Invented proof is the failure mode this section exists to prevent.
- "Licensed & insured" currently appears in the hero, footer and FAQ. It stays only if the owner
  confirms it; it is not yet verified.

## Product Principles

1. **Sell the base, not just the surface.** Every page-level argument ties back to excavation,
   drainage and compaction — the work that decides whether pavement survives a Utah winter.
2. **Two audiences, one path.** Residential and commercial visitors must each recognize themselves
   within a screen, and both end at the same free on-site estimate.
3. **Spanish is not a translation layer.** Any new copy, label or error message ships in both
   languages or it does not ship.
4. **Never manufacture proof.** Until real photos and reviews exist, credibility comes from
   explaining the work, not from claiming reputation.
5. **Phone-first, on-site.** The fastest path from any point in the page is a tap-to-call; the form
   is the fallback, not the only door.

## Accessibility & Inclusion

- Bilingual EN/ES is an inclusion requirement, not a feature: a meaningful share of customers
  cannot act on an English-only page.
- Visitors are frequently outdoors on phones in bright light, so contrast and tap-target size carry
  real weight; white text on the brand orange is the contrast-sensitive case to keep checking.
- No formal standard (WCAG level, ADA contract requirement) has been imposed by the owner.
