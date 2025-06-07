// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Leva } from 'leva';
// import Arm from './components/Arm';

// export default function App() {
//   return (
//     <>
//       <Leva collapsed={false} />
//       <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <Arm />
//       </Canvas>
//     </>
//   );
// }

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Leva } from 'leva';
import Arm from './components/Arm';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Leva collapsed={false} />
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Brazo articulado */}
        <group position={[-3, 0, 0]} scale={[0.5, 0.5, 0.5]}>
          <Arm />
        </group>

        <axesHelper args={[5]} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
