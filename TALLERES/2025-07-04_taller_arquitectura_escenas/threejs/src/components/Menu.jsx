import { Link } from "react-router-dom"

export default function Menu() {
  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Menú Principal</h1>
      <Link to="/juego"><button>Ir al Juego</button></Link>
      <br /><br />
      <Link to="/creditos"><button>Créditos</button></Link>
    </div>
  )
}
