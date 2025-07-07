import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box } from "@react-three/drei"
import { Link } from "react-router-dom"

export default function Juego() {
  return (
    <>
      <Canvas style={{ height: "100vh", background: "#111" }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]}>
          <meshStandardMaterial color="royalblue" />
        </Box>
        <OrbitControls />
      </Canvas>
      <div style={{ position: "absolute", top: 20, left: 20 }}>
        <Link to="/"><button>Volver al Menú</button></Link>
      </div>
    </>
  )
}
