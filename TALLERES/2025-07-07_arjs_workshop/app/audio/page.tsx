"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AudioARPage() {
  useEffect(() => {
    const loadScripts = async () => {
      if (typeof window !== "undefined") {
        // A-Frame
        if (!document.querySelector('script[src*="aframe"]')) {
          const aframeScript = document.createElement("script")
          aframeScript.src = "https://aframe.io/releases/1.4.0/aframe.min.js"
          document.head.appendChild(aframeScript)
        }

        // AR.js
        if (!document.querySelector('script[src*="ar.js"]')) {
          const arScript = document.createElement("script")
          arScript.src = "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"
          document.head.appendChild(arScript)
        }
      }
    }

    loadScripts()
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-white font-semibold">AR con Audio</h1>
        </div>
      </div>

      {/* AR Scene */}
      <div
        className="w-full h-screen pt-16"
        dangerouslySetInnerHTML={{
          __html: `
            <a-scene 
              embedded 
              arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
              style="width: 100%; height: 100%;"
            >
              <a-assets>
                <!-- Audio assets -->
                <audio id="backgroundMusic" src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" preload="auto"></audio>
                <audio id="detectionSound" src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" preload="auto"></audio>
              </a-assets>
              
              <a-marker preset="hiro" id="audioMarker">
                <!-- Visualizador de audio -->
                <a-sphere 
                  position="0 1 0" 
                  radius="0.5"
                  material="color: #FF6B6B; opacity: 0.8"
                  animation="property: scale; to: 1.5 1.5 1.5; dir: alternate; dur: 500; loop: true"
                  id="audioSphere"
                ></a-sphere>
                
                <!-- Ondas de sonido -->
                <a-ring 
                  position="0 1 0" 
                  radius-inner="0.8" 
                  radius-outer="1"
                  material="color: #4ECDC4; opacity: 0.3"
                  animation="property: scale; to: 3 3 3; dur: 2000; loop: true"
                ></a-ring>
                
                <a-ring 
                  position="0 1 0" 
                  radius-inner="0.8" 
                  radius-outer="1"
                  material="color: #45B7D1; opacity: 0.2"
                  animation="property: scale; to: 4 4 4; dur: 3000; loop: true"
                ></a-ring>
                
                <!-- Texto indicador -->
                <a-text 
                  value="🎵 AUDIO ACTIVO 🎵" 
                  position="0 2 0" 
                  align="center"
                  color="white"
                  animation="property: rotation; to: 0 360 0; dur: 10000; loop: true"
                ></a-text>
                
                <!-- Ecualizador visual -->
                <a-box position="-0.5 0.5 0" width="0.1" height="0.5" depth="0.1" material="color: #FF6B6B" animation="property: scale; to: 1 2 1; dir: alternate; dur: 300; loop: true"></a-box>
                <a-box position="-0.3 0.5 0" width="0.1" height="0.7" depth="0.1" material="color: #4ECDC4" animation="property: scale; to: 1 1.5 1; dir: alternate; dur: 400; loop: true"></a-box>
                <a-box position="-0.1 0.5 0" width="0.1" height="0.9" depth="0.1" material="color: #45B7D1" animation="property: scale; to: 1 1.8 1; dir: alternate; dur: 350; loop: true"></a-box>
                <a-box position="0.1 0.5 0" width="0.1" height="0.6" depth="0.1" material="color: #96CEB4" animation="property: scale; to: 1 2.2 1; dir: alternate; dur: 450; loop: true"></a-box>
                <a-box position="0.3 0.5 0" width="0.1" height="0.8" depth="0.1" material="color: #FFEAA7" animation="property: scale; to: 1 1.3 1; dir: alternate; dur: 380; loop: true"></a-box>
                <a-box position="0.5 0.5 0" width="0.1" height="0.4" depth="0.1" material="color: "#DDA0DD" animation="property: scale; to: 1 2.5 1; dir: alternate; dur: 320; loop: true"></a-box>
              </a-marker>
              
              <a-entity camera></a-entity>
            </a-scene>
            
            <script>
              document.addEventListener('DOMContentLoaded', function() {
                const marker = document.querySelector('#audioMarker');
                const backgroundMusic = document.querySelector('#backgroundMusic');
                const detectionSound = document.querySelector('#detectionSound');
                let isPlaying = false;
                
                marker.addEventListener('markerFound', function() {
                  console.log('Marcador encontrado - Reproduciendo audio');
                  
                  // Sonido de detección
                  if (detectionSound) {
                    detectionSound.currentTime = 0;
                    detectionSound.play().catch(e => console.log('Error reproduciendo sonido:', e));
                  }
                  
                  // Música de fondo
                  if (backgroundMusic && !isPlaying) {
                    backgroundMusic.loop = true;
                    backgroundMusic.volume = 0.3;
                    backgroundMusic.play().catch(e => console.log('Error reproduciendo música:', e));
                    isPlaying = true;
                  }
                });
                
                marker.addEventListener('markerLost', function() {
                  console.log('Marcador perdido - Pausando audio');
                  
                  if (backgroundMusic && isPlaying) {
                    backgroundMusic.pause();
                    isPlaying = false;
                  }
                });
              });
            </script>
          `,
        }}
      />

      {/* Info */}
      <div className="fixed bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
        <p className="mb-2">
          <strong>🎵 Audio Reactivo:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Sonido de detección al encontrar marcador</li>
          <li>Música de fondo mientras el marcador esté visible</li>
          <li>Visualizador de audio con ecualizador</li>
          <li>Ondas de sonido animadas</li>
          <li>Audio se pausa al perder el marcador</li>
        </ul>
        <p className="mt-2 text-yellow-300 text-xs">
          💡 Nota: Algunos navegadores requieren interacción del usuario para reproducir audio
        </p>
      </div>
    </div>
  )
}
