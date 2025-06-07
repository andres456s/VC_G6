import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import Scene from './Scene';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Leva collapsed={false} />
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Scene />
      </Canvas>
    </div>
  );
}
