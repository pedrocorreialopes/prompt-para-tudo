const Storage = {
  get(key, fallback) {
    try {
      const item = localStorage.getItem(`pf_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(`pf_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error', e);
    }
  }
};

const historyManager = {
  list: [],

  load() {
    this.list = Storage.get('history', []);
  },

  add(promptData, result) {
    this.load();
    const entry = {
      id: promptData.id,
      title: promptData.title,
      categoryId: promptData.category.id,
      categoryName: promptData.category.name,
      answers: promptData.answers,
      createdAt: promptData.createdAt,
      result: result
    };
    this.list.unshift(entry);
    if (this.list.length > 100) this.list = this.list.slice(0, 100);
    Storage.set('history', this.list);
  },

  remove(id) {
    this.list = this.list.filter(i => i.id !== id);
    Storage.set('history', this.list);
    this.render();
  },

  clearAll() {
    if (!confirm('Tem certeza que deseja limpar todo o histórico?')) return;
    this.list = [];
    Storage.set('history', this.list);
    this.render();
  },

  duplicate(id) {
    const item = this.list.find(i => i.id === id);
    if (!item) return;
    flow.state.category = item.categoryId;
    flow.state.answers = { ...item.answers };
    flow.state.step = 2;
    router.navigate('new');
    flow.renderQuestions();
  },

  loadIntoResult(id) {
    const item = this.list.find(i => i.id === id);
    if (!item) return;
    generator.state.promptData = {
      id: item.id,
      title: item.title,
      category: APP_DATA.categories.find(c => c.id === item.categoryId) || { id: item.categoryId, name: item.categoryName },
      answers: item.answers,
      createdAt: item.createdAt
    };
    generator.state.result = item.result;
    generator.renderSelectors();
    generator.renderOutput();
    router.navigate('result');
  },

  render() {
    this.load();
    const list = document.getElementById('history-list');
    const empty = document.getElementById('history-empty');
    const search = document.getElementById('history-search')?.value.toLowerCase() || '';
    const filtered = this.list.filter(i =>
      i.title.toLowerCase().includes(search) ||
      i.categoryName.toLowerCase().includes(search) ||
      Object.values(i.answers).some(v => String(v).toLowerCase().includes(search))
    );

    if (!filtered.length) {
      list.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');

    list.innerHTML = filtered.map(item => this.cardHtml(item)).join('');
    lucide.createIcons();
  },

  cardHtml(item) {
    const date = new Date(item.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    return `
      <div class="history-card">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="tag">${item.categoryName}</span>
              <span class="text-xs text-slate-500">${date}</span>
            </div>
            <h3 class="text-lg font-semibold text-white">${flow.escape(item.title)}</h3>
          </div>
          <div class="flex gap-2">
            <button onclick="historyManager.loadIntoResult('${item.id}')" class="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-sm flex items-center gap-1">
              <i data-lucide="eye" class="w-4 h-4"></i> Ver
            </button>
            <button onclick="historyManager.duplicate('${item.id}')" class="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-sm flex items-center gap-1">
              <i data-lucide="copy" class="w-4 h-4"></i> Duplicar
            </button>
            <button onclick="historyManager.remove('${item.id}')" class="px-3 py-2 rounded-lg bg-white/5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm flex items-center gap-1">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }
};

const favoritesManager = {
  list: [],

  load() {
    this.list = Storage.get('favorites', []);
  },

  add(promptData, result) {
    this.load();
    if (this.list.find(i => i.id === promptData.id)) return;
    const entry = {
      id: promptData.id,
      title: promptData.title,
      categoryId: promptData.category.id,
      categoryName: promptData.category.name,
      answers: promptData.answers,
      createdAt: promptData.createdAt,
      result: result
    };
    this.list.unshift(entry);
    Storage.set('favorites', this.list);
    this.render();
  },

  remove(id) {
    this.list = this.list.filter(i => i.id !== id);
    Storage.set('favorites', this.list);
    this.render();
  },

  duplicate(id) {
    const item = this.list.find(i => i.id === id);
    if (!item) return;
    flow.state.category = item.categoryId;
    flow.state.answers = { ...item.answers };
    flow.state.step = 2;
    router.navigate('new');
    flow.renderQuestions();
  },

  loadIntoResult(id) {
    const item = this.list.find(i => i.id === id);
    if (!item) return;
    generator.state.promptData = {
      id: item.id,
      title: item.title,
      category: APP_DATA.categories.find(c => c.id === item.categoryId) || { id: item.categoryId, name: item.categoryName },
      answers: item.answers,
      createdAt: item.createdAt
    };
    generator.state.result = item.result;
    generator.renderSelectors();
    generator.renderOutput();
    router.navigate('result');
  },

  render() {
    this.load();
    const list = document.getElementById('favorites-list');
    const empty = document.getElementById('favorites-empty');
    const search = document.getElementById('favorites-search')?.value.toLowerCase() || '';
    const filtered = this.list.filter(i =>
      i.title.toLowerCase().includes(search) ||
      i.categoryName.toLowerCase().includes(search)
    );

    if (!filtered.length) {
      list.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');

    list.innerHTML = filtered.map(item => `
      <div class="history-card">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="tag">${item.categoryName}</span>
              <span class="text-xs text-slate-500">${new Date(item.createdAt).toLocaleString('pt-BR', { dateStyle: 'short' })}</span>
            </div>
            <h3 class="text-lg font-semibold text-white">${flow.escape(item.title)}</h3>
          </div>
          <div class="flex gap-2">
            <button onclick="favoritesManager.loadIntoResult('${item.id}')" class="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-sm flex items-center gap-1">
              <i data-lucide="eye" class="w-4 h-4"></i> Ver
            </button>
            <button onclick="favoritesManager.duplicate('${item.id}')" class="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-sm flex items-center gap-1">
              <i data-lucide="copy" class="w-4 h-4"></i> Duplicar
            </button>
            <button onclick="favoritesManager.remove('${item.id}')" class="px-3 py-2 rounded-lg bg-white/5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm flex items-center gap-1">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
    lucide.createIcons();
  }
};

const stats = {
  get() {
    return Storage.get('stats', { prompts: 0, byCategory: {} });
  },
  set(value) {
    Storage.set('stats', value);
  },
  increment(key) {
    const s = this.get();
    s[key] = (s[key] || 0) + 1;
    this.set(s);
    this.updateHome();
  },
  incrementByCategory(categoryId) {
    const s = this.get();
    s.byCategory[categoryId] = (s.byCategory[categoryId] || 0) + 1;
    this.set(s);
  },
  updateHome() {
    const s = this.get();
    const el = document.getElementById('stat-prompts');
    if (el) el.textContent = s.prompts || 0;
  }
};

if (typeof window !== 'undefined') {
  window.Storage = Storage;
  window.historyManager = historyManager;
  window.favoritesManager = favoritesManager;
  window.stats = stats;
}
