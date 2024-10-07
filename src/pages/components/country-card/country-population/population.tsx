import React from "react";
import styles from "./population.module.css";

export const CountryPopulation: React.FC<{ population: string }> = ({
  population,
}) => {
  return <h2 className={styles.population}>Population: {population}</h2>;
};
