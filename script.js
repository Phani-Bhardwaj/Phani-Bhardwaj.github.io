// Boot-sequence terminal animation — replays the 5-agent pipeline as a CI-style log
(function () {
  const lines = [
    { text: '$ ./run.sh --target test_configs/vulnerable', cls: '' },
    { text: 'Booting DevSecOps AI Agent pipeline...', cls: 'dim' },
    { text: '', cls: '' },
    { text: '[1/5] parser_agent       → extracting IaC resources...', cls: '' },
    { text: '      ✓ found 14 resources (main.tf, deployment.yaml)', cls: 'accent-green' },
    { text: '[2/5] security_scanner   → Checkov + Groq LLM reasoning...', cls: '' },
    { text: '      ✓ 50+ raw findings → triaged to 6 actionable', cls: 'accent-green' },
    { text: '[3/5] rag_knowledge      → retrieving CIS benchmark context...', cls: '' },
    { text: '      ✓ grounded in knowledge_base/security_knowledge.json', cls: 'accent-green' },
    { text: '[4/5] remediation_agent  → generating cited fixes...', cls: '' },
    { text: '[5/5] report_agent       → compiling markdown report...', cls: '' },
    { text: '', cls: '' },
    { text: 'Pipeline complete. 3 CRITICAL, 3 HIGH findings.', cls: 'accent-orange' },
    { text: '> ready_', cls: 'accent-green' },
  ];

  const body = document.getElementById('terminal-body');
  const heroContent = document.getElementById('hero-content');

  // Hero content (name, CTA) appears immediately — it never waits on the animation.
  if (heroContent) {
    heroContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    requestAnimationFrame(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    });
  }

  if (!body) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    body.innerHTML = lines.map(l => `<span class="line ${l.cls}">${l.text}</span>`).join('');
    return;
  }

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) return;
    const lineData = lines[lineIndex];
    const span = document.createElement('span');
    span.className = 'line ' + lineData.cls;
    body.appendChild(span);

    let charIndex = 0;
    const text = lineData.text;

    if (text === '') {
      span.innerHTML = '&nbsp;';
      lineIndex++;
      setTimeout(typeLine, 40);
      return;
    }

    // Fast typing — whole boot sequence finishes in ~2s
    function typeChar() {
      if (charIndex < text.length) {
        span.textContent += text[charIndex];
        charIndex++;
        setTimeout(typeChar, 4);
      } else {
        lineIndex++;
        setTimeout(typeLine, lineData.text.startsWith('[') ? 90 : 30);
      }
    }
    typeChar();
  }

  setTimeout(typeLine, 150);
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
