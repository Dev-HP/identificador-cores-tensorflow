# Design Document

## Overview

Este documento descreve o design técnico para implementar correções de compatibilidade na aplicação de identificação de cores. As mudanças focam em tornar o sistema robusto contra falhas de WebGL e problemas de acesso à câmera, garantindo que a aplicação funcione em diversos ambientes e dispositivos.

A solução envolve modificações no componente `Home.tsx`, implementando:
1. Configuração explícita do backend CPU do TensorFlow.js antes do treinamento
2. Sistema de fallback em cascata para acesso à câmera com múltiplas configurações
3. Tratamento de erros aprimorado com mensagens específicas
4. Logging detalhado para diagnóstico

## Architecture

### Current Architecture
```
Home Component (Home.tsx)
├── TensorFlow Model Training (useEffect)
│   └── Tenta usar backend padrão (WebGL) → Falha se não disponível
├── Camera Access (startCamera)
│   └── Tenta uma única configuração → Falha se não funcionar
└── Demo Mode (startDemoMode)
    └── Funciona independentemente
```

### Proposed Architecture
```
Home Component (Home.tsx)
├── TensorFlow Model Training (useEffect)
│   ├── 1. Configura backend CPU explicitamente
│   ├── 2. Aguarda backend estar pronto
│   ├── 3. Treina modelo
│   └── 4. Log de sucesso/erro com contexto
├── Camera Access (startCamera - Enhanced)
│   ├── 1. Tenta configuração ideal (1280x720)
│   ├── 2. Fallback para configuração média (640x480)
│   ├── 3. Fallback para configuração mínima (320x240)
│   ├── 4. Fallback para configuração básica (sem constraints)
│   └── 5. Log detalhado de cada tentativa
└── Demo Mode (startDemoMode)
    └── Mantém funcionamento atual
```

## Components and Interfaces

### 1. TensorFlow Backend Configuration

**Localização**: `Home.tsx` - função `trainModel` dentro do primeiro `useEffect`

**Mudanças**:
```typescript
async function trainModel() {
  try {
    setIsModelLoading(true);
    
    // NOVO: Configurar backend CPU explicitamente
    await tf.setBackend('cpu');
    await tf.ready(); // Aguardar backend estar pronto
    console.log('✅ TensorFlow backend configurado:', tf.getBackend());
    
    // Resto do código de treinamento permanece igual
    // ...
  } catch (err) {
    console.error('❌ Erro ao treinar modelo:', err);
    console.error('Stack trace:', err.stack);
    setError("Erro ao carregar a IA. Tente recarregar a página.");
    setIsModelLoading(false);
  }
}
```

**Justificativa**: 
- `tf.setBackend('cpu')` força o uso do backend CPU, que funciona em qualquer ambiente
- `tf.ready()` garante que o backend está completamente inicializado antes de criar tensores
- Logs detalhados ajudam no diagnóstico durante apresentações

### 2. Camera Access with Fallback Strategy

**Localização**: `Home.tsx` - função `startCamera`

