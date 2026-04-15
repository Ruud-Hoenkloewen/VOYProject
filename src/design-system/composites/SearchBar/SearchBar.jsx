import Input from "../../primitives/Input/Input";
import styles from "./SearchBar.module.css";

export default function SearchBar({ placeholder = "Buscar bandas, lugares, fechas..." }) {
  return (
    <div className={styles.root}>
      <span className={styles.icon} aria-hidden>
        🔍
      </span>
      <Input className={styles.input} placeholder={placeholder} />
    </div>
  );
}
