import styles from "./Button.module.css";

const variants = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
};

const sizes = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  ...props
}) {
  return (
    <button
      className={`${styles.button} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${fullWidth ? styles.fullWidth : ""}`}
      {...props}
    >
      <span className={styles.inner}>{children}</span>
    </button>
  );
}
