import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, AlertCircle, Palette } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Dataset de cores para treinamento
const COLOR_DATASET = [
  { r: 255, g: 0, b: 0, label: "Vermelho" },
  { r: 0, g: 255, b: 0, label: "Verde" },
  { r: 0, g: 0, b: 255, label: "Azul" },
  { r: 255, g: 255, b: 0, label: "Amarelo" },
  { r: 255, g: 0, b: 255, label: "Magenta" },
  { r: 0, g: 255, b: 255, label: "Ciano" },
  { r: 255, g: 165, b: 0, label: "Laranja" },
  { r: 128, g: 0, b: 128, label: "Roxo" },
  { r: 255, g: 192, b: 203, label: "Rosa" },
  { r: 165, g: 42, b: 42, label: "Marrom" },
  { r: 0, g: 0, b: 0, label: "Preto" },
  { r: 255, g: 255, b: 255, label: "Branco" },
  { r: 128, g: 128, b: 128, label: "Cinza" },
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [currentRGB, setCurrentRGB] = useState({ r: 0, g: 0, b: 0 });
  const [prediction, setPrediction] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Treinar modelo de rede neural
  useEffect(() => {
    async function trainModel() {
      try {
        setIsModelLoading(true);

        // Configurar backend CPU explicitamente para evitar erros de WebGL
        await tf.setBackend('cpu');
        await tf.ready();
        console.log('✅ TensorFlow backend configurado:', tf.getBackend());

        // Preparar dados de treinamento
        const inputs = COLOR_DATASET.map((color) => [
          color.r / 255,
          color.g / 255,
          color.b / 255,
        ]);
        const labels = COLOR_DATASET.map((_, index) => index);

        const xs = tf.tensor2d(inputs);
        const ys = tf.oneHot(tf.tensor1d(labels, "int32"), COLOR_DATASET.length);

        // Criar modelo de rede neural
        const neuralModel = tf.sequential({
          layers: [
            tf.layers.dense({ inputShape: [3], units: 16, activation: "relu" }),
            tf.layers.dense({ units: 16, activation: "relu" }),
            tf.layers.dense({
              units: COLOR_DATASET.length,
              activation: "softmax",
            }),
          ],
        });

        // Compilar modelo
        neuralModel.compile({
          optimizer: tf.train.adam(0.01),
          loss: "categoricalCrossentropy",
          metrics: ["accuracy"],
        });

        // Treinar modelo
        await neuralModel.fit(xs, ys, {
          epochs: 100,
          verbose: 0,
        });

        setModel(neuralModel);
        setIsModelLoading(false);

        // Limpar tensores
        xs.dispose();
        ys.dispose();
      } catch (err) {
        console.error("❌ Erro ao treinar modelo:", err);
        console.error("Stack trace:", (err as Error).stack);
        setError("Erro ao carregar a IA. Tente recarregar a página.");
        setIsModelLoading(false);
      }
    }

    trainModel();
  }, []);

  // Iniciar câmera
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
          console.warn(`⚠️ Falha com ${config.name}:`, (err as Error).name);
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
        videoRef.current.setAttribute('autoplay', '');
        videoRef.current.setAttribute('playsinline', '');
        videoRef.current.muted = true;

        // Ativar interface imediatamente
        setIsCameraActive(true);
        setIsDemoMode(false);
        setError("");

        videoRef.current.onloadedmetadata = () => {
          videoRef.current
            ?.play()
            .catch((playErr) => {
              console.error("❌ Erro ao reproduzir vídeo:", playErr);
              setError(
                "Erro ao iniciar visualização da câmera. Tente o modo demo."
              );
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

  // Ativar modo demo
  function startDemoMode() {
    setIsDemoMode(true);
    setIsCameraActive(false);
    setError("");
    // Iniciar com uma cor padrão
    testColor(255, 0, 0);
  }

  // Testar uma cor no modo demo
  function testColor(r: number, g: number, b: number) {
    if (!model) return;

    setCurrentRGB({ r, g, b });

    // Fazer previsão
    const input = tf.tensor2d([[r / 255, g / 255, b / 255]]);
    const output = model.predict(input) as tf.Tensor;
    const predictionIndex = output.argMax(-1).dataSync()[0];
    setPrediction(COLOR_DATASET[predictionIndex].label);

    // Limpar tensores
    input.dispose();
    output.dispose();
  }

  // Capturar cor do centro da câmera
  useEffect(() => {
    if (!isCameraActive || !model) return;

    const interval = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // Desenhar frame atual
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        // Capturar pixel do centro
        const centerX = Math.floor(canvas.width / 2);
        const centerY = Math.floor(canvas.height / 2);
        const imageData = ctx.getImageData(centerX, centerY, 1, 1);
        const data = Array.from(imageData.data);
        const [r, g, b] = data;

        setCurrentRGB({ r, g, b });

        // Fazer previsão
        const input = tf.tensor2d([[r / 255, g / 255, b / 255]]);
        const output = model.predict(input) as tf.Tensor;
        const predictionIndex = output.argMax(-1).dataSync()[0];
        setPrediction(COLOR_DATASET[predictionIndex].label);

        // Limpar tensores
        input.dispose();
        output.dispose();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isCameraActive, model]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2847] to-[#0f1f35] flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#00d9ff] mb-3 drop-shadow-[0_0_20px_rgba(0,217,255,0.5)]">
          Identificador de Cores
        </h1>
        <p className="text-lg text-gray-300">
          {isCameraActive
            ? "Aponte a câmera para qualquer objeto colorido"
            : isDemoMode
            ? "Clique nas cores abaixo para testar a IA"
            : "Escolha um modo para começar"}
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6 max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isModelLoading && (
        <div className="flex flex-col items-center gap-4 text-[#00d9ff]">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="text-lg">Treinando a rede neural...</p>
        </div>
      )}

      {/* Main Content */}
      {!isModelLoading && (
        <div className="w-full max-w-2xl">
          {!isCameraActive && !isDemoMode ? (
            <div className="flex flex-col items-center gap-6">
              <div className="w-full aspect-video bg-black/30 rounded-lg border-2 border-[#00d9ff]/30 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-24 h-24 text-[#00d9ff]/50 mx-auto mb-4" />
                  <p className="text-gray-400">Escolha um modo abaixo</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button
                  onClick={startCamera}
                  size="lg"
                  className="flex-1 bg-[#00d9ff] hover:bg-[#00d9ff]/80 text-[#0a1628] font-semibold shadow-[0_0_30px_rgba(0,217,255,0.5)]"
                >
                  <Camera className="mr-2" />
                  Usar Câmera
                </Button>

                <Button
                  onClick={startDemoMode}
                  size="lg"
                  variant="outline"
                  className="flex-1 border-[#ff006e] text-[#ff006e] hover:bg-[#ff006e]/10 font-semibold"
                >
                  <Palette className="mr-2" />
                  Modo Demo
                </Button>
              </div>

              <div className="bg-[#00d9ff]/10 border border-[#00d9ff]/30 rounded-lg p-4 text-center w-full">
                <p className="text-sm text-gray-300">
                  💡 <strong>Dica:</strong> Use a câmera em dispositivos móveis
                  ou o modo demo para testar sem câmera!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Camera View or Demo Mode */}
              {isCameraActive ? (
                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border-2 border-[#00d9ff] shadow-[0_0_40px_rgba(0,217,255,0.5)]">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Target Circle */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 border-4 border-[#ff006e] rounded-full shadow-[0_0_30px_rgba(255,0,110,0.6)] animate-pulse" />
                  </div>
                </div>
              ) : (
                <div className="w-full bg-black/30 rounded-lg border-2 border-[#ff006e]/50 p-6">
                  <h3 className="text-xl font-semibold text-[#ff006e] mb-4 text-center">
                    Clique em uma cor para testar
                  </h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {COLOR_DATASET.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => testColor(color.r, color.g, color.b)}
                        className="aspect-square rounded-lg border-2 border-white/30 hover:border-white hover:scale-110 transition-all shadow-lg"
                        style={{
                          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                        }}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* RGB Display */}
              <div className="bg-black/30 border-2 border-[#00d9ff] rounded-lg p-6 backdrop-blur-sm">
                <div className="text-center mb-3">
                  <p className="text-sm text-[#00d9ff] font-semibold mb-2">
                    VALORES RGB
                  </p>
                  <div className="flex justify-center gap-4 font-mono text-lg text-gray-200">
                    <span>
                      R: <span className="text-red-400">{currentRGB.r}</span>
                    </span>
                    <span>
                      G: <span className="text-green-400">{currentRGB.g}</span>
                    </span>
                    <span>
                      B: <span className="text-blue-400">{currentRGB.b}</span>
                    </span>
                  </div>
                </div>

                {/* Color Preview */}
                <div className="flex justify-center my-4">
                  <div
                    className="w-24 h-24 rounded-lg border-2 border-white/30 shadow-lg"
                    style={{
                      backgroundColor: `rgb(${currentRGB.r}, ${currentRGB.g}, ${currentRGB.b})`,
                    }}
                  />
                </div>
              </div>

              {/* Prediction Display */}
              <div className="bg-black/30 border-2 border-[#ff006e] rounded-lg p-6 backdrop-blur-sm text-center">
                <p className="text-sm text-[#ff006e] font-semibold mb-2">
                  PREVISÃO DA IA
                </p>
                <p className="text-4xl font-bold text-[#ff006e] drop-shadow-[0_0_20px_rgba(255,0,110,0.5)]">
                  {prediction || "---"}
                </p>
              </div>

              {/* Back Button */}
              <Button
                onClick={() => {
                  setIsCameraActive(false);
                  setIsDemoMode(false);
                  setPrediction("");
                  // Parar stream de vídeo se estiver ativo
                  if (videoRef.current?.srcObject) {
                    const stream = videoRef.current.srcObject as MediaStream;
                    stream.getTracks().forEach((track) => track.stop());
                  }
                }}
                variant="outline"
                className="w-full border-gray-500 text-gray-300 hover:bg-gray-500/10"
              >
                Voltar
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-gray-400 text-sm">
        <p>
          Palestra:{" "}
          <span className="text-[#00d9ff]">Desvendando as Redes Neurais</span>
        </p>
        <p className="mt-1">Powered by TensorFlow.js</p>
      </div>
    </div>
  );
}
