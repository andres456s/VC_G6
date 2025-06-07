import { useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
// Fragment Shader
const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  // Gradiente basado en posición UV
  vec3 colorA = vec3(0.5, 0.8, 1.0);
  vec3 colorB = vec3(1.0, 0.3, 0.6);
  vec3 gradient = mix(colorA, colorB, vUv.y);
  
  // Efecto de onda animado
  float wave = sin(vPosition.x * 5.0 + uTime * 2.0) * 0.1;
  gradient += wave;
  
  // Efecto wireframe simple
  float wire = step(0.98, mod(vUv.x * 20.0, 1.0)) + step(0.98, mod(vUv.y * 20.0, 1.0));
  wire = clamp(wire, 0.0, 1.0);
  
  // Mezcla final
  gl_FragColor = vec4(mix(gradient, vec3(0.0), wire), 1.0);
}
`

export function AnimatedSphere() {
  const materialRef = useRef()
  
  useFrame((state) => {
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 }
        }}
      />
    </mesh>
  )
}