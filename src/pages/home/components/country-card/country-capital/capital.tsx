import React from "react";
import styles from "./capital.module.css";

export const CountryCapital: React.FC<{ capital: string }> = ({ capital }) => {
  return <h2 className={styles.capital}>Capital: {capital}</h2>;
};
