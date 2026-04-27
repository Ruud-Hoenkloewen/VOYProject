import styles from "./Card.module.css";

export default function Card({ highlighted = false, children, className = "" }) {
  return (
    <article className={`${styles.card} ${highlighted ? styles.highlighted : ""} ${className}`}>
      {children}
    </article>
  );
}
