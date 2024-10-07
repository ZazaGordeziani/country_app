import React from "react";
import styles from "./countryName.module.css";

const CountryName: React.FC<{ name: string }> = ({ name }) => {
  return <h2 className={styles.name}>Name: {name}</h2>;
};

export default CountryName;
