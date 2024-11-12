// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import styles from "./countryDetails.module.css";

// interface Country {
//   id: string;
//   nameKa: string;
//   nameEn: string;
//   capital: string;
//   population: number;
//   flag: string;
// }
// const CountryDetailedInfo = () => {
//   const { id } = useParams();
//   const [country, setCountry] = useState<Country | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`http://localhost:3000/countries/${id}`)
//         .then((response) => {
//           setCountry(response.data);
//         })
//         .catch((error) => {
//           setError("Country not found");
//           console.error("Error fetching country details:", error);
//         });
//     }
//   }, [id]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!country) {
//     return <div>Loading...</div>;
//   }

//   const { nameKa, nameEn, capital, population, flag } = country;

//   return (
//     <div className={styles.details}>
//       <h3>Country: {nameKa || nameEn}</h3>
//       <h3>Capital: {capital}</h3>
//       <h3>Population: {population}</h3>
//       <img src={flag} alt={nameEn} className={styles.flag} />
//     </div>
//   );
// };

// export default CountryDetailedInfo;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCountry } from "@/api/countries"; // Import the existing function
import styles from "./countryDetails.module.css";

// Define the Country interface
// Define the Country interface
export interface Country {
  id: string;
  nameKa: string;
  nameEn: string;
  capital: string;
  population: number;
  flag: string;
  vote: number;
  isDeleted: boolean;
}

const CountryDetailedInfo = () => {
  const { id } = useParams<{ id: string }>(); // Get `id` from URL params

  // Check if 'id' exists before calling useQuery (Optional, you can also use 'enabled')
  // const queryKey = id ? ["country", id] : []; // Only set the queryKey if 'id' is available

  // Use `useQuery` to fetch a single country by ID
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery<Country>({
    queryKey: ["country", id], // The query key includes the `id`
    queryFn: () => getCountry(id!), // Fetch the country using the `getCountry` function
  });

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>"An error occurred"</div>;
  }

  if (!country) {
    return <div>Country not found</div>;
  }

  // Destructure the country data
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
