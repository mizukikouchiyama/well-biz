'use strict';

/* ============================================================
   Hamburger Menu
============================================================ */
const hamburger  = document.getElementById('hamburger');
const navDrawer  = document.getElementById('navDrawer');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  navDrawer.classList.add('open');
  navOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  navDrawer.classList.remove('open');
  navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ============================================================
   Header — scroll shadow
============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 16);
}, { passive: true });

/* ============================================================
   Fade-in on Scroll (IntersectionObserver)
============================================================ */
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => fadeObserver.observe(el));

/* Trigger hero elements immediately after page load */
window.addEventListener('load', () => {
  document.querySelectorAll('#hero .fade-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 80 + i * 120);
  });
});

/* ============================================================
   FAQ Accordion
============================================================ */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    /* Close all */
    faqItems.forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    /* Open clicked (if it was closed) */
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ============================================================
   Smooth Scroll for anchor links
============================================================ */
const HEADER_HEIGHT = 72;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   Contact Form — placeholder submission
============================================================ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const company = contactForm.querySelector('#company').value.trim();
    const name    = contactForm.querySelector('#name').value.trim();
    const email   = contactForm.querySelector('#email').value.trim();

    if (!company || !name || !email) {
      alert('会社名・担当者名・メールアドレスは必須項目です。');
      return;
    }

    /* Placeholder — replace with actual submission logic */
    alert('お問い合わせありがとうございます。\n現在、送信機能は準備中です。\n連絡先情報が公開され次第、改めてご連絡いたします。');
  });
}
