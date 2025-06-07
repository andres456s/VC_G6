import { Canvas } from '@react-three/fiber'
import { OrbitControls, useAnimations, useGLTF, Stats } from '@react-three/drei'
import { useEffect } from 'react'

function StegoModel() {
  const gltf = useGLTF('/models/stegosaurs_SStenops.gltf')
  const { actions, names } = useAnimations(gltf.animations, gltf.scene)

  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().fadeIn(0.5).play()
    }
  }, [actions, names])

  return <primitive object={gltf.scene} scale={0.01} />
}

export default function StegoScene() {
  return (
    <Canvas camera={{ position: [4, 2, 6], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Stats />
      <OrbitControls />
      <StegoModel />
    </Canvas>
  )
}
