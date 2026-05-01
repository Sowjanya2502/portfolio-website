// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== TYPEWRITER =====
const phrases = [
  'ML Engineer',
  'Data Scientist',
  'NLP Practitioner',
  'Deep Learning Enthusiast',
  'Fraud Detection Specialist',
];
const el = document.getElementById('typewriter');
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    el.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    el.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();

// ===== SEE MORE =====
const seeMoreBtn = document.getElementById('seeMoreBtn');
const seeMoreLabel = document.getElementById('seeMoreLabel');
const extraProjects = document.querySelectorAll('.extra-project');
let expanded = false;

// Hide extras on load
extraProjects.forEach(card => { card.style.display = 'none'; });

seeMoreBtn.addEventListener('click', () => {
  expanded = !expanded;
  extraProjects.forEach(card => {
    // Only toggle cards that are not filtered out
    if (!card.dataset.filteredOut) {
      card.style.display = expanded ? 'flex' : 'none';
    }
  });
  seeMoreLabel.textContent = expanded ? 'Show Less' : 'See More Projects';
  seeMoreBtn.classList.toggle('open', expanded);
});

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    // Collapse extras on filter change
    expanded = false;
    seeMoreBtn.classList.remove('open');
    seeMoreLabel.textContent = 'See More Projects';

    let anyExtrasVisible = false;

    projectCards.forEach(card => {
      const cats = card.dataset.category || '';
      const matches = filter === 'all' || cats.split(' ').includes(filter);
      const isExtra = card.classList.contains('extra-project');

      if (isExtra) {
        if (matches) {
          card.dataset.filteredOut = '';
          card.style.display = 'none'; // collapsed by default
          anyExtrasVisible = true;
        } else {
          card.dataset.filteredOut = 'true';
          card.style.display = 'none';
        }
      } else {
        card.style.display = matches ? 'flex' : 'none';
      }
    });

    seeMoreBtn.parentElement.style.display = anyExtrasVisible ? 'block' : 'none';
  });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.stat-card, .skill-category, .timeline-item, .project-card, .edu-card, .pub-card, .contact-card'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--text)'
      : '';
  });
});

// Mobile nav open style
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 900px) {
    .nav-links.open {
      display: flex !important;
      flex-direction: column;
      position: fixed;
      top: 64px; left: 0; right: 0;
      background: rgba(248,250,252,0.97);
      backdrop-filter: blur(16px);
      padding: 24px 32px 32px;
      gap: 20px;
      border-bottom: 1px solid var(--border);
      z-index: 99;
    }
  }
`;
document.head.appendChild(style);
