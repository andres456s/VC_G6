import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { AnimatedSphere } from './components/AnimatedSphere'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        <AnimatedSphere />
        <axesHelper args={[5]} />
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}