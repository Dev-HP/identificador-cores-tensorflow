# 🆕 Criar Novo Projeto no Vercel - Guia Completo

## ✅ Testes Locais - APROVADO

| Teste | Status | Resultado |
|-------|--------|-----------|
| TypeScript Check | ✅ | Sem erros |
| Build | ✅ | Compilado com sucesso |
| Output Directory | ✅ | `dist/public/` criado |
| Bundle Size | ✅ | 1.15 MB (316 KB gzipped) |
| **PRONTO PARA DEPLOY** | ✅ | **SIM** |

---

## 🚀 Opção 1: Criar Novo Projeto via Vercel CLI

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Fazer Login

```bash
vercel login
```

*(Abrirá o navegador para autenticação)*

### Passo 3: Criar Novo Projeto

```bash
vercel
```

**Responda as perguntas:**

```
? Set up and deploy "~/identificador-cores-tensorflow"? 
→ Y (pressione Enter)

? Which scope do you want to deploy to? 
→ Selecione seu usuário (paulohelio751-6i70)

? Link to existing project? 
→ N (NÃO - vamos criar novo)

? What's your project's name? 
→ Digite: identificador-cores-ia
(ou outro nome de sua preferência)

? In which directory is your code located? 
→ ./ (pressione Enter)

? Want to override the settings? 
→ Y (SIM - vamos configurar)

? Which settings would you like to override?
→ Selecione: Build Command, Output Directory, Install Command

? What's your Build Command? 
→ npm install --legacy-peer-deps && npm run build

? What's your Output Directory? 
→ dist/public

? What's your Install Command? 
→ npm install --legacy-peer-deps
```

### Passo 4: Deploy

```bash
vercel --prod
```

---

## 🚀 Opção 2: Criar Novo Projeto via Vercel Dashboard

### Passo 1: Acessar Vercel

1. Acesse: https://vercel.com/new
2. Faça login se necessário

### Passo 2: Importar Projeto

**Opção A: Via GitHub (Recomendado)**

1. Clique em **"Import Git Repository"**
2. Selecione: `Dev-HP/identificador-cores-tensorflow`
3. Clique em **"Import"**

**Opção B: Via Upload Manual**

1. Clique em **"Deploy from a Git repository"**
2. Ou faça upload do projeto (ZIP)

### Passo 3: Configurar Projeto

**Configure as seguintes opções:**

| Campo | Valor |
|-------|-------|
| **Project Name** | `identificador-cores-ia` |
| **Framework Preset** | Vite |
| **Root Directory** | `./` |
| **Build Command** | `npm install --legacy-peer-deps && npm run build` |
| **Output Directory** | `dist/public` |
| **Install Command** | `npm install --legacy-peer-deps` |

### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde ~2-3 minutos
3. ✅ Pronto!

---

## 📋 Configuração Detalhada

### vercel.json (Já Configurado)

