import { NavLink, Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Navbar.module.css";

/**
 * COMPONENTE: Navbar
 * Header de la página de exploración de eventos.
 * Incluye buscador, link "Explorar Eventos" que se ilumina en /events,
 * y acciones de autenticación (Ingresar / Crear Evento).
 * NO se usa en LandingPage — esta tiene su propio header editorial.
 */
export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.root}>
      <Link to="/" className={styles.brand}>
        <span className={styles.brandMark}>V</span>
        <strong>VOY PROJECT</strong>
      </Link>

      <div className={styles.search}>
        <SearchBar />
      </div>

      <nav className={styles.actions}>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `${styles.eventsLink} ${isActive ? styles.eventsLinkActive : ""}`
          }
        >
          Explorar Eventos
        </NavLink>
        
        {isAuthenticated ? (
          <>
            <span style={{ color: 'var(--ds-color-text-primary)', fontWeight: '500', marginRight: '8px' }}>
              Hola, {user.nombre || 'Usuario'}
            </span>
            <button onClick={handleLogout} className={styles.actionGhost} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.actionGhost}>Ingresar</Link>
            <Link to="/register" className={styles.actionPrimary}>Crear Evento</Link>
          </>
        )}
      </nav>
    </header>
  );
}
