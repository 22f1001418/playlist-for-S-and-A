/* ═══════════ 40 — the machine behind the tape ═══════════ */
(() => {
'use strict';
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mmss  = s => { s = Math.max(0, Math.floor(s || 0)); return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`; };
const toSec = t => t.split(':').reduce((a, n) => a * 60 + (+n), 0);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const TRACKS = TAPE.tracks.map((t, i) => ({ ...t, i, seconds: toSec(t.dur) }));

/* ═══════════ REVEAL ═══════════ */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12, rootMargin: '0px 0px -8% 0px' });

requestAnimationFrame(() => {
  document.body.classList.remove('is-booting');
  $$('[data-reveal]').forEach((el, i) => { el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`; io.observe(el); });
});

/* ═══════════ THE SKY: motes, stars, shooting stars ═══════════ */
const cv = $('#particles'), ctx = cv.getContext('2d');
let W = 0, H = 0, motes = [], stars = [], shoot = null, dpr = 1;

function sizeCanvas() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  W = cv.width  = innerWidth  * dpr;
  H = cv.height = innerHeight * dpr;
  const n = Math.round(innerWidth * innerHeight / 26000);
  motes = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: (Math.random() * 1.9 + .5) * dpr,
    vx: (Math.random() - .5) * .22 * dpr, vy: (Math.random() * .28 + .06) * dpr,
    a: Math.random() * .55 + .18, ph: Math.random() * Math.PI * 2,
    sw: Math.random() * 26 + 8
  }));
  stars = Array.from({ length: Math.round(n * 1.6) }, () => ({
    x: Math.random() * W, y: Math.random() * H * .72,
    r: (Math.random() * 1.3 + .28) * dpr,
    tw: Math.random() * Math.PI * 2, ts: Math.random() * .035 + .012
  }));
}
sizeCanvas();
addEventListener('resize', sizeCanvas, { passive: true });

let night = 0; // 0 = day, 1 = night — eased, so the sky crossfades
function paintSky(t) {
  ctx.clearRect(0, 0, W, H);
  const target = document.body.dataset.side === 'b' ? 1 : 0;
  night += (target - night) * .04;

  /* stars (night) */
  if (night > .02) {
    for (const s of stars) {
      s.tw += s.ts;
      const a = (.35 + Math.sin(s.tw) * .35) * night;
      ctx.globalAlpha = a; ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.284); ctx.fill();
    }
    if (!shoot && Math.random() < .0022) {
      shoot = { x: Math.random() * W * .7, y: Math.random() * H * .3, len: 0, life: 1 };
    }
    if (shoot) {
      shoot.x += 7 * dpr; shoot.y += 3 * dpr;
      shoot.len = Math.min(shoot.len + 9 * dpr, 150 * dpr);
      shoot.life -= .012;
      ctx.globalAlpha = Math.max(0, shoot.life) * night;
      const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.len, shoot.y - shoot.len * .43);
      g.addColorStop(0, '#fff'); g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 2 * dpr; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y);
      ctx.lineTo(shoot.x - shoot.len, shoot.y - shoot.len * .43); ctx.stroke();
      if (shoot.life <= 0 || shoot.x > W) shoot = null;
    }
  }

  /* drifting motes — pollen in the day, dust in the night */
  const col = night > .5 ? '215,200,255' : '255,235,178';
  for (const m of motes) {
    m.ph += .014;
    m.x += m.vx + Math.sin(m.ph) * .28 * dpr;
    m.y += m.vy * (night > .5 ? .5 : 1);
    if (m.y > H + 10) { m.y = -10; m.x = Math.random() * W; }
    if (m.x < -10) m.x = W + 10; if (m.x > W + 10) m.x = -10;
    ctx.globalAlpha = m.a * (.55 + Math.sin(m.ph) * .45);
    ctx.fillStyle = `rgba(${col},1)`;
    ctx.shadowBlur = m.sw * dpr * .3; ctx.shadowColor = `rgba(${col},.8)`;
    ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.284); ctx.fill();
  }
  ctx.shadowBlur = 0; ctx.globalAlpha = 1;
}

/* mouse parallax on the cloud bands + cassette tilt */
let mx = 0, my = 0, cmx = 0, cmy = 0;
addEventListener('pointermove', e => {
  mx = (e.clientX / innerWidth - .5); my = (e.clientY / innerHeight - .5);
}, { passive: true });

