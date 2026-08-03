# PromptForge AI

Crie prompts perfeitos para qualquer Inteligência Artificial.

PromptForge AI é uma aplicação web estática, moderna e dark, que conduz o usuário por um fluxo inteligente de perguntas e gera prompts profissionais, otimizados e prontos para uso em diversas IAs generativas.

---

## Objetivos

- Eliminar a necessidade de escrever prompts manualmente.
- Gerar prompts estruturados, claros e específicos através de perguntas adaptativas.
- Oferecer versões do prompt (curto, completo, técnico) em múltiplos idiomas.
- Adaptar o prompt para diferentes IAs de destino (ChatGPT, Claude, Midjourney, Runway, etc.).
- Permitir exportar, copiar, compartilhar, salvar favoritos e gerenciar histórico.

---

## Funcionalidades implementadas

### Tela inicial
- Logo e identidade visual **PromptForge AI**.
- Hero com subtítulo e CTA principal "Criar Novo Prompt".
- Estatísticas de uso (prompts gerados, categorias, idiomas, IAs compatíveis).

### Fluxo inteligente de criação
1. **Passo 1 — Categoria**: escolha entre 35+ categorias (Website, App, Imagem, Vídeo, Agente de IA, Planilha, etc.).
2. **Passo 2 — Perguntas**: formulário dinâmico com perguntas específicas para cada categoria (texto, textarea, chips, toggle, select).
3. **Passo 3 — Revisão**: resumo de todas as respostas antes da geração.
4. **Geração**: motor de prompts que monta estruturas profissionais com objetivo, contexto, requisitos, restrições, funcionalidades, tecnologias, boas práticas, resultado esperado e observações.

### Versões geradas
- **Prompt Curto**
- **Prompt Completo**
- **Prompt Técnico**

### Idiomas
- Português
- English
- Español

### IAs de destino suportadas
- ChatGPT, Claude, Gemini, Grok
- Lovable, Bolt.new, Base44, v0, Cursor AI, Windsurf
- Midjourney, Leonardo AI, Flux, Stable Diffusion, DALL-E
- Runway, Sora

### Ações sobre o prompt
- Copiar com um clique
- Download TXT
- Download PDF
- Compartilhar (Web Share API ou clipboard)
- Salvar nos favoritos

### Histórico e Favoritos
- Histórico dos últimos 100 prompts gerados.
- Favoritos salvos localmente.
- Busca inteligente por título, categoria ou conteúdo.
- Duplicar prompt para refazer o fluxo.
- Visualizar prompt gerado novamente.
- Excluir itens individualmente ou limpar tudo.

### Painel Administrativo
- Gerenciamento de **categorias** (adicionar, editar, remover).
- Gerenciamento de **perguntas** por categoria.
- Gerenciamento de **templates de prompts**.
- **Analytics** com gráfico de barras (ECharts) e resumo de estatísticas.

### Design
- Dark mode com fundo `#0B1120`.
- Cards `#111827` com glassmorphism e blur.
- Gradiente primário `#3B82F6` → `#8B5CF6`.
- Detalhes em `#14B8A6`.
- Animações suaves (GSAP), bordas suaves e muito espaço em branco.
- Ícones Lucide.

---

## Estrutura de arquivos

```
index.html          # SPA principal e estrutura de views
css/
  style.css         # Estilos customizados, glassmorphism e animações
js/
  data.js           # Categorias, perguntas, engines, idiomas e versões
  flow.js           # Wizard de perguntas adaptativas por categoria
  generator.js      # Motor de geração de prompts + exportações
  storage.js        # Histórico, favoritos e estatísticas (localStorage)
  admin.js          # Painel administrativo e analytics
  app.js            # Router, toast, modal e inicialização
README.md
```

---

## Tecnologias utilizadas

- HTML5 semântico
- Tailwind CSS via CDN
- JavaScript vanilla (ES6+)
- GSAP (animações)
- Lucide (ícones)
- jsPDF (exportação PDF)
- ECharts (analytics)
- localStorage (persistência client-side)

---

## Como usar

1. Abra `index.html` no navegador ou publique o projeto.
2. Clique em **Criar Novo Prompt**.
3. Escolha uma categoria.
4. Responda às perguntas inteligentes.
5. Revise o resumo.
6. Clique em **Gerar Prompt**.
7. Escolha a versão, idioma e IA de destino.
8. Copie, baixe ou compartilhe o resultado.

---

## URIs / Rotas da aplicação

A navegação é baseada em hash (`#`):

| Rota | Descrição |
|------|-----------|
| `index.html` ou `index.html#home` | Página inicial |
| `index.html#new` | Iniciar novo prompt (wizard) |
| `index.html#result` | Resultado do prompt gerado |
| `index.html#history` | Histórico de prompts |
| `index.html#favorites` | Prompts favoritos |
| `index.html#admin` | Painel administrativo |

---

## Modelos de dados

### Categoria
```json
{
  "id": "website",
  "name": "Website",
  "icon": "globe",
  "group": "digital"
}
```

### Pergunta
```json
{
  "id": "features",
  "label": "Quais funcionalidades?",
  "type": "chips",
  "options": ["Formulários", "Blog", "Busca"],
  "multiple": true
}
```

### Prompt gerado (histórico)
```json
{
  "id": "pf_...",
  "title": "...",
  "categoryId": "website",
  "categoryName": "Website",
  "answers": { ... },
  "createdAt": 1234567890,
  "result": { "short": {...}, "complete": {...}, "technical": {...} }
}
```

### Estatísticas
```json
{
  "prompts": 42,
  "byCategory": { "website": 10, "image": 8, ... }
}
```

---

## Serviços de armazenamento

- **localStorage**: histórico, favoritos, estatísticas, templates e customizações do admin.
- Nenhum backend é necessário; todos os dados ficam no navegador do usuário.

---

## Próximos passos recomendados

1. Adicionar exportação em **Markdown**, **DOCX** e **JSON**.
2. Implementar **versionamento** de prompts (salvar múltiplas versões do mesmo título).
3. Adicionar **tags** e filtros por tag/categoria no histórico e favoritos.
4. Criar **sistema de templates pré-prontos** por categoria (ex: "Site para clínica", "Logo minimalista").
5. Integrar com uma API de LLM (se disponível e autorizada) para geração de prompts ainda mais refinada.
6. Adicionar **autenticação leve** e sincronização em nuvem (fora do escopo de site estático sem backend).

---

## Deploy

Para publicar o site, utilize a aba **Publish** do Genspark. O projeto é uma SPA estática e pode ser hospedada em qualquer serviço de static hosting.

---

## Licença

Projeto criado para fins educacionais e de produtividade. Uso livre para personalização.