```json
{
  "buildCommand": "npm install --legacy-peer-deps && npm run build",
  "outputDirectory": "dist/public",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Status:** ✅ Já existe no projeto

### package.json - Scripts

```json
{
  "scripts": {
    "dev": "vite --host",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "preview": "vite preview --host"
  }
}
```

**Status:** ✅ Configurado corretamente

---

## 🔧 Variáveis de Ambiente (Opcional)

Se precisar de variáveis de ambiente:

### Via CLI:
```bash
vercel env add VITE_API_URL
```

### Via Dashboard:
1. Acesse o projeto no Vercel
2. Settings > Environment Variables
3. Adicione as variáveis necessárias

**Nota:** Este projeto não precisa de variáveis de ambiente.

---

## 🧪 Testar Após Deploy

### 1. Acessar URL

Após o deploy, você receberá uma URL como:
```
https://identificador-cores-ia.vercel.app
```

### 2. Testar Funcionalidades

#### Desktop:
1. Abra a URL
2. Clique em **"Usar Câmera"**
3. Permita acesso à câmera
4. Verifique se o vídeo aparece ✅
5. Aponte para objetos coloridos
6. Verifique detecção de cores

#### Mobile:
1. Abra a URL no celular
2. Clique em **"Usar Câmera"**
3. Deve usar câmera traseira
4. Teste detecção de cores
5. Teste **"Modo Demo"** como fallback

### 3. Verificar Console (F12)

Logs esperados:
```
🎥 Iniciando processo de acesso à câmera...
✅ Câmera acessada com sucesso: Alta qualidade
📹 Configurando elemento de vídeo...
📊 Metadados carregados. Dimensões: 1280 x 720
✅ Vídeo reproduzindo com sucesso
```

---

## 📊 Informações do Build

### Arquivos Gerados:

```
dist/public/
├── index.html (367.55 kB)
├── assets/
│   ├── index-CaK5DJRp.css (116.25 kB)
│   └── index-ArgAfN4w.js (1,150.16 kB)
```

### Tamanhos:

| Arquivo | Tamanho | Gzipped |
|---------|---------|---------|
| HTML | 367.55 kB | 105.47 kB |
| CSS | 116.25 kB | 18.21 kB |
| JS | 1,150.16 kB | 316.57 kB |
| **Total** | **1.63 MB** | **440 kB** |

**Status:** ✅ Aceitável para aplicação com TensorFlow.js

---

## 🔗 Conectar Domínio Customizado (Opcional)

### Via Dashboard:

1. Acesse o projeto no Vercel
2. Settings > Domains
3. Clique em **"Add"**
4. Digite seu domínio
5. Configure DNS conforme instruções

### Exemplo:
```
identificador-cores.seudominio.com
```

---

## 🐛 Troubleshooting

### Problema: Build falha

**Erro comum:**
```
npm ERR! ERESOLVE could not resolve
```

**Solução:**
- ✅ Já configurado com `--legacy-peer-deps`
- Verifique se o `vercel.json` está correto

### Problema: Página em branco

**Verificar:**
1. Output directory: `dist/public` ✅
2. Rewrites configurados ✅
3. Console do navegador (F12)

**Solução:**
```bash
# Testar localmente
npm run build
npm run preview
```

### Problema: Câmera não funciona

**Causas:**
1. ❌ HTTP (não HTTPS)
2. ❌ Permissão negada
3. ❌ Navegador não suporta

**Soluções:**
- ✅ Vercel fornece HTTPS automaticamente
- ✅ Instrua usuários a permitir acesso
- ✅ Use "Modo Demo" como fallback

### Problema: Vídeo não aparece

**Verificar:**
1. Console do navegador (F12)
2. Permissão de câmera concedida
3. HTTPS ativo

**Logs esperados:**
```
✅ Câmera acessada com sucesso
📹 Configurando elemento de vídeo...
✅ Vídeo reproduzindo com sucesso
```

---

## 📱 Deploy Automático (GitHub)

Se conectar via GitHub, cada push fará deploy automático:

```bash
# Fazer alterações
git add .
git commit -m "Update feature"
git push origin master

# Vercel fará deploy automático! ✅
```

**Vantagens:**
- ✅ Deploy automático
- ✅ Preview de branches
- ✅ Rollback fácil
- ✅ Histórico de deploys

---

## 🎯 Checklist Final

Antes de criar o projeto:

- [x] Build local funciona
- [x] TypeScript sem erros
- [x] Output directory correto
- [x] vercel.json configurado
- [x] Correções da câmera aplicadas

Após criar o projeto:

- [ ] Deploy executado
- [ ] URL acessível
- [ ] Câmera testada (desktop)
- [ ] Câmera testada (mobile)
- [ ] Modo Demo testado
- [ ] Console sem erros

---

## 📞 Comandos Úteis

```bash
# Ver todos os projetos
vercel ls

# Ver logs do deploy
vercel logs

# Abrir dashboard
vercel

# Remover projeto
vercel remove [project-name]

# Ver informações do projeto
vercel inspect
```

---

## 🎓 Para a Palestra

### 1. Criar QR Code

Após deploy, crie QR Code da URL:
- Use: https://www.qr-code-generator.com/
- Cole a URL do projeto
- Baixe em alta resolução
- Adicione ao Slide 30

### 2. Testar Antes

- [ ] Teste em 2-3 dispositivos
- [ ] Teste com diferentes cores
- [ ] Teste "Modo Demo"
- [ ] Verifique velocidade
- [ ] Prepare fallback

### 3. Durante a Palestra

- Mostre o QR Code
- Instrua sobre permissão de câmera
- Demonstre detecção
- Use "Modo Demo" se necessário

---

## 📊 URLs Esperadas

Após o deploy:

- **Produção:** `https://identificador-cores-ia.vercel.app`
- **Preview:** `https://identificador-cores-ia-git-branch.vercel.app`
- **Dashboard:** `https://vercel.com/dashboard`

---

## ✅ Status Final

| Item | Status |
|------|--------|
| Código | ✅ Pronto |
| Build | ✅ Testado |
| Configuração | ✅ Completa |
| Documentação | ✅ Criada |
| **PRONTO PARA CRIAR PROJETO** | ✅ **SIM** |

---

**PRÓXIMO PASSO:** Execute `vercel` para criar o novo projeto! 🚀

**Tempo estimado:** ~3-5 minutos para deploy completo
