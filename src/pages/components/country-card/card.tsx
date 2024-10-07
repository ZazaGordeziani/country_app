import { PropsWithChildren } from "react";
import styles from "./card.module.css";

const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.countryCard}>
      <img
        className={styles.flag}
        src="https://cdn.britannica.com/19/7219-050-7D2C062F/Flag-Nicaragua.jpg"
        alt="Nicaragua Flag"
      />
      <div className={styles.countryDetails}>
        {children}
        {/* <p>Capital: {capital}</p>
        <p>Population: {population}</p> */}
      </div>
    </div>
  );
};

export default Card;
