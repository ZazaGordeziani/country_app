import styles from "./subtitle.module.css";

const HeroSubtitle: React.FC<{ subtitle: string }> = ({ subtitle }) => {
  return <p className={styles.heroSubtitle}>{subtitle}</p>;
};

export default HeroSubtitle;
