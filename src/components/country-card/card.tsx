import styles from "./card.module.css";

const country = {
  name: "Nicaragua",
  capital: "Managua",
  population: "6,359,689",
};

const Card = () => {
  return (
    <div className={styles.countryCard}>
      <img
        className={styles.flag}
        src="https://cdn.britannica.com/19/7219-050-7D2C062F/Flag-Nicaragua.jpg"
        alt="Nicaragua Flag"
      />
      <div className={styles.countryDetails}>
        <h2 className={styles.name}>Name: {country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
      </div>
    </div>
  );
};

export default Card;
