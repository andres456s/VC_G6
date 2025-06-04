import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Particles = ({ count = 500, position = [0, 0, 0] }) => {
  const particlesRef = useRef()
  
  // Generación de atributos de partículas
  const [positions, sizes, colors] = useMemo(() => {
    // Arrays para almacenar datos de partículas
    const pos = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    
    // Color base (puedes modificarlo)
    const baseColor = new THREE.Color(0xff00ff)
    
    for (let i = 0; i < count; i++) {
      // Posiciones aleatorias alrededor del objeto
      const radius = 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      pos[i * 3] = position[0] + radius * Math.sin(theta) * Math.cos(phi) + (Math.random() - 0.5) * 2
      pos[i * 3 + 1] = position[1] + radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 2
      pos[i * 3 + 2] = position[2] + radius * Math.cos(theta) + (Math.random() - 0.5) * 2
      
      // Tamaños aleatorios
      sizes[i] = 0.1 + Math.random() * 0.3
      
      // Variación de color
      const colorVariation = baseColor.clone()
      colorVariation.offsetHSL(0, Math.random() * 0.3, Math.random() * 0.2 - 0.1)
      colorVariation.toArray(colors, i * 3)
    }
    
    return [pos, sizes, colors]
  }, [count, position])

  useFrame(({ clock }) => {
    // Animación básica de partículas
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1
      // Agrega más animaciones aquí si deseas
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={positions}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          itemSize={1}
          array={sizes}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          itemSize={3}
          array={colors}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        alphaTest={0.5}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default Particles