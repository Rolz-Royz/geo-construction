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

  // ---------- Contact details ----------
  // config.js owns the phone and email. index.html ships the same values inline so the
  // page is right before this runs; here they are pushed to every marked link at once.
  const cfg = window.GEO_CONFIG || {};
  const telLinks = [...document.querySelectorAll('a[data-contact="tel"]')];
  const mailLinks = [...document.querySelectorAll('a[data-contact="email"]')];
  const numNodes = [...document.querySelectorAll('[data-contact-num]')];
  const inlineTel = telLinks.map((a) => a.getAttribute('href'));
  const inlineNum = numNodes.map((el) => el.textContent.trim());
  const inlineMail = mailLinks.map((a) => a.getAttribute('href'));

  if (cfg.tel) telLinks.forEach((a) => { a.href = 'tel:' + cfg.tel; });
  if (cfg.phone) numNodes.forEach((el) => { el.textContent = cfg.phone; });
  if (cfg.email) mailLinks.forEach((a) => { a.href = 'mailto:' + cfg.email; a.textContent = cfg.email; });

  // A bare phone number reads as a string of digits; say who is being called.
  function labelContacts() {
    telLinks.forEach((a) => a.setAttribute('aria-label', t('aria.call') + ' ' + (cfg.phone || a.textContent.trim())));
    mailLinks.forEach((a) => a.setAttribute('aria-label', t('aria.email') + ' ' + (cfg.email || a.textContent.trim())));
  }

  // Pre-launch reminders, local development only — never in a visitor's console.
  if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:') {
    if (cfg.contactIsPlaceholder) {
      console.warn('Geo Construction: phone and email in config.js are still placeholders. Replace them before launch.');
    }
    const stale =
      inlineTel.filter((h) => cfg.tel && h !== 'tel:' + cfg.tel).length +
      inlineNum.filter((n) => cfg.phone && n !== cfg.phone).length +
      inlineMail.filter((h) => cfg.email && h !== 'mailto:' + cfg.email).length;
    if (stale) {
      console.warn(
        'Geo Construction: ' + stale + ' contact value(s) in index.html no longer match config.js. ' +
        'Visitors see the config.js value, but update the inline copies (and the JSON-LD block) so the page is right without JavaScript.'
      );
    }
  }

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
    labelContacts();
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

  // ---------- Build sequence ----------
  // Desktop: one sticky photo follows whichever step sits in the middle band of the
  // viewport; the new frame wipes up over the previous one. Phones show each step's
  // own photo instead, so nothing here is needed for the content to make sense.
  const build = document.querySelector('.build__steps');
  if (build && 'IntersectionObserver' in window) {
    const steps = [...build.querySelectorAll('.build__step')];
    const frames = [...document.querySelectorAll('.build__frame')];
    const now = document.querySelector('.build__now');
    let current = 0;
    const show = (i) => {
      if (i === current) return;
      frames.forEach((f) => f.classList.remove('was-active'));
      frames[current].classList.replace('is-active', 'was-active');
      frames[i].classList.add('is-active');
      steps.forEach((s, k) => {
        s.classList.toggle('is-active', k === i);
        s.classList.toggle('is-done', k < i);
      });
      build.style.setProperty('--progress', (i / (steps.length - 1)).toFixed(3));
      if (now) now.textContent = String(i + 1).padStart(2, '0');
      current = i;
    };
    const stepIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) show(steps.indexOf(e.target)); }),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    steps.forEach((s) => stepIO.observe(s));
    // Hidden frames never count as "near the viewport", so lazy loading would hold them
    // back until the wipe had already played. Fetch them as the section approaches.
    const warm = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      frames.forEach((f) => { f.loading = 'eager'; });
      warm.disconnect();
    }, { rootMargin: '800px 0px' });
    warm.observe(build);
  }

  // ---------- Quote form ----------
  // The form reports success only when a configured endpoint accepts it. With no
  // endpoint set it must never say the request was received, because nothing
  // received it; instead it hands the visitor a filled-in text or email draft.
  const form = document.getElementById('quoteForm');
  const status = document.getElementById('formStatus');
  const handoff = document.getElementById('formHandoff');
  const submitBtn = document.getElementById('formSubmit');
  const langField = document.getElementById('formLang');
  const endpoint = (cfg.formEndpoint || '').trim();

  const setStatus = (key, kind) => {
    status.textContent = t(key);
    status.className = 'form__status' + (kind ? ' ' + kind : '');
  };

  // Field labels already ship in both languages in the DOM, so the message the
  // visitor sends is built from them rather than from a second set of strings.
  function labelFor(field) {
    // A radio's own label is its option text ("Residential"), so the group name
    // has to come from the fieldset legend instead.
    const wrap = field.type === 'radio'
      ? field.closest('fieldset')
      : field.closest('label') || field.closest('fieldset');
    const tag = wrap && wrap.querySelector('legend, span');
    return tag ? tag.textContent.trim() : field.name;
  }

  function summary() {
    const lines = [];
    form.querySelectorAll('input, select, textarea').forEach((field) => {
      if (field.type === 'hidden' || field.type === 'submit') return;
      if (field.type === 'radio' && !field.checked) return;
      // Selects carry English values for the crew; the visitor proof-reads this
      // draft before sending, so show them the option in the language they chose.
      const val = field.tagName === 'SELECT' && field.selectedOptions[0]
        ? field.selectedOptions[0].textContent.trim()
        : (field.value || '').trim();
      if (!val) return;
      lines.push(labelFor(field) + ': ' + val);
    });
    return t('form.smsIntro') + '\n' + lines.join('\n');
  }

  function showHandoff() {
    const body = summary();
    const tel = (cfg.tel || '').replace(/[^+\d]/g, '');
    // "?&body=" is the spelling that works on both iOS and Android.
    document.getElementById('formSms').href = 'sms:' + tel + '?&body=' + encodeURIComponent(body);
    document.getElementById('formMail').href =
      'mailto:' + (cfg.email || '') +
      '?subject=' + encodeURIComponent(t('form.mailSubject')) +
      '&body=' + encodeURIComponent(body);
    handoff.hidden = false;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    handoff.hidden = true;

    let firstBad = null;
    form.querySelectorAll('[required]').forEach((field) => {
      const bad = !field.value.trim();
      field.classList.toggle('is-invalid', bad);
      field.setAttribute('aria-invalid', String(bad));
      if (bad && !firstBad) firstBad = field;
    });
    if (firstBad) {
      setStatus('form.err', 'err');
      firstBad.focus();
      return;
    }

    if (langField) langField.value = lang;

    // Hosted on Base44 the page provides its own sender, which stores the lead in
    // the app's database. Same honesty rule: success only when the save succeeds.
    if (typeof window.GEO_SUBMIT === 'function') {
      setStatus('form.sending', '');
      submitBtn.disabled = true;
      try {
        await window.GEO_SUBMIT(Object.fromEntries(new FormData(form)));
        setStatus('form.ok', 'ok');
        form.reset();
      } catch (err) {
        setStatus('form.failed', 'err');
        showHandoff();
      } finally {
        submitBtn.disabled = false;
      }
      return;
    }

    if (!endpoint) {
      // Nothing to submit to. Say so plainly and give the lead a real way out.
      setStatus('form.ready', 'ok');
      showHandoff();
      return;
    }

    setStatus('form.sending', '');
    submitBtn.disabled = true;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setStatus('form.ok', 'ok');
      form.reset();
    } catch (err) {
      // A failed send is still a real lead; never drop it silently.
      setStatus('form.failed', 'err');
      showHandoff();
    } finally {
      submitBtn.disabled = false;
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
