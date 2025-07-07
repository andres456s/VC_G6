"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Text } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import * as THREE from "three"

// Tipos para los datos de detección
interface DetectionData {
  timestamp: number
  people_count: number
  objects: Array<{
    id: string
    type: "person" | "car" | "bicycle" | "dog"
    confidence: number
    bbox: [number, number, number, number] // x, y, width, height
    center: [number, number]
  }>
  movement_intensity: number
  dominant_color: [number, number, number]
}

// Componente para objetos 3D reactivos
function ReactiveObject({
  position,
  data,
  type = "box",
}: {
  position: [number, number, number]
  data: DetectionData
  type?: "box" | "sphere" | "cylinder"
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Calcular propiedades basadas en los datos
  const scale = Math.max(0.5, data.people_count * 0.3)
  const color = new THREE.Color(
    data.dominant_color[0] / 255,
    data.dominant_color[1] / 255,
    data.dominant_color[2] / 255,
  )
  const intensity = data.movement_intensity

  // Animación de rotación basada en intensidad de movimiento
  useEffect(() => {
    if (meshRef.current) {
      const rotation = intensity * 0.02
      meshRef.current.rotation.y += rotation
      meshRef.current.rotation.x += rotation * 0.5
    }
  })

  const geometry =
    type === "sphere" ? (
      <sphereGeometry args={[1, 32, 32]} />
    ) : type === "cylinder" ? (
      <cylinderGeometry args={[1, 1, 2, 32]} />
    ) : (
      <boxGeometry args={[1, 1, 1]} />
    )

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity * 0.1}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  )
}

// Componente para mostrar etiquetas flotantes
function FloatingLabels({ data }: { data: DetectionData }) {
  return (
    <>
      {data.objects.map((obj, index) => {
        // Convertir coordenadas de imagen a coordenadas 3D
        const x = (obj.center[0] / 640 - 0.5) * 10 // Asumiendo imagen 640px
        const z = (obj.center[1] / 480 - 0.5) * 7.5 // Asumiendo imagen 480px
        const y = 2 + index * 0.5

        return (
          <Html key={obj.id} position={[x, y, z]}>
            <div className="bg-black/80 text-white px-2 py-1 rounded text-xs">
              {obj.type} ({(obj.confidence * 100).toFixed(0)}%)
            </div>
          </Html>
        )
      })}
    </>
  )
}

// Simulador de datos de detección
function useDetectionSimulator(isActive: boolean) {
  const [data, setData] = useState<DetectionData>({
    timestamp: Date.now(),
    people_count: 0,
    objects: [],
    movement_intensity: 0,
    dominant_color: [100, 150, 200],
  })

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      // Simular detección variable
      const peopleCount = Math.floor(Math.random() * 5)
      const movementIntensity = Math.random()

      // Generar objetos detectados
      const objects = Array.from({ length: peopleCount }, (_, i) => ({
        id: `obj_${Date.now()}_${i}`,
        type: ["person", "car", "bicycle", "dog"][Math.floor(Math.random() * 4)] as any,
        confidence: 0.7 + Math.random() * 0.3,
        bbox: [Math.random() * 500, Math.random() * 400, 50 + Math.random() * 100, 80 + Math.random() * 120] as [
          number,
          number,
          number,
          number,
        ],
        center: [Math.random() * 640, Math.random() * 480] as [number, number],
      }))

      // Color dominante que cambia
      const dominantColor: [number, number, number] = [
        100 + Math.random() * 155,
        100 + Math.random() * 155,
        100 + Math.random() * 155,
      ]

      setData({
        timestamp: Date.now(),
        people_count: peopleCount,
        objects,
        movement_intensity: movementIntensity,
        dominant_color: dominantColor,
      })
    }, 200) // Actualizar cada 200ms

    return () => clearInterval(interval)
  }, [isActive])

  return data
}