const cassette = $('#cassette');
function frame(t) {
  cmx += (mx - cmx) * .05; cmy += (my - cmy) * .05;
  $('.clouds.far').style.setProperty('--px', `${-cmx * 26}px`);
  $('.clouds.mid').style.setProperty('--px', `${-cmx * 46}px`);
  $('.sun-moon').style.setProperty('--sm-y', `${-cmy * 18}px`);
  if (cassette) {
    cassette.style.setProperty('--ry', `${cmx * 12}deg`);
    cassette.style.setProperty('--rx', `${-cmy * 8}deg`);
  }
  if (!reduced) paintSky(t);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
if (reduced) { night = document.body.dataset.side === 'b' ? 1 : 0; paintSky(0); }

/* windows lighting up at night */
const lit = $('.town .lit');
if (lit) {
  let d = '';
  for (let i = 0; i < 46; i++) {
    const x = Math.random() * 1420, y = 120 + Math.random() * 44;
    d += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="5" height="6" fill="#ffd98a" opacity="${(.3 + Math.random() * .6).toFixed(2)}"/>`;
  }
  lit.innerHTML = d;
  lit.style.cssText = 'display:none';
  const style = document.createElement('style');
  style.textContent = 'body[data-side="b"] .town .lit{display:block!important}';
  document.head.appendChild(style);
}

/* ═══════════ CONTENT FROM tracks.js ═══════════ */
$('#personaName').textContent = TAPE.persona.name;
$('#personaLede').textContent = TAPE.persona.lede.replace(/\s+/g, ' ').trim();
$('#personaTraits').innerHTML = TAPE.persona.traits.map(t => `<li>${t}</li>`).join('');
$('#letterText').innerHTML = TAPE.letter.text.replace(/\s+/g, ' ').trim();
$('#letterSign').textContent = TAPE.letter.sign;

const yt = t => `https://www.youtube.com/results?search_query=${encodeURIComponent(t.title + ' ' + (t.artist === '—' ? '' : t.artist))}`;

for (const side of ['a', 'b']) {
  $(`#list${side.toUpperCase()}`).innerHTML = TRACKS.filter(t => t.side === side).map(t => `
    <li class="line" data-i="${t.i}" tabindex="0" role="button" aria-label="Play ${t.title}">
      <span class="ln-num">${t.n}</span>
      <span class="ln-main">
        <span class="ln-title">${t.title}</span>
        <span class="ln-artist">${t.artist}<span class="ln-note">${t.note}</span></span>
      </span>
      <span class="ln-dur">${t.dur}</span>
      <a class="ln-yt" href="${yt(t)}" target="_blank" rel="noopener"
         aria-label="Find ${t.title} online" title="find it online">↗</a>
    </li>`).join('');
}

/* ═══════════ THE PLAYER ═══════════ */
const audio = $('#audio');
const P = { i: -1, playing: false, loop: false, ghost: false, pos: 0, dur: 0, last: 0,
            seeking: false, lastT: -1, stall: 0 };

const els = {
  title: $('#plTitle'), artist: $('#plArtist'), badge: $('#plBadge'), art: $('#plArt'),
  cur: $('#tCur'), durEl: $('#tDur'), fill: $('#progFill'), bar: $('#progressBar'),
  now: $('#cNow'), tapeL: $('#tapeL'), tapeR: $('#tapeR'), ghost: $('#ghostNote'),
  cSide: $('#cSide'), cName: $('#cName'), heroSide: $('#heroSide'), heroName: $('#heroSideName')
};

function setSide(side, { scroll = false } = {}) {
  if (document.body.dataset.side === side) return;
  document.body.dataset.side = side;
  $$('.ss-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.goside === side)));
  const s = TAPE.sides[side];
  els.cSide.textContent = s.letter; els.cName.textContent = s.name;
  els.heroSide.textContent = s.letter; els.heroName.textContent = s.name;
  if (P.i < 0) els.badge.textContent = s.letter;
  document.querySelector('meta[name=theme-color]')
    .setAttribute('content', side === 'b' ? '#20204a' : '#7fc7f0');
  if (scroll) $('#tracklist').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

$$('.ss-btn').forEach(b => b.addEventListener('click', () => {
  const side = b.dataset.goside;
  setSide(side);
  const first = TRACKS.find(t => t.side === side);
  if (P.playing || P.i >= 0) load(first.i, true);
}));

function paintTrack(t) {
  els.title.textContent = t.title;
  els.artist.textContent = t.artist === '—' ? 'side ' + t.side.toUpperCase() : t.artist;
  els.badge.textContent = TAPE.sides[t.side].letter;
  els.art.style.setProperty('--h', t.hue);
  els.now.textContent = `▸ ${t.title}`;
  $$('.line').forEach(l => l.classList.toggle('active', +l.dataset.i === t.i));
  els.durEl.textContent = t.dur;
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: t.title, artist: t.artist === '—' ? 'Side ' + t.side.toUpperCase() : t.artist,
      album: `${TAPE.number} — ${TAPE.title}`
    });
  }
}

function load(i, autoplay) {
  const t = TRACKS[clamp(i, 0, TRACKS.length - 1)];
  if (P.i >= 0 && P.i !== t.i) {
    const prev = $(`.line[data-i="${P.i}"]`);
    if (prev) prev.classList.add('played');
  }
  P.i = t.i; P.pos = 0; P.dur = t.seconds; P.ghost = false; P.lastT = -1; P.stall = 0;
  setSide(t.side);
  paintTrack(t);
  const url = `audio/${encodeURIComponent(t.file)}`;
  audio.src = url;
  audio.load();
  els.ghost.hidden = true;
  /* ask first: a missing file shouldn't cost six seconds of a dead progress bar */
  fetch(url, { method: 'HEAD' })
    .then(r => { if (!r.ok && P.i === t.i) goGhost(); })
    .catch(() => { if (P.i === t.i) goGhost(); });
  if (autoplay) play(); else { P.playing = false; render(); }
}

function play() {
  if (P.i < 0) { load(0, true); return; }
  P.playing = true;
  P.last = performance.now();
  document.body.classList.add('playing');
  const p = audio.play();
  if (p && p.catch) p.catch(err => {
    /* the browser wanting a real tap isn't a broken file */
    if (err && err.name === 'NotAllowedError') { pause(); els.now.textContent = '— press play —'; }
    else goGhost();
  });
  render();
}
function pause() {
  P.playing = false; audio.pause();
  document.body.classList.remove('playing');
  els.now.textContent = P.i >= 0 ? `‖ ${TRACKS[P.i].title}` : '— insert tape —';
  render();
}
const toggle = () => P.playing ? pause() : play();

function step(d) {
  if (P.i < 0) { load(0, true); return; }
  let n = P.i + d;
  if (n < 0) n = TRACKS.length - 1;
  if (n >= TRACKS.length) n = 0;
  load(n, true);
}
function ended() {
  if (P.loop) { seekTo(0); play(); return; }
  if (P.i >= TRACKS.length - 1) { load(0, false); pause(); els.now.textContent = '— side B, over —'; return; }
  step(1);
}

function seekTo(sec) {
  P.pos = clamp(sec, 0, P.dur || 1);
  if (!P.ghost && isFinite(audio.duration)) { try { audio.currentTime = P.pos; } catch {} }
  render();
}

/* audio wiring — a missing file falls back to the silent reel */
audio.addEventListener('loadedmetadata', () => {
  if (isFinite(audio.duration) && audio.duration > 1) {
    P.dur = audio.duration; els.durEl.textContent = mmss(P.dur);
  }
});
/* the silent reel: no file, a dead file, or a browser that just refuses */
function goGhost() {
  if (P.ghost || P.i < 0) return;
  P.ghost = true; els.ghost.hidden = false;
  try { audio.pause(); audio.removeAttribute('src'); audio.load(); } catch {}
  P.dur = TRACKS[P.i]?.seconds || 0;
  els.durEl.textContent = mmss(P.dur);
}
/* only a real error counts — 'abort'/'emptied' fire whenever we swap the src ourselves */
audio.addEventListener('error', () => { if (audio.error) goGhost(); });
audio.addEventListener('ended', ended);
audio.addEventListener('timeupdate', () => { if (!P.ghost && !P.seeking) P.pos = audio.currentTime; });

/* the ticking clock — real time or the ghost's */
function tick(now) {
  if (P.playing) {
    /* real audio that stops moving isn't coming back — but give it time to buffer */
    if (!P.ghost) {
      const grace = audio.readyState >= 3 ? 1600 : 6000;
      if (audio.currentTime !== P.lastT) { P.lastT = audio.currentTime; P.stall = 0; }
      else if ((P.stall += now - P.last) > grace) goGhost();
    }
    if (P.ghost) {
      P.pos += (now - P.last) / 1000;
      if (P.pos >= P.dur) { P.pos = P.dur; render(); ended(); }
    }
    render();
  }
  P.last = now;
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

function render() {
  const pct = P.dur ? clamp(P.pos / P.dur, 0, 1) : 0;
  els.fill.style.width = `${pct * 100}%`;
  els.bar.setAttribute('aria-valuenow', Math.round(pct * 100));
  els.cur.textContent = mmss(P.pos);
  if (!P.ghost && isFinite(audio.duration) && audio.duration > 1) els.durEl.textContent = mmss(P.dur);
  /* tape winds from the left reel onto the right */
  els.tapeL.style.setProperty('--r', `${(38 - pct * 18).toFixed(1)}%`);
  els.tapeR.style.setProperty('--r', `${(20 + pct * 18).toFixed(1)}%`);
}
render();

/* controls */
$('#btnPlay').addEventListener('click', toggle);
$('#btnPrev').addEventListener('click', () => (P.pos > 4 ? seekTo(0) : step(-1)));
$('#btnNext').addEventListener('click', () => step(1));
$('#pressPlay').addEventListener('click', () => { if (P.i < 0) load(0, true); else toggle(); });

const btnLoop = $('#btnLoop');
btnLoop.addEventListener('click', () => {
  P.loop = !P.loop; btnLoop.setAttribute('aria-pressed', String(P.loop));
});

const vol = $('#vol'), btnMute = $('#btnMute');
let lastVol = .8;
audio.volume = .8;
vol.addEventListener('input', () => {
  audio.volume = vol.value / 100; audio.muted = false;
  document.body.classList.toggle('muted', audio.volume === 0);
  if (audio.volume > 0) lastVol = audio.volume;
});
btnMute.addEventListener('click', () => {
  if (audio.volume > 0) { lastVol = audio.volume; audio.volume = 0; vol.value = 0; }
  else { audio.volume = lastVol || .8; vol.value = Math.round(audio.volume * 100); }
  document.body.classList.toggle('muted', audio.volume === 0);
});

/* scrubbing */
const posFromEvent = e => {
  const r = els.bar.getBoundingClientRect();
  return clamp((e.clientX - r.left) / r.width, 0, 1) * (P.dur || 0);
};
els.bar.addEventListener('pointerdown', e => {
  P.seeking = true; els.bar.setPointerCapture(e.pointerId); seekTo(posFromEvent(e));
});
els.bar.addEventListener('pointermove', e => { if (P.seeking) seekTo(posFromEvent(e)); });
addEventListener('pointerup', () => { P.seeking = false; });
els.bar.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') seekTo(P.pos + 5);
  else if (e.key === 'ArrowLeft') seekTo(P.pos - 5);
});

/* tracklist clicks */
$$('.line').forEach(l => {
  const go = () => load(+l.dataset.i, true);
  l.addEventListener('click', e => { if (!e.target.closest('.ln-yt')) go(); });
  l.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
  });
});

