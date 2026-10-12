# silveltman.nl design

How silveltman.nl looks and reads. Follow it for every section, component or copy change. The brand is Fulldev's: this site follows the shared system in [fulldotdev/fulldev `packages/web/DESIGN.md`](https://github.com/fulldotdev/fulldev/blob/main/packages/web/DESIGN.md) and differs only where this file says so.

## Reader and copy

- The site is Sil's own, not a company site: who he is, his videos, and how to reach him. Work, clients and services belong on full.dev.
- One page with the videos. The action is "Contact opnemen" to `/contact/`: mail, phone and WhatsApp as buttons, and Sil's Cal.com booking (cal.com/silveltman/meeting) inline. The privacy statement and the 404 are the only other pages.
- Dutch only, in Sil's words (`~/.agents/global/references/sil-writing-style.md`). Titles end without a full stop. No em dashes.
- No projects, client logos, reviews, figures or posts (owner decision, 12 October 2026: too much like a company site).

## Brand

- Stone page `#f8f7f4`, blue `#1442e9` as the one accent on light; the end of the page is one dark panel `#0c0b09` with orange `#d34110`. Geist, titles at 550 with `tracking-tight`, squircle radii, and buttons as lifted faces on the warm block shadow.
- `src/styles/fulldev-tokens.css` is a copy of full.dev's `packages/web/src/styles/tokens.css`, taken at fulldotdev/fulldev `092012a3`. Change it by copying a newer version, not here. `src/styles/global.css` maps the tokens and holds the part of full.dev's Fulldev UI overrides this site uses; keep those rules in line with full.dev's.
- Where it differs from full.dev: the logo is Sil's studio portrait in the avatar shape, not the Fulldev mark. The header has no navigation, only the logo and "Contact opnemen" (not on `/contact/` itself). The dark end is only the footer, centred, without block art (owner decision, 12 October 2026): a title, one line and "Contact opnemen", then the social buttons and the copyright with the privacy link. `/contact/` has no call to action in its footer, only the social buttons and the legal line.

## The page

- Hero: centred title, lead and two actions (contact, the videos), with the studio portrait below it at 20rem wide, 4:5.
- Videos: every Short, newest first, as 9:16 frames with a play button and the title below; four per row from `lg`, three from `sm`, two on phones, with a centred last row. A click swaps the frame for YouTube's player.
- Footer: the dark end, centred, as above.
- `/contact/`: a centred head, the contact buttons, then the Cal.com booking inline (`cal-embed.astro`, as on full.dev's contact page), at most 896px wide, without a box or a heading of its own: Cal.com shows the meeting itself. The frame never shows a scrollbar: Cal.com overflows sideways at 1024 to 1039px, so the frame stays narrower, and it stays transparent until Cal.com has measured the booking. A direct link to the calendar shows only while the embed has not loaded, so it stays when Cal.com's script is blocked.
- Photos are real: the studio portrait from full.dev's team row and the Shorts' own frames, saved in `src/assets/videos`. No stock.

## Library gaps

- The registry `Video` embeds YouTube's player at load. Fourteen players would load YouTube on every visit, so `video-tile.astro` shows the frame and loads the player on click, from youtube-nocookie.com.
- Simple Icons and Lucide have no LinkedIn logo, so `site-footer.astro` draws it inline.
- The registry header and footer blocks have navigation and page columns this site does not need, so `site-header.astro` and `site-footer.astro` are the site's own.
