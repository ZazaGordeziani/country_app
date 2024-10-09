import React from "react";
import styles from "./country-flag.module.css";

const CountryFlag: React.FC<{ flag: string }> = ({ flag }) => {
  return (
    // <div className={styles.flag}>
    <img className={styles.flag} src={flag} alt="" /> // </div>
  );
};

export default CountryFlag;
