/* The Gargollassa story told by a botanical plate of the vine (Köhler, public domain),
   printed in the label's blue. The story position p (0..4) comes from scrolling past
   the four chapters:
     0–1  the plate fully inked: the plain full of Gargollassa
     1–2  phylloxera: the ink washes away, leaving the faint drawing
     2–3  three small blooms of ink: the three surviving vines
     3–4  the ink spreads out from those three until the plate is whole again
   The drawn state eases toward p, so a fast scroll still moves smoothly. */

window.InkPlate = function (canvas, src, opts = {}) {
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = src;
  const ink = document.createElement('canvas'), ictx = ink.getContext('2d');
  const mask = document.createElement('canvas'), mctx = mask.getContext('2d');

  // the flowers, the left leaf, the bunch
  const SEEDS = [[0.34, 0.25], [0.17, 0.47], [0.79, 0.68]];
  const r = Watercolor.rng(31);
  const shapes = SEEDS.map(() => [1, 0.93, 0.86, 0.78].map(k => Watercolor.shape(k, r)));

  const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
  let W = 0, H = 0, dpr = 1, target = 0, p = 0, intro = opts.still ? 1 : 0;
  let running = false, raf = 0, drawn = '';

  function size() {
    const b = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = ink.width = mask.width = Math.round(b.width * dpr);
    H = canvas.height = ink.height = mask.height = Math.round(b.height * dpr);
    drawn = '';
  }

  function draw() {
    p += (target - p) * (opts.still ? 1 : 0.07);
    const key = p.toFixed(4) + '|' + intro.toFixed(3) + '|' + W;
    if (key !== drawn && img.complete && img.naturalWidth) {
      drawn = key;
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 0.1;                                   // the drawing that never quite leaves
      ctx.drawImage(img, 0, 0, W, H);

      const full = intro * Math.max(1 - smooth(1.05, 1.85, p), smooth(3.8, 4, p));
      if (full > 0.002) { ctx.globalAlpha = full; ctx.drawImage(img, 0, 0, W, H); }

      const seed = smooth(2.1, 2.6, p);
      if (seed > 0.002 && full < 0.998) {
        const grow = smooth(3, 3.95, p);
        const rad = Math.hypot(W, H) * (0.045 * seed + 0.85 * grow);
        mctx.clearRect(0, 0, W, H);
        mctx.fillStyle = '#fff';
        mctx.globalAlpha = 0.45;
        shapes.forEach((set, i) => {
          const sx = SEEDS[i][0] * W, sy = SEEDS[i][1] * H;
          set.forEach(poly => {
            mctx.beginPath();
            poly.forEach(([x, y], j) => j ? mctx.lineTo(sx + x * rad, sy + y * rad) : mctx.moveTo(sx + x * rad, sy + y * rad));
            mctx.closePath();
            mctx.fill();
          });
        });
        ictx.globalCompositeOperation = 'source-over';
        ictx.clearRect(0, 0, W, H);
        ictx.drawImage(img, 0, 0, W, H);
        ictx.globalCompositeOperation = 'destination-in';
        ictx.drawImage(mask, 0, 0);
        ctx.globalAlpha = 1;
        ctx.drawImage(ink, 0, 0);

        const label = seed * (1 - smooth(3.15, 3.55, p));
        if (label > 0.01) {
          ctx.globalAlpha = label;
          ctx.fillStyle = '#1e4c9a';
          ctx.font = `italic 300 ${Math.round(17 * dpr)}px Newsreader, Georgia, serif`;
          SEEDS.forEach(([sx, sy], i) => ctx.fillText(['I', 'II', 'III'][i], sx * W + rad * 0.75 + 8 * dpr, sy * H - rad * 0.55));
        }
      }
      ctx.globalAlpha = 1;
    }
    if (running) raf = requestAnimationFrame(draw);
  }

  img.decode ? img.decode().then(() => draw()).catch(() => {}) : (img.onload = () => draw());
  size();
  return {
    set progress(v) { target = v; },
    start() { if (!running) { running = true; raf = requestAnimationFrame(draw); } },
    stop() { running = false; cancelAnimationFrame(raf); },
    resize() { size(); draw(); },
    inkIn(duration) { return gsap.to({ v: 0 }, { v: 1, duration, ease: 'power2.inOut', onUpdate() { intro = this.targets()[0].v; } }); },
    snap(v) { target = p = v; drawn = ''; draw(); }
  };
};
