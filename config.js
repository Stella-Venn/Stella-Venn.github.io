/* =============================================================================
   config.js — Master Configuration File
   Personal Website of Stella Venn (Editorial template version)

   Mirrors the config.js from the original site. Update site info and
   page visibility here — js/site-nav.js reads this to build the sidebar
   menu on every page.
============================================================================= */

const siteConfig = {

  siteInfo: {
    name:        "Stella Venn",
    title:       "PhD Student",
    institution: "Washington University in St. Louis",
    department:  "Ecology and Evolutionary Biology",
    // Base64-encoded so the address doesn't sit as plain text in a file
    // scrapers can read directly — decoded at runtime via getEmail()
    // in assets/js/site-nav.js. Not real security, just keeps it off
    // simple regex/text scrapers that don't execute JavaScript.
    emailEncoded: "Uy5WZW5uQHd1c3RsLmVkdQ==",
    orcid:       "0009-0009-3443-4919",
    github:      "https://github.com/investigatorwho",
    bluesky:     "https://bsky.app/profile/formallyfuctional.bsky.social",
    linkedin:    "https://www.linkedin.com/in/stella-v-0333621b1/",
    cvFile:      "assets/pdfs/cv.pdf",
  },

  // Set enabled: true to show a page in the sidebar menu. The page file
  // still exists either way — this only controls navigation visibility,
  // same as on the original site.
  pages: {
    home:         { enabled: true,  label: "Home",         file: "index.html" },
    about:        { enabled: false, label: "About",        file: "about.html" },
    research:     { enabled: true,  label: "Research",     file: "research.html" },
    publications: { enabled: false, label: "Publications", file: "publications.html" },
    teaching:     { enabled: false, label: "Teaching", children: {
                      students: { enabled: true, label: "Students", file: "teaching-students.html" },
                      classes:  { enabled: true, label: "Classes",  file: "teaching-classes.html" },
                    } },
    news:         { enabled: false, label: "News",         file: "news.html" },
    media:        { enabled: false, label: "Media",        file: "media.html" },
    photos:       { enabled: true,  label: "Photos",       file: "photos.html" },
    cv:           { enabled: true,  label: "CV",           file: "cv.html" },
    contact:      { enabled: true,  label: "Contact",      file: "contact.html" },
  },

};
