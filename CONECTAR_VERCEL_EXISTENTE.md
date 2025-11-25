# 🔗 Conectar ao Projeto Vercel Existente

## 📊 Informações do Projeto Atual

**Deployment:** `sistema-25ze3y0at-helioo.vercel.app`  
**Domínio:** `sistema-self.vercel.app`  
**Status:** ✅ Ready  
**Branch:** `master`  
**Último Commit:** `_3dd077b` - "Fix: Camera video not showing - add autoplay and immediate UI activation"

---

## 🔗 Como Conectar o Projeto Local ao Vercel

### Método 1: Via Vercel CLI (Recomendado)

```bash
# 1. Instalar Vercel CLI (se ainda não tiver)
npm install -g vercel

# 2. Fazer login
vercel login

# 3. Conectar ao projeto existente
vercel link

# Você verá:
# ? Set up "~/identificador-cores-tensorflow"? [Y/n] y
# ? Which scope should contain your project? [Seu usuário]
# ? Link to existing project? [Y/n] y
# ? What's the name of your existing project? sistema-self

# 4. Fazer deploy
vercel --prod
```

### Método 2: Via Git Push (Se conectado ao GitHub)

```bash
# 1. Verificar repositório remoto
git remote -v

# 2. Adicionar alterações
git add .

# 3. Commit com as correções
git commit -m "Fix: Camera video display - add autoplay, playsInline and fallback"

# 4. Push para branch master
git push origin master

# O Vercel fará deploy automático!
```

### Método 3: Via Vercel Dashboard

1. **Acesse:** https://vercel.com/dashboard
2. **Encontre o projeto:** `sistema-self`
3. **Vá em:** Settings > Git
4. **Verifique:** Se está conectado ao repositório correto
5. **Redeploy:** Deployments > [...] > Redeploy

---

## 🔍 Verificar Conexão Atual

```bash
# Ver se já está conectado
vercel ls

# Ver informações do projeto
vercel inspect

# Ver qual projeto está linkado
cat .vercel/project.json
```

---

## 📝 Passo a Passo Detalhado

### 1. Verificar se já está conectado

```bash
# Verificar se existe pasta .vercel
ls -la .vercel

# Se existir, ver configuração
cat .vercel/project.json
```

**Se NÃO existir `.vercel/`:**
```bash
# Conectar ao projeto
vercel link
```

**Se JÁ existir `.vercel/`:**
```bash
# Apenas fazer deploy
vercel --prod
```

### 2. Fazer Deploy das Correções

```bash
# Deploy para produção
vercel --prod

# Você verá:
# 🔍 Inspect: https://vercel.com/...
# ✅ Production: https://sistema-self.vercel.app
```

### 3. Verificar Deploy

```bash
# Ver logs do deploy
vercel logs

# Abrir no navegador
vercel --prod --open
```

---

## 🐛 Troubleshooting

### Problema: "Project not found"

**Solução:**
```bash
# Desconectar projeto atual
rm -rf .vercel

# Reconectar
vercel link

# Selecionar projeto existente: sistema-self
```

### Problema: "Not authorized"

**Solução:**
```bash
# Fazer login novamente
vercel logout
vercel login

# Tentar novamente
vercel link
```

### Problema: "Build failed"

**Solução:**
```bash
# Testar build localmente
npm run build

# Se funcionar localmente, limpar cache do Vercel
vercel --prod --force
```

---

## 📊 Informações do Projeto

### URLs:
- **Produção:** https://sistema-self.vercel.app
- **Preview:** https://sistema-25ze3y0at-helioo.vercel.app

### Configuração Atual:
- **Framework:** Vite
- **Build Command:** `npm install --legacy-peer-deps && npm run build`
- **Output Directory:** `dist/public`
- **Branch:** `master`

### Últimas Alterações:
- ✅ Correção da câmera (autoplay + playsInline)
- ✅ Logs de debug adicionados
- ✅ Fallback de reprodução implementado

---

## 🚀 Deploy Rápido (Resumo)

```bash
# Se já está conectado:
vercel --prod

# Se não está conectado:
vercel link
# (Selecione: sistema-self)
vercel --prod

# Via Git (se conectado ao GitHub):
git add .
git commit -m "Fix: Camera display issues"
git push origin master
```

---

## ✅ Checklist Pré-Deploy

- [x] Build local funciona (`npm run build`)
- [x] TypeScript sem erros (`npm run check`)
- [x] Correções da câmera aplicadas
- [x] vercel.json configurado
- [ ] Conectado ao projeto Vercel
- [ ] Deploy executado
- [ ] Testado em produção

---

## 📱 Testar Após Deploy

1. **Abrir URL:** https://sistema-self.vercel.app
2. **Testar Câmera:**
   - Clicar em "Usar Câmera"
   - Permitir acesso
   - **Verificar se vídeo aparece** ✅
3. **Console do Navegador (F12):**
   ```
   ✅ Câmera acessada com sucesso
   📹 Configurando elemento de vídeo...
   ✅ Vídeo reproduzindo com sucesso
   ```
4. **Testar em Mobile:**
   - Abrir no celular
   - Testar câmera traseira
   - Verificar detecção de cores

---

## 🔧 Comandos Úteis

```bash
# Ver todos os deploys
vercel ls

# Ver logs do último deploy
vercel logs

# Abrir dashboard do projeto
vercel

# Remover deploy específico
vercel remove [deployment-url]

# Forçar rebuild (limpar cache)
vercel --prod --force
```

---

## 📞 Se Precisar de Ajuda

1. **Ver logs detalhados:**
   ```bash
   vercel logs --follow
   ```

2. **Verificar build:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Verificar configuração:**
   ```bash
   cat vercel.json
   cat .vercel/project.json
   ```

---

**Próximo Passo:** Execute `vercel link` e depois `vercel --prod`

🚀 **Boa sorte com o redeploy!**
