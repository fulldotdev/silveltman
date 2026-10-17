# Sil Veltman

The personal website of Sil Veltman at [silveltman.nl](https://silveltman.nl): a one-page Astro site on the Fulldev astro-template in the Fulldev brand. `DESIGN.md` holds the design rules and `AGENTS.md` the structure and workflow.

## Commands

```sh
vp run dev                # local server
vp run check:source       # format, types, ESLint, knip, photos, translations
vp run build              # build
vp run check:build        # translation links, HTML validation and link check of the build
vp run a11y               # build and scan every page with axe
BASE_URL=<url> vp run test:browser  # Playwright smoke, see tests/browser/README.md
vp run images             # convert new photos in src to the WebP standard
vp run ui:add @fulldev/<component>
```

## Content

- The page is `src/content/pages/index.md`: the hero and the list of videos. Add a Short with its title, link and frame in `src/assets/videos`.
- The contact page is `src/content/pages/contact.md`: the contact buttons and the Cal.com booking link.
- Name, the header button and the footer are in `src/content/globals/nl.yaml`.

Netlify builds `main` to silveltman.nl and every PR to a Deploy Preview.
