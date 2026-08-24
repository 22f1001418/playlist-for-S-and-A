# 40 — For All Your Moonlit & Sunlit Days

A two-sided mixtape as a website. Side **A** is *Honey & Daylight* and the whole page is a
summer afternoon; Side **B** is *Lavender & Moonlight* and the sky turns over into night —
stars, a moon, lit windows in the town, a shooting star every so often.

There's a cassette whose reels actually wind as the track plays, a handwritten tracklist
you can click, a persona card for the person it's for, an envelope that opens, and a
player bar pinned to the bottom.

---

## Run it

```bash
npm start          # → http://localhost:3000
PORT=4173 npm start
```

No build step, no dependencies. It's HTML, CSS and one JS file.

## Add the songs

Drop the audio into `audio/`, named exactly as the `file:` fields in `js/tracks.js`:

```
a1-butterfly.mp3   a2-danger.mp3   a3-dynamite.mp3   a4-euphoria.mp3   a5-ghost.mp3
b1-salaam-aaya.mp3 b2-jab-julo-bareli.mp3            b3-blue.mp3       b4-comethru.mp3
```

**A missing file isn't a broken page.** The player drops into *silent reel* mode: it runs
the track on its printed duration, so the reels spin, the bar moves and it advances to the
next song — you just don't hear it. Every track also has a small `↗` that searches for it
online, so the tape is usable with zero audio files.

## Make it yours

Everything personal lives in **`js/tracks.js`** — nothing else needs touching:

| field | what it is |
|---|---|
| `sides` | the two side names |
| `persona` | her name/archetype, the intro paragraph, the list of traits |
| `letter` | the text inside the envelope, and the sign-off |
| `tracks` | title, artist, duration, filename, the margin note, and `hue` (the colour of the player artwork) |

The margin `note` on each track is the little handwritten line that appears when you hover it.

## Keyboard

`space` play/pause · `shift + ←/→` previous/next · `a` / `b` flip the tape

## Deploy

**Render — Static Site** (simplest): connect the repo, leave the build command empty,
set *Publish directory* to `.`

**Render — Web Service**: Build `npm install`, Start `npm start`. `server.js` binds
`process.env.PORT` and serves byte ranges, so audio seeking works.

**Vercel / Netlify / GitHub Pages**: it's a static folder — point them at the repo root.

> `.gitignore` excludes `audio/*.mp3` so you don't commit the songs. Remove those lines
> if you want the tape to deploy with its music.

---

Nine songs belong to their artists. This tape doesn't.
