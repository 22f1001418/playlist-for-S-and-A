/* ═══════════════════════════════════════════════════════════════
   EDIT THIS FILE — everything personal lives here.
   Nothing else needs touching to make the tape yours.
   ═══════════════════════════════════════════════════════════════ */

const TAPE = {
  number: "40",
  title: "For All Your Moonlit & Sunlit Days",

  sides: {
    a: { letter: "A", name: "Honey & Daylight",      mood: "the version of her that's awake" },
    b: { letter: "B", name: "Lavender & Moonlight",  mood: "the version that says goodnight and then doesn't sleep" }
  },

  /* ── who it's for ───────────────────────────────────────────── */
  persona: {
    name: "The girl made of two weathers",
    lede: `Daylight-loud and midnight-quiet, sometimes in the same hour. She'll send a BTS choreo at
           4 p.m. like it's breaking news, then go completely soft at 1 a.m. and put on something in a
           language you have to translate. Both are her. That's the whole reason this tape has two sides.`,
    traits: [
      "Laughs at her own joke a half-second before the punchline lands.",
      "Owns exactly one hoodie that she has decided is <em>the</em> hoodie.",
      "Plays a song forty times and calls it 'a phase'.",
      "Types a long message, deletes it, sends 'nothing lol'.",
      "Somehow knows every word of a Hindi song she claims she's never heard.",
      "Is nicer to strangers than she is to herself. Working on it."
    ]
  },

  /* ── the unsent bit ─────────────────────────────────────────── */
  letter: {
    text: `I've had forty chances to say this out loud and I used all of them talking about songs instead.
           So here they are — the loud ones for the days you're impossible to keep up with, and the quiet
           ones for the nights you go far away without moving. I don't need an answer. I just wanted one
           thing in the world to be honest about it. If you get to the end of Side B and it feels like
           someone was paying attention the whole time — yeah. That was the confession.`,
    sign: "— still on Side B"
  },

  /* ── nine songs ─────────────────────────────────────────────────
     file: put an mp3 at audio/<file> and it plays for real.
           Missing file = "silent reel": the tape still runs on its
           printed duration so the whole thing stays usable.
     ────────────────────────────────────────────────────────────── */
  tracks: [
    { side:"a", n:1, title:"Butterfly",   artist:"BTS",            dur:"4:01", file:"a1-butterfly.mp3",
      note:"the one that starts it", hue:38 },
    { side:"a", n:2, title:"Danger",      artist:"BTS",            dur:"4:47", file:"a2-danger.mp3",
      note:"corridor volume", hue:14 },
    { side:"a", n:3, title:"Dynamite",    artist:"BTS",            dur:"3:26", file:"a3-dynamite.mp3",
      note:"pure 4 p.m. sunlight", hue:46 },
    { side:"a", n:4, title:"Euphoria",    artist:"BTS (Jungkook)", dur:"4:12", file:"a4-euphoria.mp3",
      note:"her word, not mine", hue:196 },
    { side:"a", n:5, title:"Ghost",       artist:"Justin Bieber",  dur:"2:34", file:"a5-ghost.mp3",
      note:"where side A cracks", hue:210 },

    { side:"b", n:1, title:"Salaam Aaya", artist:"Veer-Zaara",     dur:"5:54", file:"b1-salaam-aaya.mp3",
      note:"the translated one", hue:268 },
    { side:"b", n:2, title:"Jab Julo Bareli", artist:"the one she sent", dur:"4:51", file:"b2-jab-julo-bareli.mp3",
      note:"hers before it was ours", hue:280 },
    { side:"b", n:3, title:"blue",        artist:"yung kai",       dur:"3:42", file:"b3-blue.mp3",
      note:"1 a.m. exactly", hue:230 },
    { side:"b", n:4, title:"comethru",    artist:"Jeremy Zucker",  dur:"3:01", file:"b4-comethru.mp3",
      note:"the closing argument", hue:252 }
  ]
};
