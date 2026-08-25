/* ═══════════════════════════════════════════════════════════════
   EDIT THIS FILE — everything personal lives here.
   Nothing else needs touching to make the tape yours.
   ═══════════════════════════════════════════════════════════════ */

const TAPE = {
  number: "21",
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
      "Sometimes forgets what she was saying while she’s still <em>saying</em> it.",
      "Plays a song forty times and calls it 'a phase'.",
      "Types a long message, deletes it, sends 'nothing lol'.",
      "Somehow knows every word of a Korean song she claims she's never heard.",
      "Is nicer to strangers than she is to herself. Working on it."
    ]
  },

  /* ── the unsent bit ─────────────────────────────────────────── */
  letter: {
     salutation: "Dear Laxmi,",
     text: `I've had twenty-one chances to say all of this out loud, and somehow I kept finding songs instead. 
     So I thought I'd let the songs do the talking this time. 
     There's a little <em>Butterfly</em> for the way you keep changing and growing, a little <em>Dynamite</em> for the chaos and energy you somehow bring with you, and a little <em>Light</em> for the way you make ordinary days feel a bit brighter without even trying. 
     There's <em>Euphoria</em> for the ridiculously happy moments, <em>Blue</em> for the quieter ones, and <em>comethru</em> for those days when you just need someone around without having to explain why. 
     There's even a little <em>Ghost</em> in here, for all the moments that pass too quickly but somehow stay. 
     And <em>Salaam</em> — because sometimes a simple thank you doesn't feel like enough.
     Maybe, there's a hidden message between the songs. A collection of little things that reminded me of you. 
     Maybe that's what playlists are good for — saying the things you don't always know how to say, without making a big deal out of them. 
     I just hope somewhere between Side A and Side B, you smile at least once and think, "okay, this is actually pretty nice."`,
     sign: "— still on Side B"
},

  /* ── ten songs ─────────────────────────────────────────────────
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
    { side:"a", n:5, title:"Light",       artist:"BTS",            dur:"3:52", file:"a5-light.mp3",
      note:"the day refusing to end", hue:52 },

    { side:"b", n:1, title:"Salaam Aaya", artist:"Veer-Zaara",     dur:"5:54", file:"b1-salaam-aaya.mp3",
      note:"the translated one", hue:268 },
    { side:"b", n:2, title:"blue",        artist:"yung kai",       dur:"3:42", file:"b2-blue.mp3",
      note:"1 a.m. exactly", hue:230 },
    { side:"b", n:3, title:"comethru",    artist:"Jeremy Zucker",  dur:"3:01", file:"b3-comethru.mp3",
      note:"typed, deleted, sent anyway", hue:252 },
    { side:"b", n:4, title:"Ghost",       artist:"Justin Bieber",  dur:"2:34", file:"b4-ghost.mp3",
      note:"where it cracks", hue:214 },
    { side:"b", n:5, title:"Holy",        artist:"Justin Bieber",  dur:"3:32", file:"b5-holy.mp3",
      note:"the last word", hue:288 }
  ]
};
