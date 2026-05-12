import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./EditorialHeader.module.css";

/**
 * COMPONENTE: EditorialHeader
 * Header editorial compartido — scroll-aware con hide/show por dirección.
 *
 * Comportamiento (inspirado en Warp Records):
 *  - Scrolleando ABAJO → se oculta completamente (translateY -100%)
 *  - Scrolleando ARRIBA o en el TOP → reaparece
 *  - Paleta monocromática suave: sin neon, sin blur, solo negro/blanco/gris.
 */
export default function EditorialHeader({ ctaLabel = "ACCEDER", ctaTo = "/login" }) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 10) {
        // Siempre visible en el tope
        setHidden(false);
      } else if (delta > 6) {
        // Scrolleando abajo: ocultar
        setHidden(true);
      } else if (delta < -6) {
        // Scrolleando arriba: mostrar
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ""}`}>
      {/* LOGO */}
      <Link to="/" className={styles.logo}>
        <span className={styles.logoBox}>V</span>
        <span className={styles.logoText}>VOY PROJECT</span>
      </Link>

      {/* NAV LINKS */}
      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
          }
        >
          INICIO
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
          }
        >
          EXPLORAR EVENTOS
        </NavLink>
        <NavLink
          to="/artistas"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
          }
        >
          ARTISTAS
        </NavLink>
        <NavLink
          to="/info"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
          }
        >
          INFO
        </NavLink>
      </nav>

      {/* CTA */}
      <Link to={ctaTo} className={styles.cta}>
        {ctaLabel}
      </Link>
    </header>
  );
}