export default function VisualActivityMonitor() {
  const [isActive, setIsActive] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const data = useDetectionSimulator(isActive)

  const resetSystem = () => {
    setIsActive(false)
    setTimeout(() => setIsActive(true), 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🧪 Monitor de Actividad Visual 3D</h1>
            <p className="text-slate-300">Sistema de detección visual con visualización reactiva en tiempo real</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setIsActive(!isActive)} variant={isActive ? "destructive" : "default"} size="lg">
              {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isActive ? "Pausar" : "Iniciar"}
            </Button>
            <Button onClick={resetSystem} variant="outline" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Panel de estadísticas */}
        <div className="w-80 p-6 border-r border-white/10 overflow-y-auto">
          <div className="space-y-4">
            {/* Estado del sistema */}
            <Card className="bg-black/40 border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  Estado del Sistema
                  <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "ACTIVO" : "INACTIVO"}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Timestamp:</span>
                  <span className="text-white font-mono">{new Date(data.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">FPS Simulado:</span>
                  <span className="text-green-400 font-mono">5.0</span>
                </div>
              </CardContent>
            </Card>

            {/* Métricas de detección */}
            <Card className="bg-black/40 border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white">Detección</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Personas:</span>
                  <Badge variant="outline" className="text-white">
                    {data.people_count}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Objetos totales:</span>
                  <Badge variant="outline" className="text-white">
                    {data.objects.length}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Movimiento:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-200"
                        style={{ width: `${data.movement_intensity * 100}%` }}
                      />
                    </div>
                    <span className="text-white text-xs">{(data.movement_intensity * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objetos detectados */}
            <Card className="bg-black/40 border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white">Objetos Detectados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {data.objects.length === 0 ? (
                    <p className="text-slate-400 text-sm">No hay objetos detectados</p>
                  ) : (
                    data.objects.map((obj) => (
                      <div key={obj.id} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                        <div>
                          <span className="text-white text-sm capitalize">{obj.type}</span>
                          <div className="text-xs text-slate-400">
                            Pos: ({obj.center[0].toFixed(0)}, {obj.center[1].toFixed(0)})
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {(obj.confidence * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Color dominante */}
            <Card className="bg-black/40 border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white">Color Dominante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-white/20"
                    style={{
                      backgroundColor: `rgb(${data.dominant_color[0]}, ${data.dominant_color[1]}, ${data.dominant_color[2]})`,
                    }}
                  />
                  <div className="text-sm">
                    <div className="text-white font-mono">
                      RGB({data.dominant_color[0].toFixed(0)}, {data.dominant_color[1].toFixed(0)},{" "}
                      {data.dominant_color[2].toFixed(0)})
                    </div>
                    <div className="text-slate-400">Influye en el color de los objetos 3D</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Escena 3D */}
        <div className="flex-1 relative">
          <Canvas camera={{ position: [8, 6, 8], fov: 60 }} className="bg-gradient-to-b from-slate-800 to-slate-900">
            <Environment preset="night" />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />

            {/* Objetos reactivos */}
            <ReactiveObject position={[0, 0, 0]} data={data} type="box" />
            <ReactiveObject position={[3, 0, 0]} data={data} type="sphere" />
            <ReactiveObject position={[-3, 0, 0]} data={data} type="cylinder" />

            {/* Plano base */}
            <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#1e293b" transparent opacity={0.8} roughness={0.8} />
            </mesh>

            {/* Grid de referencia */}
            <gridHelper args={[20, 20, "#334155", "#1e293b"]} position={[0, -1.99, 0]} />

            {/* Etiquetas flotantes */}
            <FloatingLabels data={data} />

            {/* Texto informativo */}
            <Text position={[0, 4, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
              Monitor de Actividad Visual 3D
            </Text>

            <Text position={[0, 3.3, 0]} fontSize={0.3} color="#94a3b8" anchorX="center" anchorY="middle">
              {data.people_count} personas detectadas • Movimiento: {(data.movement_intensity * 100).toFixed(0)}%
            </Text>

            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={3} maxDistance={20} />
          </Canvas>

          {/* Overlay de información */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
            <h3 className="font-semibold mb-2">Controles 3D</h3>
            <div className="text-sm space-y-1 text-slate-300">
              <div>• Click + Arrastrar: Rotar cámara</div>
              <div>• Scroll: Zoom</div>
              <div>• Click derecho + Arrastrar: Pan</div>
            </div>
          </div>

          {/* Indicador de estado */}
          <div className="absolute bottom-4 left-4">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-full ${
                isActive ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/20 border border-red-500/30"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
              <span className="text-white text-sm">{isActive ? "Sistema Activo" : "Sistema Pausado"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
