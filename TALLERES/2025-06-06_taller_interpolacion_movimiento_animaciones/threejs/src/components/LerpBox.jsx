import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useState } from 'react'

export default function LerpBox() {
  const meshRef = useRef()
  const [t, setT] = useState(0)

  const start = new THREE.Vector3(-2, 0, 0)
  const end = new THREE.Vector3(2, 0, 0)
  const currentPosition = new THREE.Vector3()

  useFrame((state, delta) => {
    const newT = Math.min(t + delta * 0.5, 1) // avanza a velocidad constante
    setT(newT)

    currentPosition.lerpVectors(start, end, newT)
    meshRef.current.position.copy(currentPosition)
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* puntos visibles */}
      <mesh position={start}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position={end}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  )
}