/* keyboard */
addEventListener('keydown', e => {
  if (e.target.matches('input,textarea')) return;
  if (e.key === ' ') { e.preventDefault(); toggle(); }
  else if (e.key === 'ArrowRight' && e.shiftKey) step(1);
  else if (e.key === 'ArrowLeft'  && e.shiftKey) step(-1);
  else if (e.key.toLowerCase() === 'a') { setSide('a'); }
  else if (e.key.toLowerCase() === 'b') { setSide('b'); }
});

if ('mediaSession' in navigator) {
  navigator.mediaSession.setActionHandler('play', play);
  navigator.mediaSession.setActionHandler('pause', pause);
  navigator.mediaSession.setActionHandler('previoustrack', () => step(-1));
  navigator.mediaSession.setActionHandler('nexttrack', () => step(1));
}

/* ═══════════ THE LETTER ═══════════ */
const env = $('#envelope');
const openLetter = () => {
  const open = env.classList.toggle('open');
  env.setAttribute('aria-expanded', String(open));
};
env.addEventListener('click', openLetter);
env.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLetter(); }
});

/* on a stacked (narrow) layout the tape follows the side you're reading */
const stacked = matchMedia('(max-width: 820px)');
let listObserver = null;
function watchColumns() {
  if (listObserver) { listObserver.disconnect(); listObserver = null; }
  if (!stacked.matches) return;
  listObserver = new IntersectionObserver(es => {
    if (P.playing) return;
    es.forEach(e => { if (e.isIntersecting && e.intersectionRatio > .55) setSide(e.target.dataset.sideCol); });
  }, { threshold: [.55] });
  $$('[data-side-col]').forEach(el => listObserver.observe(el));
}
watchColumns();
stacked.addEventListener('change', watchColumns);

/* the switch shrinks past the hero and ducks away while you scroll down */
let lastY = scrollY, hideTimer = 0;
addEventListener('scroll', () => {
  const y = scrollY;
  document.body.classList.toggle('scrolled', y > innerHeight * .7);
  if (y > innerHeight && y > lastY + 6) document.body.classList.add('hide-switch');
  else if (y < lastY - 6 || y < innerHeight) document.body.classList.remove('hide-switch');
  lastY = y;
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => document.body.classList.remove('hide-switch'), 900);
}, { passive: true });

/* clicking a side header in the tracklist flips the tape too */
$$('.side-head').forEach(h => {
  h.style.cursor = 'pointer';
  h.title = 'flip the tape';
  h.addEventListener('click', () => setSide(h.closest('[data-side-col]').dataset.sideCol));
});
})();
