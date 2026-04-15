import styles from "./Typography.module.css";

const asMap = {
  display: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  label: "span",
  caption: "span",
};

export default function Typography({ variant = "body", as, children, className = "" }) {
  const Tag = as || asMap[variant] || "p";
  return <Tag className={`${styles.base} ${styles[variant] ?? styles.body} ${className}`}>{children}</Tag>;
}
