import { PropsWithChildren } from "react";
import styles from "./card.module.css";
// import CountryFlag from "@/pages/home/components/country-card/country-flag/country-flag";

// import { CountriesList } from "@/pages/home/static/dummy-data";
const Card: React.FC<PropsWithChildren<{ flag: string }>> = ({
  // flag,
  children,
}) => {
  return (
    <div className={styles.countryCard}>
      {/* <img
        className={styles.flag}
        src="https://cdn.britannica.com/19/7219-050-7D2C062F/Flag-Nicaragua.jpg"
        alt="Nicaragua Flag"
      /> */}
      {/* <CountryFlag flag={CountriesList[0].imageSrc} /> */}
      {/* <div className={styles.flag}> */}
      {/* <div className={styles.flag}>
        <CountryFlag flag={flag} />
      </div> */}
      {/* </div> */}
      <div className={styles.countryDetails}>{children}</div>
    </div>
  );
};

export default Card;
