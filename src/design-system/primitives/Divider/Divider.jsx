import styles from "./Divider.module.css";

/**
 * COMPONENTE: Divider
 *
 * PROPÓSITO: Línea separadora horizontal con soporte de etiqueta central o lateral.
 * Variantes: 'subtle' (default), 'strong', 'accent' (lime), 'accent-fuchsia'
 *
 * USO:
 *   <Divider />
 *   <Divider label="O CONTINUÁ CON" />
 *   <Divider variant="accent" />
 */
export default function Divider({ label, variant = "subtle", className = "" }) {
  if (label) {
    return (
      <div className={`${styles.withLabel} ${className}`}>
        <span className={`${styles.line} ${styles[variant]}`} />
        <span className={styles.label}>{label}</span>
        <span className={`${styles.line} ${styles[variant]}`} />
      </div>
    );
  }

  return (
    <hr className={`${styles.divider} ${styles[variant]} ${className}`} />
  );
}
