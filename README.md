# yasuhiro-otani-website

Yasuhiro Otani's site (static, GitHub Pages). Most of the site is in English; the Lessons pages (`lessons/index.html`, `lessons/mv-song-template.html`) are in Japanese, since lessons and their teaching material are for Japanese-speaking students, and the composition template repositories linked from the Lessons page are Japanese-language material too. The full-screen nav labels stay in English on every page, including the Japanese ones.

Sherman Filterbank 2 is specific to the *Thresholds of Presence* project, not a general instrument/identity — mentions of it stay scoped to that project rather than appearing as a site-wide badge. The broader practice is guitar + computer (Max/MSP).

## Design direction

Bold editorial typography, high-contrast black/white sections, and a minimal corner `MENU` trigger that opens a full-screen nav. Music-related pages use a WebGL (Three.js) mouse-reactive wireframe object; the homepage keeps it quiet and monochrome. The palette is restrained — warm neutral tones only, no neon, no gradients.

This site now lives at `yasuhiro-otani.com`, replacing the old WordPress site that was on the Lolipop rental server. See "Domain" below.

## Structure

- `index.html` — homepage (WebGL background + links into each section)
- `profile.html` — profile (bio, activity, gear; real portrait photo)
- `artistic.html` — artistic activity (awards, discography with Bandcamp/Apple Music links, selected performances, dance collaborations)
- `projects/utsuro-bune.html` — project page for *Utsuro Bune* (空舟), a 2019 guitar/dance collaboration with Masayuki Sumi (Vimeo embed, choreography excerpt in Japanese)
- `projects/lost-body.html` — project page for *Lost Body*, a dance collaboration with Masayuki Sumi supported by the Agency for Cultural Affairs (Vimeo embed, artist statement in Japanese)
- `projects/vamp.html` — project page for *VAMP*, music by Yasuhiro Otani for an 8mm experimental film by Tatsu Aoki (Vimeo embed)
- `lessons/index.html` — composition lessons, in Japanese (guitar/DTM courses, repositories used in class)
- `lessons/mv-song-template.html` — teaching material page, in Japanese (built from [pb5/mv_song_templete](https://github.com/pb5/mv_song_templete), "ワンループ×レイヤー構成 MV系楽曲テンプレ"); presented as one worked example among the template series, not the flagship — simpler templates like Lo-fi are noted as an easier starting point
- `contact.html` — contact form (submits via Formspree)
- `privacy-policy.html` — privacy policy (contact form data handling via Formspree; no cookies/analytics)
- footer — on every page: Facebook / Bandcamp / Apple Music / YouTube
- `about/`, `utsuro-bune/`, `audio-visual/`, `privacy-policy/`, `ホームページ/sumishworld/`, `お問い合わせ/` — redirect stubs (meta refresh + canonical link) for old WordPress URLs that Google had indexed, forwarding to the equivalent new page
- `css/style.css` — shared design system (Noto Sans JP + DM Mono, dark/light sections)
- `js/main.js` — full-screen nav toggle, glitch-text initialization
- `js/blob-bg.js` — Three.js mouse-reactive wireframe background (color/speed/glitch configurable per page)
- `js/vendor/` — Three.js bundled locally (no CDN dependency)
- `images/` — real photos (portrait, performance)

## Domain

Live at `yasuhiro-otani.com` (migrated from the old Lolipop-hosted WordPress site; `CNAME` is set accordingly). DNS is on ムームーDNS, pointed at GitHub Pages: four apex `A` records to `185.199.108.153` / `.109.153` / `.110.153` / `.111.153`, plus `www` as a `CNAME` to `pb5.github.io`. No email is hosted on this domain.

Old WordPress URLs that Google had indexed (`/about`, `/utsuro-bune`, `/audio-visual`, `/privacy-policy`, `/ホームページ/sumishworld`, `/お問い合わせ`) have redirect stubs in this repo forwarding to their new equivalent page, so existing search/social links don't just 404.

## Publishing (GitHub Pages)

In the repo's Settings → Pages, set Source to "Deploy from a branch" and pick the branch you want to publish, with `/` (root) as the folder.

## Outstanding items

None currently. `lessons/index.html` positions lessons as application-based, for committed students (including university entrance preparation); fees and format are handled by individual consultation rather than a published price list. The `contact.html` Formspree endpoint (`xlgyyjqr`) is live.
