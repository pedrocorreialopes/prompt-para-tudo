const admin = {
  showTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(el => el.classList.add('hidden'));
    document.getElementById(`admin-tab-${tab}`).classList.remove('hidden');
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));

    if (tab === 'categories') this.renderCategories();
    if (tab === 'questions') this.renderQuestions();
    if (tab === 'templates') this.renderTemplates();
    if (tab === 'analytics') this.renderAnalytics();
  },

  renderCategories() {
    const list = document.getElementById('admin-categories-list');
    list.innerHTML = APP_DATA.categories.map((cat, idx) => `
      <div class="admin-row">
        <div class="flex items-center gap-3">
          <i data-lucide="${cat.icon}" class="w-5 h-5 text-slate-400"></i>
          <div>
            <div class="text-sm font-medium text-white">${cat.name}</div>
            <div class="text-xs text-slate-500">ID: ${cat.id} • Grupo: ${cat.group}</div>
          </div>
        </div>
        <div class="flex gap-2">
          <button onclick="admin.editCategory(${idx})" class="text-slate-400 hover:text-white"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
          <button onclick="admin.deleteCategory(${idx})" class="text-slate-400 hover:text-red-400"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </div>
    `).join('');
    lucide.createIcons();
  },

  addCategory() {
    modal.show(`
      <h3 class="text-xl font-semibold text-white mb-4">Adicionar Categoria</h3>
      <div class="space-y-4">
        <div><label class="text-sm text-slate-400">ID (slug)</label><input type="text" id="modal-cat-id" class="mt-1" placeholder="nova-categoria"></div>
        <div><label class="text-sm text-slate-400">Nome</label><input type="text" id="modal-cat-name" class="mt-1" placeholder="Nome da categoria"></div>
        <div><label class="text-sm text-slate-400">Ícone Lucide</label><input type="text" id="modal-cat-icon" class="mt-1" placeholder="smartphone"></div>
        <div><label class="text-sm text-slate-400">Grupo</label><input type="text" id="modal-cat-group" class="mt-1" placeholder="digital"></div>
        <div class="flex justify-end gap-2 mt-6">
          <button onclick="modal.close()" class="px-4 py-2 rounded-lg border border-white/10 text-slate-300">Cancelar</button>
          <button onclick="admin.saveCategory()" class="px-4 py-2 rounded-lg bg-[#3B82F6] text-white">Salvar</button>
        </div>
      </div>
    `);
  },

  editCategory(idx) {
    const cat = APP_DATA.categories[idx];
    modal.show(`
      <h3 class="text-xl font-semibold text-white mb-4">Editar Categoria</h3>
      <div class="space-y-4">
        <div><label class="text-sm text-slate-400">ID</label><input type="text" id="modal-cat-id" class="mt-1" value="${cat.id}" readonly></div>
        <div><label class="text-sm text-slate-400">Nome</label><input type="text" id="modal-cat-name" class="mt-1" value="${cat.name}"></div>
        <div><label class="text-sm text-slate-400">Ícone Lucide</label><input type="text" id="modal-cat-icon" class="mt-1" value="${cat.icon}"></div>
        <div><label class="text-sm text-slate-400">Grupo</label><input type="text" id="modal-cat-group" class="mt-1" value="${cat.group}"></div>
        <div class="flex justify-end gap-2 mt-6">
          <button onclick="modal.close()" class="px-4 py-2 rounded-lg border border-white/10 text-slate-300">Cancelar</button>
          <button onclick="admin.saveCategory(${idx})" class="px-4 py-2 rounded-lg bg-[#3B82F6] text-white">Salvar</button>
        </div>
      </div>
    `);
  },

  saveCategory(idx) {
    const id = document.getElementById('modal-cat-id').value.trim();
    const name = document.getElementById('modal-cat-name').value.trim();
    const icon = document.getElementById('modal-cat-icon').value.trim();
    const group = document.getElementById('modal-cat-group').value.trim();
    if (!id || !name) return toast.show('Preencha ID e nome', 'error');
    if (idx === undefined) {
      APP_DATA.categories.push({ id, name, icon, group });
    } else {
      APP_DATA.categories[idx] = { id, name, icon, group };
    }
    modal.close();
    this.renderCategories();
    flow.renderCategories();
    toast.show('Categoria salva');
  },

  deleteCategory(idx) {
    if (!confirm('Remover categoria?')) return;
    APP_DATA.categories.splice(idx, 1);
    this.renderCategories();
    flow.renderCategories();
  },

  renderQuestions() {
    const select = document.getElementById('admin-category-select');
    select.innerHTML = APP_DATA.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    const catId = select.value;
    const list = document.getElementById('admin-questions-list');

    const defs = APP_DATA.questions[catId] || [];
    list.innerHTML = defs.map((def, idx) => {
      const q = typeof def === 'string' ? { id: def, type: 'shared', label: APP_DATA.sharedFields[def]?.label || def } : { ...def, type: def.type };
      return `
        <div class="admin-row">
          <div>
            <div class="text-sm font-medium text-white">${q.label}</div>
            <div class="text-xs text-slate-500">ID: ${q.id} • Tipo: ${q.type}${q.required ? ' • Obrigatório' : ''}</div>
          </div>
          <div class="flex gap-2">
            <button onclick="admin.editQuestion('${catId}', ${idx})" class="text-slate-400 hover:text-white"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
            <button onclick="admin.deleteQuestion('${catId}', ${idx})" class="text-slate-400 hover:text-red-400"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
          </div>
        </div>
      `;
    }).join('');
    lucide.createIcons();
  },

  editQuestion(catId, idx) {
    const def = APP_DATA.questions[catId][idx];
    const isString = typeof def === 'string';
    const q = isString ? { id: def, label: APP_DATA.sharedFields[def]?.label || def, type: 'shared' } : def;
    modal.show(`
      <h3 class="text-xl font-semibold text-white mb-4">Editar Pergunta</h3>
      <div class="space-y-4">
        <div><label class="text-sm text-slate-400">ID</label><input type="text" id="modal-q-id" class="mt-1" value="${q.id}"></div>
        <div><label class="text-sm text-slate-400">Label</label><input type="text" id="modal-q-label" class="mt-1" value="${q.label || ''}"></div>
        <div><label class="text-sm text-slate-400">Tipo</label>
          <select id="modal-q-type" class="mt-1">
            <option value="text" ${q.type === 'text' ? 'selected' : ''}>Texto</option>
            <option value="textarea" ${q.type === 'textarea' ? 'selected' : ''}>Textarea</option>
            <option value="chips" ${q.type === 'chips' ? 'selected' : ''}>Chips</option>
            <option value="toggle" ${q.type === 'toggle' ? 'selected' : ''}>Toggle</option>
            <option value="select" ${q.type === 'select' ? 'selected' : ''}>Select</option>
          </select>
        </div>
        <div><label class="text-sm text-slate-400">Opções (separadas por vírgula)</label><input type="text" id="modal-q-options" class="mt-1" value="${q.options ? q.options.join(', ') : ''}"></div>
        <div class="flex items-center gap-2"><input type="checkbox" id="modal-q-required" ${q.required ? 'checked' : ''}><label class="text-sm text-slate-300">Obrigatório</label></div>
        <div class="flex items-center gap-2"><input type="checkbox" id="modal-q-multiple" ${q.multiple ? 'checked' : ''}><label class="text-sm text-slate-300">Múltipla seleção</label></div>
        <div class="flex justify-end gap-2 mt-6">
          <button onclick="modal.close()" class="px-4 py-2 rounded-lg border border-white/10 text-slate-300">Cancelar</button>
          <button onclick="admin.saveQuestion('${catId}', ${idx})" class="px-4 py-2 rounded-lg bg-[#3B82F6] text-white">Salvar</button>
        </div>
      </div>
    `);
  },

  saveQuestion(catId, idx) {
    const id = document.getElementById('modal-q-id').value.trim();
    const label = document.getElementById('modal-q-label').value.trim();
    const type = document.getElementById('modal-q-type').value;
    const options = document.getElementById('modal-q-options').value.split(',').map(s => s.trim()).filter(Boolean);
    const required = document.getElementById('modal-q-required').checked;
    const multiple = document.getElementById('modal-q-multiple').checked;

    let obj = { id, label, type };
    if (options.length) obj.options = options;
    if (required) obj.required = true;
    if (multiple && type === 'chips') obj.multiple = true;
    if (type === 'toggle') obj.value = false;

    APP_DATA.questions[catId][idx] = obj;
    modal.close();
    this.renderQuestions();
    toast.show('Pergunta salva');
  },

  deleteQuestion(catId, idx) {
    if (!confirm('Remover pergunta?')) return;
    APP_DATA.questions[catId].splice(idx, 1);
    this.renderQuestions();
  },

  renderTemplates() {
    const list = document.getElementById('admin-templates-list');
    const templates = Storage.get('templates', []);
    list.innerHTML = templates.map((tpl, idx) => `
      <div class="admin-row">
        <div>
          <div class="text-sm font-medium text-white">${tpl.name}</div>
          <div class="text-xs text-slate-500">${tpl.categoryId || 'Geral'}</div>
        </div>
        <div class="flex gap-2">
          <button onclick="admin.editTemplate(${idx})" class="text-slate-400 hover:text-white"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
          <button onclick="admin.deleteTemplate(${idx})" class="text-slate-400 hover:text-red-400"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </div>
    `).join('');
    lucide.createIcons();
  },

  addTemplate() {
    modal.show(`
      <h3 class="text-xl font-semibold text-white mb-4">Adicionar Template</h3>
      <div class="space-y-4">
        <div><label class="text-sm text-slate-400">Nome</label><input type="text" id="modal-tpl-name" class="mt-1"></div>
        <div><label class="text-sm text-slate-400">Categoria ID</label><input type="text" id="modal-tpl-cat" class="mt-1" placeholder="website"></div>
        <div><label class="text-sm text-slate-400">Conteúdo do template</label><textarea id="modal-tpl-body" rows="6" class="mt-1" placeholder="Use {{objective}}, {{audience}} etc."></textarea></div>
        <div class="flex justify-end gap-2 mt-6">
          <button onclick="modal.close()" class="px-4 py-2 rounded-lg border border-white/10 text-slate-300">Cancelar</button>
          <button onclick="admin.saveTemplate()" class="px-4 py-2 rounded-lg bg-[#3B82F6] text-white">Salvar</button>
        </div>
      </div>
    `);
  },

  editTemplate(idx) {
    const tpls = Storage.get('templates', []);
    const tpl = tpls[idx];
    modal.show(`
      <h3 class="text-xl font-semibold text-white mb-4">Editar Template</h3>
      <div class="space-y-4">
        <div><label class="text-sm text-slate-400">Nome</label><input type="text" id="modal-tpl-name" class="mt-1" value="${tpl.name}"></div>
        <div><label class="text-sm text-slate-400">Categoria ID</label><input type="text" id="modal-tpl-cat" class="mt-1" value="${tpl.categoryId || ''}"></div>
        <div><label class="text-sm text-slate-400">Conteúdo do template</label><textarea id="modal-tpl-body" rows="6" class="mt-1">${tpl.body}</textarea></div>
        <div class="flex justify-end gap-2 mt-6">
          <button onclick="modal.close()" class="px-4 py-2 rounded-lg border border-white/10 text-slate-300">Cancelar</button>
          <button onclick="admin.saveTemplate(${idx})" class="px-4 py-2 rounded-lg bg-[#3B82F6] text-white">Salvar</button>
        </div>
      </div>
    `);
  },

  saveTemplate(idx) {
    const name = document.getElementById('modal-tpl-name').value.trim();
    const categoryId = document.getElementById('modal-tpl-cat').value.trim();
    const body = document.getElementById('modal-tpl-body').value.trim();
    if (!name || !body) return toast.show('Preencha nome e conteúdo', 'error');
    const tpls = Storage.get('templates', []);
    const tpl = { name, categoryId, body };
    if (idx === undefined) tpls.push(tpl); else tpls[idx] = tpl;
    Storage.set('templates', tpls);
    modal.close();
    this.renderTemplates();
    toast.show('Template salvo');
  },

  deleteTemplate(idx) {
    if (!confirm('Remover template?')) return;
    const tpls = Storage.get('templates', []);
    tpls.splice(idx, 1);
    Storage.set('templates', tpls);
    this.renderTemplates();
  },

  renderAnalytics() {
    const s = stats.get();
    const chartEl = document.getElementById('analytics-chart');
    const summaryEl = document.getElementById('analytics-summary');

    const categories = APP_DATA.categories.map(c => ({ id: c.id, name: c.name, value: s.byCategory[c.id] || 0 })).filter(c => c.value > 0);
    categories.sort((a, b) => b.value - a.value);

    if (this.chart) this.chart.dispose();
    this.chart = echarts.init(chartEl, 'dark');

    const option = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: categories.map(c => c.name), axisLabel: { color: '#94a3b8' } },
      yAxis: { type: 'value', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } } },
      series: [{
        data: categories.map(c => c.value),
        type: 'bar',
        itemStyle: { borderRadius: [6, 6, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#3B82F6' }, { offset: 1, color: '#8B5CF6' }]) },
        barWidth: '40%'
      }]
    };

    this.chart.setOption(option);

    summaryEl.innerHTML = `
      <div class="glass-card p-4 rounded-xl text-center"><div class="text-2xl font-bold text-white">${s.prompts || 0}</div><div class="text-xs text-slate-400">Total prompts</div></div>
      <div class="glass-card p-4 rounded-xl text-center"><div class="text-2xl font-bold text-white">${categories.length}</div><div class="text-xs text-slate-400">Categorias usadas</div></div>
      <div class="glass-card p-4 rounded-xl text-center"><div class="text-2xl font-bold text-white">${historyManager.list.length}</div><div class="text-xs text-slate-400">Histórico</div></div>
      <div class="glass-card p-4 rounded-xl text-center"><div class="text-2xl font-bold text-white">${favoritesManager.list.length}</div><div class="text-xs text-slate-400">Favoritos</div></div>
    `;
  }
};

if (typeof window !== 'undefined') {
  window.admin = admin;
}
