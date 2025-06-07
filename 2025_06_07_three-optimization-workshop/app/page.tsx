"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats, Environment } from "@react-three/drei"
import { Suspense } from "react"
import OptimizedScene from "@/components/optimized-scene"
import ControlPanel from "@/components/control-panel"
import { OptimizationProvider } from "@/contexts/optimization-context"

export default function Home() {
  return (
    <OptimizationProvider>
      <div className="w-full h-screen relative">
        <Canvas
          shadows
          camera={{ position: [10, 10, 10], fov: 75 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <OptimizedScene />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            <Stats />
          </Suspense>
        </Canvas>

        <ControlPanel />

        {/* Información del taller */}
        <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg max-w-md">
          <h1 className="text-xl font-bold mb-2">🚀 Taller 59 - Optimización Visual</h1>
          <p className="text-sm mb-2">Técnicas implementadas:</p>
          <ul className="text-xs space-y-1">
            <li>✅ LOD (Level of Detail)</li>
            <li>✅ Geometría Low Poly</li>
            <li>✅ Materiales optimizados</li>
            <li>✅ Culling inteligente</li>
            <li>✅ Luces eficientes</li>
            <li>✅ Instancing</li>
          </ul>
        </div>
      </div>
    </OptimizationProvider>
  )
}
