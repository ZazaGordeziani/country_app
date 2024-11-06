// // import CountryInfo from "@/pages/home/components/country-info/countryInfo";
// import styles from "./countryDetails.module.css";
// import { CountriesList } from "@/pages/home/components/country-card/reducer/state";
// import { useParams } from "react-router-dom";
// // import { isGeneratorObject } from "util/types";

// const CountryDetailedInfo = () => {
//   const { id } = useParams();
//   // console.log(params);

//   const CountryDetails = CountriesList.find((country) => country.id === id);

//   const CountryExsit = !CountryDetails;
//   if (CountryExsit) {
//     return <div> Article not found</div>;
//   }

//   // console.log(CountryDetails);

//   const { nameKa, nameEn, capital, population } = CountryDetails;

//   return (
//     <div className={styles.details}>
//       <h3>Country: {nameKa || nameEn}</h3>
//       <h3>Capital: {capital}</h3>
//       <h3>Population: {population}</h3>
//     </div>
//   );
// };

// export default CountryDetailedInfo;

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
  const { id } = useParams(); // Get the country ID from the URL
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState<string | null>(null); // Error state for handling fetch errors

  useEffect(() => {
    if (id) {
      // Fetch the country data based on the id from the URL
      axios
        .get(`http://localhost:3000/countries/${id}`)
        .then((response) => {
          setCountry(response.data); // Set country details
        })
        .catch((error) => {
          setError("Country not found"); // Handle errors, such as country not found
          console.error("Error fetching country details:", error);
        });
    }
  }, [id]); // Re-fetch when `id` changes

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!country) {
    return <div>Loading...</div>; // Show loading state while fetching data
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
