# 🚀 Deploy via CLI - Guia Manual

## ✅ Vercel CLI Instalado

O Vercel CLI foi instalado com sucesso!

---

## 🔐 Passo 1: Fazer Login

### Código de Autenticação:
```
WRNX-DFWV
```

### Como Fazer Login:

**Opção A: Abrir URL Manualmente**
1. Abra no navegador: https://vercel.com/oauth/device?user_code=WRNX-DFWV
2. Faça login na sua conta Vercel
3. Autorize o acesso
4. Volte para o terminal

**Opção B: Via Terminal**
```bash
# O comando já está rodando, apenas:
# 1. Pressione ENTER no terminal
# 2. O navegador abrirá automaticamente
# 3. Faça login
# 4. Autorize
```

---

## 🔗 Passo 2: Conectar ao Projeto

Após fazer login, execute:

```bash
vercel link
```

**Responda as perguntas:**

```
? Set up "~/identificador-cores-tensorflow"? 
→ Y (pressione Enter)

? Which scope? 
→ Selecione: paulohelio751-6i70

? Link to existing project? 
→ Y (SIM - conectar ao existente)

? What's the name of your existing project? 
→ Digite: sistema-self
```

---

## 🚀 Passo 3: Fazer Deploy

```bash
vercel --prod
```

**Aguarde:**
- ⏱️ Build: ~2-3 minutos
- ✅ Deploy concluído
- 🎉 URL: https://sistema-self.vercel.app

---

## 📋 Comandos Completos (Sequência)

```bash
# 1. Login (já instalado)
vercel login
# → Abrir: https://vercel.com/oauth/device?user_code=WRNX-DFWV
# → Fazer login e autorizar

# 2. Conectar ao projeto
vercel link
# → Y
# → paulohelio751-6i70
# → Y
# → sistema-self

# 3. Deploy
vercel --prod
```

---

## 🔍 Verificar Status

```bash
# Ver projetos
vercel ls

# Ver logs
vercel logs

# Ver informações
vercel inspect
```

---

## 🐛 Se Algo Der Errado

### Problema: Login não funciona

**Solução:**
```bash
# Tentar novamente
vercel logout
vercel login
```

### Problema: Projeto não encontrado

**Solução:**
```bash
# Verificar nome correto
# No dashboard: sistema-self

# Tentar novamente
vercel link
```

### Problema: Build falha

**Solução:**
```bash
# Testar localmente
npm run build

# Se funcionar, tentar com force
vercel --prod --force
```

---

## ✅ Após Deploy

### 1. Testar URL
```
https://sistema-self.vercel.app
```

### 2. Testar Câmera
- Clicar em "Usar Câmera"
- Permitir acesso
- Verificar se vídeo aparece ✅

### 3. Verificar Console (F12)
```
✅ Câmera acessada com sucesso
📹 Configurando elemento de vídeo...
✅ Vídeo reproduzindo com sucesso
```

---

## 📊 Resumo

| Passo | Comando | Status |
|-------|---------|--------|
| 1. Instalar CLI | `npm install -g vercel` | ✅ Feito |
| 2. Login | `vercel login` | ⏳ Aguardando |
| 3. Link | `vercel link` | ⏳ Pendente |
| 4. Deploy | `vercel --prod` | ⏳ Pendente |

---

**PRÓXIMO PASSO:** 

1. Abra: https://vercel.com/oauth/device?user_code=WRNX-DFWV
2. Faça login
3. Volte aqui e execute: `vercel link`

🚀 **Boa sorte!**