**Nova Implementação**:
```typescript
async function startCamera() {
  try {
    setError("");
    
    // Configurações em ordem de prioridade (melhor para pior)
    const videoConfigs = [
      {
        name: 'Alta qualidade',
        constraints: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        }
      },
      {
        name: 'Qualidade média',
        constraints: {
          facingMode: { ideal: "environment" },
          width: { ideal: 640 },
          height: { ideal: 480 },
        }
      },
      {
        name: 'Qualidade básica',
        constraints: {
          width: { ideal: 320 },
          height: { ideal: 240 },
        }
      },
      {
        name: 'Configuração mínima',
        constraints: true // Aceita qualquer câmera disponível
      }
    ];
    
    let stream: MediaStream | null = null;
    let lastError: Error | null = null;
    
    // Tentar cada configuração em sequência
    for (const config of videoConfigs) {
      try {
        console.log(`🎥 Tentando acesso à câmera: ${config.name}...`);
        stream = await navigator.mediaDevices.getUserMedia({
          video: config.constraints
        });
        console.log(`✅ Câmera acessada com sucesso: ${config.name}`);
        break; // Sucesso, sair do loop
      } catch (err) {
        console.warn(`⚠️ Falha com ${config.name}:`, err.name);
        lastError = err as Error;
        // Continuar para próxima configuração
      }
    }
    
    // Se nenhuma configuração funcionou
    if (!stream) {
      throw lastError || new Error('Não foi possível acessar a câmera');
    }
    
    // Configurar stream no elemento de vídeo
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play()
          .then(() => {
            setIsCameraActive(true);
            setIsDemoMode(false);
            setError("");
          })
          .catch((playErr) => {
            console.error("❌ Erro ao reproduzir vídeo:", playErr);
            setError("Erro ao iniciar visualização da câmera. Tente o modo demo.");
          });
      };
    }
    
  } catch (err) {
    const error = err as Error;
    console.error("❌ Erro ao acessar câmera:", error);
    
    // Mensagens específicas por tipo de erro
    let userMessage = "Não foi possível acessar a câmera. ";
    
    if (error.name === 'NotAllowedError') {
      userMessage += "Permissão negada. Verifique as configurações do navegador.";
    } else if (error.name === 'NotFoundError') {
      userMessage += "Nenhuma câmera encontrada no dispositivo.";
    } else if (error.name === 'NotReadableError') {
      userMessage += "A câmera está em uso por outro aplicativo. Feche outros programas e tente novamente.";
    } else if (error.name === 'AbortError') {
      userMessage += "Erro de hardware. Tente reiniciar o navegador.";
    } else {
      userMessage += "Erro desconhecido.";
    }
    
    userMessage += " Use o Modo Demo para testar a IA!";
    setError(userMessage);
  }
}
```

**Justificativa**:
- Sistema de fallback em cascata aumenta drasticamente a taxa de sucesso
- Logs detalhados permitem diagnóstico rápido durante apresentações
- Mensagens de erro específicas ajudam o usuário a entender e resolver o problema
- Configuração `true` como último fallback aceita qualquer câmera disponível

### 3. Enhanced Error Handling

**Princípios**:
1. **Console Logging**: Todos os erros devem ser logados com contexto
2. **User-Friendly Messages**: Mensagens para o usuário devem ser claras e acionáveis
3. **Error Classification**: Diferentes tipos de erro recebem tratamento específico

**Tipos de Erro da Camera API**:
- `NotAllowedError`: Usuário negou permissão ou HTTPS não está configurado
- `NotFoundError`: Nenhuma câmera disponível no dispositivo
- `NotReadableError`: Câmera em uso por outro aplicativo ou bloqueada pelo SO
- `AbortError`: Erro de hardware ou driver
- `OverconstrainedError`: Constraints solicitadas não podem ser satisfeitas

## Data Models

Nenhuma mudança nos modelos de dados existentes. As modificações são apenas no fluxo de controle e tratamento de erros.

**Estado Atual Mantido**:
```typescript
const [model, setModel] = useState<tf.LayersModel | null>(null);
const [isModelLoading, setIsModelLoading] = useState(true);
const [isCameraActive, setIsCameraActive] = useState(false);
const [isDemoMode, setIsDemoMode] = useState(false);
const [currentRGB, setCurrentRGB] = useState({ r: 0, g: 0, b: 0 });
const [prediction, setPrediction] = useState<string>("");
const [error, setError] = useState<string>("");
```

## Error Handling

### TensorFlow Errors

**Estratégia**: Configuração proativa do backend CPU para evitar erros de WebGL

**Fluxo**:
```
1. Tentar configurar backend CPU
2. Se falhar → Log erro detalhado + Mensagem ao usuário
3. Se sucesso → Continuar com treinamento
4. Durante treinamento, qualquer erro → Log + Mensagem ao usuário
```

**Mensagens**:
- Sucesso: Console log com backend usado
- Falha: "Erro ao carregar a IA. Tente recarregar a página."

### Camera Errors

**Estratégia**: Tentativas múltiplas com fallback + Mensagens específicas por tipo de erro

