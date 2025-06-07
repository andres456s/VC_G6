// src/components/DraggableSphere.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { DragControls } from '@react-three/drei';

export default function DraggableSphere() {
  const sphereRef = useRef();
  const { camera, gl } = useThree();
  // Guardamos en estado el array de objetos a arrastrar
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    // Cuando el mesh ya existe, lo añadimos al array
    if (sphereRef.current) {
      setObjects([sphereRef.current]);
    }
  }, [sphereRef.current]);

  return (
    <>
      <mesh ref={sphereRef} position={[3, 1, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>

      {/* DragControls espera: [objetos], cámara y canvas.domElement */}
      {objects.length > 0 && (
        <DragControls 
          args={[objects, camera, gl.domElement]} 
        />
      )}
    </>
  );
}
