import React from 'react';

export default function BackgroundPlane() {
  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]}   // gira el plano para que quede horizontal
      position={[0, -1, 0]}             // baja un poco el plano bajo el origen
      receiveShadow                     // para que reciba sombras de otros objetos
    >
      <planeGeometry args={[20, 20]} />            {/* ancho × largo */}
      <meshStandardMaterial color="#444" />        {/* color neutro, puedes cambiar */}
    </mesh>
  );
}
