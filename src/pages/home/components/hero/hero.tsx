import { PropsWithChildren } from "react";
import styles from "./hero.module.css";

const Hero: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.hero}>{children}</div>
    </>
  );
};

export default Hero;
