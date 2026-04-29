import Button from "../../primitives/Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.root}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>V</span>
        <strong>VOY PROJECT</strong>
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <nav className={styles.actions}>
        <Button variant="ghost">Ingresar</Button>
        <Button>Crear Evento</Button>
      </nav>
    </header>
  );
}
