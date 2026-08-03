const generator = {
  state: {
    version: 'complete',
    language: 'pt',
    engine: 'chatgpt',
    result: null,
    promptData: null
  },

  generate() {
    const data = flow.state;
    const visible = flow.getVisibleQuestions().map(q => ({ ...q, value: data.answers[q.id] }));
    const category = APP_DATA.categories.find(c => c.id === data.category);

    const promptData = {
      id: 'pf_' + Date.now().toString(36),
      title: data.answers.projectName || `${category.name} — ${new Date().toLocaleDateString()}`,
      category: category,
      answers: { ...data.answers },
      visible: visible,
      createdAt: Date.now()
    };

    this.state.promptData = promptData;
    this.state.result = this.buildResult(promptData);

    this.renderSelectors();
    this.renderOutput();
    router.navigate('result');
    historyManager.add(promptData, this.state.result);
    stats.increment('prompts');
    stats.incrementByCategory(category.id);
  },

  buildResult(data) {
    const outputs = {};
    Object.keys(APP_DATA.versions).forEach(version => {
      outputs[version] = {};
      Object.keys(APP_DATA.languages).forEach(lang => {
        outputs[version][lang] = {};
        Object.keys(APP_DATA.engines).forEach(engine => {
          outputs[version][lang][engine] = this.buildPrompt(data, version, lang, engine);
        });
      });
    });
    return outputs;
  },

  buildPrompt(data, version, lang, engine) {
    const engineInfo = APP_DATA.engines[engine];
    const cat = data.category;
    const answers = data.answers;
    const isDev = ['website', 'app', 'mobile-app', 'landing', 'ecommerce', 'dashboard', 'web-system', 'api', 'database'].includes(cat.id);
    const isImage = ['image', 'illustration', 'logo', 'banner', 'flyer', 'business-card', 'mockup', 'brand'].includes(cat.id);
    const isVideo = ['video', 'commercial', 'animation'].includes(cat.id);
    const isText = !isDev && !isImage && !isVideo;

    const t = TRANSLATIONS[lang];

    const sections = [];

    // Header
    sections.push(`# ${t.title}: ${data.title}`);
    sections.push(`\n**${t.category}:** ${cat.name}`);
    sections.push(`**${t.target}:** ${engineInfo.name}`);
    sections.push(`**${t.version}:** ${APP_DATA.versions[version]}`);
    sections.push(`\n---\n`);

    // Goal
    if (answers.objective) {
      sections.push(`## ${t.objective}\n${answers.objective}`);
    }

    // Context
    if (answers.audience || answers.projectName) {
      sections.push(`## ${t.context}`);
      if (answers.projectName) sections.push(`- **${t.projectName}:** ${answers.projectName}`);
      if (answers.audience) sections.push(`- **${t.audience}:** ${answers.audience}`);
      if (answers.industry) sections.push(`- **${t.industry}:** ${answers.industry}`);
      sections.push('');
    }

    // Requirements
    const reqs = [];
    if (answers.features && answers.features.length) reqs.push(`- ${t.features}: ${answers.features.join(', ')}`);
    if (answers.pages && answers.pages.length) reqs.push(`- ${t.pages}: ${answers.pages.join(', ')}`);
    if (answers.sections && answers.sections.length) reqs.push(`- ${t.sections}: ${answers.sections.join(', ')}`);
    if (answers.modules && answers.modules.length) reqs.push(`- ${t.modules}: ${answers.modules.join(', ')}`);
    if (answers.technologies && answers.technologies.length) reqs.push(`- ${t.technologies}: ${answers.technologies.join(', ')}`);
    if (answers.platform && answers.platform.length) reqs.push(`- ${t.platform}: ${answers.platform.join(', ')}`);
    if (answers.style) reqs.push(`- ${t.style}: ${this.fmt(answers.style)}`);
    if (answers.colors) reqs.push(`- ${t.colors}: ${answers.colors}`);
    if (answers.database) reqs.push(`- ${t.database}: ${this.fmt(answers.database)}`);
    if (answers.responsive !== undefined) reqs.push(`- ${t.responsive}: ${answers.responsive ? t.yes : t.no}`);
    if (answers.animations !== undefined) reqs.push(`- ${t.animations}: ${answers.animations ? t.yes : t.no}`);
    if (answers.seo !== undefined) reqs.push(`- SEO: ${answers.seo ? t.yes : t.no}`);
    if (answers.accessibility !== undefined) reqs.push(`- ${t.accessibility}: ${answers.accessibility ? t.yes : t.no}`);
    if (answers.multilingual !== undefined) reqs.push(`- ${t.multilingual}: ${answers.multilingual ? t.yes : t.no}`);
    if (answers.login !== undefined) reqs.push(`- ${t.login}: ${answers.login ? t.yes : t.no}`);
    if (answers.adminPanel !== undefined) reqs.push(`- ${t.adminPanel}: ${answers.adminPanel ? t.yes : t.no}`);
    if (answers.offline !== undefined) reqs.push(`- ${t.offline}: ${answers.offline ? t.yes : t.no}`);
    if (answers.gps !== undefined) reqs.push(`- GPS: ${answers.gps ? t.yes : t.no}`);
    if (answers.notifications !== undefined) reqs.push(`- ${t.notifications}: ${answers.notifications ? t.yes : t.no}`);
    if (answers.payment !== undefined) reqs.push(`- ${t.payment}: ${answers.payment ? t.yes : t.no}`);
    if (answers.map !== undefined) reqs.push(`- ${t.map}: ${answers.map ? t.yes : t.no}`);
    if (answers.api !== undefined) reqs.push(`- API: ${answers.api ? t.yes : t.no}`);
    if (answers.integrations && answers.integrations.length) reqs.push(`- ${t.integrations}: ${answers.integrations.join(', ')}`);
    if (answers.specialty) reqs.push(`- ${t.specialty}: ${answers.specialty}`);
    if (answers.tone) reqs.push(`- ${t.tone}: ${this.fmt(answers.tone)}`);
    if (answers.personality) reqs.push(`- ${t.personality}: ${answers.personality}`);
    if (answers.tools && answers.tools.length) reqs.push(`- ${t.tools}: ${answers.tools.join(', ')}`);
    if (answers.responseFormat) reqs.push(`- ${t.responseFormat}: ${this.fmt(answers.responseFormat)}`);
    if (answers.memory !== undefined) reqs.push(`- ${t.memory}: ${answers.memory ? t.yes : t.no}`);
    if (answers.temperature) reqs.push(`- ${t.temperature}: ${this.fmt(answers.temperature)}`);
    if (answers.model) reqs.push(`- ${t.model}: ${this.fmt(answers.model)}`);
    if (answers.style && isImage) reqs.push(`- ${t.imageStyle}: ${this.fmt(answers.style)}`);
    if (answers.ratio) reqs.push(`- ${t.ratio}: ${this.fmt(answers.ratio)}`);
    if (answers.resolution) reqs.push(`- ${t.resolution}: ${answers.resolution}`);
    if (answers.characters) reqs.push(`- ${t.characters}: ${answers.characters}`);
    if (answers.setting) reqs.push(`- ${t.setting}: ${answers.setting}`);
    if (answers.objects) reqs.push(`- ${t.objects}: ${answers.objects}`);
    if (answers.lighting) reqs.push(`- ${t.lighting}: ${this.fmt(answers.lighting)}`);
    if (answers.camera) reqs.push(`- ${t.camera}: ${answers.camera}`);
    if (answers.palette) reqs.push(`- ${t.palette}: ${answers.palette}`);
    if (answers.detail) reqs.push(`- ${t.detail}: ${this.fmt(answers.detail)}`);
    if (answers.textImage) reqs.push(`- ${t.textImage}: ${answers.textImage}`);
    if (answers.duration) reqs.push(`- ${t.duration}: ${this.fmt(answers.duration)}`);
    if (answers.format) reqs.push(`- ${t.format}: ${this.fmt(answers.format)}`);
    if (answers.narrator) reqs.push(`- ${t.narrator}: ${this.fmt(answers.narrator)}`);
    if (answers.subtitles !== undefined) reqs.push(`- ${t.subtitles}: ${answers.subtitles ? t.yes : t.no}`);
    if (answers.music) reqs.push(`- ${t.music}: ${this.fmt(answers.music)}`);
    if (answers.effects && answers.effects.length) reqs.push(`- ${t.effects}: ${answers.effects.join(', ')}`);
    if (answers.scenes) reqs.push(`- ${t.scenes}: ${answers.scenes}`);
    if (answers.aiTool) reqs.push(`- ${t.aiTool}: ${this.fmt(answers.aiTool)}`);
    if (answers.tabs) reqs.push(`- ${t.tabs}: ${answers.tabs}`);
    if (answers.formulas) reqs.push(`- ${t.formulas}: ${answers.formulas}`);
    if (answers.charts !== undefined) reqs.push(`- ${t.charts}: ${answers.charts ? t.yes : t.no}`);
    if (answers.dashboard !== undefined) reqs.push(`- Dashboard: ${answers.dashboard ? t.yes : t.no}`);
    if (answers.automation !== undefined) reqs.push(`- ${t.automation}: ${answers.automation ? t.yes : t.no}`);
    if (answers.macros !== undefined) reqs.push(`- Macros: ${answers.macros ? t.yes : t.no}`);
    if (answers.validation !== undefined) reqs.push(`- ${t.validation}: ${answers.validation ? t.yes : t.no}`);

    if (reqs.length) {
      sections.push(`## ${t.requirements}\n${reqs.join('\n')}`);
    }

    // Restrictions
    if (answers.limitations) {
      sections.push(`## ${t.restrictions}\n${answers.limitations}`);
    }

    // Functionalities
    if (isDev && answers.features && answers.features.length) {
      sections.push(`## ${t.functionalities}\n${answers.features.map(f => `- ${f}`).join('\n')}`);
    }

    // Technologies
    if (isDev && answers.technologies && answers.technologies.length) {
      sections.push(`## ${t.technologiesTitle}\n${answers.technologies.map(t => `- ${t}`).join('\n')}`);
    }

    // Best practices
    if (version !== 'short') {
      const best = [];
      if (isDev) {
        best.push(t.bpCode, t.bpResponsive, t.bpAccessibility, t.bpPerformance, t.bpSecurity, t.bpScalability);
      }
      if (isImage) best.push(t.bpImageQuality, t.bpComposition, t.bpLighting);
      if (isVideo) best.push(t.bpVideoFlow, t.bpAudio, t.bpConsistency);
      if (isText) best.push(t.bpClarity, t.bpAudience, t.bpSeo);
      if (best.length) {
        sections.push(`## ${t.bestPractices}\n${best.map(b => `- ${b}`).join('\n')}`);
      }
    }

    // Expected result
    sections.push(`## ${t.expectedResult}\n${t.expectedResultText}`);

    // Notes
    if (answers.notes) {
      sections.push(`## ${t.notes}\n${answers.notes}`);
    }

    // Engine-specific instruction
    sections.push(`\n---\n\n**${t.engineNote}:** ${engineInfo.tweaks}`);

    let prompt = sections.join('\n');

    // Short version: summarize
    if (version === 'short') {
      prompt = this.makeShort(prompt, data, engineInfo, lang);
    }

    // Technical version: add architecture and specs
    if (version === 'technical') {
      prompt += `\n\n## ${t.architecture}\n${t.architectureText}\n\n## ${t.performance}\n${t.performanceText}\n\n## ${t.security}\n${t.securityText}`;
    }

    // Translate main body for English / Spanish when not image/video engines (they often prefer English)
    if (lang === 'en' && engineInfo.category === 'text') {
      prompt = this.translateBaseEnglish(prompt, t, data, engineInfo, version);
    } else if (lang === 'es' && engineInfo.category === 'text') {
      prompt = this.translateBaseSpanish(prompt, t, data, engineInfo, version);
    }

    return prompt.trim();
  },

  makeShort(prompt, data, engineInfo, lang) {
    const t = TRANSLATIONS[lang];
    const cat = data.category.name;
    const goal = data.answers.objective || '';
    const style = data.answers.style ? ` Estilo: ${this.fmt(data.answers.style)}.` : '';
    const tech = data.answers.technologies && data.answers.technologies.length ? ` Tech: ${data.answers.technologies.join(', ')}.` : '';
    const platform = data.answers.platform && data.answers.platform.length ? ` Plataforma: ${data.answers.platform.join(', ')}.` : '';
    const ratio = data.answers.ratio ? ` Proporção: ${this.fmt(data.answers.ratio)}.` : '';
    const duration = data.answers.duration ? ` Duração: ${this.fmt(data.answers.duration)}.` : '';

    let body = '';
    if (engineInfo.category === 'image') {
      body = `${goal}.${style}${ratio} Detalhes: ${data.answers.characters || ''} ${data.answers.setting || ''} ${data.answers.lighting || ''}`.trim().replace(/\s+/g, ' ');
    } else if (engineInfo.category === 'video') {
      body = `${goal}.${duration}${style} Cenas: ${data.answers.scenes || ''}`.trim().replace(/\s+/g, ' ');
    } else {
      body = `${goal}.${style}${tech}${platform}`.trim().replace(/\s+/g, ' ');
    }

    return `# ${t.shortTitle}: ${data.title}\n\n${t.shortFor} ${engineInfo.name} (${cat})\n\n${body}\n\n---\n\n${engineInfo.tweaks}`;
  },

  translateBaseEnglish(text, t, data, engineInfo, version) {
    // A simple reassembly of English prompt
    return this.assembleLang(data, engineInfo, 'en', version, t);
  },

  translateBaseSpanish(text, t, data, engineInfo, version) {
    return this.assembleLang(data, engineInfo, 'es', version, t);
  },

  assembleLang(data, engineInfo, lang, version, t) {
    const answers = data.answers;
    const cat = data.category;
    const isDev = ['website', 'app', 'mobile-app', 'landing', 'ecommerce', 'dashboard', 'web-system', 'api', 'database'].includes(cat.id);
    const isImage = ['image', 'illustration', 'logo', 'banner', 'flyer', 'business-card', 'mockup', 'brand'].includes(cat.id);
    const isVideo = ['video', 'commercial', 'animation'].includes(cat.id);

    let s = `# ${t.title}: ${data.title}\n`;
    s += `**${t.category}:** ${cat.name}\n`;
    s += `**${t.target}:** ${engineInfo.name}\n`;
    s += `**${t.version}:** ${APP_DATA.versions[version]}\n\n---\n\n`;

    if (answers.objective) s += `## ${t.objective}\n${answers.objective}\n\n`;

    const fields = [
      ['projectName', t.projectName, answers.projectName],
      ['audience', t.audience, answers.audience],
      ['features', t.features, answers.features],
      ['pages', t.pages, answers.pages],
      ['sections', t.sections, answers.sections],
      ['modules', t.modules, answers.modules],
      ['technologies', t.technologies, answers.technologies],
      ['platform', t.platform, answers.platform],
      ['style', t.style, this.fmt(answers.style)],
      ['colors', t.colors, answers.colors],
      ['database', t.database, this.fmt(answers.database)],
      ['integrations', t.integrations, answers.integrations],
      ['tools', t.tools, answers.tools],
      ['specialty', t.specialty, answers.specialty],
      ['tone', t.tone, this.fmt(answers.tone)],
      ['personality', t.personality, answers.personality],
      ['responseFormat', t.responseFormat, this.fmt(answers.responseFormat)],
      ['temperature', t.temperature, this.fmt(answers.temperature)],
      ['model', t.model, this.fmt(answers.model)],
      ['ratio', t.ratio, this.fmt(answers.ratio)],
      ['resolution', t.resolution, answers.resolution],
      ['characters', t.characters, answers.characters],
      ['setting', t.setting, answers.setting],
      ['objects', t.objects, answers.objects],
      ['lighting', t.lighting, this.fmt(answers.lighting)],
      ['camera', t.camera, answers.camera],
      ['palette', t.palette, answers.palette],
      ['detail', t.detail, this.fmt(answers.detail)],
      ['textImage', t.textImage, answers.textImage],
      ['duration', t.duration, this.fmt(answers.duration)],
      ['format', t.format, this.fmt(answers.format)],
      ['narrator', t.narrator, this.fmt(answers.narrator)],
      ['music', t.music, this.fmt(answers.music)],
      ['effects', t.effects, answers.effects],
      ['scenes', t.scenes, answers.scenes],
      ['aiTool', t.aiTool, this.fmt(answers.aiTool)],
      ['tabs', t.tabs, answers.tabs],
      ['formulas', t.formulas, answers.formulas]
    ];

    const requirementLines = [];
    fields.forEach(([key, label, val]) => {
      if (!val) return;
      if (Array.isArray(val) && !val.length) return;
      const display = Array.isArray(val) ? val.join(', ') : val;
      requirementLines.push(`- **${label}:** ${display}`);
    });

    const toggles = [
      ['responsive', t.responsive, answers.responsive],
      ['animations', t.animations, answers.animations],
      ['seo', 'SEO', answers.seo],
      ['accessibility', t.accessibility, answers.accessibility],
      ['multilingual', t.multilingual, answers.multilingual],
      ['login', t.login, answers.login],
      ['adminPanel', t.adminPanel, answers.adminPanel],
      ['offline', t.offline, answers.offline],
      ['gps', 'GPS', answers.gps],
      ['notifications', t.notifications, answers.notifications],
      ['payment', t.payment, answers.payment],
      ['map', t.map, answers.map],
      ['api', 'API', answers.api],
      ['memory', t.memory, answers.memory],
      ['subtitles', t.subtitles, answers.subtitles],
      ['charts', t.charts, answers.charts],
      ['dashboard', 'Dashboard', answers.dashboard],
      ['automation', t.automation, answers.automation],
      ['macros', 'Macros', answers.macros],
      ['validation', t.validation, answers.validation]
    ];

    toggles.forEach(([key, label, val]) => {
      if (val === undefined) return;
      requirementLines.push(`- **${label}:** ${val ? t.yes : t.no}`);
    });

    if (requirementLines.length) {
      s += `## ${t.requirements}\n${requirementLines.join('\n')}\n\n`;
    }

    if (answers.limitations) s += `## ${t.restrictions}\n${answers.limitations}\n\n`;

    if (isDev && answers.features && answers.features.length) {
      s += `## ${t.functionalities}\n${answers.features.map(f => `- ${f}`).join('\n')}\n\n`;
    }
    if (isDev && answers.technologies && answers.technologies.length) {
      s += `## ${t.technologiesTitle}\n${answers.technologies.map(x => `- ${x}`).join('\n')}\n\n`;
    }

    if (version !== 'short') {
      const best = [];
      if (isDev) best.push(t.bpCode, t.bpResponsive, t.bpAccessibility, t.bpPerformance, t.bpSecurity, t.bpScalability);
      if (isImage) best.push(t.bpImageQuality, t.bpComposition, t.bpLighting);
      if (isVideo) best.push(t.bpVideoFlow, t.bpAudio, t.bpConsistency);
      if (isText) best.push(t.bpClarity, t.bpAudience, t.bpSeo);
      if (best.length) s += `## ${t.bestPractices}\n${best.map(b => `- ${b}`).join('\n')}\n\n`;
    }

    s += `## ${t.expectedResult}\n${t.expectedResultText}\n\n`;
    if (answers.notes) s += `## ${t.notes}\n${answers.notes}\n\n`;
    s += `---\n\n**${t.engineNote}:** ${engineInfo.tweaks}`;

    if (version === 'technical') {
      s += `\n\n## ${t.architecture}\n${t.architectureText}\n\n## ${t.performance}\n${t.performanceText}\n\n## ${t.security}\n${t.securityText}`;
    }

    return s.trim();
  },

  fmt(val) {
    return Array.isArray(val) ? val.join(', ') : (val || '');
  },

  renderSelectors() {
    const versionEl = document.getElementById('version-selector');
    const langEl = document.getElementById('language-selector');
    const engineEl = document.getElementById('engine-selector');

    versionEl.innerHTML = Object.entries(APP_DATA.versions).map(([k, v]) =>
      `<button class="pill-btn ${this.state.version === k ? 'active' : ''}" data-version="${k}" onclick="generator.setVersion('${k}')">${v}</button>`
    ).join('');

    langEl.innerHTML = Object.entries(APP_DATA.languages).map(([k, v]) =>
      `<button class="pill-btn ${this.state.language === k ? 'active' : ''}" data-lang="${k}" onclick="generator.setLanguage('${k}')">${v}</button>`
    ).join('');

    engineEl.innerHTML = Object.entries(APP_DATA.engines).map(([k, v]) =>
      `<option value="${k}" ${this.state.engine === k ? 'selected' : ''}>${v.name}</option>`
    ).join('');

    engineEl.onchange = (e) => this.setEngine(e.target.value);
  },

  renderOutput() {
    const content = document.getElementById('result-content');
    const meta = document.getElementById('result-meta');
    const text = this.currentText();

    // Convert markdown-ish to HTML for display
    content.innerHTML = this.markdownToHtml(text);

    meta.textContent = `${APP_DATA.versions[this.state.version]} • ${APP_DATA.languages[this.state.language]} • ${APP_DATA.engines[this.state.engine].name}`;
  },

  currentText() {
    return this.state.result?.[this.state.version]?.[this.state.language]?.[this.state.engine] || '';
  },

  setVersion(v) {
    this.state.version = v;
    this.renderSelectors();
    this.renderOutput();
  },

  setLanguage(l) {
    this.state.language = l;
    this.renderSelectors();
    this.renderOutput();
  },

  setEngine(e) {
    this.state.engine = e;
    this.renderSelectors();
    this.renderOutput();
  },

  copyCurrent() {
    const text = this.currentText();
    navigator.clipboard.writeText(text).then(() => toast.show('Prompt copiado!')).catch(() => toast.show('Erro ao copiar', 'error'));
  },

  downloadTxt() {
    const text = this.currentText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.sanitizeFileName(this.state.promptData.title)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.show('Download TXT iniciado');
  },

  downloadPdf() {
    const { jsPDF } = window.jspdf;
    const text = this.currentText();
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    doc.setFont('helvetica');
    doc.setFontSize(16);
    doc.text(this.state.promptData.title, 20, 25);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Categoria: ${this.state.promptData.category.name} | ${APP_DATA.engines[this.state.engine].name} | ${APP_DATA.versions[this.state.version]}`, 20, 32);
    doc.setTextColor(0);

    const split = doc.splitTextToSize(text, 170);
    doc.text(split, 20, 42);
    doc.save(`${this.sanitizeFileName(this.state.promptData.title)}.pdf`);
    toast.show('Download PDF iniciado');
  },

  share() {
    const text = this.currentText();
    const shareData = {
      title: this.state.promptData.title,
      text: text.substring(0, 250) + '...',
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      toast.show('Link/c prompt copiado para compartilhar');
    }
  },

  savePrompt() {
    if (!this.state.promptData) return;
    favoritesManager.add(this.state.promptData, this.state.result);
    toast.show('Salvo nos favoritos');
  },

  sanitizeFileName(name) {
    return name.replace(/[^a-z0-9\u00C0-\u00FF\-_]/gi, '_').substring(0, 60);
  },

  markdownToHtml(text) {
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/<\/li>\n<li>/gim, '</li><li>')
      .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
      .replace(/\n/gim, '<br>');
  }
};

// Translation strings
const TRANSLATIONS = {
  pt: {
    title: 'Prompt',
    category: 'Categoria',
    target: 'IA de destino',
    version: 'Versão',
    objective: 'Objetivo',
    context: 'Contexto',
    projectName: 'Nome do projeto',
    audience: 'Público-alvo',
    industry: 'Indústria',
    requirements: 'Requisitos',
    features: 'Funcionalidades',
    pages: 'Páginas',
    sections: 'Seções',
    modules: 'Módulos',
    technologies: 'Tecnologias',
    platform: 'Plataforma',
    style: 'Estilo',
    colors: 'Cores',
    database: 'Banco de dados',
    responsive: 'Responsivo',
    animations: 'Animações',
    accessibility: 'Acessibilidade',
    multilingual: 'Multilíngue',
    login: 'Login',
    adminPanel: 'Painel administrativo',
    offline: 'Offline',
    gps: 'GPS',
    notifications: 'Notificações',
    payment: 'Pagamento',
    map: 'Mapa',
    api: 'API',
    integrations: 'Integrações',
    specialty: 'Especialidade',
    tone: 'Tom',
    personality: 'Personalidade',
    tools: 'Ferramentas',
    responseFormat: 'Formato das respostas',
    memory: 'Memória',
    temperature: 'Criatividade',
    model: 'Modelo',
    imageStyle: 'Estilo da imagem',
    ratio: 'Proporção',
    resolution: 'Resolução',
    characters: 'Personagens',
    setting: 'Cenário',
    objects: 'Objetos',
    lighting: 'Iluminação',
    camera: 'Câmera/lente',
    palette: 'Paleta de cores',
    detail: 'Nível de detalhes',
    textImage: 'Texto na imagem',
    duration: 'Duração',
    format: 'Formato',
    narrator: 'Narrador',
    subtitles: 'Legendas',
    music: 'Trilha sonora',
    effects: 'Efeitos',
    scenes: 'Cenas',
    aiTool: 'IA utilizada',
    tabs: 'Abas',
    formulas: 'Fórmulas',
    charts: 'Gráficos',
    automation: 'Automações',
    validation: 'Validação',
    yes: 'Sim',
    no: 'Não',
    restrictions: 'Restrições',
    functionalities: 'Funcionalidades',
    technologiesTitle: 'Tecnologias',
    bestPractices: 'Boas práticas',
    expectedResult: 'Resultado esperado',
    expectedResultText: 'Entregue um produto final completo, alinhado ao objetivo, público e requisitos descritos, seguindo as melhores práticas da categoria.',
    notes: 'Observações',
    engineNote: 'Instrução para',
    bpCode: 'Código limpo, modular e bem documentado.',
    bpResponsive: 'Layout totalmente responsivo para todos os dispositivos.',
    bpAccessibility: 'Acessibilidade (WCAG) e usabilidade inclusiva.',
    bpPerformance: 'Performance otimizada (carregamento, lazy load, cache).',
    bpSecurity: 'Segurança (validação, sanitização, autenticação segura).',
    bpScalability: 'Arquitetura escalável e fácil de manter.',
    bpImageQuality: 'Imagem de alta qualidade, sem distorções.',
    bpComposition: 'Composição equilibrada e foco claro.',
    bpLighting: 'Iluminação coerente com o estilo e mood.',
    bpVideoFlow: 'Narrativa visual fluida e coesa.',
    bpAudio: 'Áudio sincronizado e adequado ao contexto.',
    bpConsistency: 'Consistência visual e de estilo.',
    bpClarity: 'Clareza, coesão e objetividade.',
    bpAudience: 'Tom adequado ao público-alvo.',
    bpSeo: 'Estrutura amigável para SEO quando aplicável.',
    architecture: 'Arquitetura',
    architectureText: 'Defina uma arquitetura modular com separação de responsabilidades, camadas de apresentação, negócio e dados, APIs RESTful quando aplicável, e documentação técnica mínima.',
    performance: 'Performance',
    performanceText: 'Otimize para carregamento rápido, cache, lazy loading, bundle reduzido, queries eficientes e monitoramento de métricas.',
    security: 'Segurança',
    securityText: 'Implemente autenticação segura, autorização baseada em papéis, validação de entrada, sanitização, proteção contra XSS/SQL injection, HTTPS e logs de auditoria.',
    shortTitle: 'Resumo',
    shortFor: 'Prompt resumido para'
  },
  en: {
    title: 'Prompt',
    category: 'Category',
    target: 'Target AI',
    version: 'Version',
    objective: 'Objective',
    context: 'Context',
    projectName: 'Project name',
    audience: 'Target audience',
    industry: 'Industry',
    requirements: 'Requirements',
    features: 'Features',
    pages: 'Pages',
    sections: 'Sections',
    modules: 'Modules',
    technologies: 'Technologies',
    platform: 'Platform',
    style: 'Style',
    colors: 'Colors',
    database: 'Database',
    responsive: 'Responsive',
    animations: 'Animations',
    accessibility: 'Accessibility',
    multilingual: 'Multilingual',
    login: 'Login',
    adminPanel: 'Admin panel',
    offline: 'Offline',
    gps: 'GPS',
    notifications: 'Notifications',
    payment: 'Payment',
    map: 'Map',
    api: 'API',
    integrations: 'Integrations',
    specialty: 'Specialty',
    tone: 'Tone',
    personality: 'Personality',
    tools: 'Tools',
    responseFormat: 'Response format',
    memory: 'Memory',
    temperature: 'Creativity',
    model: 'Model',
    imageStyle: 'Image style',
    ratio: 'Ratio',
    resolution: 'Resolution',
    characters: 'Characters',
    setting: 'Setting',
    objects: 'Objects',
    lighting: 'Lighting',
    camera: 'Camera/lens',
    palette: 'Color palette',
    detail: 'Detail level',
    textImage: 'Text on image',
    duration: 'Duration',
    format: 'Format',
    narrator: 'Narrator',
    subtitles: 'Subtitles',
    music: 'Music',
    effects: 'Effects',
    scenes: 'Scenes',
    aiTool: 'AI tool',
    tabs: 'Tabs',
    formulas: 'Formulas',
    charts: 'Charts',
    automation: 'Automation',
    validation: 'Validation',
    yes: 'Yes',
    no: 'No',
    restrictions: 'Restrictions',
    functionalities: 'Functionalities',
    technologiesTitle: 'Technologies',
    bestPractices: 'Best practices',
    expectedResult: 'Expected result',
    expectedResultText: 'Deliver a complete final product aligned with the objective, audience, and requirements, following the best practices of the category.',
    notes: 'Notes',
    engineNote: 'Instruction for',
    bpCode: 'Clean, modular, well-documented code.',
    bpResponsive: 'Fully responsive layout for all devices.',
    bpAccessibility: 'Accessibility (WCAG) and inclusive usability.',
    bpPerformance: 'Optimized performance (loading, lazy load, cache).',
    bpSecurity: 'Security (validation, sanitization, secure authentication).',
    bpScalability: 'Scalable and maintainable architecture.',
    bpImageQuality: 'High-quality image without distortions.',
    bpComposition: 'Balanced composition and clear focal point.',
    bpLighting: 'Lighting consistent with style and mood.',
    bpVideoFlow: 'Smooth and cohesive visual narrative.',
    bpAudio: 'Synchronized audio appropriate to context.',
    bpConsistency: 'Visual and style consistency.',
    bpClarity: 'Clarity, cohesion, and objectivity.',
    bpAudience: 'Tone appropriate for the target audience.',
    bpSeo: 'SEO-friendly structure when applicable.',
    architecture: 'Architecture',
    architectureText: 'Define a modular architecture with separation of concerns, presentation/business/data layers, RESTful APIs when applicable, and minimal technical documentation.',
    performance: 'Performance',
    performanceText: 'Optimize for fast loading, caching, lazy loading, reduced bundles, efficient queries, and metric monitoring.',
    security: 'Security',
    securityText: 'Implement secure authentication, role-based authorization, input validation, sanitization, XSS/SQL injection protection, HTTPS, and audit logs.',
    shortTitle: 'Summary',
    shortFor: 'Short prompt for'
  },
  es: {
    title: 'Prompt',
    category: 'Categoría',
    target: 'IA objetivo',
    version: 'Versión',
    objective: 'Objetivo',
    context: 'Contexto',
    projectName: 'Nombre del proyecto',
    audience: 'Público objetivo',
    industry: 'Industria',
    requirements: 'Requisitos',
    features: 'Funcionalidades',
    pages: 'Páginas',
    sections: 'Secciones',
    modules: 'Módulos',
    technologies: 'Tecnologías',
    platform: 'Plataforma',
    style: 'Estilo',
    colors: 'Colores',
    database: 'Base de datos',
    responsive: 'Responsivo',
    animations: 'Animaciones',
    accessibility: 'Accesibilidad',
    multilingual: 'Multilingüe',
    login: 'Inicio de sesión',
    adminPanel: 'Panel administrativo',
    offline: 'Offline',
    gps: 'GPS',
    notifications: 'Notificaciones',
    payment: 'Pago',
    map: 'Mapa',
    api: 'API',
    integrations: 'Integraciones',
    specialty: 'Especialidad',
    tone: 'Tono',
    personality: 'Personalidad',
    tools: 'Herramientas',
    responseFormat: 'Formato de respuestas',
    memory: 'Memoria',
    temperature: 'Creatividad',
    model: 'Modelo',
    imageStyle: 'Estilo de imagen',
    ratio: 'Proporción',
    resolution: 'Resolución',
    characters: 'Personajes',
    setting: 'Escenario',
    objects: 'Objetos',
    lighting: 'Iluminación',
    camera: 'Cámara/lente',
    palette: 'Paleta de colores',
    detail: 'Nivel de detalle',
    textImage: 'Texto en imagen',
    duration: 'Duración',
    format: 'Formato',
    narrator: 'Narrador',
    subtitles: 'Subtítulos',
    music: 'Música',
    effects: 'Efectos',
    scenes: 'Escenas',
    aiTool: 'IA utilizada',
    tabs: 'Pestañas',
    formulas: 'Fórmulas',
    charts: 'Gráficos',
    automation: 'Automatizaciones',
    validation: 'Validación',
    yes: 'Sí',
    no: 'No',
    restrictions: 'Restricciones',
    functionalities: 'Funcionalidades',
    technologiesTitle: 'Tecnologías',
    bestPractices: 'Buenas prácticas',
    expectedResult: 'Resultado esperado',
    expectedResultText: 'Entrega un producto final completo, alineado con el objetivo, público y requisitos descritos, siguiendo las mejores prácticas de la categoría.',
    notes: 'Observaciones',
    engineNote: 'Instrucción para',
    bpCode: 'Código limpio, modular y bien documentado.',
    bpResponsive: 'Diseño totalmente responsivo para todos los dispositivos.',
    bpAccessibility: 'Accesibilidad (WCAG) y usabilidad inclusiva.',
    bpPerformance: 'Rendimiento optimizado (carga, lazy load, caché).',
    bpSecurity: 'Seguridad (validación, sanitización, autenticación segura).',
    bpScalability: 'Arquitectura escalable y fácil de mantener.',
    bpImageQuality: 'Imagen de alta calidad sin distorsiones.',
    bpComposition: 'Composición equilibrada y foco claro.',
    bpLighting: 'Iluminación coherente con el estilo y mood.',
    bpVideoFlow: 'Narrativa visual fluida y cohesionada.',
    bpAudio: 'Audio sincronizado y adecuado al contexto.',
    bpConsistency: 'Consistencia visual y de estilo.',
    bpClarity: 'Claridad, cohesión y objetividad.',
    bpAudience: 'Tono adecuado al público objetivo.',
    bpSeo: 'Estructura amigable para SEO cuando aplique.',
    architecture: 'Arquitectura',
    architectureText: 'Define una arquitectura modular con separación de responsabilidades, capas de presentación, negocio y datos, APIs RESTful cuando aplique, y documentación técnica mínima.',
    performance: 'Rendimiento',
    performanceText: 'Optimiza para carga rápida, caché, lazy loading, bundles reducidos, consultas eficientes y monitoreo de métricas.',
    security: 'Seguridad',
    securityText: 'Implementa autenticación segura, autorización basada en roles, validación de entradas, sanitización, protección contra XSS/SQL injection, HTTPS y logs de auditoría.',
    shortTitle: 'Resumen',
    shortFor: 'Prompt resumido para'
  }
};

if (typeof window !== 'undefined') {
  window.generator = generator;
}
