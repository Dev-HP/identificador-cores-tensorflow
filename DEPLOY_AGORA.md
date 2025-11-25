# 🚀 Deploy AGORA - Guia Rápido

## ⚡ Conectar e Fazer Deploy em 3 Passos

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Conectar ao Projeto Existente

```bash
vercel link
```

**Responda as perguntas:**
```
? Set up "~/identificador-cores-tensorflow"? 
→ Y (pressione Enter)

? Which scope should contain your project? 
→ Selecione seu usuário (paulohelio751-6i70)

? Link to existing project? 
→ Y (pressione Enter)

? What's the name of your existing project? 
→ Digite: sistema-self
```

### Passo 3: Fazer Deploy

```bash
vercel --prod
```

**Aguarde ~2-3 minutos e pronto!** ✅

---

## 📋 Comandos Completos (Copiar e Colar)

```bash
# 1. Instalar CLI
npm install -g vercel

# 2. Fazer login (abrirá navegador)
vercel login

# 3. Conectar ao projeto
vercel link

# 4. Deploy para produção
vercel --prod
```

---

## ✅ O que Esperar

### Durante o Deploy:
```
🔍 Inspect: https://vercel.com/paulohelio751-6i70/sistema-self/...
✅ Production: https://sistema-self.vercel.app [2m 15s]
```

### Após o Deploy:
- **URL:** https://sistema-self.vercel.app
- **Status:** ✅ Ready
- **Correções:** Câmera funcionando

---

## 🧪 Testar Após Deploy

1. **Abrir:** https://sistema-self.vercel.app
2. **Clicar:** "Usar Câmera"
3. **Permitir:** Acesso à câmera
4. **Verificar:** Vídeo aparece ✅
5. **Testar:** Detecção de cores

---

## 🐛 Se Algo Der Errado

### Erro: "Command not found: vercel"
```bash
# Reinstalar globalmente
npm install -g vercel

# Ou usar npx
npx vercel link
npx vercel --prod
```

### Erro: "Project not found"
```bash
# Verificar nome correto do projeto
# No dashboard: sistema-self
vercel link
# Digite exatamente: sistema-self
```

### Erro: "Build failed"
```bash
# Testar localmente primeiro
npm run build

# Se funcionar, tentar novamente
vercel --prod --force
```

---

## 📱 Informações do Projeto

- **Nome:** sistema-self
- **URL:** https://sistema-self.vercel.app
- **Domínio Alternativo:** sistema-25ze3y0at-helioo.vercel.app
- **Branch:** master
- **Usuário:** paulohelio751-6i70

---

## ⏱️ Tempo Estimado

- Instalação CLI: ~30 segundos
- Login: ~10 segundos
- Link: ~5 segundos
- Deploy: ~2-3 minutos

**Total: ~3-4 minutos** ⚡

---

**COMECE AGORA:** Execute `npm install -g vercel` 🚀
