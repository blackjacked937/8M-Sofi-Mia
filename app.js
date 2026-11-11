(() => {
  'use strict';

  const gift = window.GIFT_CONFIG;
  if (!gift || !Array.isArray(gift.capitulos) || gift.capitulos.length !== 8) {
    console.error('Revisa config.js: debes incluir exactamente 8 capítulos.');
    return;
  }

  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STORE_KEY = 'nuestro-infinito-ocho-meses-v1';
  const positions = [
    { x: 12, y: 61 }, { x: 24, y: 31 }, { x: 37, y: 65 }, { x: 49, y: 23 },
    { x: 61, y: 63 }, { x: 72, y: 30 }, { x: 83, y: 61 }, { x: 91, y: 28 }
  ];
  const state = { visited: new Set(), openedReasons: new Set(), albumIndex: 0, completedOnce: false };
  let toastTimer = 0;
  let confettiFrame = 0;

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      if (Array.isArray(saved.visited)) {
        saved.visited.filter((i) => Number.isInteger(i) && i >= 0 && i < 8).forEach((i) => state.visited.add(i));
      }
      if (Array.isArray(saved.openedReasons)) {
        saved.openedReasons.filter((i) => Number.isInteger(i) && i >= 0 && i < 8).forEach((i) => state.openedReasons.add(i));
      }
      state.completedOnce = Boolean(saved.completedOnce);
    } catch (error) {
      // El proyecto también funciona si el navegador no permite localStorage.
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        visited: [...state.visited], openedReasons: [...state.openedReasons],
        completedOnce: state.completedOnce
      }));
    } catch (error) { /* modo privado o archivos locales */ }
  }

  function fillPersonalizedText() {
    $('recipientHero').textContent = gift.destinataria;
    $('recipientFooter').textContent = gift.destinataria;
    $('recipientLetter').textContent = gift.destinataria;
    $('senderLetter').textContent = gift.de;
    $('heroDate').textContent = `${gift.aniversario.toLocaleUpperCase('es-MX')} · NUESTROS 8 MESES`;
    $('heroDescription').textContent = gift.descripcionInicial;
    const paragraphs = $('letterParagraphs');
    paragraphs.replaceChildren();
    (gift.carta || []).forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      paragraphs.append(p);
    });
  }

  function renderMap() {
    const map = $('constellationMap');
    map.querySelectorAll('.constellation-node').forEach((node) => node.remove());
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = positions.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * 10} ${p.y * 5.6}`).join(' ');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#dcb2df');
    path.setAttribute('stroke-width', '1.35');
    path.setAttribute('stroke-dasharray', '5 8');
    path.setAttribute('stroke-linecap', 'round');
    $('constellationLines').replaceChildren(path);

    gift.capitulos.forEach((chapter, i) => {
      const star = document.createElement('button');
      star.type = 'button';
      star.className = 'constellation-node';
      star.style.setProperty('--x', `${positions[i].x}%`);
      star.style.setProperty('--y', `${positions[i].y}%`);
      star.setAttribute('aria-label', `Abrir estrella ${i + 1}: ${chapter.mes} — ${chapter.titulo}`);
      star.dataset.index = String(i);
      const orb = document.createElement('span');
      orb.className = 'node-orb';
      orb.textContent = String(i + 1).padStart(2, '0');
      const label = document.createElement('span');
      label.className = 'node-month';
      label.textContent = chapter.mes;
      star.append(orb, label);
      star.addEventListener('click', () => openChapter(i));
      map.append(star);
    });
    updateProgressDisplay();
  }

  function updateProgressDisplay() {
    const count = state.visited.size;
    $('headerProgress').textContent = `${count} de 8`;
    $('mapProgress').textContent = `Has descubierto ${count} de 8 recuerdos`;
    $('progressPercent').textContent = `${Math.round(count / 8 * 100)}%`;
    $('progressFill').style.width = `${count / 8 * 100}%`;
    $('progressMessage').textContent = count === 8
      ? '✦ ¡Has iluminado las ocho estrellas! La carta te espera al final.'
      : count === 0 ? 'Cada estrella guarda una parte de esta historia.'
      : `Qué bonito: ya guardaste ${count} ${count === 1 ? 'recuerdo' : 'recuerdos'} en nuestro cielo.`;
    document.querySelectorAll('.constellation-node').forEach((node, i) => {
      node.classList.toggle('is-visited', state.visited.has(i));
      node.setAttribute('aria-pressed', state.visited.has(i) ? 'true' : 'false');
    });
    $('letterNudge').textContent = count === 8
      ? 'Las ocho estrellas ya brillan. Esta sorpresa es para ti. ✦'
      : 'Puedes abrirla cuando quieras; la historia también es tuya.';
  }

  function openChapter(index) {
    const chapter = gift.capitulos[index];
    $('chapterKicker').textContent = `ESTRELLA ${String(index + 1).padStart(2, '0')} · ${chapter.mes.toLocaleUpperCase('es-MX')}`;
    $('chapterIcon').textContent = chapter.icono;
    $('chapterTitle').textContent = chapter.titulo;
    $('chapterText').textContent = chapter.texto;
    $('chapterQuote').textContent = chapter.frase;
    $('nextChapter').textContent = index === 7 ? 'Ir a nuestra carta ↗' : 'Siguiente estrella ↗';
    $('nextChapter').onclick = () => {
      if (index === 7) {
        $('chapterDialog').close();
        document.getElementById('carta').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      } else {
        openChapter(index + 1);
      }
    };
    if (!$('chapterDialog').open) $('chapterDialog').showModal();

    const wasNew = !state.visited.has(index);
    state.visited.add(index);
    updateProgressDisplay();
    if (wasNew) {
      if (state.visited.size === 8 && !state.completedOnce) {
        state.completedOnce = true;
        launchConfetti(180);
        showToast('✦ ¡Tu constelación está completa!');
      } else {
        showToast(`✦ Estrella ${index + 1} guardada en nuestro cielo`);
      }
      saveProgress();
    }
  }

  function renderAlbum() {
    const all = gift.album || [];
    if (!all.length) return;
    const index = ((state.albumIndex % all.length) + all.length) % all.length;
    const moment = all[index];
    state.albumIndex = index;
    $('albumMomentTitle').textContent = moment.titulo;
    $('albumMomentDescription').textContent = moment.descripcion;
    $('albumCount').textContent = `${String(index + 1).padStart(2, '0')} — ${String(all.length).padStart(2, '0')}`;
    $('photoLabel').textContent = `RECUERDO ${String(index + 1).padStart(2, '0')}`;
    $('photoGlyph').textContent = moment.simbolo || '♡';
    const colors = [
      'radial-gradient(circle at 33% 29%,rgba(255,227,204,.65),transparent 27%),linear-gradient(145deg,#795a99,#bf8da8 55%,#e4b0a3)',
      'radial-gradient(circle at 65% 27%,rgba(252,224,193,.6),transparent 31%),linear-gradient(145deg,#996583,#e9b5a5 65%,#c18bb9)',
      'radial-gradient(circle at 45% 40%,rgba(255,245,211,.52),transparent 34%),linear-gradient(145deg,#514f8d,#8a86b8 60%,#c8a2bd)',
      'radial-gradient(circle at 27% 35%,rgba(255,236,202,.55),transparent 28%),linear-gradient(145deg,#bd7f9e,#eeb4b6 63%,#a07fac)'
    ];
    $('photoIllustration').style.background = colors[index % colors.length];
    const img = $('albumImage');
    const frame = $('photoFrame');
    img.hidden = true;
    $('photoIllustration').hidden = false;
    frame.classList.remove('photo-frame--panoramic');
    frame.style.removeProperty('--photo-backdrop');
    img.onload = () => {
      if (img.naturalWidth / img.naturalHeight > 1.4) {
        frame.classList.add('photo-frame--panoramic');
        frame.style.setProperty('--photo-backdrop', `url("${img.currentSrc}")`);
      }
      img.hidden = false;
      $('photoIllustration').hidden = true;
    };
    img.onerror = () => {
      frame.classList.remove('photo-frame--panoramic');
      frame.style.removeProperty('--photo-backdrop');
      img.hidden = true;
      $('photoIllustration').hidden = false;
    };
    if (moment.foto && typeof moment.foto === 'string') {
      img.alt = `Recuerdo ${index + 1}: ${moment.titulo}`;
      img.src = moment.foto;
    } else {
      img.removeAttribute('src');
      img.alt = '';
      frame.classList.remove('photo-frame--panoramic');
      frame.style.removeProperty('--photo-backdrop');
    }
    const dots = $('albumDots');
    dots.replaceChildren();
    all.forEach((item, i) => {
      const dot = document.createElement('button');
      dot.className = `album-dot${i === index ? ' is-active' : ''}`;
      dot.setAttribute('aria-label', `Ir al recuerdo ${i + 1}`);
      dot.setAttribute('aria-pressed', i === index ? 'true' : 'false');
      dot.type = 'button';
      dot.addEventListener('click', () => { state.albumIndex = i; renderAlbum(); });
      dots.append(dot);
    });
  }


  function showToast(message) {
    const toast = $('toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }

  function setUpDialogs() {
    $('chapterClose').addEventListener('click', () => $('chapterDialog').close());
    $('letterClose').addEventListener('click', () => $('letterDialog').close());
    $('envelopeBtn').addEventListener('click', () => {
      $('letterDialog').showModal();
    });
    for (const dialog of [$('chapterDialog'), $('letterDialog')]) {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
      });
    }
    $('grandFinale').addEventListener('click', () => {
      $('letterDialog').close();
      launchConfetti(250);
      $('finaleMessage').hidden = false;
      $('finaleDismiss').focus();
    });
    $('finaleDismiss').addEventListener('click', () => {
      $('finaleMessage').hidden = true;
      $('envelopeBtn').focus();
    });
    $('restartBtn').addEventListener('click', () => {
      state.visited.clear();state.openedReasons.clear();state.completedOnce = false;state.albumIndex = 0;
      saveProgress();updateProgressDisplay();renderAlbum();
      document.getElementById('inicio').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      showToast('✦ Tu cielo está listo para comenzar otra vez');
    });
    $('albumPrev').addEventListener('click', () => { state.albumIndex--;renderAlbum(); });
    $('albumNext').addEventListener('click', () => { state.albumIndex++;renderAlbum(); });
  }

  function setUpReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-revealed'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px 35px 0px' });
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  }

  function setUpStars() {
    const canvas = $('starfield');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let stars = [];
    let width = 0, height = 0, deviceScale = 1;
    const resize = () => {
      width = window.innerWidth;height = window.innerHeight;
      deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * deviceScale);
      canvas.height = Math.floor(height * deviceScale);
      ctx.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
      const number = Math.min(170, Math.max(70, Math.floor(width * height / 6400)));
      stars = Array.from({ length: number }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        r: Math.random() * 1.2 + .28, phase: Math.random() * Math.PI * 2,
        speed: Math.random() * .0008 + .0003,
        alpha: Math.random() * .34 + .14
      }));
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();
    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const alpha = reduceMotion ? star.alpha : star.alpha + Math.sin(t * star.speed + star.phase) * .15;
        ctx.beginPath();ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,235,242,${Math.max(.07, alpha).toFixed(3)})`;ctx.fill();
      }
      if (!reduceMotion) requestAnimationFrame(draw);
    };
    if (reduceMotion) draw(0); else requestAnimationFrame(draw);
  }

  function launchConfetti(amount = 150) {
    if (reduceMotion) {
      showToast('✦ Gracias por estos ocho meses');
      return;
    }
    const canvas = $('confetti');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth, h = window.innerHeight;
    canvas.width = Math.round(w * scale);canvas.height = Math.round(h * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    cancelAnimationFrame(confettiFrame);
    const palette = ['#ffe0c0', '#f5b0c8', '#c9baff', '#f4e2d7', '#f1c5e1'];
    const bits = Array.from({ length: amount }, (_, i) => ({
      x: Math.random() * w, y: -Math.random() * h - 10,
      size: Math.random() * 5 + 3, speed: Math.random() * 2.5 + 1.6,
      drift: Math.random() * 2 - 1, rotation: Math.random() * 6.28,
      twist: Math.random() * .075 - .0375, color: palette[i % palette.length]
    }));
    const start = performance.now();
    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      bits.forEach((b) => {
        b.y += b.speed;b.x += b.drift + Math.sin(b.y / 75) * .26;b.rotation += b.twist;
        ctx.save();ctx.translate(b.x, b.y);ctx.rotate(b.rotation);ctx.fillStyle = b.color;
        ctx.fillRect(-b.size / 2, -b.size / 2, b.size, b.size * .55);
        ctx.restore();
      });
      if (t - start < 7000 && bits.some((b) => b.y < h + 15)) confettiFrame = requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, w, h);
    }
    confettiFrame = requestAnimationFrame(frame);
  }

  loadProgress();
  fillPersonalizedText();
  renderMap();
  renderAlbum();
  
  setUpDialogs();
  setUpReveal();
  setUpStars();
})();
