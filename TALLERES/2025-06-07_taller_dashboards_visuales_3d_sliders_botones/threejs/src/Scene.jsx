// src/Scene.jsx
import React from 'react';
import TorusMesh from './components/TorusMesh';
import { OrbitControls } from '@react-three/drei';

export default function Scene() {
  return (
    <>
      <TorusMesh />
      <OrbitControls enableDamping dampingFactor={0.1} />
    </>
  );
}
