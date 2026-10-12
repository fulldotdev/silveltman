# Sil Veltman

The personal website of Sil Veltman at [silveltman.nl](https://silveltman.nl), an Astro site on the Fulldev astro-template in the Fulldev brand. `DESIGN.md` holds the design rules and `AGENTS.md` the structure and workflow.

## Commands

```sh
pnpm dev      # local server
pnpm check    # format, types, ESLint, knip, photos, translations
pnpm build    # build, HTML validation and link check
pnpm a11y     # build and scan every page with axe
pnpm images   # convert new photos in src to the WebP standard
pnpm ui:add @fulldev/<component>
```

## Content

- Pages are Markdown in `src/content/pages`, with the page type in frontmatter `type`. Posts are in `src/content/pages/posts/`.
- Companies are YAML in `src/content/companies`, one file per company.
- Site name, navigation, the closing and the footer are in `src/content/globals/nl.yaml`.

Netlify builds `main` to silveltman.nl and every PR to a Deploy Preview.
