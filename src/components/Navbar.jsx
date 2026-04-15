import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      
      {/* Logo */}
      <div className="navbar-left">
        <span className="logo">UNDERTUC</span>
      </div>

      {/* Buscador */}
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Buscar bandas, lugares, fechas..."
          className="search-input"
        />
      </div>

      {/* Botones */}
      <div className="navbar-right">
        <button className="login-btn">INGRESAR</button>
        <button className="create-btn">CREAR EVENTO</button>
      </div>

    </header>
  );
}