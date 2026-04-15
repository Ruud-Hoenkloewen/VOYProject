import styles from "./Chip.module.css";

export default function Chip({ active = false, children }) {
  return <span className={`${styles.chip} ${active ? styles.active : ""}`}>{children}</span>;
}
