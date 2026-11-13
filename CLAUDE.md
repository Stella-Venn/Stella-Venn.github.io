# Project rules

## Email addresses are never plain text

No email address may appear as plain text anywhere in the site's source
(HTML, JS, config). Every address is base64-encoded and only decoded in the
browser by `assets/js/site-nav.js`.

- Site owner's address: stored as `emailEncoded` in `config.js`. In page
  markup use `<a href="#" data-email-reveal>Show email</a>`.
- Anyone else (e.g. students): encode with
  `echo -n 'name@wustl.edu' | base64` and use
  `<a href="#" data-email-reveal="ENCODED">Show email</a>`.
- Links are click-to-reveal: the address is shown only after the visitor
  clicks. Never write `mailto:name@...` or the bare address in a file.

Before committing, check with:
`grep -rnE "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}" --exclude-dir=.git --exclude-dir=_old-site .`
(the only allowed hits are the template's `information@untitled.tld`
placeholders in `elements.html` and `generic.html`).
