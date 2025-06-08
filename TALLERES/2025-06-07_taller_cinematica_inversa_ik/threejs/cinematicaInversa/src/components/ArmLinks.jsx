

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ArmLinks() {
  const segmentCount = 3;
  const length = 2;
  const thickness = 0.2;
  const refs = useRef(Array(segmentCount).fill().map(() => React.createRef()));
  const targetRef = useRef();

  
  useFrame(() => {
  if (!targetRef.current) return;
  
  // 1) posición objetivo en world coords
  const targetPos = new THREE.Vector3();
  targetRef.current.getWorldPosition(targetPos);

  // 2) para cada segmento, desde la punta hacia la base:
  for (let i = segmentCount - 1; i >= 0; i--) {
    const joint = refs.current[i].current;        // grupo de la articulación
    const endEff = refs.current[segmentCount - 1].current;  // grupo punta
    
    // a) posición de la articulación en world
    const jointPos = new THREE.Vector3();
    joint.getWorldPosition(jointPos);
    
    // b) posición de la punta en world
    const endPos = new THREE.Vector3();
    endEff.getWorldPosition(endPos);
    
    // c) vectores a alinear
    const toEnd = endPos.clone().sub(jointPos).normalize();
    const toTarget = targetPos.clone().sub(jointPos).normalize();
    
    // d) ángulo entre vectores
    const cosAngle = THREE.MathUtils.clamp(toEnd.dot(toTarget), -1, 1);
    let angle = Math.acos(cosAngle);             // en radianes
    
    // e) ejes de rotación (cruz de los dos vectores)
    const axis = toEnd.clone().cross(toTarget).normalize();
    if (axis.length() < 1e-3) continue;            // si casi colineales, saltamos
    
    // f) aplicar rotación al joint (en space local)
    const quat = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    joint.quaternion.multiply(quat);
  }
});

  return (
    <group>
      <group ref={refs.current[0]}>
        <mesh position={[length / 2, 0, 0]}>
          <boxGeometry args={[length, thickness, thickness]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <group ref={refs.current[1]} position={[length, 0, 0]}>
          <mesh position={[length / 2, 0, 0]}>
            <boxGeometry args={[length, thickness, thickness]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
          <group ref={refs.current[2]} position={[length, 0, 0]}>
            <mesh position={[length / 2, 0, 0]}>
              <boxGeometry args={[length, thickness, thickness]} />
              <meshStandardMaterial color="lightblue" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
