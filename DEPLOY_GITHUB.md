# 🚀 Deploy no GitHub Pages

## Guia Completo para Hospedar a Demo 3

Este guia mostra como publicar a aplicação **Identificador de Cores** no GitHub Pages para que sua audiência possa acessar durante a palestra.

---

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado localmente
- Node.js e pnpm instalados (para testar localmente)

---

## 🔧 Passo 1: Preparar o Repositório

### 1.1 Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"**
3. Configure:
   - **Nome:** `demo3_identificador_cores` (ou outro nome de sua preferência)
   - **Visibilidade:** Public
   - **NÃO** inicialize com README (vamos fazer upload do código existente)
4. Clique em **"Create repository"**

### 1.2 Ajustar Base Path (IMPORTANTE)

Se você escolheu um nome diferente para o repositório, edite o arquivo `vite.config.ts`:

```typescript
// Linha 14 - Substitua 'demo3_identificador_cores' pelo nome do seu repositório
base: process.env.GITHUB_PAGES ? '/SEU_NOME_DO_REPOSITORIO/' : '/',
```

---

## 📤 Passo 2: Fazer Upload do Código

### 2.1 Inicializar Git (se ainda não estiver inicializado)

```bash
cd demo3_identificador_cores
git init
git add .
git commit -m "Initial commit: Identificador de Cores com TensorFlow.js"
```

### 2.2 Conectar ao GitHub

Substitua `SEU_USUARIO` e `SEU_REPOSITORIO` pelos seus dados:

```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

---

## ⚙️ Passo 3: Configurar GitHub Pages

### 3.1 Ativar GitHub Pages

1. No seu repositório no GitHub, vá em **Settings** (Configurações)
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione:
   - **Source:** GitHub Actions
4. Salve as configurações

### 3.2 Aguardar o Deploy

1. Vá na aba **Actions** do repositório
2. Você verá o workflow "Deploy to GitHub Pages" em execução
3. Aguarde até aparecer um ✅ verde (leva ~2-3 minutos)

---

## 🌐 Passo 4: Acessar a Aplicação

Após o deploy ser concluído, sua aplicação estará disponível em:

```
https://SEU_USUARIO.github.io/SEU_REPOSITORIO/
```

**Exemplo:**
```
https://joaosilva.github.io/demo3_identificador_cores/
```

---

## 📱 Passo 5: Criar QR Code para a Palestra

### 5.1 Copiar o Link

Copie o link completo da sua aplicação (ex: `https://seunome.github.io/demo3_identificador_cores/`)

### 5.2 Gerar QR Code

1. Acesse um gerador de QR Code:
   - [QR Code Generator](https://www.qr-code-generator.com/)
   - [QRCode Monkey](https://www.qrcode-monkey.com/)
   - [QR.io](https://qr.io/)

2. Cole o link da aplicação

3. Personalize (opcional):
   - Adicione logo
   - Escolha cores (sugestão: cyan #00d9ff e magenta #ff006e)
   - Ajuste tamanho

4. Baixe o QR Code em alta resolução (PNG)

### 5.3 Inserir no Slide 30

1. Abra o **Slide 30** da apresentação
2. Substitua o placeholder `[QR CODE]` pela imagem baixada
3. Atualize a URL curta se desejar (ex: usando bit.ly)

---

## 🔄 Atualizações Futuras

Sempre que você fizer alterações no código:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

O GitHub Actions automaticamente fará o deploy da nova versão!

---

## ✅ Checklist Antes da Palestra

- [ ] Aplicação publicada e acessível via HTTPS
- [ ] QR Code gerado e inserido no Slide 30
- [ ] Testado em pelo menos 2 dispositivos móveis diferentes
- [ ] Câmera funcionando em dispositivos reais (HTTPS é necessário!)
- [ ] Modo Demo funcionando como fallback
- [ ] Link curto criado (opcional, mas recomendado)

---

## 🐛 Troubleshooting

### Erro 404 ao acessar a aplicação

**Causa:** Base path incorreto no `vite.config.ts`

**Solução:**
1. Verifique se o nome do repositório no GitHub corresponde ao base path
2. Edite `vite.config.ts` linha 14 com o nome correto
3. Faça commit e push das mudanças

### Câmera não funciona

**Causa:** GitHub Pages usa HTTPS, mas alguns navegadores podem bloquear

**Solução:**
- Certifique-se de acessar via `https://` (não `http://`)
- Instrua usuários a permitir acesso à câmera quando solicitado
- Use Modo Demo como alternativa

### Deploy falhou no GitHub Actions

**Causa:** Erro de build ou dependências

**Solução:**
1. Vá na aba **Actions**
2. Clique no workflow que falhou
3. Veja os logs de erro
4. Corrija o problema localmente
5. Faça commit e push novamente

### Build local funciona, mas GitHub Pages não

**Causa:** Variável de ambiente `GITHUB_PAGES` não está definida

**Solução:**
1. Edite `.github/workflows/deploy.yml`
2. Adicione na seção `Build`:

```yaml
- name: Build
  run: |
    cd client
    GITHUB_PAGES=true pnpm build
```

---

## 💡 Dicas Extras

### Criar Link Curto

Use serviços como:
- [bit.ly](https://bitly.com/) - Exemplo: `bit.ly/iacores`
- [tinyurl.com](https://tinyurl.com/)
- [is.gd](https://is.gd/)

Isso facilita para a audiência digitar manualmente se necessário.

### Testar Localmente Antes de Publicar

```bash
cd client
pnpm install
pnpm build
pnpm preview
```

Acesse `http://localhost:4173` para ver a versão de produção.

### Monitorar Acessos

Adicione Google Analytics (opcional):

1. Crie uma propriedade no Google Analytics
2. Adicione o código de tracking no `client/index.html`
3. Veja quantas pessoas acessaram durante a palestra!

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do GitHub Actions
2. Teste localmente com `pnpm build && pnpm preview`
3. Consulte a [documentação do Vite](https://vitejs.dev/guide/static-deploy.html#github-pages)

---

**Boa sorte com sua palestra! 🎉**

*Desvendando as Redes Neurais: Da Teoria à Prática Interativa*
