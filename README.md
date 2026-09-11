# Stella Venn — Personal Website

Personal academic website of Stella Venn, PhD student in Ecology and
Evolutionary Biology at Washington University in St. Louis. Built with
plain HTML, CSS, and JavaScript (no build step, no framework) on top of
the [Editorial](https://html5up.net/editorial) template by HTML5 UP,
and hosted on GitHub Pages.

## Structure

```
index.html              Home page (bio + research highlights)
config.js                Site-wide config: name, links, and which pages
                          appear in the nav (see "Editing content" below)
robots.txt                Blocks image-search bots from /assets/images/

pages/
  about.html, research.html, publications.html, cv.html, contact.html
  teaching-students.html, teaching-classes.html  (Teaching submenu)
  news.html, media.html, photos.html

assets/
  css/          Compiled site styles (main.css) + a small custom
                 stylesheet for the bird easter egg (birb.css)
  sass/          Source for main.css — see "Making style changes" below
  js/            site-nav.js (renders the header/sidebar/menu from
                 config.js on every page), birb.js (easter egg),
                 plus the template's own jQuery/UI scripts
  images/site/   All photos used on the site
  icons/         Favicon and small UI icons
  pdfs/          CV
```

## Editing content

- **Site info, social links, and page visibility** all live in
  `config.js`. Set a page's `enabled` to `false` to hide it from the
  nav without deleting the page itself.
- **Page content** (bio, research write-ups, photo captions, etc.) is
  edited directly in each page's HTML under `pages/`.
- **Photos**: add a file to `assets/images/site/`, then reference it
  from the relevant page.

## Making style changes

`assets/css/main.css` is compiled from `assets/sass/main.scss` — don't
hand-edit `main.css` directly for anything beyond a quick one-off, or
it'll be overwritten the next time the Sass is rebuilt. To recompile
after changing a `.scss` file:

```
npx sass assets/sass/main.scss assets/css/main.css --no-source-map --style=compressed
```

## Running locally

No build step needed to view the site — just serve the folder:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Privacy notes

A few deliberate choices to keep personal info off basic scrapers:

- The contact email is base64-encoded in `config.js` and only
  decoded/rendered client-side (`getEmail()` in `assets/js/site-nav.js`),
  so it never sits as plain text in a file a scraper can read directly.
- Every photo has had its EXIF/GPS metadata stripped before being
  added to the site.
- Every page sets `<meta name="robots" content="noimageindex">`, and
  `robots.txt` blocks image-search bots from `/assets/images/`, to
  keep photos out of Google/Bing image search.

None of this is bulletproof against a scraper sophisticated enough to
run a full browser — it's meant to stop the common case (plain
regex/text scraping), not guarantee privacy against a determined actor.

## Rights

© Stella Venn. All photographs and written content on this site are
copyrighted and may not be reproduced or reused without permission.

This does **not** apply to the underlying template code, which remains
under its original license — see Credits below.

## Credits

- **Design**: [Editorial](https://html5up.net/editorial) by
  [HTML5 UP](https://html5up.net) (`@ajlkn`), used under the
  [CCA 3.0 license](https://html5up.net/license) — see `LICENSE.txt`.
- **Icons**: [Font Awesome](https://fontawesome.com)
- **Other**: [jQuery](https://jquery.com)
- **Analytics**: [GoatCounter](https://www.goatcounter.com)
- **Bird easter egg**: [Pocket Bird](https://github.com/IdreesInc/Pocket-Bird)
  by IdreesInc (MPL-2.0)
