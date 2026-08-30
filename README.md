# Kuson Wanaratmongkol — Portfolio

**Kuson Wanaratmongkol (กุศล วนารัตน์มงคล)**

Personal portfolio website for **Kuson Wanaratmongkol** (IM major, high school), a creative technologist working at the intersection of design, code, and interactive media. The site documents his web development, UI/UX, and Unity/C# VR work, alongside awards, activities, and internship experience — built as a single, cohesive digital resume for university admissions, freelance work, and personal branding.

- **Live site:** https://kusonportfolio.netlify.app/
- **Repo:** https://github.com/PEPOLOOP2009/Kuson-Web

## Purpose

The project exists to give a single, always-current answer to "what has Kuson built and achieved?" — replacing a static resume with an interactive site that a recruiter, admissions officer, or client can browse in a few minutes, in either English or Thai.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | [index.html](index.html) | Landing page — introduction, skill pillars, and a rotating highlight of recent recognitions. |
| Awards & Activities | [awards.html](awards.html) | Filterable timeline of competitions, leadership roles, and school activities, plus a certificate library (PDF viewer). |
| Intern | [intern.html](intern.html) | Internship and work-experience timeline, including related school events. |
| Projects | [projects.html](projects.html) | Case-study index of web, VR, and client projects with a detail modal per project. |
| Contact | [contact.html](contact.html) | Contact channels (email, GitHub, Instagram) with copy-to-clipboard and a live Bangkok clock/availability indicator. |

## Tech Stack

- **Static HTML** — one file per page, no build step or framework.
- **Tailwind CSS** (via CDN) for layout/utility styling, combined with hand-written CSS in [STYLE.css](STYLE.css) for shared theming (dark UI, glow effects, cards, modals).
- **Vanilla JavaScript** — [main.js](main.js) holds behavior shared across every page: the EN/TH language toggle, mobile nav, scroll-reveal animations, the Bangkok clock/status dot, and page-transition fades. Each page adds its own inline script for page-specific logic (typing effect, counters, modals, filters).
- **Bilingual (EN/TH)** — every page defines a `window.I18N_PAGE` dictionary; `main.js` swaps `data-i18n` element text on toggle and persists the choice in `sessionStorage`.

## Content Notes

- Award and certificate PDFs live in [`awards PDF/`](awards%20PDF); images referenced by the pages live in `images/` (add real photos there as they become available — cards degrade gracefully by hiding the image frame entirely via `onerror` if an image is missing, falling back to a text link when the card has one).
- The `AI NEW/` directory is a separate, standalone experiment and is not part of the main portfolio site.

## SEO

- Every page ships a unique, standardized `<title>`, meta description (in both English and Thai — Kuson's Thai name กุศล วนารัตน์มงคล is included so the site is discoverable under either name), `author`, `robots`, `theme-color`, canonical link, and full Open Graph/Twitter Card tags (including a shared 1200×630 share image at `images/og-cover.jpg`).
- Structured data (JSON-LD): `WebSite` + `Person` on the homepage, `CollectionPage` + `BreadcrumbList` on Awards/Intern/Projects, and `ContactPage` + `BreadcrumbList` on Contact — all cross-referenced via `@id`.
- [`sitemap.xml`](sitemap.xml) lists all five pages with the image sitemap extension; [`robots.txt`](robots.txt) allows full crawling and points crawlers at it.
- [`llms.txt`](llms.txt) gives AI/LLM crawlers a structured summary of the site and its pages, per the [llmstxt.org](https://llmstxt.org) convention.

## Running Locally

No build step is required — open any `.html` file directly in a browser, or serve the folder with any static file server, e.g.:

```bash
npx serve .
```
