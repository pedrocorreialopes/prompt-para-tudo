const flow = {
  state: {
    category: null,
    answers: {},
    step: 1
  },

  reset() {
    this.state = { category: null, answers: {}, step: 1 };
    this.renderCategories();
    this.updateProgress();
    this.showStep('category');
  },

  init() {
    this.renderCategories();
  },

  renderCategories() {
    const grid = document.getElementById('category-grid');
    if (!grid) return;

    const groups = { digital: 'Digital', content: 'Conteúdo', marketing: 'Marketing', creative: 'Criativo', ai: 'IA', other: 'Outro' };
    grid.innerHTML = '';

    Object.entries(groups).forEach(([groupId, groupName]) => {
      const cats = APP_DATA.categories.filter(c => c.group === groupId);
      if (!cats.length) return;

      const groupLabel = document.createElement('div');
      groupLabel.className = 'col-span-full text-xs font-semibold text-slate-500 uppercase tracking-wider mt-4 mb-1';
      groupLabel.textContent = groupName;
      grid.appendChild(groupLabel);

      cats.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.dataset.id = cat.id;
        card.innerHTML = `
          <div class="icon-wrapper">
            <i data-lucide="${cat.icon}" class="w-6 h-6 text-slate-300"></i>
          </div>
          <div class="cat-title font-medium text-sm text-slate-200">${cat.name}</div>
        `;
        card.addEventListener('click', () => this.selectCategory(cat.id));
        grid.appendChild(card);
      });
    });

    lucide.createIcons();
  },

  selectCategory(id) {
    this.state.category = id;
    this.state.answers = {};
    this.state.step = 2;

    document.querySelectorAll('.category-card').forEach(c => c.classList.toggle('selected', c.dataset.id === id));
    setTimeout(() => this.renderQuestions(), 200);
  },

  getQuestionDef(id) {
    if (typeof id === 'object') return id;
    return APP_DATA.sharedFields[id] || { id, label: id, type: 'text' };
  },

  getVisibleQuestions() {
    const list = APP_DATA.questions[this.state.category] || APP_DATA.questions.other;
    return list.map(q => this.getQuestionDef(q)).filter(q => this.shouldShow(q));
  },

  shouldShow(q) {
    if (!q.when) return true;
    return q.when(this.state.answers);
  },

  renderQuestions() {
    const questions = this.getVisibleQuestions();
    const title = document.getElementById('questions-title');
    const cat = APP_DATA.categories.find(c => c.id === this.state.category);
    if (title) title.textContent = cat ? `Perguntas: ${cat.name}` : 'Perguntas';

    const form = document.getElementById('questions-form');
    form.innerHTML = '';

    questions.forEach((q, idx) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'question-item glass-card rounded-xl p-5 step-enter';
      wrapper.style.animationDelay = `${idx * 50}ms`;
      wrapper.innerHTML = this.renderQuestionHTML(q);
      form.appendChild(wrapper);
    });

    this.bindQuestionEvents(form);
    this.updateProgress();
    this.showStep('questions');
    lucide.createIcons();
  },

  renderQuestionHTML(q) {
    const value = this.state.answers[q.id];
    let inputHtml = '';

    const label = `<label class="block text-sm font-medium text-white mb-2">${q.label}${q.required ? ' <span class="text-[#3B82F6]">*</span>' : ''}</label>`;

    switch (q.type) {
      case 'text':
      case 'number':
      case 'email':
      case 'url':
        inputHtml = `<input type="${q.type}" id="q-${q.id}" data-id="${q.id}" value="${this.escape(value || '')}" placeholder="${this.escape(q.placeholder || '')}" class="${q.required ? 'required' : ''}">`;
        break;
      case 'textarea':
        inputHtml = `<textarea id="q-${q.id}" data-id="${q.id}" rows="3" placeholder="${this.escape(q.placeholder || '')}" class="${q.required ? 'required' : ''}">${this.escape(value || '')}</textarea>`;
        break;
      case 'chips':
        inputHtml = `<div class="flex flex-wrap gap-2" data-id="${q.id}">` + q.options.map(opt => {
          const selected = Array.isArray(value) ? value.includes(opt) : value === opt;
          return `<button type="button" class="option-chip ${selected ? 'selected' : ''}" data-value="${this.escape(opt)}">${this.escape(opt)}</button>`;
        }).join('') + '</div>';
        if (q.multiple) {
          inputHtml += `<input type="text" id="q-${q.id}-other" data-other="${q.id}" placeholder="Adicionar outro..." class="mt-3 text-sm">`;
        }
        break;
      case 'toggle':
        const checked = value === undefined ? q.value : value;
        inputHtml = `<label class="toggle-switch"><input type="checkbox" id="q-${q.id}" data-id="${q.id}" ${checked ? 'checked' : ''}><span class="text-sm text-slate-300">${checked ? 'Sim' : 'Não'}</span></label>`;
        break;
      case 'select':
        inputHtml = `<select id="q-${q.id}" data-id="${q.id}" class="${q.required ? 'required' : ''}"><option value="">Selecione...</option>` + q.options.map(opt => `<option value="${this.escape(opt)}" ${value === opt ? 'selected' : ''}>${this.escape(opt)}</option>`).join('') + '</select>';
        break;
      default:
        inputHtml = `<input type="text" id="q-${q.id}" data-id="${q.id}" value="${this.escape(value || '')}" placeholder="${this.escape(q.placeholder || '')}" class="${q.required ? 'required' : ''}">`;
    }

    if (q.help) {
      inputHtml += `<p class="text-xs text-slate-500 mt-2">${this.escape(q.help)}</p>`;
    }

    return label + inputHtml;
  },

  bindQuestionEvents(form) {
    form.querySelectorAll('input[data-id], textarea[data-id], select[data-id]').forEach(el => {
      el.addEventListener('input', () => this.collectAnswer(el.dataset.id));
      el.addEventListener('change', () => this.collectAnswer(el.dataset.id));
    });

    form.querySelectorAll('.option-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const container = btn.closest('[data-id]');
        const id = container.dataset.id;
        const q = this.getVisibleQuestions().find(x => x.id === id);
        const value = btn.dataset.value;

        if (q.multiple) {
          const chips = Array.from(container.querySelectorAll('.option-chip'));
          const selected = chips.filter(c => c.classList.contains('selected')).map(c => c.dataset.value);
          if (selected.includes(value)) {
            this.state.answers[id] = selected.filter(v => v !== value);
          } else {
            this.state.answers[id] = [...selected, value];
          }
        } else {
          container.querySelectorAll('.option-chip').forEach(c => c.classList.remove('selected'));
          this.state.answers[id] = value;
        }
        this.renderQuestions();
      });
    });

    form.querySelectorAll('input[data-other]').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const id = input.dataset.other;
          const val = input.value.trim();
          if (!val) return;
          const current = Array.isArray(this.state.answers[id]) ? this.state.answers[id] : [];
          if (!current.includes(val)) {
            this.state.answers[id] = [...current, val];
          }
          this.renderQuestions();
        }
      });
    });
  },

  collectAnswer(id) {
    const el = document.getElementById(`q-${id}`);
    if (!el) return;
    const q = this.getVisibleQuestions().find(x => x.id === id);
    if (!q) return;

    let val;
    if (q.type === 'toggle') {
      val = el.checked;
      const label = el.nextElementSibling;
      if (label) label.textContent = val ? 'Sim' : 'Não';
    } else if (q.type === 'chips') {
      return;
    } else {
      val = el.value.trim();
    }
    this.state.answers[id] = val;
  },

  goBackToCategory() {
    this.state.step = 1;
    this.updateProgress();
    this.showStep('category');
  },

  goBackToQuestions() {
    this.state.step = 2;
    this.renderQuestions();
  },

  goToReview() {
    const visible = this.getVisibleQuestions();
    const missing = visible.filter(q => q.required && !this.state.answers[q.id]);
    if (missing.length) {
      toast.show(`Preencha os campos obrigatórios: ${missing.map(m => m.label).join(', ')}`, 'error');
      return;
    }
    this.state.step = 3;
    this.renderReview();
  },

  renderReview() {
    const visible = this.getVisibleQuestions();
    const card = document.getElementById('review-card');
    const cat = APP_DATA.categories.find(c => c.id === this.state.category);

    let html = `<div class="flex items-center gap-3 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white">
        <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
      </div>
      <div>
        <div class="text-sm text-slate-400">Categoria</div>
        <div class="text-lg font-semibold text-white">${cat.name}</div>
      </div>
    </div>`;

    html += '<div class="space-y-4">';
    visible.forEach(q => {
      const answer = this.formatAnswer(this.state.answers[q.id], q);
      html += `<div class="border-b border-white/5 pb-4 last:border-0 last:pb-0">
        <div class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">${this.escape(q.label)}</div>
        <div class="text-slate-200">${answer}</div>
      </div>`;
    });
    html += '</div>';

    card.innerHTML = html;
    this.updateProgress();
    this.showStep('review');
    lucide.createIcons();
  },

  formatAnswer(val, q) {
    if (val === undefined || val === null || val === '') return '<span class="text-slate-600 italic">Não informado</span>';
    if (q.type === 'toggle') return val ? 'Sim' : 'Não';
    if (Array.isArray(val)) {
      if (!val.length) return '<span class="text-slate-600 italic">Não informado</span>';
      return val.map(v => `<span class="inline-block px-2 py-1 rounded-md bg-white/5 text-slate-300 text-sm mr-1 mb-1">${this.escape(v)}</span>`).join('');
    }
    return this.escape(String(val)).replace(/\n/g, '<br>');
  },

  showStep(name) {
    ['category', 'questions', 'review'].forEach(id => {
      const el = document.getElementById(`step-${id}`);
      if (!el) return;
      if (id === name) {
        el.classList.remove('hidden');
        el.classList.add('step-enter');
      } else {
        el.classList.add('hidden');
        el.classList.remove('step-enter');
      }
    });
  },

  updateProgress() {
    const text = document.getElementById('progress-text');
    const bar = document.getElementById('progress-bar');
    if (!text || !bar) return;
    const width = { 1: 33, 2: 66, 3: 100 }[this.state.step] || 33;
    text.textContent = `Passo ${this.state.step} de 3`;
    bar.style.width = `${width}%`;
  },

  escape(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};

if (typeof window !== 'undefined') {
  window.flow = flow;
}
