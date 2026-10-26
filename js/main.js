// Bishop Solutions — minimal site JS
// Handles: mobile nav toggle, active link highlighting, year stamp, form submit stub.

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Mobile nav toggle
  const toggle = $('.nav-toggle');
  const links = $('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Active link
  const path = (window.location.pathname.replace(/\/$/, '') || '/').split('/').pop() || 'index.html';
  $$('.nav-links a').forEach((a) => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  // Year stamp
  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  // Contact form (progressive enhancement -> mailto)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const status = form.querySelector('.form-status');
      if (btn) btn.disabled = true;
      const data = new FormData(form);
      const subject = encodeURIComponent(`Inquiry from ${data.get('name') || 'website'}`);
      const body = encodeURIComponent(
        `From: ${data.get('name') || ''}\nEmail: ${data.get('email') || ''}\nCompany: ${data.get('company') || ''}\nTopic: ${data.get('topic') || ''}\n\n${data.get('message') || ''}`
      );
      const mailto = `mailto:hello@bishop.solutions?subject=${subject}&body=${body}`;
      if (status) { status.textContent = 'Opening your email client…'; status.style.color = 'var(--muted)'; }
      window.location.href = mailto;
      setTimeout(() => { if (btn) btn.disabled = false; }, 1500);
    });
  }
})();
