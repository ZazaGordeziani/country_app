import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./countryDetails.module.css";

interface Country {
  id: string;
  nameKa: string;
  nameEn: string;
  capital: string;
  population: number;
  flag: string;
}
const CountryDetailedInfo = () => {
  const { id } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/countries/${id}`)
        .then((response) => {
          setCountry(response.data);
        })
        .catch((error) => {
          setError("Country not found");
          console.error("Error fetching country details:", error);
        });
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!country) {
    return <div>Loading...</div>;
  }

  const { nameKa, nameEn, capital, population, flag } = country;

  return (
    <div className={styles.details}>
      <h3>Country: {nameKa || nameEn}</h3>
      <h3>Capital: {capital}</h3>
      <h3>Population: {population}</h3>
      <img src={flag} alt={nameEn} className={styles.flag} />
    </div>
  );
};

export default CountryDetailedInfo;
