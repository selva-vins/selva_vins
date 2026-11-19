/* Watercolour in code: the wet blobs that reveal the label painting, the drifting mist
   and the grape bunches. Each shape is a polygon deformed many times and laid down
   in thin transparent washes (Tyler Hobbs' technique), so edges bleed the way pigment
   does on wet paper. Seeded, so it paints the same picture every visit. */

window.Watercolor = (function () {
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function gauss(r) {
    let u = 0, v = 0;
    while (!u) u = r(); while (!v) v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  /* pts: [x, y, w] where w scales how far that vertex may wander */
  function deform(pts, depth, variance, r) {
    let out = pts;
    for (let d = 0; d < depth; d++) {
      const next = [];
      for (let i = 0; i < out.length; i++) {
        const a = out[i], b = out[(i + 1) % out.length];
        next.push(a);
        const w = (a[2] + b[2]) / 2;
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
        next.push([
          (a[0] + b[0]) / 2 + gauss(r) * len * variance * w,
          (a[1] + b[1]) / 2 + gauss(r) * len * variance * w,
          w * (0.85 + r() * 0.3)
        ]);
      }
      out = next;
    }
    return out;
  }

  function fillPoly(ctx, pts) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    ctx.fill();
  }

  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  function circlePts(cx, cy, rad, n, w) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      pts.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, w]);
    }
    return pts;
  }

  /* one wet blob: a deformed circle laid down as a thin wash */
  function blob(ctx, x, y, rad, r, alpha) {
    if (rad < 1) return;
    ctx.globalAlpha = alpha;
    fillPoly(ctx, deform(circlePts(x, y, rad, 18, 1), 3, 0.11, r));
    ctx.globalAlpha = 1;
  }

  /* a bunch of grapes; colour is the variety */
  function paintCluster(canvas, rgb, seed) {
    const ctx = canvas.getContext('2d'), W = canvas.width, H = canvas.height, r = rng(seed);
    ctx.clearRect(0, 0, W, H);
    const s = W / 120;
    const rows = [4, 5, 4, 4, 3, 2, 1];
    const berries = [];
    let y = 34 * s;
    rows.forEach((n, ri) => {
      for (let i = 0; i < n; i++) {
        const x = W / 2 + (i - (n - 1) / 2) * 15 * s + (r() - 0.5) * 4 * s + (ri % 2 ? 3 : -2) * s;
        berries.push([x, y + (r() - 0.5) * 4 * s, (7 + r() * 1.8) * s]);
      }
      y += 13 * s;
    });
    // stem and a leaf
    ctx.strokeStyle = 'rgba(70,74,52,.55)';
    ctx.lineWidth = 1.6 * s; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(W / 2, 30 * s); ctx.quadraticCurveTo(W / 2 + 2 * s, 18 * s, W / 2 + 10 * s, 10 * s); ctx.stroke();
    const leaf = deform([[W / 2 + 8 * s, 14 * s, 1], [W / 2 + 34 * s, 4 * s, 1], [W / 2 + 40 * s, 22 * s, 1], [W / 2 + 20 * s, 26 * s, 1]], 2, 0.08, r);
    for (let k = 0; k < 12; k++) {
      ctx.fillStyle = 'rgba(96,112,64,1)'; ctx.globalAlpha = 0.06;
      fillPoly(ctx, deform(leaf, 2, 0.06, r));
    }
    // berries, back to front
    berries.forEach(([bx, by, br]) => {
      const pts = deform(circlePts(bx, by, br, 8, 1), 2, 0.04, r);
      for (let k = 0; k < 9; k++) {
        const g = ctx.createRadialGradient(bx - br * 0.4, by - br * 0.4, br * 0.1, bx, by, br * 1.1);
        g.addColorStop(0, rgba(rgb.map(v => Math.min(255, v + 70)), 1));
        g.addColorStop(1, rgba(rgb, 1));
        ctx.fillStyle = g; ctx.globalAlpha = 0.12;
        fillPoly(ctx, deform(pts, 2, 0.04, r));
      }
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = rgba(rgb.map(v => v * 0.6), 1);
      ctx.lineWidth = 0.6 * s;
      ctx.beginPath(); ctx.arc(bx, by, br * 0.98, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  /* drifting mist: many soft white blobs */
  function paintMist(canvas, seed) {
    const ctx = canvas.getContext('2d'), W = canvas.width, H = canvas.height, r = rng(seed);
    ctx.clearRect(0, 0, W, H);
    for (let k = 0; k < 70; k++) {
      const x = r() * W, y = H * (0.35 + r() * 0.4), rx = (80 + r() * 260) * (W / 1600), ry = rx * (0.18 + r() * 0.2);
      ctx.save();
      ctx.translate(x, y); ctx.scale(1, ry / rx);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
      g.addColorStop(0, 'rgba(250,248,243,.26)');
      g.addColorStop(1, 'rgba(250,248,243,0)');
      ctx.fillStyle = g;
      ctx.fillRect(-rx, -rx, rx * 2, rx * 2);
      ctx.restore();
    }
  }

  /* a fixed wet-blob outline around (0,0), radius k, to be scaled by the caller */
  function shape(k, r) { return deform(circlePts(0, 0, k, 18, 1), 3, 0.1, r); }

  return { rng, blob, shape, paintCluster, paintMist };
})();
