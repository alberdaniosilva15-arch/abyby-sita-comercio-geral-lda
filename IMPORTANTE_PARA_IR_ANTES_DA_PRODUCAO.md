# 🚨 GUIA E CHECKLIST ANTES DE PRODUÇÃO (ABYBY SITA)

**ACTUALIZAÇÃO**: O processo de *hardening* de segurança, tipagens estritas de TypeScript, validações de uploads contra malware e autenticação 2FA foram integralmente aplicados.

---

## 1. 🛡️ Segurança de Ficheiros e Prevenção de Malware (CVs e Candidaturas)

O sistema foi arquitetado para **isolar totalmente os ficheiros enviados pelos candidatos**:
1. **Validação Estrita de MIME Type no Servidor**: Apenas ficheiros com extensão e MIME type reais de `PDF` ou `DOC(X)` são aceites (máximo 5 MB). Ficheiros `.exe`, scripts, macros ou binários desconhecidos são rejeitados de imediato com erro `400`.
2. **Armazenamento Seguro e Isolado no Cloudinary**: Os ficheiros são guardados no Cloudinary como recursos brutos (`resource_type: 'raw'`), o que impede qualquer execução de código no servidor.
3. **Download Protegido no Painel de Admin**: O administrador do site visualiza os metadados (nome, e-mail, telefone, score da vaga) e pode abrir o ficheiro em segurança através de URL encriptado HTTPS.
4. **Notificação de Candidaturas**: As candidaturas são registadas na base de dados Supabase e encaminhadas para notificação da equipa em `abybysita@recrutamentos.com`.

---

## 2. 🔑 Gestão de Variáveis de Ambiente no Servidor (`.env`)

Certifique-se de que o ambiente de alojamento (VPS, Cloud Run ou Docker) contém as seguintes variáveis configuradas:

| Variável | Descrição | Exemplo / Estado |
| :--- | :--- | :--- |
| `NODE_ENV` | Define o ambiente (`production` ou `development`) | `production` |
| `PORT` | Porta de escuta do servidor Express | `3000` ou `8080` |
| `NVIDIA_API_KEY` | Chave de API da NVIDIA NIM para assistente IA (Llama 3.1) | `nvapi-...` |
| `CLOUDINARY_CLOUD_NAME` | Nome da conta Cloudinary para armazenamento de CVs | `vgxylpmd` |
| `CLOUDINARY_API_KEY` | Chave da API Cloudinary | `732842364115545` |
| `CLOUDINARY_API_SECRET` | Segredo da API Cloudinary | *(Configurado)* |
| `RECRUITMENT_EMAIL` | E-mail de destino das notificações de candidaturas | `abybysita@recrutamentos.com` |
| `ADMIN_PASSWORD_HASH` | Hash Bcrypt da palavra-passe do administrador | `$2b$12$...` |
| `ADMIN_TOTP_SECRET` | Segredo TOTP (Google Authenticator / Authy) | `MUBDCXSCHJ4BINIT` |
| `JWT_SECRET` | Segredo criptográfico para tokens de sessão admin | `c6b845f...` |
| `SUPABASE_URL` | URL do projeto Supabase | `https://*.supabase.co` |
| `SUPABASE_KEY` | Chave de serviço (`service_role`) do Supabase | *(Configurado)* |
| `VITE_EMAILJS_*` | Chaves do EmailJS (opcional para envio frontend) | *(A configurar se desejado)* |

---

## 3. 🔐 Autenticação de Administrador e 2FA (TOTP)

- O painel de administração está acessível na rota `/admin/login` e `/admin`.
- A autenticação exige **duplo fator (2FA)** obrigatório.
- Para gerar um novo segredo 2FA ou configurar um novo dispositivo móvel com Google Authenticator, execute:
  ```bash
  node scripts/setup-2fa.js
  ```

---

## 4. ⚡ Proteção de Rotas e Política de Soft-Delete

- **Proibição de HARD DELETE**: Por desenho de segurança e conformidade de integridade referencial com a base de dados (`ON DELETE RESTRICT`), nenhuma rota HTTP utiliza o método `DELETE`. As vagas e candidaturas são arquivadas via `PATCH` (`is_active = false` ou `status = 'Arquivado'`).
- **Verificação Automática**: O script `npm run test:security` corre em todos os testes e garante que nenhuma rota `DELETE` física é introduzida.

---

## 5. 🌐 Verificação de Compilação e Qualidade

Antes de qualquer deploy, corra:
```bash
npm run lint
npm run build
```
Ambos os comandos devem terminar com código `0` sem erros.
