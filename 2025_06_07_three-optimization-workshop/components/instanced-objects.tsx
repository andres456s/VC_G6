"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useOptimization } from "@/contexts/optimization-context"
import * as THREE from "three"

interface InstancedObjectsProps {
  positions: number[][]
}

export default function InstancedObjects({ positions }: InstancedObjectsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const { camera } = useThree()
  const { settings } = useOptimization()

  const count = positions.length
  const tempObject = useMemo(() => new THREE.Object3D(), [])
  const tempMatrix = useMemo(() => new THREE.Matrix4(), [])

  // Colores para las instancias
  const colors = useMemo(() => {
    const colorArray = new Float32Array(count * 3)
    const colorPalette = [
      new THREE.Color("#ff9ff3"),
      new THREE.Color("#54a0ff"),
      new THREE.Color("#5f27cd"),
      new THREE.Color("#00d2d3"),
      new THREE.Color("#ff9f43"),
    ]

    for (let i = 0; i < count; i++) {
      const color = colorPalette[i % colorPalette.length]
      colorArray[i * 3] = color.r
      colorArray[i * 3 + 1] = color.g
      colorArray[i * 3 + 2] = color.b
    }

    return colorArray
  }, [count])

  useEffect(() => {
    if (!meshRef.current) return

    // Configurar colores de instancias
    meshRef.current.geometry.setAttribute("color", new THREE.InstancedBufferAttribute(colors, 3))
  }, [colors])

  useFrame((state) => {
    if (!meshRef.current) return

    let visibleCount = 0

    for (let i = 0; i < count; i++) {
      const [x, y, z] = positions[i]
      const distance = camera.position.distanceTo(new THREE.Vector3(x, y, z))

      // Culling por distancia
      if (settings.useCulling && distance > settings.renderDistance) {
        // Mover fuera de la vista
        tempObject.position.set(1000, 1000, 1000)
      } else {
        visibleCount++

        // Posición con animación
        tempObject.position.set(x, y + Math.sin(state.clock.elapsedTime + i * 0.1) * 0.3, z)

        // Rotación
        tempObject.rotation.y = state.clock.elapsedTime * 0.5 + i * 0.1

        // Escala basada en distancia (LOD simple)
        const scale = settings.useLOD ? Math.max(0.3, 1 - distance / settings.renderDistance) : 1
        tempObject.scale.setScalar(scale)
      }

      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(i, tempObject.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow={settings.useOptimizedLighting}
      receiveShadow={settings.useOptimizedLighting}
    >
      <boxGeometry args={[0.8, 0.8, 0.8]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
      <meshStandardMaterial
        vertexColors
        roughness={settings.useOptimizedMaterials ? 1 : 0.5}
        metalness={settings.useOptimizedMaterials ? 0 : 0.3}
      />
    </instancedMesh>
  )
}
