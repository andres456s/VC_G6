import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}






// import React, { useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Leva } from 'leva';
// import PanoramaScene from './components/PanoramaScene';
// import Video360Scene from './components/Video360Scene';

// export default function App() {
//   const [sceneType, setSceneType] = useState('image'); // 'image' | 'video'

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
//       {/* Panel de botones encima del Canvas */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 20,
//           left: 20,
//           zIndex: 10,
//           display: 'flex',
//           gap: '8px',
//         }}
//       >
//         <button
//           onClick={() => setSceneType('image')}
//           style={{
//             padding: '8px 12px',
//             background: sceneType === 'image' ? '#444' : '#888',
//             color: 'white',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           Imagen 360°
//         </button>
//         <button
//           onClick={() => setSceneType('video')}
//           style={{
//             padding: '8px 12px',
//             background: sceneType === 'video' ? '#444' : '#888',
//             color: 'white',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           Vídeo 360°
//         </button>
//       </div>

//       {/* Leva para cualquier control adicional */}
//       <Leva collapsed={false} />

//       <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
//         {sceneType === 'image' ? (
//           <PanoramaScene />
//         ) : (
//           <Video360Scene />
//         )}
//       </Canvas>
//     </div>
//   );
// }
