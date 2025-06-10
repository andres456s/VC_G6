import React, { useRef, useEffect, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

export default function Video360Scene() {
  const meshRef = useRef();
  const { gl } = useThree();

  // Memoizamos la creación del elemento video y del VideoTexture
  const { video, texture } = useMemo(() => {
    // 1) Crear un elemento <video> oculto
    const vid = document.createElement('video');
    vid.src = '/video360.mp4';   // ruta en public/
    vid.crossOrigin = 'Anonymous';
    vid.loop = true;
    vid.muted = true;            // algunos navegadores bloquean autoplay sin mute
    vid.playsInline = true;      // para iOS
    vid.play();

    // 2) Crear la VideoTexture
    const tex = new THREE.VideoTexture(vid);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.format = THREE.RGBFormat;

    return { video: vid, texture: tex };
  }, []);

  // Opcional: actualizar manualmente la textura cada frame
  useFrame(() => {
    if (texture) {
      texture.needsUpdate = true;
    }
  });

  useEffect(() => {
    // Limpiar al desmontar
    return () => {
      texture.dispose();
      video.pause();
      video.src = '';
    };
  }, [texture, video]);

  return (
    <>
      {/* Esfera invertida para video 360° */}
      <mesh ref={meshRef} scale={[-1, 1, 1]}>
        <sphereGeometry args={[10, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
      </mesh>

      {/* OrbitControls para navegar dentro del video */}
      <OrbitControls
        makeDefault
        enableZoom={true}
        enablePan={false}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
        minDistance={5}
        maxDistance={20}
      />
    </>
  );
}
