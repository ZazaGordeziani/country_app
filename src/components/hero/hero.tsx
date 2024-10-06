import { PropsWithChildren } from "react";
import styles from "./hero.module.css";

const Hero: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* <div className="body"> */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>{children}</h1>
        <p className={styles.heroSubtitle}>
          Let us guide you to your next adventure!
        </p>
      </div>

      {/* </div> */}
    </>
  );
};

export default Hero;
