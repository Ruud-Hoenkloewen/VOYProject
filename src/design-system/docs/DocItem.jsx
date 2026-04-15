import Typography from "../primitives/Typography/Typography";
import styles from "./DocItem.module.css";

export default function DocItem({ name, description, implementation, children }) {
  return (
    <article className={styles.item}>
      <div className={styles.info}>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="caption">{description}</Typography>
      </div>
      <div className={styles.codeCol}>
        <Typography variant="label">Implementacion</Typography>
        <code className={styles.code}>{implementation}</code>
      </div>
      <div className={styles.preview}>{children}</div>
    </article>
  );
}
