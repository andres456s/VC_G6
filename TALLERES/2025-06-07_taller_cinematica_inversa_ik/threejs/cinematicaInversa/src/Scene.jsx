import React from 'react';
import BackgroundPlane from './components/BackgroundPlane';
import ArmLinks from './components/ArmLinks';
import DraggableSphere from './components/DraggableSphere';
import LevaSphere from './components/LevaSphere';
import { OrbitControls } from '@react-three/drei';

export default function Scene() {
  return (
    <>
      <BackgroundPlane />
      <ArmLinks />
      <DraggableSphere />
      <LevaSphere />
      <OrbitControls enableDamping dampingFactor={0.05} />
    </>
  );
}
