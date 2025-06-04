import React, { useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Box,
  Sphere,
  Edges,
  PerspectiveCamera,
  OrthographicCamera,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import "./App.css";

// Muestra info de la cámara, incluyendo posición y rotación (NUEVO)
function CameraInfo({ cameraType, params }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 20,
        background: "rgba(20,20,20,0.8)",
        color: "white",
        padding: 16,
        borderRadius: 10,
        fontFamily: "monospace",
        fontSize: 16,
        minWidth: 260,
        lineHeight: 1.5,
      }}
    >
      <b>Tipo de cámara:</b> {cameraType} <br />
      {cameraType === "Perspectiva" ? (
        <>
          <b>fov:</b> {params.fov} <br />
          <b>aspect:</b> {params.aspect?.toFixed(2)} <br />
          <b>near:</b> {params.near} <br />
          <b>far:</b> {params.far} <br />
        </>
      ) : (
        <>
          <b>left:</b> {params.left} <br />
          <b>right:</b> {params.right} <br />
          <b>top:</b> {params.top} <br />
          <b>bottom:</b> {params.bottom} <br />
          <b>near:</b> {params.near} <br />
          <b>far:</b> {params.far} <br />
        </>
      )}
      {/* Posición y rotación SIEMPRE visibles */}
      <b>posición:</b> [{params.position?.map((c) => c.toFixed(2)).join(", ")}] <br />
      <b>rotación:</b> [{params.rotation?.map((c) => c.toFixed(2)).join(", ")}] <br />
    </div>
  );
}

// Figuras distribuidas en el espacio
function DistributedObjects() {
  return (
    <>
      <group>
        <Box position={[-2, 0, -4]}>
          <meshStandardMaterial color="hotpink" />
          <Edges scale={1.01} threshold={15} color="black" />
        </Box>
        <Box position={[2, 0, -7]}>
          <meshStandardMaterial color="deepskyblue" />
          <Edges scale={1.01} threshold={15} color="black" />
        </Box>
        <Box position={[0, 0, -10]}>
          <meshStandardMaterial color="limegreen" />
          <Edges scale={1.01} threshold={15} color="black" />
        </Box>
      </group>
      <group>
        <Sphere position={[-4, 0, -6]} args={[0.7, 32, 32]}>
          <meshStandardMaterial color="orange" />
        </Sphere>
        <Sphere position={[4, 0, -12]} args={[0.9, 32, 32]}>
          <meshStandardMaterial color="purple" />
        </Sphere>
        <Sphere position={[0, 1.2, -8]} args={[0.5, 32, 32]}>
          <meshStandardMaterial color="gold" />
        </Sphere>
      </group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1, -7]}>
        <planeGeometry args={[24, 20]} />
        <meshStandardMaterial color="#f6f6f6" />
      </mesh>
    </>
  );
}

// Cámara intercambiable
const CameraSwitcher = React.forwardRef(function CameraSwitcher(
  { usePerspective },
  ref
) {
  const aspect = window.innerWidth / window.innerHeight;
  const orthoParams = {
    left: -aspect * 4,
    right: aspect * 4,
    top: 3.5,
    bottom: -3.5,
    near: 0.1,
    far: 50,
  };
  return usePerspective ? (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={[0, 4, 8]}
      fov={60}
      near={0.1}
      far={50}
    />
  ) : (
    <OrthographicCamera
      ref={ref}
      makeDefault
      position={[0, 4, 8]}
      {...orthoParams}
    />
  );
});

// AQUÍ es donde debes poner la lógica que actualiza las métricas de cámara
function CanvasLogic({
  usePerspective,
  setCameraParams,
  setPoint2D,
  cameraRef,
}) {
  const { camera, size } = useThree();
  useFrame(() => {
    // Actualiza métricas, posición y rotación de la cámara activas
    if (camera) {
      setCameraParams(
        usePerspective
          ? {
              fov: camera.fov,
              aspect: camera.aspect,
              near: camera.near,
              far: camera.far,
              position: [camera.position.x, camera.position.y, camera.position.z],
              rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
            }
          : {
              left: camera.left,
              right: camera.right,
              top: camera.top,
              bottom: camera.bottom,
              near: camera.near,
              far: camera.far,
              position: [camera.position.x, camera.position.y, camera.position.z],
              rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
            }
      );
      // Proyección del punto (2,0,2) a 2D
      const point3d = new THREE.Vector3(2, 0, 2);
      const projected = point3d.clone().project(camera);
      const x = ((projected.x + 1) / 2) * size.width;
      const y = ((-projected.y + 1) / 2) * size.height;
      setPoint2D({ x, y });
    }
  });
  return null;
}

export default function App() {
  const [usePerspective, setUsePerspective] = useState(true);
  const cameraRef = useRef();
  const [cameraParams, setCameraParams] = useState({});
  const [point2D, setPoint2D] = useState({ x: -100, y: -100 });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Botón para alternar cámara */}
      <button
        onClick={() => setUsePerspective((v) => !v)}
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          zIndex: 10,
          padding: 14,
          fontSize: 16,
          background: "#fff",
          borderRadius: 8,
          border: "1px solid #bbb",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          cursor: "pointer",
        }}
      >
        Cambiar a {usePerspective ? "Ortográfica" : "Perspectiva"}
      </button>
      {/* Info cámara */}
      <CameraInfo
        cameraType={usePerspective ? "Perspectiva" : "Ortográfica"}
        params={cameraParams}
      />
      <Canvas
        shadows
        style={{ width: "100vw", height: "100vh" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DistributedObjects />
        <CameraSwitcher ref={cameraRef} usePerspective={usePerspective} />
        <OrbitControls />
        {/* AQUÍ se pone la lógica de actualización de métricas */}
        <CanvasLogic
          usePerspective={usePerspective}
          setCameraParams={setCameraParams}
          setPoint2D={setPoint2D}
          cameraRef={cameraRef}
        />
      </Canvas>
      {/* BONUS: punto rojo proyectado a la pantalla */}
      <div
        style={{
          position: "absolute",
          left: point2D.x - 7,
          top: point2D.y - 7,
          width: 14,
          height: 14,
          background: "red",
          borderRadius: "50%",
          pointerEvents: "none",
          border: "2px solid #fff",
          boxShadow: "0 0 6px #000a",
          zIndex: 30,
        }}
        title="Proyección 2D de (2,0,2)"
      />
    </div>
  );
}