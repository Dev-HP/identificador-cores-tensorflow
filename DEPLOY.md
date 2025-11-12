# Deploy na Vercel

## Opção 1: Deploy via CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

## Opção 2: Deploy via Interface Web

1. Acesse: https://vercel.com/new
2. Importe o repositório: `Dev-HP/identificador-cores-tensorflow`
3. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps`
4. Clique em **Deploy**

## Após o Deploy

A aplicação estará disponível em um link HTTPS como:
`https://identificador-cores-tensorflow.vercel.app`

A câmera funcionará perfeitamente pois o Vercel fornece HTTPS automaticamente!

## Repositório

GitHub: https://github.com/Dev-HP/identificador-cores-tensorflow
