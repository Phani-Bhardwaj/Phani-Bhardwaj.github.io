// Hero content fade-in on load
(function () {
  const heroContent = document.getElementById('hero-content');
  if (!heroContent) return;
  heroContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  requestAnimationFrame(() => {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  });
})();

// Smooth active-nav highlight on scroll (lightweight, no deps)
(function () {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current ? '' : '';
    });
  }, { passive: true });
})();