**Fluxo**:
```
1. Tentar config 1 (alta qualidade)
   └─ Falha → Log + Tentar config 2
2. Tentar config 2 (média qualidade)
   └─ Falha → Log + Tentar config 3
3. Tentar config 3 (baixa qualidade)
   └─ Falha → Log + Tentar config 4
4. Tentar config 4 (mínima)
   └─ Falha → Classificar erro + Mensagem específica
```

**Mensagens por Tipo**:
- `NotAllowedError`: "Permissão negada. Verifique as configurações do navegador."
- `NotFoundError`: "Nenhuma câmera encontrada no dispositivo."
- `NotReadableError`: "A câmera está em uso por outro aplicativo. Feche outros programas e tente novamente."
- `AbortError`: "Erro de hardware. Tente reiniciar o navegador."
- Outros: "Erro desconhecido."

Todas as mensagens terminam com: "Use o Modo Demo para testar a IA!"

## Testing Strategy

### Manual Testing Checklist

**TensorFlow Backend**:
1. ✅ Abrir DevTools Console
2. ✅ Carregar aplicação
3. ✅ Verificar log: "✅ TensorFlow backend configurado: cpu"
4. ✅ Verificar que modelo treina sem erros de WebGL
5. ✅ Testar modo demo para confirmar predições funcionam

**Camera Access**:
1. ✅ Testar em navegador com câmera disponível
   - Verificar logs de tentativas
   - Confirmar que câmera abre
2. ✅ Testar com câmera em uso (abrir Zoom/Teams primeiro)
   - Verificar erro NotReadableError
   - Confirmar mensagem específica ao usuário
3. ✅ Testar negando permissão
   - Verificar erro NotAllowedError
   - Confirmar mensagem específica ao usuário
4. ✅ Testar em dispositivo sem câmera (se possível)
   - Verificar erro NotFoundError
   - Confirmar mensagem específica ao usuário

**Cross-Browser Testing**:
- Chrome/Edge (Chromium)
- Firefox
- Safari (se disponível)

**Device Testing**:
- Desktop (Windows/Mac/Linux)
- Mobile (Android/iOS)

### Automated Testing

Não é necessário adicionar testes automatizados nesta fase, pois:
1. A aplicação é para demonstração em palestra
2. Os problemas são de compatibilidade de ambiente, não de lógica
3. Testes manuais são suficientes para validar as correções

### Performance Considerations

**Backend CPU vs WebGL**:
- WebGL: ~0.5-2 segundos para treinar
- CPU: ~3-8 segundos para treinar

**Impacto**: Aceitável para o caso de uso (palestra). O modelo é pequeno (13 cores, 100 epochs) e treina rapidamente mesmo na CPU.

**Otimização Futura** (opcional):
- Tentar WebGL primeiro, fallback para CPU se falhar
- Implementação:
```typescript
try {
  await tf.setBackend('webgl');
  await tf.ready();
  console.log('✅ Usando WebGL (GPU)');
} catch {
  await tf.setBackend('cpu');
  await tf.ready();
  console.log('✅ Usando CPU (fallback)');
}
```

## Implementation Notes

### Ordem de Implementação Recomendada

1. **Primeiro**: Corrigir TensorFlow backend
   - Mudança mínima, alto impacto
   - Resolve o erro crítico de WebGL
   
2. **Segundo**: Implementar camera fallback
   - Aumenta robustez significativamente
   - Melhora experiência do usuário

3. **Terceiro**: Melhorar mensagens de erro
   - Já incluído nas mudanças acima
   - Ajuda no diagnóstico

### Backward Compatibility

Todas as mudanças são backward compatible:
- API do componente não muda
- Props não mudam
- Comportamento visual permanece o mesmo
- Apenas adiciona robustez interna

### Dependencies

Nenhuma nova dependência necessária. Usa apenas:
- `@tensorflow/tfjs` (já instalado)
- APIs nativas do navegador (MediaDevices)

### Security Considerations

- HTTPS continua sendo requisito para acesso à câmera (padrão do navegador)
- Nenhuma mudança nas permissões solicitadas
- Logs não expõem informações sensíveis

### Accessibility

Nenhum impacto na acessibilidade. As mudanças são internas e não afetam:
- Navegação por teclado
- Leitores de tela
- Contraste de cores
- Tamanho de texto
