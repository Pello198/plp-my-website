// main.js - small helper functions demonstrating scope, parameters, returns, and triggers

// Global variable (demonstrates global scope)
const siteYearEl = document.getElementById('year');
if (siteYearEl) siteYearEl.textContent = new Date().getFullYear();

// NAV TOGGLE (mobile)
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });
}

/* ---------- Form validation (contact page) ----------
   Demonstrates:
   - function with parameters and return value
   - local vs global variables
   - DOM interaction
*/
function validateEmail(email) {
  // simple email regex — returns true/false
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validateFormData(name, email, message) {
  let errors = [];
  if (!name || name.trim().length < 2) errors.push('Please enter your name (2+ characters).');
  if (!validateEmail(email)) errors.push('Please enter a valid email.');
  if (!message || message.trim().length < 10) errors.push('Message should be at least 10 characters.');
  return errors; // array returned; empty means valid
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageField = document.getElementById('messageField').value;
    const resultEl = document.getElementById('formResult');

    const errors = validateFormData(name, email, messageField);
    if (errors.length) {
      resultEl.textContent = errors.join(' ');
      resultEl.style.color = 'crimson';
      return;
    }

    // Simulate sending...
    resultEl.textContent = 'Message sent — thank you! (This is a demo.)';
    resultEl.style.color = 'green';
    contactForm.reset();
  });
}

/* ---------- Small reusable helper: add a class for animation ----------
   Example usage: document.querySelector('.card').classList.add('animated');
   Demonstrates parameters + no global side-effects.
*/
function addTemporaryClass(el, className, seconds) {
  if (!el) return false; // returns false to indicate no-op
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), seconds * 1000);
  return true; // indicates success
}

// Example: add small effect to first service card on load
document.addEventListener('DOMContentLoaded', () => {
  const firstCard = document.querySelector('.service-card');
  if (firstCard) addTemporaryClass(firstCard, 'highlight', 1.2);
});

/* Accessibility: close nav when clicking a nav link (mobile) */
document.querySelectorAll('.nav-list a').forEach(a => {
  a.addEventListener('click', () => {
    if (navList.classList.contains('show')) {
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
