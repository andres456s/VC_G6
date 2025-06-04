

import { useMemo, useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Shape, ExtrudeGeometry } from 'three'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
const Particles = ({ count = 2000, position = [-10, -40, 0] }) => {
  const particlesRef = useRef()

  // Generación de datos iniciales
  const [positions, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const baseColor = new THREE.Color(0xff00ff)

    for (let i = 0; i < count; i++) {
      // Posiciones (mantenemos igual)
      const radius = 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      pos[i * 3] = position[0] + radius * Math.sin(theta) * Math.cos(phi) + (Math.random() - 0.5) * 2
      pos[i * 3 + 1] = position[1] + radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 2
      pos[i * 3 + 2] = position[2] + radius * Math.cos(theta) + (Math.random() - 0.5) * 2
      
      // Tamaño inicial aleatorio
      sizes[i] = 0.2 + Math.random() * 0.8
      
      // Colores (mantenemos igual)
      const colorVariation = baseColor.clone()
      colorVariation.offsetHSL(0, Math.random() * 0.3, Math.random() * 0.2 - 0.1)
      colorVariation.toArray(colors, i * 5)
    }
    
    return [pos, sizes, colors]
  }, [count, position])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const geometry = particlesRef.current.geometry
      const sizes = geometry.attributes.size.array
      const initialSizes = geometry.attributes.initialSize?.array || sizes.slice()
      
      // Guardar tamaños iniciales si es la primera vez
      if (!geometry.attributes.initialSize) {
        geometry.setAttribute('initialSize', new THREE.BufferAttribute(sizes.slice(), 1))
      }

      // Animación de tamaños
      const time = clock.getElapsedTime()
      for (let i = 0; i < count; i++) {
        // Variación senoidal con offset único por partícula
        const sizeVariation = (Math.sin(time * 2 + i) + Math.cos(time * 3 + i * 0.2)) * 0.4
        sizes[i] = initialSizes[i] + sizeVariation
      }

      // Actualizar el atributo en la GPU
      geometry.attributes.size.needsUpdate = true
      
      // Rotación opcional
      particlesRef.current.rotation.y = time * 0.1
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
          itemSize={5}
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
        size={0.9}
        vertexColors
        transparent
        alphaTest={0.5}
        sizeAttenuation={true}
      />
    </points>
  )
}

// Material del corazón con shaders
const EnergyMaterial = shaderMaterial(
  {
    time: 0,
    hover: 0,
    color1: new THREE.Color(0xff0033),
    color2: new THREE.Color(0x00ffff)
  },
  `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float hover;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float wave = sin(pos.x * 5.0 + time * 2.0) * 0.1 * hover;
    pos += normal * wave;
    
    pos.z += sin(time + pos.x * 2.0) * 0.2 * hover;
    pos.y += cos(time + pos.y * 2.0) * 0.2 * hover;
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float hover;
  uniform vec3 color1;
  uniform vec3 color2;
  
  void main() {
    float energyPattern = sin(vUv.x * 20.0 + time * 3.0) * cos(vUv.y * 20.0 + time * 2.0);
    vec3 baseColor = mix(color1, color2, energyPattern * 0.5 + 0.5);
    float glow = sin(time * 2.0 + vPosition.z * 5.0) * 0.3 + 0.7;
    float edge = smoothstep(0.3, 0.8, 1.0 - length(vUv - 0.5));
    
    vec3 finalColor = baseColor * glow + edge * 0.5;
    finalColor *= 1.0 + hover * 0.5;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
  `
)

extend({ EnergyMaterial })

const Heart = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef()
  const hover = useRef(false)
  const materialRef = useRef()

  // Geometría del corazón
  const geometry = useMemo(() => {
    const heartShape = new Shape()
    const x = 0, y = 0
    
    heartShape.moveTo(x + 5, y + 5)
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7)
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19)
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7)
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y)
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5)
    
    return new ExtrudeGeometry(heartShape, {
      depth: 2,
      bevelEnabled: true,
      bevelSize: 0.3,
      bevelThickness: 0.5
    })
  }, [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime()
      materialRef.current.hover = hover.current ? 1.0 : 0.0
    }
    meshRef.current.rotation.y += 0.002
  })

  return (
    <group position={position}>
      {/* Corazón principal */}
      <mesh 
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        onPointerOver={() => (hover.current = true)}
        onPointerOut={() => (hover.current = false)}
        castShadow
      >
        <primitive object={geometry} attach="geometry" />
        <energyMaterial
          ref={materialRef}
          key={EnergyMaterial.key}
          color1="#ff0066"
          color2="#00ffff"
          transparent
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Sistema de partículas */}
      <Particles count={200} position={[0, 0, 0]} />
    </group>
  )
}

export default Heart


