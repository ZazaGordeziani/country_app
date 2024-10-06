import styles from "./subtitle.module.css";

export const HeroSubtitle: React.FC<{ subtitle: string }> = ({ subtitle }) => {
  return <p className={styles.heroSubtitle}>{subtitle}</p>;
};
