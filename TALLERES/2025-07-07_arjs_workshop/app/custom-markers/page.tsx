"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CustomMarkersPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      {/* Header */}
      <div className="p-4 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-white font-semibold">Marcadores Personalizados</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Información sobre marcadores */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">📋 Marcador Hiro (Predeterminado)</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-100">
              <p className="mb-4">
                El marcador Hiro es el marcador estándar de AR.js. Es fácil de detectar y funciona bien en diferentes
                condiciones de iluminación.
              </p>
              <a
                href="https://github.com/jeromeetienne/AR.js/blob/master/data/images/HIRO.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Marcador Hiro
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">🎨 Crear Marcadores Personalizados</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-100">
              <p className="mb-4">Puedes crear tus propios marcadores usando el generador oficial de AR.js.</p>
              <a
                href="https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Generador de Marcadores
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Demo con marcador Hiro */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">🎯 Demo - Marcador Hiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="w-full h-96 rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: `
                  <a-scene 
                    embedded 
                    arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
                    style="width: 100%; height: 100%;"
                  >
                    <a-marker preset="hiro">
                      <!-- Pirámide colorida -->
                      <a-cone 
                        position="0 1 0" 
                        radius-bottom="0.5" 
                        radius-top="0" 
                        height="1"
                        material="color: #FF6B6B"
                        animation="property: rotation; to: 0 360 0; loop: true; dur: 4000"
                        shadow
                      ></a-cone>
                      
                      <!-- Anillos orbitales -->
                      <a-torus 
                        position="0 0.5 0" 
                        radius="1" 
                        radius-tubular="0.05"
                        material="color: #4ECDC4; opacity: 0.7"
                        animation="property: rotation; to: 360 0 0; loop: true; dur: 3000"
                      ></a-torus>
                      
                      <a-torus 
                        position="0 0.5 0" 
                        radius="1.2" 
                        radius-tubular="0.03"
                        material="color: #45B7D1; opacity: 0.5"
                        animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
                      ></a-torus>
                      
                      <!-- Base -->
                      <a-cylinder 
                        position="0 0 0" 
                        radius="1.5" 
                        height="0.1" 
                        material="color: #96CEB4; opacity: 0.8"
                        shadow
                      ></a-cylinder>
                    </a-marker>
                    
                    <a-entity camera></a-entity>
                  </a-scene>
                `,
              }}
            />

            <div className="mt-4 p-4 bg-black/20 rounded-lg">
              <p className="text-blue-100 text-sm">
                <strong>💡 Consejos:</strong>
              </p>
              <ul className="list-disc list-inside text-blue-200 text-xs mt-2 space-y-1">
                <li>Mantén el marcador plano y bien iluminado</li>
                <li>Evita reflejos y sombras sobre el marcador</li>
                <li>La distancia óptima es de 20-50 cm</li>
                <li>Mueve lentamente para mejor detección</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Código de ejemplo */}
        <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">💻 Código de Ejemplo</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm overflow-x-auto">
              {`<!-- Marcador Hiro predeterminado -->
<a-marker preset="hiro">
  <a-cone position="0 1 0" material="color: red"></a-cone>
</a-marker>

<!-- Marcador personalizado -->
<a-marker type="pattern" url="path/to/custom-marker.patt">
  <a-box position="0 0.5 0" material="color: blue"></a-box>
</a-marker>

<!-- Múltiples marcadores -->
<a-marker preset="hiro" id="marker1">
  <a-sphere position="0 1 0" material="color: red"></a-sphere>
</a-marker>

<a-marker preset="kanji" id="marker2">
  <a-cylinder position="0 1 0" material="color: green"></a-cylinder>
</a-marker>`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
