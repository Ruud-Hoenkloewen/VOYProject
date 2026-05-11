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
    <div className={styles.root} style={{ position: "relative" }}>
      
      {/* ICONO */}
      <span className={styles.icon} aria-hidden>
        🔍
      </span>

      <Input 
        className={styles.input} 
        placeholder={placeholder} 
        value={query}
        onChange={handleSearch}
      />

      {/* BOTÓN LIMPIAR */}
      {query && (
        <span
          onClick={() => {
            searchParams.delete("q");
            setSearchParams(searchParams, { replace: true });
          }}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#aaa",
            fontSize: "14px"
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
}