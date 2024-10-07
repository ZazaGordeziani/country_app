import styles from "./hero-title.module.css";

const HeroTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h1 className={styles.heroTitle}>{title}</h1>;
};

export default HeroTitle;
