# Astro site

Sil Veltman's personal one-page site, a static, content-driven Astro site built on the Fulldev Astro template. `DESIGN.md` holds the design rules; follow it for any section, component or copy change.

## Commands

- Ready PRs run `vp run check:source` through the repository's shared-workflow caller. `vp run check:build` validates the translation links, HTML and internal links of the build; Netlify runs it after `build`, so a failure fails the deploy. Run `vp run fix:source` before you commit.
- `BASE_URL=<url> vp run test:browser` runs the Playwright browser smoke; see `tests/browser/README.md` for targets and devices. New browser tests use it, and `pnpm a11y` keeps its axe scan.
- `pnpm images` converts source photos in `src` to the standard below and updates their references. Run it after adding photos or pulling CMS uploads.

## Layout

- `src/content/pages/<path>.md` renders at `/<path>/`; `index.md` is the homepage and `<folder>/index.md` the folder's page.
- Languages: the default locale (`nl`) lives at the root, other locales in `src/content/pages/<locale>/` under `/<locale>/`. Each language has its own pages with freely translated slugs. Pages with the same `translationKey` are translations of each other: when both are indexed, they get `hreflang` links and the language switch goes to them, otherwise to the home of that language.
- `src/content/globals/<locale>.yaml`: site name, labels, contact details, header and footer per language.
- `src/schemas/page.ts` is the union of page types, chosen by frontmatter `type`; each type has a schema in `src/schemas/layouts/<type>.ts` and a layout in `src/layouts/<type>.astro`, which maps content to block props. `base.astro` is the shared shell.
- `src/components/ui` and `src/components/blocks`: unchanged [Fulldev UI](https://ui.full.dev) copies. Other files in `src/components` are site components.

## Rules

- Anything the editor marks as an error or warning must also fail `vp run check:source`. When it does not, add a check step instead of only fixing the instance.
- Content owns copy and semantic values; frontmatter never holds classes, HTML or component details.
- A new page type: add its schema to `src/schemas/layouts/` and `src/schemas/page.ts`, create its layout, and use `type: <type>` in content. `src/pages/[...page].astro` stays generic; do not branch in it.
- Use an existing Fulldev UI component or block before writing one. Install with `pnpm ui:add @fulldev/<name>`, which also formats the project. Import a component through its index. Do not edit installed copies: fix the library in `fulldotdev/ui`, release, and reinstall.
- Add a language: add it to `i18n.locales` in `astro.config.ts`, add `src/content/globals/<locale>.yaml` with its `languageName` and `src/content/pages/<locale>/`, and in `netlify.toml` add a 404 rule, a homepage `Language` rule and the language to the `Netlify-Vary` header of `/`. Remove one the same way. A site with one language keeps only the default locale and has no language switch, cookie or redirect.
- Translations: the page in the default locale is the source. Give it and each translation the same `translationKey`; every locale then needs that page. A translation sets `translatedFrom` to the fingerprint `vp run check:source` reports. When the source changes, the check names the translations to update and their new value. Links in a translation go to pages in its own language.
- The functional `nf_lang` cookie keeps a chosen language. Mention it in the privacy statement.
- Never add a site-wide `noindex`, as an `X-Robots-Tag` header or a robots meta tag. Netlify already noindexes Deploy Previews and branch deploys, and a site-wide one also reaches production and takes it out of Google. Use `seo.noindex` for a single page; it also keeps the page out of the sitemap, `llms.txt` and the Markdown versions.
- Source photos are WebP, quality 90, at most 3840 pixels on the longest edge, in their original orientation and never upscaled; Astro makes the delivery sizes, and no component asks for a wider image. `scripts/images.ts` reads the real format, not the extension. PNG, SVG and GIF files are graphics and keep their format; run `pnpm images <file>` for a photo saved as `.png`.
- `scripts/images.ts --check` fails only on what a developer adds: JPEG content in a `.jpg` or `.jpeg` file, and photos over 3840 pixels. It only warns on other mismatches, such as a PNG saved as `.webp`: when the browser cannot encode WebP, as on an iPhone, CloudCannon saves the upload as PNG under the `.webp` name. With the options below, an upload through an image input or rich text editor never fails a publish PR. A JPEG uploaded through CloudCannon's file browser is not converted and does fail the next check; run `pnpm images` then, and whenever the check warns.
- CloudCannon sites convert uploads in the browser. Give every image input, and every rich text input or `_editables` entry that allows images, these options in `cloudcannon.config.yml`, so photo uploads fit within 3840 pixels and are saved as WebP:

  ```yaml
  _inputs:
    image:
      type: image
      options:
        mime_type: image/webp
        width: 3840
        height: 3840
        resize_style: contain
        expandable: false
  ```

- Logos and icons are SVG where possible. A logo or icon input that accepts raster files uses the same options with `width: 800` and `height: 800`, twice the largest size a logo is shown at.
- Give each Netlify form a unique `name`.
- Fonts: configure them in `astro.config.ts` with a `cssVariable` (`--font-sans`, `--font-heading` or `--font-mono`) and load each with `<Font>` in the head of `src/layouts/base.astro`. Fulldev UI loads no fonts itself.
- Page-specific structured data goes in the layout, through the `head` slot of `base.astro`.
