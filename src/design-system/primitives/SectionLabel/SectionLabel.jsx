import styles from "./SectionLabel.module.css";

/**
 * COMPONENTE: SectionLabel
 *
 * PROPÓSITO: Eyebrow editorial — la línea de sección con ♦ y la línea divisora
 * que aparece en toda la landing. Encapsula el patrón repetido en LandingPage.
 *
 * PROPS:
 *   label       {string}  — texto del label (ej: "QUÉ ES VOY")
 *   prefix      {string}  — símbolo antes del label (default: "♦")
 *   action      {node}    — elemento a la derecha (ej: un Link "VER TODOS >")
 *   animate     {bool}    — agrega data-animate para el scroll observer (default: true)
 *
 * USO:
 *   <SectionLabel label="EN CARTELERA" action={<Link to="/events">VER TODOS ›</Link>} />
 *   <SectionLabel label="QUÉ ES VOY" />
 */
export default function SectionLabel({
  label,
  prefix = "♦",
  action = null,
  animate = true,
}) {
  return (
    <div
      className={styles.wrapper}
      {...(animate ? { "data-animate": true } : {})}
    >
      <span className={styles.label}>
        {prefix} {label}
      </span>
      <div className={styles.divider} aria-hidden="true" />
      {action ? (
        <div className={styles.action}>{action}</div>
      ) : (
        <span className={styles.spacer} />
      )}
    </div>
  );
}
