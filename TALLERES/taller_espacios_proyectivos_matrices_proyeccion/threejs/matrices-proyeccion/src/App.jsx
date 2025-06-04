// App.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function App() {
  const [cameraType, setCameraType] = useState('perspective')

  return (
    <div className="w-full h-screen relative">
      <Canvas>
        {/* Cámara condicional */}
        {cameraType === 'perspective' ? (
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
        ) : (
          <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />
        )}

        {/* Controles de navegación */}
        <OrbitControls />

        {/* Luces */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Objetos a diferentes profundidades */}
        <mesh position={[-2, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="tomato" />
        </mesh>
        <mesh position={[0, 0, -2]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="royalblue" />
        </mesh>
        <mesh position={[2, 0, -4]}>
          <coneGeometry args={[0.7, 1.2, 32]} />
          <meshStandardMaterial color="seagreen" />
        </mesh>
      </Canvas>

      {/* Controles de UI */}
      <div className="absolute top-4 left-4 space-x-2">
        <Button onClick={() => setCameraType('perspective')} variant={cameraType === 'perspective' ? 'default' : 'outline'}>
          Cámara Perspectiva
        </Button>
        <Button onClick={() => setCameraType('orthographic')} variant={cameraType === 'orthographic' ? 'default' : 'outline'}>
          Cámara Ortográfica
        </Button>
      </div>
    </div>
  )
}
