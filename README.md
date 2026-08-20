# ABYBY SITA COMÉRCIO GERAL, LDA — Website Institucional

Este é o repositório do website institucional da **ABYBY SITA COMÉRCIO GERAL, LDA**, uma empresa angolana especializada em soluções de logística, marítimos, offshore e fornecimento industrial.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS (v4)
- **Backend/API**: Node.js, Express (integrado com o Vite no modo desenvolvimento e compilado no modo produção)
- **Inteligência Artificial**: Google Gemini AI (Assistente Virtual integrado)
- **Animações**: Framer Motion & GSAP
- **Segurança**: Helmet, Express Rate Limit, XSS sanitization

## 📋 Pré-requisitos

- Node.js v22 (ou superior)
- NPM

## 🛠️ Configuração Inicial

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**:
   Copie o ficheiro `.env.example` para `.env` e preencha as variáveis necessárias (nomeadamente a `GEMINI_API_KEY` para o assistente virtual):
   ```bash
   cp .env.example .env
   ```

## 💻 Desenvolvimento Local

Inicie o servidor de desenvolvimento (que corre o backend Express com o frontend Vite):

```bash
npm run dev
```

O site estará disponível em `http://localhost:5173` (ou na porta que foi configurada).

## 🏗️ Build e Produção

1. **Validar código (Lint, Types e Format)**:
   ```bash
   npm run format
   npm run lint
   ```

2. **Compilar para produção**:
   Gera a pasta `dist` (assets estáticos públicos) e `dist-server` (backend).
   ```bash
   npm run build
   ```

3. **Iniciar o servidor de produção**:
   ```bash
   npm run start
   ```

## 🔒 Segurança e Resiliência (Hardening)

O projecto foi preparado para produção, com:
- **Protecção DDoS e Rate Limiting** nos endpoints (ex: submissão de formulário e chat).
- **Graceful Shutdown** no servidor Express.
- **Segurança Web**: CSP, cabeçalhos Helmet e higienização (XSS) de inputs.
- **Validação Automática** via GitHub Actions (CI) antes de merges para produção.
