# Geo Construction LLC — website

Static marketing site for an asphalt and concrete paving contractor in Utah County.
Hand-written HTML, CSS and vanilla JS — no build step, no framework, no backend.

Live at <https://rolz-royz.github.io/geo-construction/> (GitHub Pages, `main`, root).

See [PRODUCT.md](PRODUCT.md) for who the site is for and what it is allowed to claim.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | The whole page. **English copy lives here**, plus the head tags and JSON-LD. |
| `i18n.js` | **Spanish copy**, keyed to the `data-i18n` attributes in `index.html`. |
| `config.js` | Phone and email. Single source of truth — see below. |
| `script.js` | Language switch, mobile nav, scroll reveal, contact wiring, form validation. |
| `styles.css` | All styles. Design tokens are the custom properties in `:root`. |
| `404.html` | GitHub Pages error page. Bilingual, no language picker. |
| `robots.txt`, `sitemap.xml` | Crawl directives and the two `?lang=` URLs. |
| `img/` | Logo set and favicon. |

## Running it

Any static server from this folder, e.g.:

```bash
npx --yes http-server . -c-1
```

Opening `index.html` straight from disk also works.

## Adding or changing copy

Every visible string ships in both languages or it does not ship.

1. Write the English in `index.html` on an element carrying `data-i18n="some.key"`
   (or `data-i18n-placeholder` for a form placeholder).
2. Add the same key with the Spanish text to the `es` block in `i18n.js`.

Spanish is written in the Latin American / US-Hispanic register the customers use —
"driveway" stays in English, for example.

Strings used only from JavaScript (ARIA labels, form messages) need an entry in **both**
the `es` and `en` blocks of `i18n.js`, because `t()` falls back to the `en` block.

Language resolution order: `?lang=` → saved choice in `localStorage` → browser language.

## Contact details

`config.js` is the one place to edit the phone and email. `script.js` pushes those values
into every element marked `data-contact="tel"`, `data-contact="email"` or `data-contact-num`
— header, hero, service-area CTA, quote form, footer, the floating call button and `404.html`.

`config.js` also holds `formEndpoint` (see the launch checklist below). `index.html` carries
the same phone and email inline so the page is correct before the script runs. If the two
drift apart, visitors still see the `config.js` value and the browser console prints a
warning **on localhost only**, naming how many inline copies are stale.

## Before launch

Nothing below is confirmed by the owner. Each item is a claim the site currently makes
that has to be verified or removed.

- [ ] **Phone and email.** `(801) 555-0199` and `info@geoconstructionutah.com` are
      placeholders. Replace them in `config.js`, then in the inline copies in `index.html`
      and in the `telephone` / `email` fields of the JSON-LD block. Set
      `contactIsPlaceholder: false`.
- [ ] **"Licensed & insured."** Appears in two places — the hero badge (`badge.licensed`) and
      the footer bottom bar (`foot.licensed`). Keep it only if the owner confirms the license
      and the carrier; otherwise remove both (and their `es` strings in `i18n.js`).
      Note: PRODUCT.md says this also appears in the FAQ. It does not.
- [ ] **Service-area list.** The 18 cities in the areas section, the footer and the
      `areaServed` block of the JSON-LD are a reasonable draft, not a confirmed coverage map.
- [ ] **Quote form endpoint.** `formEndpoint` in `config.js` is empty, so the form does not
      post anywhere. It no longer claims to: it validates, says plainly that nothing has been
      sent yet, and hands the visitor a pre-filled text or email draft so the lead still
      reaches you. Paste a Formspree / Netlify Forms / Web3Forms URL into `formEndpoint` and
      it submits for real, reporting success only when the server accepts it and falling back
      to the same drafts if the send fails.
- [ ] **Project photos.** The five tiles are CSS textures, and the section says so: it is
      titled "What each surface looks like" and carries `.projects__note` stating these are
      illustrations, not photographs. When real photos exist, set
      `style="background-image:url('img/project-1.jpg')"` on each `.tile`, delete
      `.projects__note` (and its `proj.note` string), and only then may the section go back
      to claiming finished work.
- [ ] **Custom domain.** Not purchased. When it is, update the absolute URLs in the canonical
      tag, the `hreflang` and `og:` tags, the JSON-LD `@id`s, `robots.txt` and `sitemap.xml`.
- [ ] **Submit the sitemap** to Google Search Console once the domain is final.

No testimonials, star ratings, review counts, project counts, years in business or award
badges may be added until they are real. See "Evidence on Hand" in PRODUCT.md.

## Colour and contrast

The logo orange `#F15C04` is the brand colour and is used everywhere it is decoration —
the eyebrow dot, the hazard strip, focus rings, kickers, the main service-area chips.

It measures only **3.3:1** against white text, so anything that carries white text uses two
darker tokens instead: `--btn-fill` `#c24700` (**5.0:1**) and `--btn-fill-hover` `#a63f02`
(**6.3:1**). That covers the buttons, the skip link, the active language button and the
service-card number badges. `.btn` is also 1.2rem so the large buttons clear the 18.66px
large-text threshold with margin rather than missing it by a quarter pixel.

**If you add a new element with white text on orange, use `--btn-fill`, not `--orange`.**
Visitors read this page outdoors on phones in bright sun, which is why the margin matters.
