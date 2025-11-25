# Identificador de Cores com IA

Aplicação web que utiliza TensorFlow.js para identificar cores através da câmera em tempo real.

## 🚀 Funcionalidades

- **Reconhecimento de Cores em Tempo Real**: Aponte a câmera para qualquer objeto e a IA identifica a cor
- **13 Cores Suportadas**: Vermelho, Verde, Azul, Amarelo, Magenta, Ciano, Laranja, Roxo, Rosa, Marrom, Preto, Branco e Cinza
- **Modo Demo**: Teste a IA sem precisar de câmera, clicando nas cores
- **Rede Neural Treinada no Navegador**: Usa TensorFlow.js para treinar o modelo localmente

## 🛠️ Tecnologias

- React + TypeScript
- TensorFlow.js
- Vite
- Tailwind CSS
- shadcn/ui

## 📦 Instalação

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

## 🎯 Como Usar

1. **Modo Câmera**: Clique em "Usar Câmera" e permita o acesso à webcam
2. **Modo Demo**: Clique em "Modo Demo" para testar sem câmera

## 🔧 Correções Implementadas

- ✅ Backend CPU do TensorFlow.js para compatibilidade universal
- ✅ Sistema de fallback em cascata para acesso à câmera
- ✅ Mensagens de erro específicas por tipo
- ✅ Logs detalhados para diagnóstico
- ✅ Console de debug visual na interface

## 📝 Notas

- A câmera só funciona em conexões HTTPS ou localhost
- Certifique-se de que nenhum outro aplicativo está usando a câmera
- O modelo é treinado localmente no navegador (não requer servidor)

## 🎓 Palestra

Projeto desenvolvido para a palestra: **Desvendando as Redes Neurais**
