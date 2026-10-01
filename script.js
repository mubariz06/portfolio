// Mobile menu toggle
const menu = document.getElementById('menu');
const links = document.getElementById('links');

menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
links.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }
});

// Highlight the nav link for the section currently in view
const navLinks = [...links.querySelectorAll('a[href^="#"]')];
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)
      );
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Theme toggle (remembers choice when storage is available)
const root = document.documentElement;
document.getElementById('theme').addEventListener('click', () => {
  const current = root.dataset.theme ||
    (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Copy email to clipboard
const copyBtn = document.getElementById('copy');
copyBtn.addEventListener('click', async () => {
  const label = copyBtn.querySelector('h3');
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
    label.textContent = 'Copied ✓';
  } catch (e) {
    label.textContent = copyBtn.dataset.email;
  }
  copyBtn.classList.add('done');
  setTimeout(() => { label.textContent = 'Copy email address'; copyBtn.classList.remove('done'); }, 2000);
});

