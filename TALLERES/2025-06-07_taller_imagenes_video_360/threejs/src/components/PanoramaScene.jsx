// // src/components/PanoramaScene.jsx
// import React from 'react';
// import { useLoader } from '@react-three/fiber';
// import { TextureLoader, BackSide } from 'three';
// import { OrbitControls } from '@react-three/drei';

// export default function PanoramaScene() {
//   // Carga la textura panorámica
//   const texture = useLoader(TextureLoader, '/panorama.jpg');

//   return (
//     <>
//       {/* Esfera invertida para panorama */}
//       <mesh scale={[-1, 1, 1]}>  
//         <sphereGeometry args={[10, 60, 40]} />
//         <meshBasicMaterial map={texture} side={BackSide} />
//       </mesh>

//       {/* Controles de cámara para navegar dentro del panorama */}
//       <OrbitControls enableZoom={false} />
//     </>
//   );
// }

// src/components/PanoramaScene.jsx
// src/components/PanoramaScene.jsx
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, BackSide } from 'three';
import { OrbitControls } from '@react-three/drei';

export default function PanoramaScene() {
  const texture = useLoader(TextureLoader, '/panorama.jpg');

  return (
    <>
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[10, 60, 40]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>

      <OrbitControls
        makeDefault          // 1) Se registra como control por defecto
        enableZoom={true}    // 2) Activa zoom con rueda de ratón
        enablePan={true}     // 2) Activa desplazamiento con botón medio
        rotateSpeed={0.5}    // Velocidad de giro
        zoomSpeed={0.6}      // Velocidad de zoom
        panSpeed={0.5}       // Velocidad de paneo
        minDistance={2}      // Distancia mínima al centro
        maxDistance={20}     // Distancia máxima al centro
      />
    </>
  );
}

