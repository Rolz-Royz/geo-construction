// Geo Construction LLC — site interactions
(function () {
  // ---------- Language (EN / ES) ----------
  const dict = window.GEO_I18N || { es: {}, en: {} };
  const textNodes = document.querySelectorAll('[data-i18n]');
  const phNodes = document.querySelectorAll('[data-i18n-placeholder]');
  const titleEl = document.querySelector('title');
  const descEl = document.querySelector('meta[name="description"]');

  // English lives in the HTML; remember it so we can switch back.
  textNodes.forEach((el) => { el.dataset.en = el.innerHTML; });
  phNodes.forEach((el) => { el.dataset.enPh = el.placeholder; });
  const enTitle = titleEl.textContent;
  const enDesc = descEl.content;

  let lang = document.documentElement.lang === 'es' ? 'es' : 'en';
  const t = (key) => (dict[lang] && dict[lang][key]) || (dict.en && dict.en[key]) || '';

  function applyLang(next, persist) {
    lang = next;
    document.documentElement.lang = lang;
    const es = lang === 'es';
    textNodes.forEach((el) => {
      const val = es ? dict.es[el.dataset.i18n] : el.dataset.en;
      if (val != null) el.innerHTML = val;
    });
    phNodes.forEach((el) => {
      el.placeholder = es ? dict.es[el.dataset.i18nPlaceholder] || el.dataset.enPh : el.dataset.enPh;
    });
    titleEl.textContent = es ? dict.es['meta.title'] : enTitle;
    descEl.content = es ? dict.es['meta.description'] : enDesc;
    document.querySelectorAll('.lang__btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    toggle && toggle.setAttribute('aria-label', t(nav.classList.contains('is-open') ? 'aria.menuClose' : 'aria.menuOpen'));
    const status = document.getElementById('formStatus');
    if (status) { status.textContent = ''; status.className = 'form__status'; }
    if (persist) {
      try { localStorage.setItem('geo-lang', lang); } catch (e) {}
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    }
  }

  document.querySelectorAll('.lang__btn').forEach((btn) =>
    btn.addEventListener('click', () => applyLang(btn.dataset.lang, true))
  );

  // ---------- Header background on scroll ----------
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Mobile nav ----------
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', t(open ? 'aria.menuClose' : 'aria.menuOpen'));
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', t('aria.menuOpen'));
    })
  );

  applyLang(lang, false);

  // ---------- Reveal on scroll (staggered within each group) ----------
  // Only elements below the first screen wait for scroll; everything visible on load stays visible.
  const items = [...document.querySelectorAll('.reveal')].filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('is-pending'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const siblings = [...entry.target.parentElement.children].filter((el) => el.classList.contains('reveal'));
          entry.target.style.transitionDelay = `${Math.min(siblings.indexOf(entry.target), 6) * 70}ms`;
          entry.target.classList.remove('is-pending');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    items.forEach((el) => io.observe(el));
  }

  // ---------- Quote form ----------
  // Validation only. Connect to a real backend (Formspree, Netlify Forms, or your own endpoint) before launch.
  const form = document.getElementById('quoteForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach((field) => {
      const bad = !field.value.trim();
      field.classList.toggle('is-invalid', bad);
      if (bad) valid = false;
    });
    if (!valid) {
      status.textContent = t('form.err');
      status.className = 'form__status err';
      return;
    }
    status.textContent = t('form.ok');
    status.className = 'form__status ok';
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
