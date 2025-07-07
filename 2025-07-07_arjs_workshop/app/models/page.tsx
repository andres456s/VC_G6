"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ModelsARPage() {
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
          <h1 className="text-white font-semibold">AR Modelos 3D</h1>
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
                <a-asset-item id="duck" src="/assets/3d/duck.glb"></a-asset-item>
              </a-assets>
              
              <a-marker preset="hiro">
                <a-entity 
                  gltf-model="#duck"
                  position="0 0 0"
                  scale="0.5 0.5 0.5"
                  animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
                  shadow
                ></a-entity>
                
                <!-- Plataforma -->
                <a-cylinder 
                  position="0 -0.1 0" 
                  radius="1" 
                  height="0.1" 
                  material="color: #4CC3D9; opacity: 0.7"
                  shadow
                ></a-cylinder>
                
                <!-- Luces -->
                <a-light type="ambient" color="#404040"></a-light>
                <a-light type="point" position="2 4 4" color="#ffffff"></a-light>
              </a-marker>
              
              <a-entity camera></a-entity>
            </a-scene>
          `,
        }}
      />

      {/* Info */}
      <div className="fixed bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
        <p className="mb-2">
          <strong>🦆 Modelo 3D:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Modelo GLTF de un pato girando</li>
          <li>Plataforma circular azul</li>
          <li>Iluminación ambiental y puntual</li>
        </ul>
      </div>
    </div>
  )
}
