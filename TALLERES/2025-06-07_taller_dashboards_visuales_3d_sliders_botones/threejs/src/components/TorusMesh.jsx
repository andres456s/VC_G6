import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useControls, LevaPanel } from 'leva';

export default function TorusMesh() {
  const meshRef = useRef();

  // Controles con Leva: escala, color, auto-rotación y selección de material de 5 opciones
  const { scale, color, autoRotate, materialType } = useControls('Torus Controls', {
    scale: { value: 1, min: 0.1, max: 3, step: 0.01 },
    color: '#ffae00',
    autoRotate: false,
    materialType: {
      label: 'Material',
      options: {
        Standard: 'standard',
        Phong: 'phong',
        Lambert: 'lambert',
        Toon: 'toon',
        Basic: 'basic'
      },
      value: 'standard'
    }
  });

  // Rotación automática
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Elige el componente de material basado en materialType
  const materialProps = { color };
  let materialElement;
  switch (materialType) {
    case 'phong':
      materialElement = <meshPhongMaterial {...materialProps} shininess={100} />;
      break;
    case 'lambert':
      materialElement = <meshLambertMaterial {...materialProps} />;
      break;
    case 'toon':
      materialElement = <meshToonMaterial {...materialProps} gradientMap={null} />;
      break;
    case 'basic':
      materialElement = <meshBasicMaterial {...materialProps} />;
      break;
    case 'standard':
    default:
      materialElement = <meshStandardMaterial {...materialProps} metalness={0.3} roughness={0.7} />;
  }

  return (
    <>
      <LevaPanel fill />

      <mesh
        ref={meshRef}
        scale={[scale, scale, scale]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <torusGeometry args={[1, 0.4, 16, 100]} />
        {materialElement}
      </mesh>
    </>
  );
}
