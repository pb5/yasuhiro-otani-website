# yasuhiro-otani-website

Yasuhiro Otani's site (static, GitHub Pages). Site chrome and most copy is in English; the composition-template teaching page (`lessons/mv-song-template.html`) is in Japanese, as it's real lesson material for Japanese-speaking students, and the composition template repositories linked from the Lessons page are Japanese-language material.

Sherman Filterbank 2 is specific to the *Thresholds of Presence* project, not a general instrument/identity — mentions of it stay scoped to that project rather than appearing as a site-wide badge. The broader practice is guitar + computer (Max/MSP).

## Design direction

Bold editorial typography, high-contrast black/white sections, and a minimal corner `MENU` trigger that opens a full-screen nav. Music-related pages use a WebGL (Three.js) mouse-reactive wireframe object; the homepage keeps it quiet and monochrome. The palette is restrained — warm neutral tones only, no neon, no gradients.

This site and `yasuhiro-otani.com` (hosted separately, on a rental server) intentionally play different roles and cross-link each other: this site is the current profile/lessons/contact presence, while `yasuhiro-otani.com` continues to host its own existing content. See "Domain" below.

## Structure

- `index.html` — homepage (WebGL background + links into each section)
- `profile.html` — profile (bio, activity, gear; real portrait photo)
- `artistic.html` — artistic activity (awards, discography with Bandcamp/Apple Music links, selected performances, dance collaborations)
- `projects/utsuro-bune.html` — project page for *Utsuro Bune* (空舟), a 2019 guitar/dance collaboration with Masayuki Sumi (Vimeo embed, choreography excerpt in Japanese)
- `projects/lost-body.html` — project page for *Lost Body*, a dance collaboration with Masayuki Sumi supported by the Agency for Cultural Affairs (Vimeo embed, artist statement in Japanese)
- `projects/vamp.html` — project page for *VAMP*, music by Yasuhiro Otani for an 8mm experimental film by Tatsu Aoki (Vimeo embed)
- `lessons/index.html` — composition lessons (guitar/DTM courses, repositories used in class)
- `lessons/mv-song-template.html` — teaching material page, in Japanese (built from [pb5/mv_song_templete](https://github.com/pb5/mv_song_templete), "ワンループ×レイヤー構成 MV系楽曲テンプレ"); presented as one worked example among the template series, not the flagship — simpler templates like Lo-fi are noted as an easier starting point
- `contact.html` — contact form (submits via Formspree)
- `privacy-policy.html` — privacy policy (contact form data handling via Formspree; no cookies/analytics)
- footer — on every page: link to the `yasuhiro-otani.com` archive, plus Facebook / Bandcamp / Apple Music / YouTube
- `css/style.css` — shared design system (Noto Sans JP + DM Mono, dark/light sections)
- `js/main.js` — full-screen nav toggle, glitch-text initialization
- `js/blob-bg.js` — Three.js mouse-reactive wireframe background (color/speed/glitch configurable per page)
- `js/vendor/` — Three.js bundled locally (no CDN dependency)
- `images/` — real photos (portrait, performance)

## Domain

There is currently no `CNAME` file in this repo, so GitHub Pages serves only at `https://pb5.github.io/yasuhiro-otani-website/`. `yasuhiro-otani.com`'s DNS still points at the existing rental-server host and is untouched by this repo. If a custom domain is wanted for this site later, re-add a `CNAME` file and point DNS at GitHub Pages — but note that will not affect `yasuhiro-otani.com`, which is a separate, already-configured domain.

## Publishing (GitHub Pages)

In the repo's Settings → Pages, set Source to "Deploy from a branch" and pick the branch you want to publish, with `/` (root) as the folder.

## Outstanding items

None currently. `lessons/index.html` positions lessons as application-based, for committed students (including university entrance preparation); fees and format are handled by individual consultation rather than a published price list. The `contact.html` Formspree endpoint (`xlgyyjqr`) is live.
