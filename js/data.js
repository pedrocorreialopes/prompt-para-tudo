const APP_DATA = {
  categories: [
    { id: 'app', name: 'Aplicativo', icon: 'smartphone', group: 'digital' },
    { id: 'website', name: 'Website', icon: 'globe', group: 'digital' },
    { id: 'landing', name: 'Landing Page', icon: 'mouse-pointer-click', group: 'digital' },
    { id: 'ecommerce', name: 'Loja Virtual', icon: 'shopping-cart', group: 'digital' },
    { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard', group: 'digital' },
    { id: 'web-system', name: 'Sistema Web', icon: 'server', group: 'digital' },
    { id: 'api', name: 'API', icon: 'webhook', group: 'digital' },
    { id: 'database', name: 'Banco de Dados', icon: 'database', group: 'digital' },
    { id: 'mobile-app', name: 'Aplicativo Mobile', icon: 'tablet-smartphone', group: 'digital' },
    { id: 'presentation', name: 'Apresentação', icon: 'presentation', group: 'content' },
    { id: 'document', name: 'Documento', icon: 'file-text', group: 'content' },
    { id: 'spreadsheet', name: 'Planilha', icon: 'sheet', group: 'content' },
    { id: 'ebook', name: 'Ebook', icon: 'book-open', group: 'content' },
    { id: 'course', name: 'Curso', icon: 'graduation-cap', group: 'content' },
    { id: 'article', name: 'Artigo', icon: 'newspaper', group: 'content' },
    { id: 'social-post', name: 'Post Redes Sociais', icon: 'instagram', group: 'marketing' },
    { id: 'marketing', name: 'Campanha Marketing', icon: 'megaphone', group: 'marketing' },
    { id: 'image', name: 'Imagem', icon: 'image', group: 'creative' },
    { id: 'illustration', name: 'Ilustração', icon: 'palette', group: 'creative' },
    { id: 'logo', name: 'Logotipo', icon: 'pen-tool', group: 'creative' },
    { id: 'brand', name: 'Identidade Visual', icon: 'box-select', group: 'creative' },
    { id: 'banner', name: 'Banner', icon: 'image-plus', group: 'creative' },
    { id: 'flyer', name: 'Flyer', icon: 'file-image', group: 'creative' },
    { id: 'business-card', name: 'Cartão de Visita', icon: 'credit-card', group: 'creative' },
    { id: 'mockup', name: 'Mockup', icon: 'monitor', group: 'creative' },
    { id: 'video', name: 'Vídeo', icon: 'video', group: 'creative' },
    { id: 'commercial', name: 'Comercial', icon: 'tv', group: 'creative' },
    { id: 'animation', name: 'Animação', icon: 'film', group: 'creative' },
    { id: 'music', name: 'Música', icon: 'music', group: 'creative' },
    { id: 'script', name: 'Roteiro', icon: 'scroll', group: 'content' },
    { id: 'podcast', name: 'Podcast', icon: 'mic', group: 'content' },
    { id: 'ai-agent', name: 'Agente de IA', icon: 'bot', group: 'ai' },
    { id: 'chatbot', name: 'Chatbot', icon: 'message-square', group: 'ai' },
    { id: 'automation', name: 'Automação', icon: 'workflow', group: 'ai' },
    { id: 'workflow', name: 'Workflow', icon: 'git-branch', group: 'ai' },
    { id: 'other', name: 'Outro', icon: 'more-horizontal', group: 'other' }
  ],

  // Shared question templates reused across categories
  sharedFields: {
    projectName: { id: 'projectName', label: 'Qual o nome do projeto?', type: 'text', placeholder: 'Ex: Nome da empresa, produto ou projeto', required: true },
    objective: { id: 'objective', label: 'Qual o objetivo principal?', type: 'textarea', placeholder: 'Descreva o que deseja alcançar com este projeto.', required: true },
    audience: { id: 'audience', label: 'Quem será o público-alvo?', type: 'textarea', placeholder: 'Descreva o perfil, idade, necessidades e comportamento do público.', required: true },
    notes: { id: 'notes', label: 'Observações adicionais', type: 'textarea', placeholder: 'Detalhes extras, restrições, preferências ou contexto adicional.', required: false }
  },

  // Questions per category. Each question may have conditional visibility 'when'
  questions: {
    website: [
      'projectName', 'objective', 'audience',
      { id: 'pages', label: 'Quais páginas deseja?', type: 'chips', options: ['Home', 'Sobre', 'Serviços', 'Produtos', 'Blog', 'Contato', 'FAQ', 'Portfólio', 'Preços', 'Depoimentos', 'Outra'], multiple: true },
      { id: 'needsLogin', label: 'Precisa de login?', type: 'toggle', value: false },
      { id: 'adminPanel', label: 'Terá painel administrativo?', type: 'toggle', value: false },
      { id: 'features', label: 'Quais funcionalidades?', type: 'chips', options: ['Formulários', 'Blog', 'Busca', 'Galeria', 'Agendamento', 'Chat', 'Newsletter', 'Mapa', 'Multilíngue', 'Analytics', 'Outra'], multiple: true },
      { id: 'colors', label: 'Quais cores devem predominar?', type: 'text', placeholder: 'Ex: Azul escuro, branco, cinza', required: false },
      { id: 'style', label: 'Qual estilo visual?', type: 'chips', options: ['Minimalista', 'Futurista', 'Corporativo', 'Premium', 'Dark', 'Light', 'Criativo', 'Elegante'], multiple: false },
      { id: 'animations', label: 'Terá animações?', type: 'toggle', value: false },
      { id: 'responsive', label: 'Será responsivo?', type: 'toggle', value: true },
      { id: 'technologies', label: 'Quais tecnologias prefere?', type: 'chips', options: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Vue', 'Angular', 'Tailwind', 'Bootstrap', 'Node.js', 'Laravel', 'PHP', 'Python', 'Java', '.NET', 'Outra'], multiple: true },
      { id: 'database', label: 'Banco de dados?', type: 'chips', options: ['MySQL', 'PostgreSQL', 'Firebase', 'MongoDB', 'Supabase', 'SQLite', 'Nenhum', 'Outro'], multiple: false },
      { id: 'seo', label: 'SEO?', type: 'toggle', value: true },
      { id: 'accessibility', label: 'Acessibilidade?', type: 'toggle', value: true },
      { id: 'multilingual', label: 'Multilíngue?', type: 'toggle', value: false },
      { id: 'integrations', label: 'Integrações?', type: 'chips', options: ['Pagamento', 'Google', 'WhatsApp', 'OpenAI', 'Stripe', 'Mercado Pago', 'Pix', 'Redes Sociais', 'Nenhuma', 'Outras'], multiple: true },
      'notes'
    ],
    app: [
      'projectName', 'objective', 'audience',
      { id: 'platform', label: 'Plataforma?', type: 'chips', options: ['Android', 'iOS', 'Flutter', 'React Native', 'PWA', 'Web', 'Outra'], multiple: true },
      { id: 'offline', label: 'Funciona offline?', type: 'toggle', value: false },
      { id: 'login', label: 'Sistema de login?', type: 'toggle', value: false },
      { id: 'gps', label: 'GPS / Localização?', type: 'toggle', value: false },
      { id: 'notifications', label: 'Notificações push?', type: 'toggle', value: false },
      { id: 'payment', label: 'Pagamento in-app?', type: 'toggle', value: false },
      { id: 'map', label: 'Mapa integrado?', type: 'toggle', value: false },
      { id: 'database', label: 'Banco de dados?', type: 'chips', options: ['Firebase', 'SQLite', 'MongoDB', 'PostgreSQL', 'Supabase', 'MySQL', 'Nenhum', 'Outro'], multiple: false },
      { id: 'api', label: 'Integração com API?', type: 'toggle', value: false },
      'notes'
    ],
    'mobile-app': [
      'projectName', 'objective', 'audience',
      { id: 'platform', label: 'Plataforma?', type: 'chips', options: ['Android', 'iOS', 'Flutter', 'React Native', 'PWA', 'Outra'], multiple: true },
      { id: 'offline', label: 'Funciona offline?', type: 'toggle', value: false },
      { id: 'login', label: 'Login e cadastro?', type: 'toggle', value: false },
      { id: 'notifications', label: 'Notificações push?', type: 'toggle', value: false },
      { id: 'payment', label: 'Pagamento in-app?', type: 'toggle', value: false },
      { id: 'gps', label: 'GPS / Localização?', type: 'toggle', value: false },
      { id: 'camera', label: 'Uso de câmera?', type: 'toggle', value: false },
      { id: 'database', label: 'Banco de dados?', type: 'chips', options: ['Firebase', 'SQLite', 'Supabase', 'MongoDB', 'PostgreSQL', 'Outro'], multiple: false },
      'notes'
    ],
    landing: [
      'projectName', 'objective', 'audience',
      { id: 'sections', label: 'Seções principais?', type: 'chips', options: ['Hero', 'Benefícios', 'Funcionalidades', 'Depoimentos', 'Preços', 'CTA', 'FAQ', 'Contato', 'Outra'], multiple: true },
      { id: 'leadGoal', label: 'Objetivo de conversão?', type: 'chips', options: ['Captar e-mails', 'Vendas', 'Agendamentos', 'Downloads', 'Cadastro', 'Outro'], multiple: false },
      { id: 'style', label: 'Estilo visual?', type: 'chips', options: ['Minimalista', 'Futurista', 'Premium', 'Corporativo', 'Criativo', 'Dark', 'Light'], multiple: false },
      { id: 'animations', label: 'Terá animações?', type: 'toggle', value: true },
      { id: 'responsive', label: 'Responsivo?', type: 'toggle', value: true },
      { id: 'integrations', label: 'Integrações?', type: 'chips', options: ['Google Analytics', 'Meta Pixel', 'WhatsApp', 'Formulário', 'Pagamento', 'Nenhuma', 'Outra'], multiple: true },
      'notes'
    ],
    ecommerce: [
      'projectName', 'objective', 'audience',
      { id: 'products', label: 'Tipo de produtos?', type: 'text', placeholder: 'Físicos, digitais, serviços, etc.' },
      { id: 'payments', label: 'Meios de pagamento?', type: 'chips', options: ['Cartão', 'Pix', 'Boleto', 'PayPal', 'Stripe', 'Mercado Pago', 'Outro'], multiple: true },
      { id: 'shipping', label: 'Frete integrado?', type: 'toggle', value: false },
      { id: 'stock', label: 'Controle de estoque?', type: 'toggle', value: true },
      { id: 'platform', label: 'Plataforma preferida?', type: 'chips', options: ['Shopify', 'WooCommerce', 'Magento', 'VTEX', 'Nuvem Shop', 'Loja Integrada', 'Custom', 'Outra'], multiple: false },
      'notes'
    ],
    dashboard: [
      'projectName', 'objective', 'audience',
      { id: 'metrics', label: 'Principais métricas?', type: 'chips', options: ['Vendas', 'Usuários', 'Visitas', 'Conversão', 'Receita', 'Tickets', 'Outra'], multiple: true },
      { id: 'widgets', label: 'Widgets desejados?', type: 'chips', options: ['Gráficos', 'Tabelas', 'KPIs', 'Mapas', 'Calendário', 'Filtros', 'Exportação', 'Outro'], multiple: true },
      { id: 'dataSource', label: 'Fonte de dados?', type: 'text', placeholder: 'API, banco de dados, planilha, etc.' },
      { id: 'realtime', label: 'Dados em tempo real?', type: 'toggle', value: false },
      'notes'
    ],
    'web-system': [
      'projectName', 'objective', 'audience',
      { id: 'modules', label: 'Módulos principais?', type: 'chips', options: ['Usuários', 'Relatórios', 'Financeiro', 'Cadastros', 'Agendamento', 'Notificações', 'Permissões', 'API', 'Outro'], multiple: true },
      { id: 'roles', label: 'Papéis de usuários?', type: 'chips', options: ['Admin', 'Gerente', 'Operador', 'Cliente', 'Outro'], multiple: true },
      { id: 'technologies', label: 'Tecnologias?', type: 'chips', options: ['React', 'Vue', 'Angular', 'Next.js', 'Laravel', 'Node.js', 'Python', 'Java', '.NET', 'Outra'], multiple: true },
      'notes'
    ],
    api: [
      'projectName', 'objective', 'audience',
      { id: 'methods', label: 'Métodos HTTP?', type: 'chips', options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'Outro'], multiple: true },
      { id: 'auth', label: 'Autenticação?', type: 'chips', options: ['JWT', 'OAuth2', 'API Key', 'Basic Auth', 'Nenhuma', 'Outra'], multiple: false },
      { id: 'format', label: 'Formato de resposta?', type: 'chips', options: ['JSON', 'XML', 'GraphQL', 'gRPC', 'Outro'], multiple: false },
      { id: 'language', label: 'Linguagem preferida?', type: 'chips', options: ['Node.js', 'Python', 'Go', 'Java', 'PHP', 'Ruby', 'C#', 'Outra'], multiple: false },
      'notes'
    ],
    database: [
      'projectName', 'objective',
      { id: 'dbType', label: 'Tipo de banco?', type: 'chips', options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Firebase', 'Supabase', 'Oracle', 'SQL Server', 'Outro'], multiple: false },
      { id: 'entities', label: 'Principais entidades?', type: 'textarea', placeholder: 'Usuários, produtos, pedidos, etc.' },
      { id: 'scale', label: 'Volume esperado?', type: 'chips', options: ['Baixo', 'Médio', 'Alto', 'Massivo'], multiple: false },
      'notes'
    ],
    image: [
      'objective',
      { id: 'style', label: 'Qual estilo?', type: 'chips', options: ['Realista', '3D', 'Anime', 'Pixar', 'Disney', 'Cyberpunk', 'Minimalista', 'Vintage', 'Aquarela', 'Oil Painting', 'Low Poly', 'Steampunk', 'Fantasy', 'Fotografia', 'Outro'], multiple: false },
      { id: 'ratio', label: 'Proporção?', type: 'chips', options: ['1:1', '4:5', '16:9', '9:16', '3:2', '2:3', 'Outra'], multiple: false },
      { id: 'resolution', label: 'Resolução?', type: 'text', placeholder: 'Ex: 1024x1024, 4K, 8K', required: false },
      { id: 'characters', label: 'Personagens?', type: 'textarea', placeholder: 'Descreva personagens, idade, expressão, roupa, etc.' },
      { id: 'setting', label: 'Cenário?', type: 'textarea', placeholder: 'Descreva o ambiente e local.' },
      { id: 'objects', label: 'Objetos principais?', type: 'textarea', placeholder: 'Itens ou elementos que devem aparecer.' },
      { id: 'lighting', label: 'Iluminação?', type: 'chips', options: ['Natural', 'Dramática', 'Neon', 'Suave', 'Dourada', 'Noturna', 'Estúdio', 'Outra'], multiple: false },
      { id: 'camera', label: 'Câmera / lente?', type: 'text', placeholder: 'Ex: 35mm, 50mm, close-up, aérea', required: false },
      { id: 'palette', label: 'Paleta de cores?', type: 'text', placeholder: 'Ex: Tons quentes, pastel, monocromática', required: false },
      { id: 'detail', label: 'Nível de detalhes?', type: 'chips', options: ['Baixo', 'Médio', 'Alto', 'Hiper-realista'], multiple: false },
      { id: 'textImage', label: 'Texto na imagem?', type: 'text', placeholder: 'Texto que deve aparecer (se houver)', required: false },
      'notes'
    ],
    illustration: [
      'objective',
      { id: 'style', label: 'Estilo?', type: 'chips', options: ['Aquarela', 'Vetor', 'Linework', 'Digital', 'Vintage', 'Minimalista', 'Fantasia', 'Infantil', 'Outro'], multiple: false },
      { id: 'subject', label: 'Assunto?', type: 'textarea', placeholder: 'O que deve ser ilustrado?' },
      { id: 'colors', label: 'Cores?', type: 'text', placeholder: 'Ex: Vibrante, pastel, monocromática' },
      { id: 'usage', label: 'Uso?', type: 'chips', options: ['Web', 'Impressão', 'Redes Sociais', 'Editorial', 'Outro'], multiple: true },
      'notes'
    ],
    logo: [
      'projectName', 'objective',
      { id: 'style', label: 'Estilo?', type: 'chips', options: ['Minimalista', 'Moderno', 'Vintage', 'Tipográfico', 'Monograma', 'Mascote', 'Abstrato', 'Outro'], multiple: false },
      { id: 'colors', label: 'Cores desejadas?', type: 'text', placeholder: 'Ex: Azul e dourado' },
      { id: 'industry', label: 'Indústria / nicho?', type: 'text', placeholder: 'Ex: Tecnologia, food, moda' },
      'notes'
    ],
    brand: [
      'projectName', 'objective', 'audience',
      { id: 'assets', label: 'Materiais necessários?', type: 'chips', options: ['Logo', 'Paleta', 'Tipografia', 'Cartão de visita', 'Papelaria', 'Manual', 'Social Media', 'Outro'], multiple: true },
      { id: 'personality', label: 'Personalidade da marca?', type: 'chips', options: ['Inovadora', 'Tradicional', 'Premium', 'Acessível', 'Divertida', 'Séria', 'Outra'], multiple: false },
      'notes'
    ],
    banner: [
      'objective',
      { id: 'platform', label: 'Plataforma?', type: 'chips', options: ['Website', 'Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'Google Ads', 'Outro'], multiple: true },
      { id: 'size', label: 'Tamanho?', type: 'text', placeholder: 'Ex: 1200x628, 1080x1080' },
      { id: 'cta', label: 'Call to action?', type: 'text', placeholder: 'Ex: Saiba mais, Compre agora' },
      'notes'
    ],
    flyer: [
      'objective', 'audience',
      { id: 'format', label: 'Formato?', type: 'chips', options: ['A4', 'A5', 'DL', 'Quadrado', 'Digital', 'Impresso', 'Outro'], multiple: false },
      { id: 'info', label: 'Informações obrigatórias?', type: 'textarea', placeholder: 'Endereço, telefone, data, preço, etc.' },
      'notes'
    ],
    'business-card': [
      'projectName',
      { id: 'info', label: 'Informações no cartão?', type: 'textarea', placeholder: 'Nome, cargo, telefone, e-mail, site, endereço.' },
      { id: 'style', label: 'Estilo?', type: 'chips', options: ['Minimalista', 'Premium', 'Criativo', 'Corporativo', 'Moderno', 'Outro'], multiple: false },
      'notes'
    ],
    mockup: [
      'objective',
      { id: 'product', label: 'Produto a aplicar?', type: 'text', placeholder: 'Ex: App, logo, embalagem, site' },
      { id: 'scene', label: 'Cena?', type: 'chips', options: ['Dispositivo', 'Papelaria', 'Embalagem', 'Outdoor', 'Ambiente', 'Outro'], multiple: false },
      'notes'
    ],
    video: [
      'objective', 'audience',
      { id: 'duration', label: 'Duração?', type: 'chips', options: ['15s', '30s', '60s', '1-3 min', '5-10 min', 'Mais de 10 min', 'Outro'], multiple: false },
      { id: 'style', label: 'Estilo?', type: 'chips', options: ['Realista', 'Animado', 'Motion Graphics', 'Documental', 'Comercial', 'Cinematográfico', 'Outro'], multiple: false },
      { id: 'format', label: 'Formato?', type: 'chips', options: ['Horizontal', 'Vertical', 'Quadrado', 'Stories', 'Reels', 'Outro'], multiple: false },
      { id: 'language', label: 'Idioma?', type: 'chips', options: ['Português', 'English', 'Español', 'Outro'], multiple: false },
      { id: 'narrator', label: 'Narrador?', type: 'chips', options: ['Masculino', 'Feminino', 'Neutro', 'Sem narração', 'Outro'], multiple: false },
      { id: 'subtitles', label: 'Legendas?', type: 'toggle', value: true },
      { id: 'music', label: 'Trilha sonora?', type: 'chips', options: ['Ambient', 'Eletrônica', 'Orquestral', 'Pop', 'Sem música', 'Outro'], multiple: false },
      { id: 'effects', label: 'Efeitos especiais?', type: 'chips', options: ['Transições suaves', 'Motion graphics', 'CGI', 'Partículas', 'Nenhum', 'Outro'], multiple: true },
      { id: 'scenes', label: 'Principais cenas?', type: 'textarea', placeholder: 'Descreva as cenas ou storyboard.' },
      { id: 'aiTool', label: 'IA utilizada?', type: 'chips', options: ['Runway', 'Sora', 'Kling', 'Pika', 'Veo', 'Outra'], multiple: false },
      'notes'
    ],
    commercial: [
      'objective', 'audience',
      { id: 'duration', label: 'Duração?', type: 'chips', options: ['15s', '30s', '60s', 'Outro'], multiple: false },
      { id: 'platform', label: 'Onde veicular?', type: 'chips', options: ['TV', 'YouTube', 'Instagram', 'TikTok', 'Facebook', 'Outro'], multiple: true },
      { id: 'cta', label: 'Call to action?', type: 'text', placeholder: 'Ex: Compre agora' },
      'notes'
    ],
    animation: [
      'objective', 'audience',
      { id: 'style', label: 'Estilo?', type: 'chips', options: ['2D', '3D', 'Motion Graphics', 'Stop Motion', 'Animação textual', 'Outro'], multiple: false },
      { id: 'duration', label: 'Duração?', type: 'chips', options: ['15s', '30s', '60s', '1-3 min', 'Outro'], multiple: false },
      { id: 'sound', label: 'Som?', type: 'chips', options: ['Com música', 'Com narração', 'Ambos', 'Sem som', 'Outro'], multiple: false },
      'notes'
    ],
    music: [
      'objective',
      { id: 'genre', label: 'Gênero?', type: 'chips', options: ['Lo-fi', 'Eletrônica', 'Pop', 'Rock', 'Clássica', 'Jazz', 'Hip-hop', 'Ambient', 'Outro'], multiple: false },
      { id: 'mood', label: 'Humor?', type: 'chips', options: ['Alegre', 'Triste', 'Épico', 'Relaxante', 'Suspense', 'Romântico', 'Outro'], multiple: false },
      { id: 'duration', label: 'Duração?', type: 'text', placeholder: 'Ex: 2 minutos' },
      { id: 'instruments', label: 'Instrumentos?', type: 'text', placeholder: 'Ex: Piano, guitarra, sintetizador', required: false },
      'notes'
    ],
    script: [
      'objective', 'audience',
      { id: 'genre', label: 'Gênero?', type: 'chips', options: ['Drama', 'Comédia', 'Ação', 'Suspense', 'Documentário', 'Publicitário', 'Outro'], multiple: false },
      { id: 'duration', label: 'Duração?', type: 'text', placeholder: 'Ex: 5 minutos, 30 páginas' },
      { id: 'characters', label: 'Personagens principais?', type: 'textarea', placeholder: 'Nome e breve descrição.' },
      { id: 'tone', label: 'Tom?', type: 'chips', options: ['Leve', 'Sério', 'Inspirador', 'Humorístico', 'Dramático', 'Outro'], multiple: false },
      'notes'
    ],
    podcast: [
      'objective', 'audience',
      { id: 'theme', label: 'Tema do episódio?', type: 'text', placeholder: 'Sobre o que é o episódio?' },
      { id: 'duration', label: 'Duração?', type: 'chips', options: ['15-30 min', '30-60 min', '60+ min', 'Outro'], multiple: false },
      { id: 'format', label: 'Formato?', type: 'chips', options: ['Entrevista', 'Solo', 'Painel', 'Narrativa', 'Outro'], multiple: false },
      'notes'
    ],
    'ai-agent': [
      'projectName', 'objective',
      { id: 'specialty', label: 'Especialidade?', type: 'text', placeholder: 'Ex: Suporte técnico, vendas, coach' },
      { id: 'tone', label: 'Tom de voz?', type: 'chips', options: ['Profissional', 'Amigável', 'Técnico', 'Divertido', 'Empático', 'Formal', 'Outro'], multiple: false },
      { id: 'personality', label: 'Personalidade?', type: 'text', placeholder: 'Ex: Paciente, curioso, direto' },
      { id: 'limitations', label: 'Limitações?', type: 'textarea', placeholder: 'O que o agente NÃO deve fazer?' },
      { id: 'tools', label: 'Ferramentas disponíveis?', type: 'chips', options: ['Busca web', 'API', 'Banco de dados', 'Calculadora', 'Gerar código', 'Outra'], multiple: true },
      { id: 'responseFormat', label: 'Formato das respostas?', type: 'chips', options: ['Texto', 'JSON', 'Markdown', 'Lista', 'Tabela', 'Outro'], multiple: false },
      { id: 'examples', label: 'Exemplos de interação?', type: 'textarea', placeholder: 'Cole exemplos de perguntas e respostas ideais.' },
      { id: 'memory', label: 'Memória entre conversas?', type: 'toggle', value: true },
      { id: 'temperature', label: 'Temperatura / criatividade?', type: 'chips', options: ['Baixa (preciso)', 'Média', 'Alta (criativo)', 'Outro'], multiple: false },
      { id: 'model', label: 'Modelo preferido?', type: 'chips', options: ['GPT-4', 'Claude', 'Gemini', 'Grok', 'Llama', 'Outro'], multiple: false },
      'notes'
    ],
    chatbot: [
      'projectName', 'objective', 'audience',
      { id: 'tone', label: 'Tom?', type: 'chips', options: ['Profissional', 'Amigável', 'Técnico', 'Divertido', 'Empático', 'Outro'], multiple: false },
      { id: 'channels', label: 'Canais?', type: 'chips', options: ['Website', 'WhatsApp', 'Instagram', 'Telegram', 'Messenger', 'Outro'], multiple: true },
      { id: 'integrations', label: 'Integrações?', type: 'chips', options: ['CRM', 'OpenAI', 'API própria', 'Nenhuma', 'Outra'], multiple: true },
      'notes'
    ],
    automation: [
      'objective',
      { id: 'trigger', label: 'Gatilho?', type: 'text', placeholder: 'O que inicia a automação?' },
      { id: 'actions', label: 'Ações?', type: 'chips', options: ['Enviar e-mail', 'Criar tarefa', 'Postar redes', 'Gerar relatório', 'Mover dados', 'Notificar', 'Outra'], multiple: true },
      { id: 'tools', label: 'Ferramentas?', type: 'chips', options: ['Zapier', 'Make', 'n8n', 'Python', 'Node.js', 'Power Automate', 'Outra'], multiple: true },
      'notes'
    ],
    workflow: [
      'objective', 'audience',
      { id: 'steps', label: 'Etapas do workflow?', type: 'textarea', placeholder: 'Liste as etapas principais.' },
      { id: 'approval', label: 'Aprovações?', type: 'toggle', value: false },
      { id: 'notifications', label: 'Notificações?', type: 'toggle', value: true },
      'notes'
    ],
    spreadsheet: [
      'objective',
      { id: 'tabs', label: 'Quais abas?', type: 'textarea', placeholder: 'Ex: Vendas, Produtos, Clientes' },
      { id: 'formulas', label: 'Quais fórmulas?', type: 'textarea', placeholder: 'Soma, PROCV, SE, etc.' },
      { id: 'charts', label: 'Terá gráficos?', type: 'toggle', value: false },
      { id: 'dashboard', label: 'Dashboard?', type: 'toggle', value: false },
      { id: 'automation', label: 'Automações?', type: 'toggle', value: false },
      { id: 'macros', label: 'Macros?', type: 'toggle', value: false },
      { id: 'validation', label: 'Validação de dados?', type: 'toggle', value: true },
      'notes'
    ],
    presentation: [
      'objective', 'audience',
      { id: 'slides', label: 'Quantidade de slides?', type: 'text', placeholder: 'Ex: 10-15 slides' },
      { id: 'style', label: 'Estilo visual?', type: 'chips', options: ['Minimalista', 'Corporativo', 'Criativo', 'Premium', 'Dark', 'Light', 'Outro'], multiple: false },
      { id: 'content', label: 'Conteúdo a incluir?', type: 'textarea', placeholder: 'Tópicos ou seções principais.' },
      'notes'
    ],
    document: [
      'objective', 'audience',
      { id: 'type', label: 'Tipo de documento?', type: 'chips', options: ['Contrato', 'Relatório', 'Manual', 'Proposta', 'Especificação', 'Memorial', 'Outro'], multiple: false },
      { id: 'sections', label: 'Seções desejadas?', type: 'textarea', placeholder: 'Liste as seções principais.' },
      { id: 'tone', label: 'Tom?', type: 'chips', options: ['Formal', 'Técnico', 'Simples', 'Comercial', 'Outro'], multiple: false },
      'notes'
    ],
    ebook: [
      'objective', 'audience',
      { id: 'topic', label: 'Tema principal?', type: 'text', placeholder: 'Qual o assunto do ebook?' },
      { id: 'chapters', label: 'Capítulos?', type: 'textarea', placeholder: 'Liste os capítulos desejados.' },
      { id: 'pages', label: 'Quantidade de páginas?', type: 'text', placeholder: 'Ex: 20-30 páginas' },
      'notes'
    ],
    course: [
      'objective', 'audience',
      { id: 'topic', label: 'Tema do curso?', type: 'text', placeholder: 'Qual o assunto?' },
      { id: 'modules', label: 'Módulos?', type: 'textarea', placeholder: 'Liste os módulos/aulas.' },
      { id: 'format', label: 'Formato?', type: 'chips', options: ['Vídeo', 'Texto', 'Áudio', 'Ao vivo', 'Híbrido', 'Outro'], multiple: false },
      'notes'
    ],
    article: [
      'objective', 'audience',
      { id: 'topic', label: 'Tema?', type: 'text', placeholder: 'Sobre o que é o artigo?' },
      { id: 'tone', label: 'Tom?', type: 'chips', options: ['Jornalístico', 'Técnico', 'Leigo', 'Opinião', 'SEO', 'Outro'], multiple: false },
      { id: 'length', label: 'Extensão?', type: 'chips', options: ['Curto', 'Médio', 'Longo', 'Outro'], multiple: false },
      'notes'
    ],
    'social-post': [
      'objective', 'audience',
      { id: 'platform', label: 'Plataforma?', type: 'chips', options: ['Instagram', 'LinkedIn', 'Facebook', 'Twitter/X', 'TikTok', 'Threads', 'Outro'], multiple: true },
      { id: 'tone', label: 'Tom?', type: 'chips', options: ['Divertido', 'Profissional', 'Inspirador', 'Vendas', 'Educativo', 'Outro'], multiple: false },
      { id: 'cta', label: 'Call to action?', type: 'text', placeholder: 'Ex: Clique no link', required: false },
      'notes'
    ],
    marketing: [
      'objective', 'audience',
      { id: 'channel', label: 'Canais?', type: 'chips', options: ['E-mail', 'Redes Sociais', 'Google Ads', 'Meta Ads', 'Influenciadores', 'SEO', 'Outro'], multiple: true },
      { id: 'goal', label: 'Objetivo?', type: 'chips', options: ['Awareness', 'Leads', 'Vendas', 'Retenção', 'Lançamento', 'Outro'], multiple: false },
      { id: 'budget', label: 'Faixa de investimento?', type: 'text', placeholder: 'Opcional', required: false },
      'notes'
    ],
    other: [
      'projectName', 'objective', 'audience',
      { id: 'description', label: 'Descreva o que deseja', type: 'textarea', placeholder: 'Forneça todos os detalhes possíveis.' },
      'notes'
    ]
  },

  // Engines and prompt versions supported
  engines: {
    chatgpt: { name: 'ChatGPT', category: 'text', tweaks: 'Use formato Markdown claro, seções numeradas e exemplos práticos.' },
    claude: { name: 'Claude', category: 'text', tweaks: 'Seja analítico, detalhado e organize o conteúdo com listas hierárquicas.' },
    gemini: { name: 'Gemini', category: 'text', tweaks: 'Respostas diretas, foco em estrutura e dados quando relevante.' },
    grok: { name: 'Grok', category: 'text', tweaks: 'Tom objetivo e prático, evite floreios.' },
    lovable: { name: 'Lovable', category: 'dev', tweaks: 'Foque em instruções claras para geração de apps sem código.' },
    bolt: { name: 'Bolt.new', category: 'dev', tweaks: 'Inclua stack, componentes e requisitos técnicos objetivos.' },
    base44: { name: 'Base44', category: 'dev', tweaks: 'Descreva funcionalidades, dados e fluxos de forma simples.' },
    v0: { name: 'v0', category: 'dev', tweaks: 'Componentes React, Tailwind e detalhes visuais específicos.' },
    cursor: { name: 'Cursor AI', category: 'dev', tweaks: 'Contexto de código, stack e arquitetura com requisitos técnicos.' },
    windsurf: { name: 'Windsurf', category: 'dev', tweaks: 'Instruções técnicas diretas e foco em produtividade.' },
    midjourney: { name: 'Midjourney', category: 'image', tweaks: 'Use prompts em inglês, parâmetros --ar, --style, --v, descrições visuais densas.' },
    leonardo: { name: 'Leonardo AI', category: 'image', tweaks: 'Descreva estilo, iluminação, composição e detalhes visuais.' },
    flux: { name: 'Flux', category: 'image', tweaks: 'Prompt em inglês, descrição detalhada de cena e estilo.' },
    stablediffusion: { name: 'Stable Diffusion', category: 'image', tweaks: 'Prompts em inglês, tags positivas e negativas, configurações técnicas.' },
    dalle: { name: 'DALL-E', category: 'image', tweaks: 'Descreva a imagem de forma clara e detalhada em inglês.' },
    runway: { name: 'Runway', category: 'video', tweaks: 'Descrição de cena, movimento, estilo e câmera em inglês.' },
    sora: { name: 'Sora', category: 'video', tweaks: 'Prompt em inglês com descrição detalhada de cena e movimento.' }
  },

  versions: {
    short: 'Prompt Curto',
    complete: 'Prompt Completo',
    technical: 'Prompt Técnico'
  },

  languages: {
    pt: 'Português',
    en: 'English',
    es: 'Español'
  }
};

// Deep-freeze-like guard (not strict freeze for mutability in admin)
if (typeof window !== 'undefined') {
  window.APP_DATA = APP_DATA;
}
