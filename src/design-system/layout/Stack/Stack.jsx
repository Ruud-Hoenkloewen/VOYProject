import styles from "./Stack.module.css";

export default function Stack({ gap = "md", children, className = "" }) {
  return (
    <div className={`${styles.stack} ${className}`} style={{ "--stack-gap": `var(--ds-space-${gapMap[gap] ?? "4"})` }}>
      {children}
    </div>
  );
}

const gapMap = {
  sm: "2",
  md: "4",
  lg: "6",
  xl: "8",
};
