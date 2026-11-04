"""Collect running text for Thresholds v29.
Takes sentences as they are from IRCAM's sites, Wikipedia and public posts on Mastodon / Bluesky.
No selection by content: only length and plain-text cleanup (links, mentions, tags removed).
Writes thresholds/v29/pool.json and thresholds/v29/probe.json."""
import json, re, time, random, urllib.parse, datetime
import requests
from bs4 import BeautifulSoup

UA = {"User-Agent": "thresholds-text-collector (yasuhiro-otani.com)"}
probe, pool = {}, []

def get(url, **kw):
    try:
        r = requests.get(url, headers={**UA, "Origin": "https://yasuhiro-otani.com"}, timeout=20, **kw)
        probe[url] = {"status": r.status_code, "cors": r.headers.get("access-control-allow-origin")}
        return r if r.ok else None
    except Exception as e:
        probe[url] = {"error": str(e)[:200]}
        return None

def clean(s):
    s = re.sub(r"https?://\s?\S+", "", s)
    s = re.sub(r"(?<!\w)[@#]\s?[\w.\-]+", "", s)
    s = re.sub(r"\s+", " ", s).strip(" -–—|·•")
    return s

def sentences(text):
    for s in re.split(r"(?<=[.!?。！？])\s+|\n+", text):
        s = clean(s)
        if 25 <= len(s) <= 180 and re.search(r"[A-Za-zÀ-ÿぁ-んァ-ン一-龥]{3}", s):
            yield s

def add(text, src):
    for s in sentences(text):
        pool.append({"t": s, "s": src})

# --- IRCAM sites: seed pages + one level of same-site links
seeds = ["https://www.ircam.fr/", "https://www.ircam.fr/recherche", "https://www.ircam.fr/creation",
         "https://www.ircam.fr/transmission", "https://forum.ircam.fr/", "https://forum.ircam.fr/article/",
         "https://forum.ircam.fr/projects/", "https://forum.ircam.fr/collections/"]
seen, queue = set(), list(seeds)
links = []
for u in seeds:
    r = get(u)
    if not r: continue
    seen.add(u)
    soup = BeautifulSoup(r.text, "html.parser")
    for p in soup.find_all(["p", "h1", "h2", "h3", "li", "blockquote"]):
        add(p.get_text(" "), "ircam")
    host = urllib.parse.urlparse(u).netloc
    for a in soup.find_all("a", href=True):
        h = urllib.parse.urljoin(u, a["href"]).split("#")[0]
        if urllib.parse.urlparse(h).netloc == host and h not in seen and not re.search(r"\.(jpg|png|pdf|zip|mp3|mp4)$|login|account|/en/$", h):
            links.append(h)
random.shuffle(links)
for u in list(dict.fromkeys(links))[:70]:
    time.sleep(0.6)
    r = get(u)
    if not r or "html" not in r.headers.get("content-type", ""): continue
    soup = BeautifulSoup(r.text, "html.parser")
    for p in soup.find_all(["p", "blockquote"]):
        add(p.get_text(" "), "ircam")

# --- Wikipedia: articles around music, sound and listening
topics = ["electroacoustic music", "acousmatic music", "sound art", "spectral music", "musique concrète", "deep listening",
          "computer music", "noise music", "experimental music", "contemporary classical music", "listening", "improvisation",
          "audio feedback", "drone music", "algorithmic composition", "music and artificial intelligence", "silence"]
for q in topics:
    time.sleep(1.5)
    r = get("https://en.wikipedia.org/w/api.php", params={"action": "query", "generator": "search", "gsrsearch": q, "gsrlimit": 5,
             "prop": "extracts", "explaintext": 1, "exintro": 1, "format": "json", "origin": "*"})
    if not r: continue
    for pg in (r.json().get("query", {}).get("pages", {}) or {}).values():
        add(pg.get("extract", ""), "wikipedia")

# --- public posts (also tells the page whether it can read them live)
tags = ["soundart", "electroacoustic", "experimentalmusic", "composer", "newmusic", "contemporarymusic", "fieldrecording",
        "sounddesign", "deeplistening", "modularsynth", "noisemusic", "musiccomposition"]
for inst in ["mastodon.social", "sonomu.club"]:
    for t in tags:
        r = get(f"https://{inst}/api/v1/timelines/tag/{t}", params={"limit": 40})
        if not r: continue
        for st in r.json():
            add(BeautifulSoup(st.get("content", ""), "html.parser").get_text(" "), "mastodon")
for t in tags[:6]:
    r = get("https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts", params={"q": t, "limit": 50})
    if not r: continue
    for p in r.json().get("posts", []):
        add(p.get("record", {}).get("text", ""), "bluesky")

# dedupe, keep order random
uniq = list({p["t"]: p for p in pool}.values())
random.shuffle(uniq)
now = datetime.datetime.utcnow().isoformat(timespec="seconds") + "Z"
counts = {}
for p in uniq: counts[p["s"]] = counts.get(p["s"], 0) + 1
json.dump({"updated": now, "counts": counts, "sentences": uniq[:6000]}, open("thresholds/v29/pool.json", "w"), ensure_ascii=False)
json.dump({"updated": now, "counts": counts, "probe": probe}, open("thresholds/v29/probe.json", "w"), ensure_ascii=False, indent=1)
print(counts)
