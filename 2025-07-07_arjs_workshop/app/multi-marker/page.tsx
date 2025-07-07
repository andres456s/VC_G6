"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MultiMarkerARPage() {
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
          <h1 className="text-white font-semibold">Multi-Marcador AR</h1>
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
              <!-- Marcador Hiro - Elemento Fuego -->
              <a-marker preset="hiro" id="fireMarker">
                <a-sphere 
                  position="0 1 0" 
                  radius="0.5"
                  material="color: #FF4444; opacity: 0.8"
                  animation="property: material.color; to: #FF8800; dir: alternate; dur: 1000; loop: true"
                  animation__scale="property: scale; to: 1.2 1.2 1.2; dir: alternate; dur: 800; loop: true"
                ></a-sphere>
                
                <!-- Partículas de fuego -->
                <a-box position="0 0.5 0" width="0.05" height="0.05" depth="0.05" material="color: #FF6600" animation="property: position; to: 0 2 0; dur: 2000; loop: true"></a-box>
                <a-box position="0.2 0.5 0" width="0.05" height="0.05" depth="0.05" material="color: #FF4400" animation="property: position; to: 0.2 2.2 0; dur: 1800; loop: true"></a-box>
                <a-box position="-0.2 0.5 0" width="0.05" height="0.05" depth="0.05" material="color: #FF8800" animation="property: position; to: -0.2 1.8 0; dur: 2200; loop: true"></a-box>
                
                <a-text value="🔥 FUEGO" position="0 1.5 0" align="center" color="red"></a-text>
              </a-marker>
              
              <!-- Marcador Kanji - Elemento Agua -->
              <a-marker preset="kanji" id="waterMarker">
                <a-cylinder 
                  position="0 0.5 0" 
                  radius="0.5" 
                  height="1"
                  material="color: #4488FF; opacity: 0.7"
                  animation="property: material.color; to: #0066CC; dir: alternate; dur: 1500; loop: true"
                  animation__wave="property: position; to: 0 0.7 0; dir: alternate; dur: 2000; loop: true"
                ></a-cylinder>
                
                <!-- Gotas de agua -->
                <a-sphere position="0 1.5 0" radius="0.05" material="color: #66AAFF" animation="property: position; to: 0 0 0; dur: 3000; loop: true"></a-sphere>
                <a-sphere position="0.3 1.3 0" radius="0.05" material="color: #4488FF" animation="property: position; to: 0.3 0 0; dur: 2800; loop: true"></a-sphere>
                <a-sphere position="-0.3 1.7 0" radius="0.05" material="color: #2266DD" animation="property: position; to: -0.3 0 0; dur: 3200; loop: true"></a-sphere>
                
                <a-text value="💧 AGUA" position="0 1.5 0" align="center" color="blue"></a-text>
              </a-marker>
              
              <!-- Marcador A - Elemento Tierra -->
              <a-marker type="pattern" preset="custom" url="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/data/patt.a" id="earthMarker">
                <a-box 
                  position="0 0.5 0" 
                  width="1" 
                  height="1" 
                  depth="1"
                  material="color: #8B4513; opacity: 0.9"
                  animation="property: rotation; to: 45 45 45; dir: alternate; dur: 4000; loop: true"
                ></a-box>
                
                <!-- Cristales -->
                <a-octahedron position="0.5 1 0.5" radius="0.1" material="color: #228B22" animation="property: rotation; to: 0 360 0; dur: 3000; loop: true"></a-octahedron>
                <a-octahedron position="-0.5 1 -0.5" radius="0.1" material="color: #32CD32" animation="property: rotation; to: 360 0 0; dur: 2500; loop: true"></a-octahedron>
                
                <a-text value="🌍 TIERRA" position="0 1.5 0" align="center" color="green"></a-text>
              </a-marker>
              
              <a-entity camera></a-entity>
            </a-scene>
            
            <script>
              document.addEventListener('DOMContentLoaded', function() {
                const fireMarker = document.querySelector('#fireMarker');
                const waterMarker = document.querySelector('#waterMarker');
                const earthMarker = document.querySelector('#earthMarker');
                
                let activeMarkers = new Set();
                
                // Eventos para marcador de fuego
                fireMarker.addEventListener('markerFound', function() {
                  console.log('Marcador FUEGO detectado');
                  activeMarkers.add('fire');
                  checkCombination();
                });
                
                fireMarker.addEventListener('markerLost', function() {
                  console.log('Marcador FUEGO perdido');
                  activeMarkers.delete('fire');
                });
                
                // Eventos para marcador de agua
                waterMarker.addEventListener('markerFound', function() {
                  console.log('Marcador AGUA detectado');
                  activeMarkers.add('water');
                  checkCombination();
                });
                
                waterMarker.addEventListener('markerLost', function() {
                  console.log('Marcador AGUA perdido');
                  activeMarkers.delete('water');
                });
                
                // Eventos para marcador de tierra
                earthMarker.addEventListener('markerFound', function() {
                  console.log('Marcador TIERRA detectado');
                  activeMarkers.add('earth');
                  checkCombination();
                });
                
                earthMarker.addEventListener('markerLost', function() {
                  console.log('Marcador TIERRA perdido');
                  activeMarkers.delete('earth');
                });
                
                function checkCombination() {
                  if (activeMarkers.has('fire') && activeMarkers.has('water')) {
                    console.log('¡COMBINACIÓN: Fuego + Agua = Vapor!');
                  }
                  
                  if (activeMarkers.has('fire') && activeMarkers.has('earth')) {
                    console.log('¡COMBINACIÓN: Fuego + Tierra = Lava!');
                  }
                  
                  if (activeMarkers.has('water') && activeMarkers.has('earth')) {
                    console.log('¡COMBINACIÓN: Agua + Tierra = Barro!');
                  }
                  
                  if (activeMarkers.has('fire') && activeMarkers.has('water') && activeMarkers.has('earth')) {
                    console.log('¡COMBINACIÓN SUPREMA: Todos los elementos unidos!');
                  }
                }
              });
            </script>
          `,
        }}
      />

      {/* Info */}
      <div className="fixed bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
        <p className="mb-2">
          <strong>🎯 Multi-Marcador:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>
            <span className="text-red-400">Hiro</span>: Elemento Fuego 🔥
          </li>
          <li>
            <span className="text-blue-400">Kanji</span>: Elemento Agua 💧
          </li>
          <li>
            <span className="text-green-400">A</span>: Elemento Tierra 🌍
          </li>
          <li>Combina marcadores para efectos especiales</li>
          <li>Cada elemento tiene animaciones únicas</li>
        </ul>
        <p className="mt-2 text-yellow-300 text-xs">💡 Intenta mostrar múltiples marcadores simultáneamente</p>
      </div>
    </div>
  )
}
