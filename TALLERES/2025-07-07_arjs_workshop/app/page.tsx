import Link from "next/link"
import { Camera, CuboidIcon as Cube, BookMarkedIcon as Marker, Zap, Volume2, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🧪 Taller AR.js</h1>
          <p className="text-xl text-blue-200 mb-2">Introducción a Realidad Aumentada Web</p>
          <p className="text-lg text-blue-300">Marcadores con AR.js + Three.js</p>
        </div>

        {/* Objetivo */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-6 h-6" />🔍 Objetivo del Taller
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-100">
            <p>
              Implementar una experiencia básica de realidad aumentada basada en marcadores directamente desde el
              navegador, usando AR.js y Three.js. Visualizar modelos 3D sobre marcadores físicos y activar interacciones
              cuando son detectados.
            </p>
          </CardContent>
        </Card>

        {/* Actividades */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cube className="w-5 h-5" />
                Básico
              </CardTitle>
              <CardDescription className="text-blue-200">Estructura HTML + Cubo 3D</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/basic">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Ver Ejemplo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Modelos 3D
              </CardTitle>
              <CardDescription className="text-blue-200">Cargar modelos GLTF personalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/models">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Ver Ejemplo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Interacciones
              </CardTitle>
              <CardDescription className="text-blue-200">Animaciones y eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/interactions">
                <Button className="w-full bg-green-600 hover:bg-green-700">Ver Ejemplo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Marker className="w-5 h-5" />
                Marcadores
              </CardTitle>
              <CardDescription className="text-blue-200">Marcadores personalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/custom-markers">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Ver Ejemplo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Sonido
              </CardTitle>
              <CardDescription className="text-blue-200">Audio reactivo a marcadores</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/audio">
                <Button className="w-full bg-red-600 hover:bg-red-700">Ver Ejemplo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Multi-Marcador
              </CardTitle>
              <CardDescription className="text-blue-200">Múltiples marcadores simultáneos</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/multi-marker">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Ver Ejemplo</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Instrucciones */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">📱 Instrucciones de Uso</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-100 space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">1. Preparación:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Usa un dispositivo con cámara (móvil o laptop)</li>
                <li>Permite acceso a la cámara cuando se solicite</li>
                <li>Imprime el marcador Hiro o usa la pantalla de otro dispositivo</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">2. Marcador Hiro:</h3>
              <p>
                Descarga e imprime el marcador desde:{" "}
                <a
                  href="https://github.com/jeromeetienne/AR.js/blob/master/data/images/HIRO.jpg"
                  className="text-blue-300 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Marcador Hiro
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">3. Uso:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Apunta la cámara hacia el marcador</li>
                <li>Mantén buena iluminación</li>
                <li>El modelo 3D aparecerá sobre el marcador</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
