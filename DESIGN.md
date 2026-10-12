# silveltman.nl design

How silveltman.nl looks and reads. Follow it for every page, section, component or copy change. The brand is Fulldev's: this site follows the shared system in [fulldotdev/fulldev `packages/web/DESIGN.md`](https://github.com/fulldotdev/fulldev/blob/main/packages/web/DESIGN.md) and differs only where this file says so.

## Reader and copy

- The site is Sil's own: who he is, what he builds, for whom, and how to reach him. Readers are companies and agencies looking for a developer, and people who know him from LinkedIn or full.dev. Every page answers: who is Sil, what does he do, can I trust him, how do I reach him.
- The main action is "Contact opnemen" to `/contact/`. The closing on every page offers a 30 minute call (full.dev/meeting), mail and WhatsApp.
- Dutch only, in Sil's words (`~/.agents/global/references/sil-writing-style.md`): "ik" for what Sil does, "we" only for Fulldev's team. Titles end without a full stop. No em dashes.
- Claims come from a source: full.dev (projects, reviews, figures), LinkedIn (career, posts) and GitHub. The figures (10+ years, 75+ clients, 100+ projects) and the 49 reviews are full.dev's; update them together.
- Posts are Sil's LinkedIn posts, word for word, each with its date and a link to the original. Only the title, the description and the removal of hashtags are ours. Leave out posts whose call to action has expired, such as an open workplace or a free scan.

## Brand

- Stone page `#f8f7f4`, white cards, blue `#1442e9` as the one accent on light; the end of every page is one dark panel `#0c0b09` with orange `#d34110`. Geist, titles at 550 with `tracking-tight`, squircle role radii, buttons and link cards as lifted faces on the warm block shadow, and the 3D block as the one motif.
- `src/styles/fulldev-tokens.css` is a copy of full.dev's `packages/web/src/styles/tokens.css`, and `block-3d.astro`, `block-scene.astro` and `block-icon.astro` are copies of its components, taken at fulldotdev/fulldev `092012a3`. Change them by copying a newer version, not here. `src/styles/global.css` maps the tokens and holds the part of full.dev's Fulldev UI overrides this site uses; keep its rules in line with full.dev's when they change there.
- Where it differs from full.dev: the logo is Sil's studio portrait in the avatar shape, not the Fulldev mark. There are no mega menus, search, language switch, glossary or copy toast. The closing has buttons instead of the scan form, and the footer's contact column has plain links.

## Pages

- Home: the hero with the title, lead, two actions and five review faces left and the studio portrait right; the client logo row; "Wat ik doe" as three link cards with a block icon (Fulldev, the apps, Fulldev UI); the first four companies with a screenshot; the figures on one card; the three newest posts; six Shorts that open on YouTube; the reviews in columns.
- Over mij: the story in the Markdown body beside a sticky photo, the timeline, and three values with a block icon.
- Werk: every client with a screenshot as a project card, the agencies as link cards with their logo, then the other clients as a two-column list. Each links to its project page on full.dev.
- Posts: cards with date and channel, newest first; a post page shows the date, title, Sil as author, the text and a button to the original.
- Contact: four link cards (a call, mail, phone and WhatsApp), then the Markdown body.
- Legal pages and 404 use the `page` layout: a title and prose.

## Components

- Companies live in `src/content/companies`, one file each, with full.dev's text, logo and screenshot; `order` sets the order. Clients come from full.dev's projects, agencies from its agencies page.
- Sections stack on stone and follow full.dev's section rules: a centred `section-head` with `SectionTitle` and `SectionDescription`, content with `mt-16`, `pt-0!` when a section continues the one above.
- Client logos are one colour (`brightness-0`) at 70% opacity. Project screenshots sit on the project's own `tint`.
- Photos are real: the studio portrait from full.dev's team row, the photo on `/over-mij/`, and the reviewers' faces from full.dev. A review without a usable photo shows initials. No stock.
- Video thumbnails are YouTube's portrait Shorts frames, saved in `src/assets/videos`; the site embeds no player.

## Library gaps

- Simple Icons and Lucide have no LinkedIn logo, so `site-footer.astro` draws it inline.
- The registry footer block has no contact column or social buttons, so `site-footer.astro` is the site's own, after full.dev's footer.
