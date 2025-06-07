"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useOptimization } from "@/contexts/optimization-context"
import OptimizedObject from "./optimized-object"
import InstancedObjects from "./instanced-objects"
import OptimizedLighting from "./optimized-lighting"
import * as THREE from "three"

export default function OptimizedScene() {
  const { settings, updateStats } = useOptimization()
  const { camera } = useThree()
  const sceneRef = useRef<THREE.Group>(null)

  // Generar posiciones para objetos
  const objectPositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < settings.maxObjects; i++) {
      positions.push([(Math.random() - 0.5) * 100, Math.random() * 10, (Math.random() - 0.5) * 100])
    }
    return positions
  }, [settings.maxObjects])

  // Calcular estadísticas cada frame
  useFrame(() => {
    if (!sceneRef.current) return

    let objectsRendered = 0
    let triangles = 0

    sceneRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.visible) {
        objectsRendered++
        if (child.geometry) {
          const geometry = child.geometry
          if (geometry.index) {
            triangles += geometry.index.count / 3
          } else if (geometry.attributes.position) {
            triangles += geometry.attributes.position.count / 3
          }
        }
      }
    })

    // Simular FPS basado en complejidad
    const estimatedFPS = Math.max(15, 60 - Math.floor(triangles / 1000))

    updateStats({
      objectsRendered,
      triangles: Math.floor(triangles),
      fps: estimatedFPS,
    })
  })

  return (
    <group ref={sceneRef}>
      {/* Iluminación optimizada */}
      <OptimizedLighting />

      {/* Plano base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Objetos individuales con LOD */}
      {objectPositions.slice(0, Math.floor(settings.maxObjects * 0.3)).map((position, index) => (
        <OptimizedObject key={`individual-${index}`} position={position as [number, number, number]} index={index} />
      ))}

      {/* Objetos instanciados */}
      {settings.useInstancing && (
        <InstancedObjects positions={objectPositions.slice(Math.floor(settings.maxObjects * 0.3))} />
      )}
    </group>
  )
}
