// Geo Construction LLC — site interactions
(function () {
  // Header background on scroll
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  // Reveal on scroll (staggered within each group)
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

  // Quote form — validation only. Connect to a real backend
  // (Formspree, Netlify Forms, or your own endpoint) before launch.
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
      status.textContent = 'Please add your name and phone number.';
      status.className = 'form__status err';
      return;
    }
    status.textContent = "Thanks! We'll reach out within one business day.";
    status.className = 'form__status ok';
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
