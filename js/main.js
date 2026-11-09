/* =====================================================================
 * EcoQuant — scripts du site (JavaScript simple, sans outil ni installation)
 * ---------------------------------------------------------------------
 * Chargé par toutes les pages : <script defer src="js/main.js"></script>
 * Chaque partie ne fait rien si les éléments qu'elle cible sont absents.
 * ===================================================================== */
(function () {
  'use strict';

  /* ===================== Langue de la page (FR / EN) ===================== */

  /* La langue vient de <html lang="…"> : « fr » pour les pages à la racine, « en » pour celles de en/. */
  const LANG = (document.documentElement.lang || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';
  const LOCALE = LANG === 'en' ? 'en-US' : 'fr-FR';
  const I18N = {
    fr: {
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      copied: 'Copié !',
      copyFailed: 'Copie impossible',
      copiedStatus: 'Adresse copiée dans le presse-papiers.',
      copyFailedStatus: 'Copie impossible : sélectionnez le texte manuellement.',
      linkCopied: 'Lien copié !',
      linkCopiedStatus: 'Lien du site copié dans le presse-papiers.',
    },
    en: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      copied: 'Copied!',
      copyFailed: 'Copy failed',
      copiedStatus: 'Address copied to the clipboard.',
      copyFailedStatus: 'Copy failed: please select the text manually.',
      linkCopied: 'Link copied!',
      linkCopiedStatus: 'Site link copied to the clipboard.',
    },
  };
  const t = (key) => I18N[LANG][key];

  /* ===================== Préférences du système (mouvement réduit, souris) (env) ===================== */

  /* Préférences de l'utilisateur, lues une fois au chargement (et suivies en direct). */
  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  const prefersReducedMotion = () => reducedQuery.matches;
  const hasFinePointer = () => finePointerQuery.matches;
  function onReducedMotionChange(cb) {
    reducedQuery.addEventListener('change', (e) => cb(e.matches));
  }

  /* ===================== Menu de navigation (mobile) (nav) ===================== */

  /* Barre de navigation : condensée au défilement + menu mobile accessible. */
  function initNav() {
    const header = document.querySelector('[data-header]');
    if (!header)
      return;
    // --- Condensation au scroll (rAF, passif) ---
    let ticking = false;
    const update = () => {
      header.classList.toggle('is-condensed', window.scrollY > 24);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
    // --- Menu mobile ---
    const toggle = header.querySelector('.nav-toggle');
    const menu = header.querySelector('#nav-links');
    if (!toggle || !menu)
      return;
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? t('closeMenu') : t('openMenu'));
      header.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a'))
        setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (header.classList.contains('is-open') && !header.contains(e.target))
        setOpen(false);
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => {
      if (e.matches)
        setOpen(false);
    });
  }

  /* ===================== Apparition des blocs au défilement (reveal) ===================== */

  /* Apparition douce des blocs `.reveal` au défilement (désactivée si mouvement réduit). */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length)
      return;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    document.documentElement.classList.add('reveal-ready');
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting)
          continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el, i) => {
      // Léger décalage pour les éléments d'une même grille.
      el.style.setProperty('--reveal-delay', `${(i % 3) * 70}ms`);
      io.observe(el);
    });
  }

  /* ===================== Reflets sur les cartes « verre » (sheen) ===================== */

  /* Reflet qui suit le pointeur sur les boutons et cartes en verre.
   * Écrit --mx / --my (en %) ; désactivé au tactile et en mouvement réduit. */
  const SELECTOR = '.btn, .glass-interactive';
  function initSheen() {
    if (!hasFinePointer() || prefersReducedMotion())
      return;
    document.documentElement.classList.add('has-sheen');
    document.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse')
        return;
      const el = e.target?.closest(SELECTOR);
      if (!el)
        return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    }, { passive: true });
  }
  /** Réfraction SVG (feDisplacementMap) en backdrop-filter : Chromium uniquement, sinon flou classique. */
  function initRefraction() {
    const target = document.querySelector('[data-refract]');
    if (!target || prefersReducedMotion())
      return;
    const isChromium = 'userAgentData' in navigator;
    const ok = isChromium && CSS.supports('backdrop-filter', 'url(#liquid-refraction) blur(1px)');
    if (ok)
      target.classList.add('is-refracting');
  }

  /* ===================== FAQ (faq) ===================== */

  /* FAQ : <details> natif (fonctionne sans JS). Amélioration : un seul volet ouvert à la fois. */
  function initFaq() {
    const list = document.querySelectorAll('.faq details');
    list.forEach((d) => {
      d.addEventListener('toggle', () => {
        if (!d.open)
          return;
        list.forEach((other) => {
          if (other !== d && other.open)
            other.open = false;
        });
      });
    });
  }

  /* ===================== Section « Installer » : bouton copier (install) ===================== */

  /* Section « Télécharger l'extension » : bouton copier `chrome://extensions/`. */
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    }
    catch {
      /* repli ci-dessous */
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.append(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    }
    catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
  function initInstall() {
    document.querySelectorAll('[data-copy]').forEach((btn) => {
      const label = btn.querySelector('[data-copy-label]');
      const status = document.getElementById(btn.getAttribute('aria-describedby') ?? '');
      const initial = label?.textContent ?? '';
      let timer = 0;
      btn.hidden = false;
      btn.addEventListener('click', async () => {
        const ok = await copyText(btn.dataset.copy ?? '');
        const msg = ok ? t('copied') : t('copyFailed');
        if (label)
          label.textContent = msg;
        if (status)
          status.textContent = ok ? t('copiedStatus') : t('copyFailedStatus');
        btn.classList.toggle('is-copied', ok);
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          if (label)
            label.textContent = initial;
          btn.classList.remove('is-copied');
        }, 2000);
      });
    });
  }

  /* ===================== Démo de la fenêtre d'alerte (compte à rebours) (alert-demo) ===================== */

  /* Maquette de la fenêtre d'alerte : compte à rebours en boucle (10:00 → 00:00). */
  const pad = (n) => String(n).padStart(2, '0');
  function initAlertDemo() {
    const el = document.getElementById('mock-cd');
    if (!el)
      return;
    let remaining = 9 * 60 + 58;
    let timer = 0;
    const tick = () => {
      remaining = remaining <= 0 ? 600 : remaining - 1;
      el.textContent = `${pad(Math.floor(remaining / 60))}:${pad(remaining % 60)}`;
    };
    const start = () => {
      if (!timer)
        timer = window.setInterval(tick, 1000);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    // Ne tourne que lorsque la maquette est visible et l'onglet actif.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop())).observe(el);
    }
    else {
      start();
    }
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  }

  /* ===================== Démo du calculateur de position (calculator) ===================== */

  /* Démo du calculateur de position (EUR/USD, compte en EUR, taux fixe illustratif).
   * Même logique que l'extension : lots arrondis vers le bas au pas de 0,01. */
  /** Taux EUR/USD fixe pour la démo (l'extension, elle, utilise le taux BCE du jour). */
  const DEMO_EURUSD = 1.08;
  /** Valeur d'un pip pour 1 lot standard sur EUR/USD, en USD. */
  const PIP_VALUE_USD_PER_LOT = 10;
  const LOT_STEP = 0.01;
  function computePosition({ capital, riskPercent, stopPips }, rate = DEMO_EURUSD) {
    if (![capital, riskPercent, stopPips].every((v) => Number.isFinite(v) && v > 0) || riskPercent > 100)
      return null;
    const pipPerLotEur = PIP_VALUE_USD_PER_LOT / rate;
    const riskBudget = (capital * riskPercent) / 100;
    const raw = riskBudget / (stopPips * pipPerLotEur);
    const lots = Math.floor(raw / LOT_STEP + 1e-9) * LOT_STEP;
    return { riskBudget, lots, riskedAmount: lots * stopPips * pipPerLotEur, pipValue: lots * pipPerLotEur };
  }
  const nf = (digits) => new Intl.NumberFormat(LOCALE, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const money = nf(2);
  const lotsFmt = nf(2);
  function initCalculator() {
    const form = document.querySelector('[data-calc]');
    if (!form)
      return;
    const field = (name) => form.querySelector(`[name="${name}"]`);
    const out = (name) => form.querySelector(`output[name="${name}"]`);
    const capital = field('capital');
    const risk = field('risk');
    const stop = field('stop');
    if (!capital || !risk || !stop)
      return;
    const parse = (el) => Number.parseFloat(el.value.replace(',', '.'));
    const set = (name, text) => {
      const o = out(name);
      if (o)
        o.value = text;
    };
    const render = () => {
      const r = computePosition({ capital: parse(capital), riskPercent: parse(risk), stopPips: parse(stop) });
      form.classList.toggle('is-invalid', r === null);
      if (!r) {
        ['lots', 'budget', 'risked', 'pip'].forEach((n) => set(n, '—'));
        return;
      }
      set('lots', `${lotsFmt.format(r.lots)} lot${r.lots >= 2 ? 's' : ''}`);
      set('budget', `${money.format(r.riskBudget)} EUR`);
      set('risked', `≈ ${money.format(r.riskedAmount)} EUR`);
      set('pip', `≈ ${money.format(r.pipValue)} EUR`);
    };
    form.addEventListener('input', render);
    form.addEventListener('submit', (e) => e.preventDefault());
    render();
  }

  /* ===================== Partager (share) ===================== */

  /* Section « Partager » : les liens WhatsApp, X, LinkedIn… marchent sans JavaScript.
   * Le script ajoute seulement « Copier le lien » et, sur téléphone, le menu de partage natif. */
  function initShare() {
    document.querySelectorAll('[data-share]').forEach((group) => {
      const url = group.dataset.shareUrl || location.href;
      const card = group.closest('.share-card') || document;
      const status = card.querySelector('[data-share-status]');

      const native = group.querySelector('[data-share-native]');
      if (native && typeof navigator.share === 'function') {
        native.hidden = false;
        native.addEventListener('click', async () => {
          try {
            await navigator.share({ title: group.dataset.shareTitle || document.title, text: group.dataset.shareText || '', url });
          } catch {
            /* partage annulé par l'utilisateur : rien à faire */
          }
        });
      }

      const copy = group.querySelector('[data-share-copy]');
      if (copy) {
        const label = copy.querySelector('[data-copy-label]');
        const initial = label?.textContent ?? '';
        let timer = 0;
        copy.hidden = false;
        copy.addEventListener('click', async () => {
          const ok = await copyText(url);
          if (label) label.textContent = ok ? t('linkCopied') : t('copyFailed');
          if (status) status.textContent = ok ? t('linkCopiedStatus') : t('copyFailedStatus');
          copy.classList.toggle('is-copied', ok);
          window.clearTimeout(timer);
          timer = window.setTimeout(() => {
            if (label) label.textContent = initial;
            copy.classList.remove('is-copied');
          }, 2000);
        });
      }
    });
  }

  /* ===================== Démarrage ===================== */

  initNav();
  initReveal();
  initSheen();
  initRefraction();
  initFaq();
  initInstall();
  initAlertDemo();
  initCalculator();
  initShare();
})();
