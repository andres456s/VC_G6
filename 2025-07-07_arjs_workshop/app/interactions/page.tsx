"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InteractionsARPage() {
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
          <h1 className="text-white font-semibold">AR Interacciones</h1>
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
              <a-marker preset="hiro" id="markerA">
                <!-- Esfera que cambia de color -->
                <a-sphere 
                  position="0 1 0" 
                  radius="0.5"
                  material="color: red"
                  animation="property: material.color; to: blue; dir: alternate; dur: 2000; loop: true"
                  animation__scale="property: scale; to: 1.2 1.2 1.2; dir: alternate; dur: 1000; loop: true"
                  shadow
                ></a-sphere>
                
                <!-- Texto flotante -->
                <a-text 
                  value="¡Marcador Detectado!" 
                  position="0 2 0" 
                  align="center"
                  color="white"
                  animation="property: position; to: 0 2.5 0; dir: alternate; dur: 3000; loop: true"
                ></a-text>
                
                <!-- Partículas -->
                <a-box 
                  position="-1 0.5 0" 
                  width="0.1" 
                  height="0.1" 
                  depth="0.1"
                  material="color: yellow"
                  animation="property: position; to: 1 2 0; dur: 2000; loop: true"
                ></a-box>
                
                <a-box 
                  position="1 0.5 0" 
                  width="0.1" 
                  height="0.1" 
                  depth="0.1"
                  material="color: green"
                  animation="property: position; to: -1 2 0; dur: 2000; loop: true"
                ></a-box>
                
                <!-- Plataforma giratoria -->
                <a-cylinder 
                  position="0 0 0" 
                  radius="1.5" 
                  height="0.1" 
                  material="color: #7BC8A4; opacity: 0.8"
                  animation="property: rotation; to: 0 360 0; dur: 10000; loop: true"
                  shadow
                ></a-cylinder>
              </a-marker>
              
              <a-entity camera></a-entity>
            </a-scene>
            
            <script>
              // Eventos de marcador
              document.addEventListener('DOMContentLoaded', function() {
                const marker = document.querySelector('#markerA');
                
                marker.addEventListener('markerFound', function() {
                  console.log('Marcador encontrado!');
                  // Aquí puedes agregar más interacciones
                });
                
                marker.addEventListener('markerLost', function() {
                  console.log('Marcador perdido!');
                });
              });
            </script>
          `,
        }}
      />

      {/* Info */}
      <div className="fixed bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
        <p className="mb-2">
          <strong>⚡ Interacciones Activas:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Esfera que cambia de color y escala</li>
          <li>Texto flotante animado</li>
          <li>Partículas en movimiento</li>
          <li>Plataforma giratoria</li>
          <li>Eventos de detección de marcador</li>
        </ul>
      </div>
    </div>
  )
}
