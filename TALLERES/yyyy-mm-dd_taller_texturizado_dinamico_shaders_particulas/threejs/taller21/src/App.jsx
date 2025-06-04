import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Heart from './components/Heart'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 25], fov: 45 }}
      >
        {/* Iluminación */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        {/* Corazón */}
        <Heart position={[0, 10, 0]} />
        
        {/* Controles */}
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={10}
          maxDistance={50}
        />
        
        {/* Ambiente */}
        <Environment preset="sunset" />
       
      </Canvas>
    </div>
  )
}


// import { Canvas } from '@react-three/fiber'
// import { OrbitControls, Environment, Grid } from '@react-three/drei'
// import Heart from './components/Heart'

// export default function App() {
//   return (
//     <div style={{ 
//       width: '100vw',
//       height: '100vh',
//       position: 'fixed', // Añade esto
//       top: 0,
//       left: 0,
//       overflow: 'hidden', // Evita scrollbars
//       background: '#000000' // Fondo temporal
//     }}>
//       <Canvas
//         shadows
//         camera={{
//           position: [0, 0, 18],
//           fov: 50,
//           near: 0.1,
//           far: 1000
//         }}
//       >
//         {/* Sistema de iluminación */}
//         <ambientLight intensity={0.8} color="#ffffff" />
//         <directionalLight
//           position={[10, 15, 10]}
//           intensity={1.5}
//           castShadow
//           shadow-mapSize={[2048, 2048]}
//           shadow-normalBias={0.05}
//         />

//         {/* Corazón líquido */}
//         <Heart position={[0, 0, 0]} />

//         {/* Controles de cámara */}
//         <OrbitControls
//           enableDamping
//           dampingFactor={0.05}
//           rotateSpeed={0.5}
//           minDistance={8}
//           maxDistance={25}
//           enablePan={false}
//         />

//         {/* Ambiente y ayudas visuales */}
//         <Environment preset="sunset" />
//         <Grid
//           args={[20, 20]}
//           position={[0, -4, 0]}
//           cellColor="#404040"
//           lineThickness={1}
//         />

//         {/* Efectos de fondo */}
//         <fog attach="fog" args={['#202030', 10, 25]} />
//       </Canvas>
//     </div>
//   )
// }