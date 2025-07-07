"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BasicARPage() {
  useEffect(() => {
    // Cargar scripts de A-Frame y AR.js
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
          arScript.src =
            "https://cdn.jsdelivr.net/gh/aframevr/aframe@1c2407b26c61958baa93967b5412487cd94b290b/dist/aframe-master.min.js"
          document.head.appendChild(arScript)

          const arjsScript = document.createElement("script")
          arjsScript.src = "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"
          document.head.appendChild(arjsScript)
        }
      }
    }

    loadScripts()
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Header fijo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-white font-semibold">AR Básico - Cubo Rojo</h1>
        </div>
      </div>

      {/* Contenido AR */}
      <div
        className="w-full h-screen pt-16"
        dangerouslySetInnerHTML={{
          __html: `
            <a-scene 
              embedded 
              arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
              style="width: 100%; height: 100%;"
            >
              <a-marker preset="hiro">
                <a-box 
                  position="0 0.5 0" 
                  material="color: red; opacity: 0.8;" 
                  animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
                  shadow
                ></a-box>
              </a-marker>
              <a-entity camera></a-entity>
            </a-scene>
          `,
        }}
      />

      {/* Instrucciones flotantes */}
      <div className="fixed bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
        <p className="mb-2">
          <strong>📱 Instrucciones:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Permite acceso a la cámara</li>
          <li>Apunta hacia el marcador Hiro impreso</li>
          <li>Verás un cubo rojo girando sobre el marcador</li>
        </ul>
      </div>
    </div>
  )
}
