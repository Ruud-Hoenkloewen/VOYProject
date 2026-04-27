import styles from "./Badge.module.css";

const toneMap = {
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
};

export default function Badge({ tone = "success", children }) {
  return <span className={`${styles.badge} ${toneMap[tone] ?? toneMap.success}`}>{children}</span>;
}
