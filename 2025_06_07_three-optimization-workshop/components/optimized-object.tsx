"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useOptimization } from "@/contexts/optimization-context"
import * as THREE from "three"

interface OptimizedObjectProps {
  position: [number, number, number]
  index: number
}

export default function OptimizedObject({ position, index }: OptimizedObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  const { settings } = useOptimization()

  // Crear geometrías con diferentes niveles de detalle
  const geometries = useMemo(() => {
    return {
      high: new THREE.SphereGeometry(1, 32, 32),
      medium: new THREE.SphereGeometry(1, 16, 16),
      low: new THREE.SphereGeometry(1, 8, 8),
    }
  }, [])

  // Crear materiales optimizados
  const materials = useMemo(() => {
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"]
    const color = colors[index % colors.length]

    return {
      optimized: new THREE.MeshBasicMaterial({ color }),
      standard: new THREE.MeshStandardMaterial({
        color,
        roughness: 0.5,
        metalness: 0.3,
      }),
    }
  }, [index])

  useFrame(() => {
    if (!meshRef.current) return

    const distance = camera.position.distanceTo(new THREE.Vector3(...position))

    // Culling por distancia
    if (settings.useCulling && distance > settings.renderDistance) {
      meshRef.current.visible = false
      return
    } else {
      meshRef.current.visible = true
    }

    // LOD - Level of Detail
    if (settings.useLOD) {
      if (distance < 10) {
        meshRef.current.geometry = geometries.high
      } else if (distance < 25) {
        meshRef.current.geometry = geometries.medium
      } else {
        meshRef.current.geometry = geometries.low
      }
    } else {
      meshRef.current.geometry = geometries.high
    }

    // Materiales optimizados
    if (settings.useOptimizedMaterials && distance > 15) {
      meshRef.current.material = materials.optimized
    } else {
      meshRef.current.material = materials.standard
    }

    // Animación sutil
    meshRef.current.rotation.y += 0.01
    meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + index) * 0.5
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow={settings.useOptimizedLighting}
      receiveShadow={settings.useOptimizedLighting}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  )
}
