# ⚡ Comandos Rápidos - Criar Novo Projeto Vercel

## 🚀 Método Rápido (3 Comandos)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Fazer login
vercel login

# 3. Criar e fazer deploy
vercel
```

---

## 📋 Respostas para o Wizard

Quando executar `vercel`, responda:

```
? Set up and deploy "~/identificador-cores-tensorflow"? 
→ Y

? Which scope? 
→ [Seu usuário]

? Link to existing project? 
→ N (criar novo)

? Project name? 
→ identificador-cores-ia

? In which directory is your code? 
→ ./

? Override settings? 
→ Y

? Which settings to override?
→ Build Command, Output Directory, Install Command

? Build Command? 
→ npm install --legacy-peer-deps && npm run build

? Output Directory? 
→ dist/public

? Install Command? 
→ npm install --legacy-peer-deps
```

---

## ✅ Após Configurar

```bash
# Deploy para produção
vercel --prod
```

**Pronto!** Seu projeto estará em:
```
https://identificador-cores-ia.vercel.app
```

---

## 🧪 Testar Localmente Antes

```bash
# Build
npm run build

# Preview
npm run preview

# Abrir: http://localhost:4173
```

---

## 📊 Verificar Status

```bash
# Ver projetos
vercel ls

# Ver logs
vercel logs

# Abrir dashboard
vercel
```

---

**Tempo Total:** ~3-5 minutos ⚡
