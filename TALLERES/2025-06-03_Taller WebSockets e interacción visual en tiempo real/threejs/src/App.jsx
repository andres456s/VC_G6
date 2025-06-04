import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls, Edges } from "@react-three/drei";
// Cubo que cambia posición y color
const Figure = ({ position, color }) => (
  <Box args={[1, 1, 1]} position={position}>
    <meshBasicMaterial color={color} />
    <Edges scale={1.05} threshold={15} color="black" />
  </Box>
);

// Muro detrás del cubo
const Wall = () => (
  <mesh position={[0, 0, -2]}>
    <boxGeometry args={[6, 4, 0.2]} />
    <meshStandardMaterial color="#b0b0b0" />
  </mesh>
);

const App = () => {
  const [position, setPosition] = useState([0, 0, 5]);
  const [color, setColor] = useState(0x00ff00);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Datos recibidos:", data); // Verifica aquí que cambia la posición
      if (data) setPosition([data.x,data.y,5]);
      if (data.color) setColor(data.color);
    };
    return () => socket.close();
  }, []);
console.log("Posición actual:", position);
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
    
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Wall />
      <Figure position={[Math.round(position[0]),position[1], 0]} color={color} />
      <OrbitControls />
    </Canvas>
  );
};

export default App;
