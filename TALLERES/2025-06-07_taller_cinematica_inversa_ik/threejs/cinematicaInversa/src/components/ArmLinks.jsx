import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';

export default function Arm() {
  const baseRef = useRef();
  const midRef = useRef();
  const endRef = useRef();
  const [points, setPoints] = useState([]);
  const maxPoints = 200;

  const {
    baseAngle = 0,
    midAngle = 0,
    endAngle = 0,
    animateSpeed = 1,
    animate = false
  } = useControls({
    baseAngle: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    midAngle: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    endAngle: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    animateSpeed: { value: 1, min: 0.1, max: 5, step: 0.1 },
    animate: false
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * animateSpeed;
    const a1 = animate ? Math.sin(t) : baseAngle;
    const a2 = animate ? Math.sin(t * 1.2) : midAngle;
    const a3 = animate ? Math.sin(t * 1.5) : endAngle;

    if (baseRef.current) baseRef.current.rotation.z = a1;
    if (midRef.current) midRef.current.rotation.z = a2;
    if (endRef.current) endRef.current.rotation.z = a3;

    const pos = new THREE.Vector3();
    endRef.current.getWorldPosition(pos);

    setPoints((prev) => {
      const next = [...prev, [pos.x, pos.y, pos.z]];
      if (next.length > maxPoints) next.shift();
      return next;
    });
  });

  return (
    <>
      <group ref={baseRef}>
        <mesh position={[1, 0, 0]}>
          <boxGeometry  args={[2, 0.2, 0.2]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <group ref={midRef} position={[2, 0, 0]}>
          <mesh position={[1, 0, 0]}>
            <boxGeometry  args={[2, 0.2, 0.2]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
          <group ref={endRef} position={[2, 0, 0]}>
            <mesh position={[1, 0, 0]}>
              <boxGeometry  args={[2, 0.2, 0.2]} />
              <meshStandardMaterial color="lightblue" />
            </mesh>
          </group>
        </group>
      </group>
      {points.length > 1 && <Line points={points} lineWidth={2} color="white" />}
    </>
  );
}
