document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualiza o ano no Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Menu Mobile (Burger Toggle)
  const burger = document.getElementById('burger');
  const navlinks = document.querySelector('.navlinks');

  if (burger && navlinks) {
    burger.addEventListener('click', () => {
      const isOpen = navlinks.style.display === 'flex';
      navlinks.style.display = isOpen ? 'none' : 'flex';
      navlinks.style.position = 'absolute';
      navlinks.style.top = '64px';
      navlinks.style.left = '0';
      navlinks.style.right = '0';
      navlinks.style.background = 'rgba(10,15,12,0.97)';
      navlinks.style.flexDirection = 'column';
      navlinks.style.padding = '24px 32px';
      navlinks.style.gap = '18px';
    });
  }

  // 3. Scroll Reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));


  // 3.5 Scroll suave customizado (com duração fixa, pra não ficar "seco")
  const SCROLL_DURATION = 700; // em ms — aumenta esse número pra ficar mais lento

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function smoothScrollTo(targetY) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION, 1);
      const eased = easeInOutQuad(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      const target = hash && hash !== '#' ? document.querySelector(hash) : null;
      if (!target) return;

      e.preventDefault();

      // scroll-margin-top do seu CSS já garante o respiro do header,
      // então a gente usa o mesmo cálculo que o navegador usaria
      const style = getComputedStyle(target);
      const scrollMarginTop = parseInt(style.scrollMarginTop) || 0;
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - scrollMarginTop;

      smoothScrollTo(targetY);

      if (window.innerWidth <= 900 && navlinks) {
        navlinks.style.display = 'none';
      }

      history.pushState(null, '', hash);
    });
  });

  // 4. Formulário do WhatsApp
  // Altere o número padrão caso não vá buscar via API do servidor
  const WHATSAPP_NUMBER = '5516991524109';

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const negocio = document.getElementById('negocio').value.trim();
      const contato = document.getElementById('contato').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      let texto = `Olá! Meu nome é ${nome}.`;
      if (negocio) texto += ` Tenho um negócio: ${negocio}.`;
      if (contato) texto += ` Prefiro ser contatado por: ${contato}.`;
      if (mensagem) texto += ` ${mensagem}`;
      

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
      window.open(url, '_blank');
    });
  }
});