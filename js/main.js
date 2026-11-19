/* Selva Vins — motion and page logic */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const I18N = window.SV_I18N;
  const WINES = window.SV_WINES, GRAPES = window.SV_GRAPES, COLOURS = window.SV_COLOURS;
  const byId = Object.fromEntries(WINES.map(w => [w.id, w]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin);
  I18N.init();

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  function scrollToTarget(target) {
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else (typeof target === 'number' ? window.scrollTo({ top: target }) : target.scrollIntoView());
  }

  /* ================= builders ================= */

  /* the lineup: height chart measured in degrees of alcohol */
  function buildLineup() {
    const chart = $('.lineup__chart');
    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      const val = 15 - i * 0.5, top = (i / steps) * 100;
      const line = document.createElement('i');
      line.style.top = top + '%';
      if (Number.isInteger(val)) line.className = 'major';
      chart.appendChild(line);
      if (Number.isInteger(val)) {
        ['left', 'right'].forEach(side => {
          const b = document.createElement('b');
          b.textContent = val + (side === 'left' ? ' %' : '°');
          b.style.top = top + '%';
          b.style[side] = 'clamp(6px, 2vw, 28px)';
          chart.appendChild(b);
        });
      }
    }
    const row = $('.lineup__row');
    WINES.filter(w => w.col === 'suspects').forEach((w, i) => {
      const li = document.createElement('li');
      li.className = 'suspect' + (w.soldOut ? ' is-soldout' : '');
      li.innerHTML = `
        <button type="button" data-wine="${w.id}">
          <span class="suspect__glass"><img src="assets/bottles/${w.img}.webp" alt="" width="200" height="770" loading="lazy">${w.soldOut ? '<span class="soldout"></span>' : ''}</span>
          <span class="suspect__floor"></span>
          <span class="placard">
            <span class="placard__no">Nº ${String(i + 1).padStart(2, '0')}</span>
            <span class="placard__name">${w.name}</span>
            <span class="placard__grape">${I18N.t(w.grape)}</span>
          </span>
        </button>`;
      row.appendChild(li);
    });
  }

  function buildRemi() {
    const ul = $('.remi__bottles');
    WINES.filter(w => w.col === 'remi').forEach(w => {
      const li = document.createElement('li');
      li.className = 'remi__bottle';
      li.innerHTML = `
        <button type="button" data-wine="${w.id}">
          <img src="assets/bottles/${w.img}.webp" alt="" width="200" height="770" loading="lazy">
          <span class="remi__name">${w.name}</span>
        </button>
        <span class="sticker" data-sticker="${w.id}"></span>`;
      ul.appendChild(li);
    });
    // place stickers
    const pos = { maneras: ['-18px', '18%', 'auto'], tregua: ['auto', '6%', '-22px'], banzai: ['-20px', '34%', 'auto'] };
    $$('.sticker', ul).forEach(s => {
      const p = pos[s.dataset.sticker];
      s.style.left = p[0]; s.style.top = p[1]; s.style.right = p[2];
      if (s.dataset.sticker === 'tregua') s.classList.add('sticker--lime');
    });
  }

  function buildHada() {
    const ul = $('.hada__list');
    WINES.filter(w => w.col === 'hada').forEach(w => {
      const li = document.createElement('li');
      li.innerHTML = `
        <button type="button" data-wine="${w.id}">
          <span class="hada__wine"><span class="hada__dot" style="background:${COLOURS[w.colour].tint}"></span>${w.name}</span>
          <span class="hada__meta"></span>
          <span class="hada__arrow" aria-hidden="true">→</span>
        </button>`;
      ul.appendChild(li);
    });
    const rain = $('.hada__rain');
    if (!reduce) {
      for (let i = 0; i < 26; i++) {
        const d = document.createElement('i');
        d.style.left = (Math.random() * 100) + '%';
        d.style.animationDuration = (1.8 + Math.random() * 2.2) + 's';
        d.style.animationDelay = (-Math.random() * 4) + 's';
        d.style.opacity = (0.3 + Math.random() * 0.7).toFixed(2);
        rain.appendChild(d);
      }
    }
  }

  function buildCast() {
    const ul = $('.cast__list');
    GRAPES.forEach((g, i) => {
      const li = document.createElement('li');
      li.className = 'grape';
      li.innerHTML = `<canvas width="${Math.round(76 * 2)}" height="${Math.round(95 * 2)}" aria-hidden="true"></canvas>
        <div><h3>${g.name}${g.aka ? `<small>${g.aka}</small>` : ''}</h3><p></p></div>`;
      ul.appendChild(li);
      Watercolor.paintCluster($('canvas', li), g.rgb, 40 + i * 7);
    });
  }

  /* the native grapes, drifting past at the top of the wines */
  function buildNatives() {
    const names = GRAPES.map(g => g.name === 'Malvasia' ? 'Malvasia de Banyalbufar' : g.name);
    const run = names.map(n => `<span>${n}</span><i>·</i>`).join('');
    $('.natives__track').innerHTML = run + run;
  }


  /* text that the scripts own, refreshed on every language change */
  function renderText() {
    const ui = I18N.ui;
    $$('.suspect button').forEach(b => {
      const w = byId[b.dataset.wine];
      $('.placard__grape', b).textContent = I18N.t(w.grape);
      b.setAttribute('aria-label', `${w.name}. ${ui.see}`);
    });
    $$('.remi__bottle button, .hada__list button').forEach(b => {
      const w = byId[b.dataset.wine];
      b.setAttribute('aria-label', `${w.name}. ${ui.see}`);
    });
    const sticker = {
      maneras: `1.000<small>${ui.bottles}</small>`,
      tregua: `SO₂ 0<small>${{ en: 'added', es: 'añadido', ca: 'afegit' }[I18N.lang]}</small>`,
      banzai: `Nº 3<small>Remi</small>`
    };
    $$('.sticker').forEach(s => { s.innerHTML = sticker[s.dataset.sticker]; });
    $$('.hada__list button').forEach(b => {
      const w = byId[b.dataset.wine];
      $('.hada__meta', b).textContent = `${COLOURS[w.colour][I18N.lang]} · ${I18N.t(w.grape)}`;
    });
    $$('.grape').forEach((li, i) => { $('p', li).textContent = GRAPES[i][I18N.lang]; });
    $$('.soldout').forEach(el => { el.textContent = ui.soldOut; });
    $$('.suspect.is-soldout button').forEach(b => b.setAttribute('aria-label', `${byId[b.dataset.wine].name}. ${ui.soldOut}. ${ui.see}`));
  }

  /* ================= the wine sheet ================= */
  const sheet = $('#sheet');
  let lastFocus = null, currentWine = null;
  function openSheet(id) {
    const w = byId[id], ui = I18N.ui, lang = I18N.lang;
    const c = COLOURS[w.colour];
    $('.sheet__kicker', sheet).textContent = `${ui.cols[w.col]}${w.tag ? ' · ' + w.tag : ''}`;
    $('.sheet__body', sheet).classList.toggle('is-soldout', !!w.soldOut);
    $('.sheet__name', sheet).textContent = w.name;
    const bottle = $('.sheet__bottle', sheet);
    bottle.innerHTML = w.img
      ? `<img src="assets/bottles/${w.img}.webp" alt="${w.name}" width="200" height="770">`
      : `<div class="label-card"><small>Selva Vins · Hada</small><b>${w.name}</b><i style="background:${c.tint}"></i><small>${c[lang]}</small></div>`;
    const facts = [[ui.grape, I18N.t(w.grape)], [ui.style, c[lang]]];
    if (w.abv) facts.push([ui.abv, w.abv]);
    if (w.bottles) facts.push([ui.bottles, w.bottles]);
    $('.sheet__facts', sheet).innerHTML = facts.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    $('.sheet__notes', sheet).innerHTML = (w.notes[lang] || w.notes.en).map(n => `<li>${n}</li>`).join('');
    $('.sheet__quote', sheet).innerHTML = w.quote ? `“${w.quote[lang]}”<cite>Carlos Rodríguez Furthmann</cite>` : '';
    const ask = $('.sheet__ask', sheet);
    ask.textContent = w.soldOut ? ui.askNext : ui.ask;
    const facts2 = $('.sheet__facts', sheet);
    if (w.soldOut) facts2.insertAdjacentHTML('afterbegin', `<dt>${ui.status}</dt><dd class="is-soldout">${ui.soldOut}</dd>`);
    currentWine = id;

    lastFocus = document.activeElement;
    sheet.hidden = false;
    lenis && lenis.stop();
    const panel = $('.sheet__panel', sheet);
    panel.scrollTop = 0;
    if (reduce) { $('.sheet__close', sheet).focus(); return; }
    gsap.timeline()
      .fromTo('.sheet__scrim', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
      .fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: 'expo.out' }, 0)
      .fromTo('.sheet__bottle', { y: 60, opacity: 0, rotation: 4 }, { y: 0, opacity: 1, rotation: 0, duration: 1, ease: 'expo.out' }, 0.15)
      .fromTo('.sheet__text > *', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.05 }, 0.2);
    setTimeout(() => $('.sheet__close', sheet).focus({ preventScroll: true }), 50);
  }
  function closeSheet() {
    if (sheet.hidden) return;
    const done = () => { sheet.hidden = true; lenis && lenis.start(); lastFocus && lastFocus.focus({ preventScroll: true }); };
    if (reduce) return done();
    gsap.timeline({ onComplete: done })
      .to('.sheet__panel', { xPercent: 100, duration: 0.55, ease: 'power3.in' }, 0)
      .to('.sheet__scrim', { opacity: 0, duration: 0.45 }, 0.1);
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) { closeSheet(); return; }
    const w = e.target.closest('button[data-wine]');
    if (w && sheet.hidden) openSheet(w.dataset.wine);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !contact.open) { closeSheet(); toggleMenu(false); }
    if (e.key === 'Tab' && !sheet.hidden) {   // keep focus inside the sheet
      const f = $$('button, a[href]', sheet);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ================= contact pop-up: where to write, never a mail app ================= */
  const contact = $('#contact');
  function openContact(kind) {
    const ui = I18N.ui, w = kind === 'wine' && currentWine ? byId[currentWine] : null;
    const t = w ? (w.soldOut ? ui.contact.soldOut : ui.contact.wine) : ui.contact[kind] || ui.contact.general;
    const fill = str => str.replace('{w}', w ? w.name : '');
    $('.contact__kicker', contact).textContent = w ? w.name : fill(t.kicker);
    $('.contact__title', contact).textContent = fill(t.title);
    $('.contact__lede', contact).textContent = fill(t.lede);
    toggleMenu(false);
    contact.showModal();
    lenis && lenis.stop();
    if (!reduce) gsap.fromTo(contact, { opacity: 0, y: 24, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'expo.out' });
  }
  function closeContact() {
    if (!contact.open) return;
    const done = () => { contact.close(); if (sheet.hidden) lenis && lenis.start(); };
    reduce ? done() : gsap.to(contact, { opacity: 0, y: 12, duration: 0.3, ease: 'power2.in', onComplete: done });
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-contact]');
    if (b) { e.preventDefault(); openContact(b.dataset.contact); }
  });
  contact.addEventListener('click', e => {
    if (e.target === contact || e.target.closest('[data-contact-close]')) closeContact();   // backdrop or ✕
    const c = e.target.closest('[data-copy]');
    if (c) {
      const label = c.textContent;
      (navigator.clipboard ? navigator.clipboard.writeText(c.dataset.copy) : Promise.reject()).then(
        () => { c.textContent = I18N.ui.contact.copied; c.classList.add('is-done'); },
        () => { getSelection().selectAllChildren(c.previousElementSibling); });
      setTimeout(() => { c.textContent = label; c.classList.remove('is-done'); }, 1800);
    }
  });
  contact.addEventListener('cancel', e => { e.preventDefault(); closeContact(); });

  /* ================= nav ================= */
  const nav = $('.nav');
  const menu = $('#menu'), burger = $('.nav__burger');
  let menuOpen = false;
  function toggleMenu(open) {
    if (open === menuOpen) return;
    menuOpen = open;
    burger.setAttribute('aria-expanded', String(open));
    if (open) {
      menu.hidden = false;
      lenis && lenis.stop();
      gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.out' });
      gsap.fromTo($$('li', menu), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'power3.out', delay: 0.15 });
      nav.classList.remove('is-light');
    } else {
      lenis && lenis.start();
      gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.5, ease: 'power3.in', onComplete: () => { menu.hidden = true; } });
    }
  }
  burger.addEventListener('click', () => toggleMenu(!menuOpen));

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const target = id === '#top' ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    toggleMenu(false);
    scrollToTarget(target);
  });

  /* ================= language ================= */
  const splits = [];
  function splitAll() {
    if (reduce) return;
    $$('.js-lines').forEach(el => {
      splits.push(SplitText.create(el, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit: self => gsap.from(self.lines, {
          yPercent: 115, duration: 1.3, ease: 'expo.out', stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        })
      }));
    });
    const words = $('.js-words');
    splits.push(SplitText.create(words, {
      type: 'words', wordsClass: 'word',
      onSplit: self => gsap.fromTo(self.words, { opacity: 0.38 }, {
        opacity: 1, ease: 'none', stagger: 0.05,
        scrollTrigger: { trigger: words, start: 'top 88%', end: 'center 55%', scrub: true }
      })
    }));
  }
  function unsplitAll() { splits.forEach(s => s.revert()); splits.length = 0; }

  $$('[data-lang]').forEach(b => b.addEventListener('click', () => {
    const lang = b.dataset.lang;
    if (lang === I18N.lang) return;
    const curtain = $('.curtain');
    gsap.timeline()
      .to(curtain, { opacity: 1, duration: 0.35, ease: 'power2.in' })
      .add(() => {
        unsplitAll();
        I18N.apply(lang);
        renderText();
        if (!sheet.hidden && currentWine) openSheet(currentWine);
        splitAll();
        ScrollTrigger.refresh();
      })
      .to(curtain, { opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 });
  }));

  /* ================= hero: their label, bleeding onto the paper ================= */
  /* The painting is the watercolour from the Selva Vins label (their old site's header),
     with the moon cut out into its own layer. It is drawn through a mask of growing
     wet blobs, so the paint seems to spread across the paper as the page opens. */
  const ART = { w: 1500, h: 1072, posY: 0.15, moon: { cx: 0.195, cy: 0.1208, png: 152 } };
  const artImg = new Image();
  artImg.src = 'assets/img/label-art.jpg';
  const paint = $('.hero__paint'), pctx = paint.getContext('2d');
  const heroMoon = $('.hero__moon');
  let art = null, paintedW = 0;

  function layoutArt() {
    const box = $('.hero__art').getBoundingClientRect();
    const W = box.width, H = box.height, k = Math.min(DPR, 1.25);
    const s = Math.max(W / ART.w, H / ART.h);
    const dw = ART.w * s, dh = ART.h * s;
    art = { W, H, k, dw, dh, ox: (W - dw) / 2, oy: (H - dh) * ART.posY };
    paint.width = Math.round(W * k); paint.height = Math.round(H * k);
    // the moon sits where the painter put it, unless a narrow screen has cropped that part away
    const size = Math.min(ART.moon.png / ART.w * dw, W * 0.28);
    const mx = gsap.utils.clamp(W * 0.06, W * 0.94 - size, art.ox + ART.moon.cx * dw - size / 2);
    Object.assign(heroMoon.style, {
      width: size + 'px', height: size + 'px',
      left: mx + 'px', top: Math.max(art.oy + ART.moon.cy * dh - size / 2, 70) + 'px'
    });
    const mist = $('.hero__mist');
    mist.width = Math.round(W * 0.6); mist.height = Math.round(H * 0.3);
    Watercolor.paintMist(mist, 21);
    paintedW = innerWidth;
  }
  function drawArt(mask) {
    if (!art || !artImg.complete) return;
    pctx.setTransform(art.k, 0, 0, art.k, 0, 0);
    pctx.globalCompositeOperation = 'source-over';
    pctx.clearRect(0, 0, art.W, art.H);
    pctx.drawImage(artImg, art.ox, art.oy, art.dw, art.dh);
    if (mask) {
      pctx.setTransform(1, 0, 0, 1, 0, 0);
      pctx.globalCompositeOperation = 'destination-in';
      pctx.drawImage(mask, 0, 0);
      pctx.globalCompositeOperation = 'source-over';
    }
  }
  /* wet blobs land on the mountains and spread; returns a tween to place in the intro */
  function bleedIn(duration) {
    const mask = document.createElement('canvas');
    mask.width = paint.width; mask.height = paint.height;
    const m = mask.getContext('2d');
    m.setTransform(art.k, 0, 0, art.k, 0, 0);
    m.fillStyle = '#fff';
    const r = Watercolor.rng(23);
    // many small wet spots, laid left to right like a brush crossing the paper
    const seeds = Array.from({ length: 46 }, () => {
      const x = art.ox + (-0.02 + 1.04 * r()) * art.dw;
      return {
        x, y: art.oy + (0.2 + 0.62 * r()) * art.dh,
        rad: (0.07 + 0.09 * r()) * Math.max(art.W, art.dw * 0.8),
        t0: 0.5 * gsap.utils.clamp(0, 1, x / art.W) + 0.1 * r()
      };
    });
    const state = { p: 0 };
    return gsap.to(state, {
      p: 1, duration, ease: 'none',
      onUpdate() {
        seeds.forEach(sd => {
          const q = gsap.utils.clamp(0, 1, (state.p - sd.t0) / 0.4);
          if (q > 0) Watercolor.blob(m, sd.x, sd.y, sd.rad * (1 - Math.pow(1 - q, 3)), r, 0.09);
        });
        drawArt(state.p >= 1 ? null : mask);
      },
      onComplete: () => drawArt(null)
    });
  }

  /* ================= build everything ================= */  /* ================= build everything ================= */
  buildLineup();
  buildRemi();
  buildHada();
  buildCast();
  buildNatives();
  const plate = InkPlate($('.plate__ink'), 'assets/img/vitis-plate.webp', { still: reduce });
  renderText();
  layoutArt();
  const artReady = artImg.decode ? artImg.decode().catch(() => {}) : new Promise(res => { artImg.onload = res; });

  let resizeTimer;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (Math.abs(innerWidth - paintedW) > 60) { layoutArt(); drawArt(null); plate.resize(); ScrollTrigger.refresh(); }
    }, 250);
  });

  /* nav behaviour */
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate(self) {
      const y = self.scroll();
      nav.classList.toggle('is-hidden', self.direction === 1 && y > innerHeight * 0.9 && !menuOpen);
      nav.classList.toggle('is-solid', y > innerHeight * 0.9);
    }
  });
  const darkActive = new Set();
  function watchDark(el, key) {
    ScrollTrigger.create({
      trigger: el, start: 'top 50px', end: 'bottom 50px',
      onToggle: self => { self.isActive ? darkActive.add(key) : darkActive.delete(key); nav.classList.toggle('is-light', darkActive.size > 0 && !menuOpen); }
    });
  }
  [['#wines', '#wines'], ['#grapes', '#grapes'], ['#family', '#family'], ['#visit', '#visit']].forEach(([sel]) => {
    ScrollTrigger.create({
      trigger: sel, start: 'top 50%', end: 'bottom 50%',
      onToggle: self => $$(`.nav__links a[href="${sel}"]`).forEach(a => a.classList.toggle('is-active', self.isActive))
    });
  });

  if (reduce) {
    document.documentElement.classList.add('reduced');
    artReady.then(() => drawArt(null));
    plate.snap(4);
    watchDark('.foot', 'foot');
    return;
  }

  /* ================= motion ================= */
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    splitAll();
    const es = SplitText.create('.method__es', { type: 'chars' });
    gsap.from(es.chars, { yPercent: 60, opacity: 0, rotation: 8, duration: 1.3, ease: 'expo.out', stagger: 0.035, scrollTrigger: { trigger: '.method__title', start: 'top 82%', once: true } });
    ScrollTrigger.refresh();
  });

  // hero intro: the painting bleeds onto the paper, the moon rises, then the ink
  gsap.set('.hero__logo .l, .hero__tag, .hero__foot > *', { opacity: 0 });
  gsap.set(heroMoon, { opacity: 0, y: 40 });
  artReady.then(() => {
    gsap.timeline({ defaults: { ease: 'power2.out' }, delay: 0.1 })
      .add(bleedIn(2.6), 0)
      .to(heroMoon, { opacity: 1, y: 0, duration: 3, ease: 'power2.out' }, 0.7)
      .fromTo('.hero__logo .l', { opacity: 0, yPercent: 30, scale: 0.94 }, { opacity: 1, yPercent: 0, scale: 1, transformOrigin: '50% 80%', duration: 1.4, stagger: 0.075, ease: 'expo.out' }, 1.1)
      .fromTo('.hero__tag', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.2 }, 1.8)
      .to('.hero__foot > *', { opacity: 1, duration: 1, stagger: 0.1 }, 2.1)
      .from('.nav', { opacity: 0, y: -16, duration: 1, clearProps: 'transform,opacity' }, 1.9);
  });
  gsap.to(heroMoon, { yPercent: -6, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to('.hero__mist', { xPercent: -4, duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1 });

  // hero scroll: the painting lags a little behind the page, the moon lags more
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    .to('.hero__art', { y: () => innerHeight * 0.14, scale: 1.04, transformOrigin: '50% 40%', ease: 'none' }, 0)
    .to(heroMoon, { y: () => innerHeight * 0.3, ease: 'none' }, 0)
    .to('.hero__brand', { y: () => innerHeight * 0.12, opacity: 0.2, ease: 'none' }, 0)
    .to('.hero__foot', { opacity: 0, ease: 'none', duration: 0.3 }, 0);

  /* framed photos open like a shutter */
  $$('.reveal-frame').forEach(fig => {
    const frame = $('.frame', fig), img = $('img', fig);
    gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 85%', once: true } })
      .fromTo(frame, { clipPath: 'inset(6% 4% 6% 4%)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.2, ease: 'power3.out' })
      .fromTo(img, { scale: 1.12 }, { scale: 1.06, duration: 1.6, ease: 'power3.out' }, 0);
    gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.from('.selva__aside', { opacity: 0, y: 30, duration: 1.2, scrollTrigger: { trigger: '.selva__aside', start: 'top 90%', once: true } });

  /* family */
  gsap.to('.family__small', { y: -70, ease: 'none', scrollTrigger: { trigger: '.family__photos', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.family__copy .lede', { opacity: 0, y: 30, duration: 1.2, scrollTrigger: { trigger: '.family__copy', start: 'top 75%', once: true } });
  gsap.from('.trio__item', { opacity: 0, y: 50, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.trio', start: 'top 85%', once: true } });

  /* postcards drift sideways as you pass */
  gsap.fromTo('.postcards__track', { x: () => innerWidth * 0.15 }, {
    x: () => -($('.postcards__track').scrollWidth - innerWidth * 0.85), ease: 'none',
    scrollTrigger: { trigger: '.postcards', start: 'top bottom', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true }
  });

  /* method */
  gsap.from('.method__sub', { opacity: 0, y: 20, duration: 1, delay: 0.5, scrollTrigger: { trigger: '.method__title', start: 'top 82%', once: true } });
  gsap.set('.strike-list span', { '--strike': 0 });
  $$('.strike-list li').forEach((li, i) => {
    gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 82%', once: true } })
      .from(li, { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' })
      .to($('span', li), { '--strike': 1, duration: 0.55, ease: 'power2.inOut' }, 0.35)
      .to($('span', li), { opacity: 0.55, duration: 0.4 }, 0.6);
  });
  gsap.from('.in-list li', { opacity: 0, x: -24, duration: 1, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.in-list', start: 'top 80%', once: true } });

  $$('.step').forEach((step, i) => {
    gsap.timeline({ scrollTrigger: { trigger: step, start: 'top 85%', once: true }, delay: (i % 3) * 0.12 })
      .from($$('.draw > *', step), { drawSVG: 0, duration: 1.3, ease: 'power2.inOut', stagger: 0.05 })
      .from($$('h3, p', step), { opacity: 0, y: 14, duration: 0.8, stagger: 0.08 }, 0.3);
  });
  $$('.bubbles circle').forEach((c, i) => {
    const d = 2.2 + i * 0.3;
    gsap.timeline({ repeat: -1, delay: i * 0.45 })
      .fromTo(c, { y: 0 }, { y: -46 - i * 4, duration: d, ease: 'sine.in' }, 0)
      .fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
      .to(c, { opacity: 0, duration: 0.5 }, d - 0.5);
  });
  gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
    .fromTo('.step__art .drip', { y: 0 }, { y: 30, duration: 1.4, ease: 'power2.in' }, 0)
    .fromTo('.step__art .drip', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
    .to('.step__art .drip', { opacity: 0, duration: 0.3 }, 1.1);

  /* firsts: three lines, one after another */
  gsap.from('.first__title', { yPercent: 60, opacity: 0, duration: 1.3, ease: 'expo.out', stagger: 0.16, scrollTrigger: { trigger: '.firsts__list', start: 'top 80%', once: true } });
  gsap.from('.firsts__coda', { opacity: 0, x: -20, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.firsts__coda', start: 'top 90%', once: true } });
  if (canHover) {
    const peek = $('.peek');
    const qx = gsap.quickTo(peek, 'x', { duration: 0.5, ease: 'power3' });
    const qy = gsap.quickTo(peek, 'y', { duration: 0.5, ease: 'power3' });
    const qr = gsap.quickTo(peek, 'rotation', { duration: 0.6, ease: 'power3' });
    let lastX = 0, px = -1, py = -1, shown = null;
    /* show the bottle for whichever line is under the cursor, so scrolling
       away with a still mouse hides it too (no mouseleave fires then) */
    function sync() {
      const hit = px < 0 ? null : document.elementFromPoint(px, py);
      const li = hit && hit.closest('.first[data-peek]');
      const id = li ? li.dataset.peek : null;
      if (id === shown) return;
      shown = id;
      if (id) {
        peek.src = `assets/bottles/${id}.webp`;
        qx(px + 90); qy(py);
        gsap.to(peek, { opacity: 1, scale: 1, duration: 0.4, overwrite: 'auto' });
      } else {
        gsap.to(peek, { opacity: 0, scale: 0.8, duration: 0.3, overwrite: 'auto' });
      }
    }
    window.addEventListener('pointermove', e => {
      px = e.clientX; py = e.clientY;
      if (shown) { qx(px + 90); qy(py); qr(gsap.utils.clamp(-14, 14, (px - lastX) * 0.8)); }
      sync();
      lastX = px;
    }, { passive: true });
    window.addEventListener('scroll', sync, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { px = -1; sync(); });
  }

  /* the lineup: they walk in, the camera flashes */
  const suspects = $$('.suspect');
  gsap.timeline({ scrollTrigger: { trigger: '.lineup', start: 'top 65%', once: true } })
    .from(suspects.map(s => $('.suspect__glass', s)), { x: 120, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09 })
    .from('.lineup__chart i', { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'expo.inOut', stagger: 0.03 }, 0)
    .from('.lineup__chart b', { opacity: 0, duration: 0.6, stagger: 0.03 }, 0.4)
    .to('.lineup__flash', { opacity: 0.9, duration: 0.06, ease: 'none' }, '-=0.1')
    .to('.lineup__flash', { opacity: 0, duration: 0.9, ease: 'power2.out' })
    .from(suspects.map(s => $('.placard', s)), { yPercent: 60, opacity: 0, rotationX: -70, transformOrigin: '50% 0%', duration: 0.9, ease: 'back.out(1.6)', stagger: 0.05 }, '-=0.85');

  /* Remi: it's loud */
  gsap.from('.remi__title span', {
    yPercent: 120, rotation: i => [-12, 8, -6, 14][i], duration: 1.1, ease: 'back.out(1.8)', stagger: 0.08,
    scrollTrigger: { trigger: '.remi', start: 'top 70%', once: true }
  });
  gsap.from('.remi__bottle', {
    y: -160, opacity: 0, rotation: i => [-30, 18, 34][i], duration: 1.3, ease: 'bounce.out', stagger: 0.16,
    scrollTrigger: { trigger: '.remi__bottles', start: 'top 75%', once: true }
  });
  gsap.from('.sticker', {
    scale: 0, rotation: -90, duration: 0.8, ease: 'back.out(3)', stagger: 0.12, delay: 1.1,
    scrollTrigger: { trigger: '.remi__bottles', start: 'top 75%', once: true },
    onComplete: () => $$('.sticker').forEach((s, i) =>
      gsap.fromTo(s, { rotation: i % 2 ? -6 : 6 }, { rotation: i % 2 ? 6 : -6, duration: 0.5, repeat: -1, yoyo: true, ease: 'steps(2)' }))
  });
  const band = gsap.to('.remi__band-track', { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
  ScrollTrigger.create({
    trigger: '.remi', start: 'top bottom', end: 'bottom top',
    onUpdate: self => {
      const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
      gsap.to(band, { timeScale: 1 + Math.abs(v), duration: 0.2, overwrite: true });
      gsap.to(band, { timeScale: 1, duration: 1.2, delay: 0.2 });
    }
  });
  gsap.from('.remi__copy, .remi__kicker', { opacity: 0, y: 24, duration: 1, stagger: 0.1, scrollTrigger: { trigger: '.remi', start: 'top 60%', once: true } });

  /* Hada: a snail crosses the page, leaving its trail */
  const slime = $('.hada__slime');
  const snailTl = gsap.timeline({ scrollTrigger: { trigger: '.hada', start: 'top 70%', end: 'bottom 30%', scrub: 1.2 } });
  snailTl
    .fromTo(slime, { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none' }, 0)
    .to('.snail', { motionPath: { path: '#snailPath', align: '#snailPath', alignOrigin: [0.5, 0.86], autoRotate: true }, ease: 'none' }, 0);
  snailTl.progress(1).progress(0);
  gsap.from('.hada__list li', { opacity: 0, y: 30, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.hada__list', start: 'top 85%', once: true } });
  gsap.from('.hada__bottle img', { y: 80, opacity: 0, rotation: 6, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.hada__bottle', start: 'top 80%', once: true } });
  gsap.to('.hada__bottle', { y: -14, rotation: -1.2, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.from('.hada__copy > .kicker, .hada__title, .hada__copy > .lede', { opacity: 0, y: 26, duration: 1.1, stagger: 0.1, scrollTrigger: { trigger: '.hada', start: 'top 60%', once: true } });

  /* the native grapes drift across as you pass */
  gsap.fromTo('.natives__track', { xPercent: 0 }, {
    xPercent: -28, ease: 'none',
    scrollTrigger: { trigger: '.natives', start: 'top bottom', end: 'bottom top', scrub: 0.8 }
  });
  gsap.from('.natives .lede', { opacity: 0, y: 24, duration: 1.1, scrollTrigger: { trigger: '.natives__head', start: 'top 75%', once: true } });

  /* The grapes: the text scrolls normally; the plate beside it follows the story */
  ScrollTrigger.create({
    trigger: '.story__text', start: 'top 60%', end: 'bottom 90%',
    onUpdate: self => { plate.progress = self.progress * 4; }
  });
  ScrollTrigger.create({
    trigger: '.story-sec', start: 'top bottom', end: 'bottom top',
    onToggle: self => self.isActive ? plate.start() : plate.stop()
  });
  ScrollTrigger.create({ trigger: '.story', start: 'top 75%', once: true, onEnter: () => plate.inkIn(2.2) });
  $$('.chapter').forEach(ch => ScrollTrigger.create({ trigger: ch, start: 'top 62%', end: 'bottom 38%', toggleClass: 'is-active' }));

  // the nav turns light over the footer
  watchDark('.foot', 'foot');

  /* the rest of the cast */
  ScrollTrigger.batch('.grape', {
    start: 'top 90%', once: true,
    onEnter: els => gsap.from(els, { opacity: 0, y: 40, duration: 1, ease: 'expo.out', stagger: 0.08 })
  });
  ScrollTrigger.batch('.grape canvas', {
    start: 'top 92%', once: true,
    onEnter: els => gsap.from(els, { scale: 0.4, rotation: -20, opacity: 0, filter: 'blur(6px)', duration: 1.4, ease: 'expo.out', stagger: 0.08 })
  });

  /* visit: the island map. It reads at once; the stops make one short entrance. */
  gsap.from('.atlas__stop, .atlas__home, .atlas__city', { opacity: 0, scale: 0.6, transformOrigin: 'center', transformBox: 'fill-box', duration: 0.5, stagger: 0.05, ease: 'back.out(2)', scrollTrigger: { trigger: '.atlas', start: 'top 88%', once: true } });
  gsap.from('.atlas__route, .atlas__routelabel', { opacity: 0, duration: 0.8, scrollTrigger: { trigger: '.atlas', start: 'top 88%', once: true } });
  /* a stop on the map and its line in the key light up together */
  const stopEls = sel => $$(`.atlas [data-stop="${sel}"]`);
  $$('.atlas [data-stop]').forEach(el => {
    const on = v => () => stopEls(el.dataset.stop).forEach(x => x.classList.toggle('is-on', v));
    el.addEventListener('pointerenter', on(true));
    el.addEventListener('pointerleave', on(false));
    el.addEventListener('focus', on(true));
    el.addEventListener('blur', on(false));
  });
  gsap.from('.visit__sub, .visit .lede, .visit__pa, .visit__address, .visit__actions', { opacity: 0, y: 24, duration: 1, stagger: 0.08, scrollTrigger: { trigger: '.visit__copy', start: 'top 70%', once: true } });

  /* footer */
  gsap.from('.foot__grid > *', { opacity: 0, y: 30, duration: 1, stagger: 0.08, scrollTrigger: { trigger: '.foot__grid', start: 'top 90%', once: true } });

  // fonts change line breaks; measure again once they're in
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
