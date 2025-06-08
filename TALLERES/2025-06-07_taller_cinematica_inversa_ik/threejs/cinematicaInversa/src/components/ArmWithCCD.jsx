import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

export default function ArmWithCCD({ targetRef }) {
  const segmentCount = 3;
  const segmentLength = 2;
  const segmentThickness = 0.2;

  // Array de refs para cada articulación
  const refs = useRef(
    Array(segmentCount).fill().map(() => React.createRef())
  );

  // Estado para la línea que une base y objetivo
  const [points, setPoints] = useState([
    [0, 0, 0],
    [0, 0, 0],
  ]);

  useFrame(() => {
    // Esperar a que target y articulaciones existan
    if (!targetRef?.current) return;
    const joints = refs.current.map(r => r.current);
    const endEff = joints[segmentCount - 1];
    if (joints.some(j => !j) || !endEff) return;

    // Posición del objetivo en coordenadas mundiales
    const targetPos = new THREE.Vector3();
    targetRef.current.getWorldPosition(targetPos);

    // CCD: de la punta a la base
    for (let i = segmentCount - 1; i >= 0; i--) {
      const joint = joints[i];

      // Posición de la articulación y de la punta
      const jointPos = new THREE.Vector3();
      joint.getWorldPosition(jointPos);
      const endPos = new THREE.Vector3();
      endEff.getWorldPosition(endPos);

      // Vectores normalizados
      const toEnd = endPos.clone().sub(jointPos).normalize();
      const toTarget = targetPos.clone().sub(jointPos).normalize();

      // Calcular ángulo entre vectores
      const cos = THREE.MathUtils.clamp(toEnd.dot(toTarget), -1, 1);
      const angle = Math.acos(cos);

      // Eje de rotación
      const axis = toEnd.clone().cross(toTarget).normalize();
      if (axis.length() < 1e-3) continue;

      // Aplicar rotación en quaternion
      const quat = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      joint.quaternion.multiply(quat);
    }

    // Actualizar puntos de la línea
    const basePos = new THREE.Vector3();
    joints[0].getWorldPosition(basePos);

    setPoints([
      [basePos.x, basePos.y, basePos.z],
      [targetPos.x, targetPos.y, targetPos.z],
    ]);
  });

  return (
    <>
      {/* Brazo articulado con 3 segmentos */}
      <group ref={refs.current[0]}> {/* Base */}
        <mesh position={[segmentLength / 2, 0, 0]} castShadow>
          <boxGeometry args={[segmentLength, segmentThickness, segmentThickness]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        <group ref={refs.current[1]} position={[segmentLength, 0, 0]}> {/* Medio */}
          <mesh position={[segmentLength / 2, 0, 0]} castShadow>
            <boxGeometry args={[segmentLength, segmentThickness, segmentThickness]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>

          <group ref={refs.current[2]} position={[segmentLength, 0, 0]}> {/* Extremo */}
            <mesh position={[segmentLength / 2, 0, 0]} castShadow>
              <boxGeometry args={[segmentLength, segmentThickness, segmentThickness]} />
              <meshStandardMaterial color="lightblue" />
            </mesh>
          </group>
        </group>
      </group>

      {/* Línea entre base del brazo y objetivo */}
      <Line points={points} color="yellow" lineWidth={2} dashed={false} />
    </>
  );
}
