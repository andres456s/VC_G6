import { Link } from "react-router-dom"

export default function Creditos() {
  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Créditos</h1>
      <p>Creado por el grupo 6</p>
      <br />
      <Link to="/"><button>Volver al Menú</button></Link>
    </div>
  )
}
