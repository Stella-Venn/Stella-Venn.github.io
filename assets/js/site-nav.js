/* =============================================================================
   site-nav.js — Header + Sidebar Renderer (Editorial template)
   Personal Website of Stella Venn

   Injects the header and sidebar (menu, contact, footer) into every page
   from siteConfig, the same way the original site's nav.js worked.
   Include config.js before this file.

   NOTE ON TIMING: main.js (the template's own script) reads and
   modifies #sidebar and #menu the instant it runs — appending the
   mobile hamburger toggle button and binding the submenu "opener"
   click handlers — with no DOMContentLoaded wrapper of its own. So
   this script must run and finish *before* main.js executes, or two
   things break: main.js appends the toggle button to an empty
   sidebar, which this script's `innerHTML =` then wipes out, leaving
   mobile visitors with no way to open the nav at all; and the opener
   click handler binds to a menu that doesn't have its <ul> children
   yet, so the Teaching submenu never expands.

   That's why this file is loaded as a plain (non-deferred) script at
   the bottom of <body>, positioned *before* main.js's <script> tag —
   not in <head> with `defer`, and not deferred to DOMContentLoaded.
   Keep it there if you ever reorder the scripts.
============================================================================= */

function inPagesDir() {
  return window.location.pathname.includes('/pages/');
}

// Decodes the email address from config.js at runtime, so the plain
// address never sits as text in a file a scraper can read directly.
function getEmail() {
  return atob(siteConfig.siteInfo.emailEncoded);
}

// Fills in any static HTML that needs the email address (e.g. a
// hardcoded link in a page's own markup) without putting the plain
// address in that page's source. Add `data-email-link` to an <a> to
// have its href/text filled in, or `data-email-text` to a plain
// element to have just its text filled in.
function renderEmailPlaceholders() {
  const email = getEmail();

  document.querySelectorAll('[data-email-link]').forEach(el => {
    el.href = `mailto:${email}`;
    el.textContent = email;
  });

  document.querySelectorAll('[data-email-text]').forEach(el => {
    el.textContent = email;
  });
}

function pageHref(file) {
  return inPagesDir() ? file : `pages/${file}`;
}

function homeHref() {
  return inPagesDir() ? '../index.html' : 'index.html';
}

function isActiveFile(file) {
  return window.location.pathname.endsWith(`/${file}`);
}

function isActiveHome() {
  const path = window.location.pathname;
  return path.endsWith('/index.html') || (path.endsWith('/') && !inPagesDir());
}

function renderHeader() {
  // #header itself carries the CSS (flex layout, border) — the element
  // must already exist with this ID in the page HTML; we only fill it in.
  const el = document.getElementById('header');
  if (!el) return;

  const info = siteConfig.siteInfo;

  el.innerHTML = `
    <a href="${homeHref()}" class="logo"><strong>${info.name}</strong> ${info.title}</a>
    <ul class="icons">
      <li><a href="${info.github}" target="_blank" rel="noopener noreferrer" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
      <li><a href="${info.linkedin}" target="_blank" rel="noopener noreferrer" class="icon brands fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
      <li><a href="${info.bluesky}" target="_blank" rel="noopener noreferrer" class="icon solid fa-cloud"><span class="label">Bluesky</span></a></li>
      <li><a href="mailto:${getEmail()}" class="icon solid fa-envelope"><span class="label">Email</span></a></li>
    </ul>`;
}

// Renders one top-level menu item. Plain pages become a single <li><a>.
// Pages with `children` become an <li> with an "opener" span that
// expands a nested <ul> of child links (Editorial's submenu pattern).
function renderMenuItem(key, page) {
  if (page.children) {
    const childEntries = Object.values(page.children).filter(c => c.enabled);
    const childHasActive = childEntries.some(c => isActiveFile(c.file));
    const childLinks = childEntries
      .map(c => `<li><a href="${pageHref(c.file)}"${isActiveFile(c.file) ? ' class="active"' : ''}>${c.label}</a></li>`)
      .join('\n');
    return `
      <li>
        <span class="opener${childHasActive ? ' active' : ''}">${page.label}</span>
        <ul${childHasActive ? ' style="display: block;"' : ''}>
          ${childLinks}
        </ul>
      </li>`;
  }

  if (key === 'home') {
    return `<li><a href="${homeHref()}"${isActiveHome() ? ' class="active"' : ''}>${page.label}</a></li>`;
  }

  return `<li><a href="${pageHref(page.file)}"${isActiveFile(page.file) ? ' class="active"' : ''}>${page.label}</a></li>`;
}

function renderSidebar() {
  // #sidebar itself carries the CSS (fixed width, mobile slide-out) — the
  // element must already exist with this ID in the page HTML.
  const el = document.getElementById('sidebar');
  if (!el) return;

  const info = siteConfig.siteInfo;

  const menuItems = Object.entries(siteConfig.pages)
    .filter(([, page]) => page.enabled)
    .map(([key, page]) => renderMenuItem(key, page))
    .join('\n');

  el.innerHTML = `
    <div class="inner">

      <nav id="menu">
        <header class="major">
          <h2>Menu</h2>
        </header>
        <ul>
          ${menuItems}
        </ul>
      </nav>

      <section>
        <header class="major">
          <h2>Get in touch</h2>
        </header>
        <p>${info.department}<br />${info.institution}</p>
        <ul class="contact">
          <li class="icon solid fa-envelope"><a href="mailto:${getEmail()}">${getEmail()}</a></li>
          <li class="icon solid fa-id-badge"><a href="https://orcid.org/${info.orcid}" target="_blank" rel="noopener noreferrer">ORCID: ${info.orcid}</a></li>
          <li class="icon brands fa-github"><a href="${info.github}" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li class="icon brands fa-linkedin-in"><a href="${info.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li class="icon solid fa-cloud"><a href="${info.bluesky}" target="_blank" rel="noopener noreferrer">Bluesky</a></li>
        </ul>
      </section>

      <footer id="footer">
        <ul class="actions" style="margin-bottom: 1em;">
          <li><button type="button" class="button icon solid fa-dove" data-bird-trigger aria-label="Bird"></button></li>
        </ul>
        <p class="copyright">&copy; ${new Date().getFullYear()} ${info.name}. All rights reserved. Photographs and written content may not be reproduced or reused without permission. Design adapted from <a href="https://html5up.net">HTML5 UP</a>.</p>
      </footer>

    </div>`;
}

renderHeader();
renderSidebar();
renderEmailPlaceholders();
