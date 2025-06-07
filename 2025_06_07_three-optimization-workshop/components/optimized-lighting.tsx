"use client"

import { useOptimization } from "@/contexts/optimization-context"

export default function OptimizedLighting() {
  const { settings } = useOptimization()

  if (settings.useOptimizedLighting) {
    // Iluminación optimizada: menos luces, más eficiente
    return (
      <>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
      </>
    )
  }

  // Iluminación completa: más luces, más costosa
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[10, 5, 10]} intensity={0.5} color="#4ecdc4" />
      <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
    </>
  )
}
