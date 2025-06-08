import React, { useRef } from 'react';
import BackgroundPlane from './components/BackgroundPlane';
// import ArmLinks from './components/ArmLinks';
import DraggableSphere from './components/DraggableSphere';
// import LevaSphere from './components/LevaSphere';
import { OrbitControls } from '@react-three/drei';
import ArmWithCCD from './components/ArmWithCCD';

export default function Scene() {
  const sphereRef = useRef();
  return (
    <>
      <BackgroundPlane />
      {/* <ArmLinks /> */}
      <DraggableSphere ref={sphereRef} />
      <ArmWithCCD targetRef={sphereRef} />
      {/* <DraggableSphere /> */}
      {/* <LevaSphere /> */}
      <OrbitControls enableDamping dampingFactor={0.05} />
    </>
  );
}
