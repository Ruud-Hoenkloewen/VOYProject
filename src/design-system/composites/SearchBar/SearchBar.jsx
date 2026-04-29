import { useSearchParams } from "react-router-dom";
import Input from "../../primitives/Input/Input";
import styles from "./SearchBar.module.css";

/**
 * COMPONENTE: SearchBar
 * OBJETIVO: Barra de búsqueda global. 
 * FUNCIONAMIENTO: Lee y escribe el query parameter '?q=' en la URL para sincronizarse con la vista principal sin props.
 */
export default function SearchBar({ placeholder = "Buscar bandas, lugares, fechas..." }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      searchParams.set("q", value);
    } else {
      searchParams.delete("q");
    }
    // replace: true evita llenar el historial de navegación con cada pulsación de tecla
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className={styles.root}>
      <span className={styles.icon} aria-hidden>
        🔍
      </span>
      <Input 
        className={styles.input} 
        placeholder={placeholder} 
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
}
