
import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { DragControls } from '@react-three/drei';

const DraggableSphere = forwardRef((props, ref) => {
  const internalRef = useRef();
  const { camera, gl } = useThree();
  const [objects, setObjects] = useState([]);

  // Animación oscilatoria
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (internalRef.current) {
      internalRef.current.position.x = 3 + Math.sin(t) * 2;
      internalRef.current.position.y = 1 + Math.cos(t * 1.3) * 0.5;
    }
  });

  // Exponer el mesh y preparar DragControls
  useEffect(() => {
    if (internalRef.current) {
      setObjects([internalRef.current]);
      if (ref) ref.current = internalRef.current;
    }
  }, [internalRef, ref]);

  return (
    <>
      <mesh ref={internalRef} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
      {objects.length > 0 && (
        <DragControls
          args={[objects, camera, gl.domElement]}
          // opcional: onDragStart/End para desactivar OrbitControls
        />
      )}
    </>
  );
});

export default DraggableSphere;
