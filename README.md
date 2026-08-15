# Kyle Langham Consulting — site

Hand-written static HTML and CSS. No framework, no build step, no dependencies.
Deploys to any static host. Opens correctly from `file://` by double-clicking
`index.html`, so you can review changes without running anything.

---

## File structure

```
index.html                    homepage
manufacturing.html            /manufacturing
quality-assurance.html        /quality-assurance
quality-control.html          /quality-control
analytical-development.html   /analytical-development
process-development.html      /process-development
tech-transfer.html            /tech-transfer
regulatory-affairs.html       /regulatory-affairs
diagnostic.html               /diagnostic
for-it.html                   /for-it
about.html                    /about

assets/site.css               the only stylesheet, including the print rules
assets/site.js                mobile nav toggle + the PDF print button, ~35 lines
assets/favicon.svg
```

Flat `.html` files at the root. Netlify, Cloudflare Pages, GitHub Pages and
Vercel all serve `/manufacturing` from `manufacturing.html` automatically, so
the clean URLs work without any config file.

### Deploying

Upload the whole folder. There is nothing to compile and no environment
variables. To preview locally with real URLs instead of `file://`:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

---

## Swapping in a video embed

Every demo slot is marked with a comment block. There is one on the homepage
and one on each of the seven function pages. Find:

```html
<!-- ─── VIDEO SLOT ─── -->
```

Inside it are two things: a commented-out `<iframe>` and a visible
`<div class="video-ph">` placeholder.

**To go live with a video:**

1. Delete the whole `<div class="video-ph">...</div>` block.
2. Uncomment the `<iframe>` (remove the `<!--` and `-->` around it).
3. Replace `VIDEO_ID` with the YouTube id. For an unlisted video at
   `https://www.youtube.com/watch?v=abc123XYZ`, the id is `abc123XYZ`.

That is the only edit. The `.video-wrap` container already holds a 16:9 box
that scales on mobile, so the embed needs no sizing attributes.

The embed uses `youtube-nocookie.com`, which is worth keeping — it is the
version that does not set tracking cookies before playback, and it is one less
question from anyone's IT group.

**Pages without a video still work.** The placeholder is deliberately styled to
look intentional rather than broken, so a page is safe to send in outbound
before its demo exists.

**If you switch away from YouTube later:** for a self-hosted MP4, replace the
`<iframe>` with `<video controls poster="assets/poster.jpg"><source src="assets/demo.mp4" type="video/mp4"></video>`.
`assets/site.css` already styles `.video-wrap video` identically to the iframe.

---

## Adding an eighth function page

1. **Copy an existing function page.** `manufacturing.html` is the reference
   copy. Save it as `your-page.html`.

2. **Edit the six sections.** They are labeled in the source with numbered
   comments and appear in this order:

   | # | Section | What goes here |
   |---|---|---|
   | 1 | The recurring pain | Three paragraphs naming specific events that function lives through. Real artifacts, no abstraction about data silos. |
   | 2 | The demo | Video slot plus a caption saying what the agent is doing. |
   | 3 | Under the hood | A lead paragraph, then the `.doclist` naming which systems get queried in what order, then the human-in-the-loop note in `.pnote`. |
   | 4 | Where the time goes | The two `.tcol` blocks. Keep the honesty note in `.honest` unchanged. |
   | 5 | What it takes | Two paragraphs on the data gaps, pointing at the Diagnostic. |
   | 6 | CTA | The reply card. Change the `mailto:` subject only. |

3. **Change the mailto subject.** In the `.reply` block:

   ```html
   <a class="mail" href="mailto:kyle@kylelangham.com?subject=Your%20page%20workflow">
   ```

   Use `%20` for spaces. This is how you tell which page generated a reply
   without any analytics, so make each one unique.

4. **Add it to the nav on all eleven other pages.** Inside `.navmenu`:

   ```html
   <a href="your-page.html">Your Page</a>
   ```

5. **Add a card to the homepage grid** in `index.html`, inside `.fgrid`. Copy
   an existing `<a class="fcard">` block and change the icon path, heading,
   one-line claim and verb.

6. **Add it to the `.also` list at the bottom of the other seven function
   pages**, and add those pages' links to yours.

### Two rules worth keeping

**One CTA per page.** The nav button changes per page so it never competes with
the page's real call to action:

| Page | Nav button | Page CTA |
|---|---|---|
| Homepage, About | Book a call | Calendar |
| The seven function pages | Send me a workflow → `#reply` | Reply card, with a quiet calendar text link below it |
| Diagnostic | Book a call | Calendar |
| For IT | Download as PDF | Print button, **no calendar anywhere on the page** |

**Each function page needs a distinct verb and a distinct data object.** The
seven are investigate, decide, project, analyze, compare, reconcile, draft. If
a new page's demo is another version of "look at a trend across runs," it will
read as a duplicate no matter what the header says. Give it its own data object
and its own output artifact.

---

## The /for-it print stylesheet

`for-it.html` prints to a clean letter-size PDF. The rules live at the bottom of
`assets/site.css` under `@media print`. Printing:

- hides the nav, the footer, the contents block and every button
- reveals `.print-head` (logo and contact letterhead) and `.print-foot`
- sets Letter with 0.6in margins and ~10.5pt body text
- keeps each numbered section on one page with `break-inside: avoid`

The "Download as PDF" button calls `window.print()`. The reader chooses
"Save as PDF" as the destination in their own print dialog. Nothing is
generated server-side and there is no PDF file to keep in sync.

If you add a section to that page, wrap it in `<article class="docsec">` and it
inherits the print behavior automatically.

---

## Design system

Tokens are at the top of `assets/site.css` and match the existing deliverables
(`Diagnostic_Scope.html`, the one-pagers).

```
--ink:#1D1D1F   --ink-2:#3A3A3C   --muted:#6E6E73
--line:#E3E3E6  --line-2:#EFEFF1
--canvas:#FBFBFD  --card:#FFFFFF  --wash:#F4F6FA
--accent:#0A6CFF  --accent-soft:#EDF3FF  --accent-ink:#0852C4
```

Headings are 700 weight at about `-0.02em` tracking. Section eyebrows are
10–11px uppercase at `0.15em`. Body is 15–16px at 1.55 line height in
`--ink-2`.

The stylesheet is mobile-first: base rules are phone, and `min-width` queries
scale up at 640px and 900px. A lot of these links get opened on a phone.

The node graph in the homepage hero is inline SVG carried over from the previous
site, animated with CSS and guarded by `prefers-reduced-motion`.

---

## Things to know before editing

- **No external requests.** No CDN, no web fonts, no analytics. The only
  outbound links are the calendar, LinkedIn, kylelangham.com and
  intelligence-layer.com, plus the YouTube iframe once a video is added. Worth
  preserving — it is part of what makes `/for-it` credible.
- **`assets/site.js` is optional.** If it fails to load, every page still reads
  and every link still works. The mobile drawer is the only thing that stops
  functioning.
- **Voice rules the copy follows:** first person singular, never "we". No
  em-dashes. No "not X, but Y". Named artifacts over abstractions.
- **The time figures on the function pages are labeled as demo-environment
  observations, not client results.** The `.honest` note under each comparison
  says so explicitly. Keep that until there are real client outcomes to cite.
