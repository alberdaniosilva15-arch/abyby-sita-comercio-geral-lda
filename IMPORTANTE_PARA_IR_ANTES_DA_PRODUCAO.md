# 🚨 IMPORTANTE PARA IR ANTES DA PRODUÇÃO

Este documento contém a lista de verificação obrigatória de segurança e infraestrutura que deve ser executada antes de publicar a aplicação **ABYBY SITA COMÉRCIO GERAL, LDA** em ambiente de produção final.

---

## 1. 🛡️ Ativação de Cabeçalhos de Segurança (CSP & Clickjacking Protection)

No ficheiro `server.ts`, a configuração do **Helmet** já está programada para alternar automaticamente com base em `process.env.NODE_ENV === 'production'`:

```typescript
const isProd = process.env.NODE_ENV === 'production';
app.use(
  helmet({
    contentSecurityPolicy: isProd
      ? {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://maps.googleapis.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'", "https://api.emailjs.com", "https://generativelanguage.googleapis.com"],
            frameSrc: ["'self'", "https://maps.google.com", "https://www.google.com"],
          },
        }
      : false,
    frameguard: isProd ? { action: 'sameorigin' } : false,
    crossOriginEmbedderPolicy: false,
    hidePoweredBy: true,
  })
);
```

### Ação Obrigatória Antes de Deploy:
1. **Verificar `NODE_ENV=production`**: Certificar que no servidor Cloud Run / VPS / Container o ambiente está definido como `NODE_ENV=production`.
2. **Ativação do Frameguard (`SAMEORIGIN`)**: Em produção, impede que o site da empresa seja embutido em `<iframe>` por sites terceiros não autorizados, prevenindo totalmente ataques de **Clickjacking**.
3. **Ajuste da Whitelist do Content Security Policy (CSP)**: Caso sejam adicionados novos serviços externos (ex.: Cloudinary, AWS S3, Google Analytics ou novos gateways de pagamento), inclua os seus domínios explicitamente nas directivas `scriptSrc`, `imgSrc` ou `connectSrc` no `server.ts`.

---

## 2. 🔑 Gestão de Segredos & Variáveis de Ambiente

- **`GEMINI_API_KEY`**: Nunca incluir a chave diretamente no código ou repositório Git. Garantir que está configurada como variável de ambiente no serviço de alojamento (GCP Secret Manager / Cloud Run).
- **`VITE_EMAILJS_*`**: Configurar as chaves do EmailJS no ficheiro `.env` para receção de pedidos de proposta no e-mail `info.geral@abybysita.com`.

---

## 3. 🌐 HTTPS & TLS (Comunicação Segura)

- Garantir que o domínio oficial (ex.: `https://abybysita.com` ou `https://www.abybysita.com`) possui certificado SSL/TLS válido e que todo o tráfego HTTP é redirecionado automaticamente para **HTTPS**.

---

## 4. ⚡ Limite de Quotas e Rate Limiting

- O endpoint `/api/chat` possui um rate limit de **30 mensagens por cada 15 minutos por IP**.
- Se for esperado um tráfego volumoso em grande escala comercial, considerar sincronizar a taxa com uma instância Redis para rate limiting distribuído.

---

## 5. 🔒 Privacidade e Armazenamento no Cliente

- Os formulários de contacto utilizam `sessionStorage` para reter temporariamente os dados durante a navegação, garantindo que as informações do utilizador são eliminadas ao fechar a aba do navegador, protegendo a privacidade em computadores partilhados.
