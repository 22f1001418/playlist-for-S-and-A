/* Tiny zero-dependency static server — works on Render as a Web Service.
   For a Render *Static Site* you don't need this at all: publish dir = "." */
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const TYPES = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.json':'application/json',
  '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.webp':'image/webp', '.ico':'image/x-icon', '.mp3':'audio/mpeg', '.m4a':'audio/mp4',
  '.ogg':'audio/ogg', '.wav':'audio/wav', '.woff2':'font/woff2'
};

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(ROOT, url === '/' ? 'index.html' : url);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end('nope'); return; }

  fs.stat(file, (err, st) => {
    if (err || st.isDirectory()) { res.writeHead(404).end('not found'); return; }
    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';

    // range requests, so audio can seek
    const range = req.headers.range;
    if (range && /^bytes=/.test(range)) {
      const [s, e] = range.replace('bytes=', '').split('-');
      const start = parseInt(s, 10) || 0;
      const end = e ? parseInt(e, 10) : st.size - 1;
      res.writeHead(206, {
        'Content-Type': type,
        'Content-Range': `bytes ${start}-${end}/${st.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1
      });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': st.size,
      'Accept-Ranges': 'bytes',
      'Cache-Control': /\.(mp3|m4a|wav|ogg|woff2|png|jpe?g|webp)$/i.test(file)
        ? 'public, max-age=86400' : 'no-cache'
    });
    fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => console.log(`▸ side A is spinning on http://localhost:${PORT}`));
