// import CountryInfo from "@/pages/home/components/country-info/countryInfo";
import styles from "./countryDetails.module.css";
import { CountriesList } from "@/pages/home/components/country-card/reducer/state";
import { useParams } from "react-router-dom";
// import { isGeneratorObject } from "util/types";

const CountryDetailedInfo = () => {
  const { id } = useParams();
  // console.log(params);

  const CountryDetails = CountriesList.find((country) => country.id === id);

  const CountryExsit = !CountryDetails;
  if (CountryExsit) {
    return <div> Article not found</div>;
  }

  // console.log(CountryDetails);

  const { nameKa, nameEn, capital, population } = CountryDetails;

  return (
    <div className={styles.details}>
      <h3>Country: {nameKa || nameEn}</h3>
      <h3>Capital: {capital}</h3>
      <h3>Population: {population}</h3>
    </div>
  );
};

export default CountryDetailedInfo;
