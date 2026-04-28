import Input from "../../primitives/Input/Input";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar bandas, lugares, fechas..."
}) {
  return (
    <div className={styles.root} style={{ position: "relative" }}>
      
      {/* ICONO */}
      <span className={styles.icon} aria-hidden>
        🔍
      </span>

      {/* INPUT */}
      <Input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* BOTÓN LIMPIAR */}
      {value && (
        <span
          onClick={() => onChange("")}
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