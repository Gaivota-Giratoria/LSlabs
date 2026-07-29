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

  // 4. Formulário do WhatsApp
  // Altere o número padrão caso não vá buscar via API do servidor
  const WHATSAPP_NUMBER = '5516999999999';

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const negocio = document.getElementById('negocio').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      let texto = `Olá! Meu nome é ${nome}.`;
      if (negocio) texto += ` Tenho um negócio: ${negocio}.`;
      if (mensagem) texto += ` ${mensagem}`;
      

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
      window.open(url, '_blank');
    });
  }
});