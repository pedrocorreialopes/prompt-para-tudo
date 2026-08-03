const router = {
  routes: ['home', 'new', 'result', 'history', 'favorites', 'admin'],

  navigate(route) {
    if (!this.routes.includes(route)) route = 'home';
    window.location.hash = route;
    this.render(route);
  },

  render(route) {
    document.querySelectorAll('.view').forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('view-enter');
    });

    const target = document.getElementById(`view-${route}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('view-enter');
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('text-white', false);
      btn.classList.toggle('bg-white/10', false);
    });

    if (route === 'new') {
      flow.reset();
    }
    if (route === 'history') {
      historyManager.render();
    }
    if (route === 'favorites') {
      favoritesManager.render();
    }
    if (route === 'admin') {
      admin.showTab('categories');
    }
    if (route === 'home') {
      stats.updateHome();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const mobileMenu = {
  el: document.getElementById('mobile-menu'),
  toggle() {
    this.el.classList.toggle('hidden');
    this.el.classList.toggle('flex');
  },
  close() {
    this.el.classList.add('hidden');
    this.el.classList.remove('flex');
  }
};

const toast = {
  el: document.getElementById('toast'),
  msg: document.getElementById('toast-message'),
  timer: null,
  show(message, type = 'success') {
    this.msg.textContent = message;
    this.el.querySelector('i').setAttribute('data-lucide', type === 'error' ? 'alert-circle' : 'check-circle');
    this.el.classList.add('show');
    lucide.createIcons();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.el.classList.remove('show'), 3000);
  }
};

const modal = {
  el: document.getElementById('modal'),
  content: document.getElementById('modal-content'),
  show(html) {
    this.content.innerHTML = html;
    this.el.classList.remove('hidden');
    lucide.createIcons();
  },
  close() {
    this.el.classList.add('hidden');
    this.content.innerHTML = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  historyManager.load();
  favoritesManager.load();
  stats.updateHome();

  document.getElementById('mobile-menu-btn').addEventListener('click', () => mobileMenu.toggle());
  modal.el.addEventListener('click', (e) => { if (e.target === modal.el) modal.close(); });

  document.getElementById('history-search')?.addEventListener('input', () => historyManager.render());
  document.getElementById('favorites-search')?.addEventListener('input', () => favoritesManager.render());

  window.addEventListener('hashchange', () => {
    const route = window.location.hash.replace('#', '') || 'home';
    router.render(route);
  });

  // Initial route
  const initialRoute = window.location.hash.replace('#', '') || 'home';
  router.render(initialRoute);

  // Subtle GSAP entrance on home elements
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-badge', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' });
    gsap.from('h1', { opacity: 0, y: 30, duration: 1, delay: 0.1, ease: 'power3.out' });
    gsap.from('p', { opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    gsap.from('.glass-card', { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power3.out' });
  }
});

if (typeof window !== 'undefined') {
  window.router = router;
  window.mobileMenu = mobileMenu;
  window.toast = toast;
  window.modal = modal;
}
