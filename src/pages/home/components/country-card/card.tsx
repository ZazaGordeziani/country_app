import { useState } from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";
import CountryName from "@/pages/home/components/country-card/country-name/countryName";
import CountryFlag from "@/pages/home/components/country-card/country-flag/country-flag";
import Vote from "@/pages/home/components/country-card/vote";
import Sorting from "@/pages/home/components/country-card/sorting";
// import { CountriesList } from "@/pages/home/static/dummy-data";

const Card: React.FC = () => {
  const [countriesList, setCountryList] = useState<
    {
      flag: string;
      name: string;
      capital: string;
      population: string;
      id: string;
      vote: number;
    }[]
  >([
    {
      flag: "https://cdn.britannica.com/19/7219-050-7D2C062F/Flag-Nicaragua.jpg",
      name: "Nicaragua",
      capital: "Managua",
      population: "6 942 006",
      id: "1",
      vote: 0,
    },

    {
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/640px-Flag_of_Mexico.svg.png",
      name: "Mexico",
      capital: "Mexico",
      population: "131 168 985",
      id: "2",
      vote: 0,
    },

    {
      flag: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
      name: "Ecuador ",
      capital: "Quito",
      population: "18 179 273",
      id: "3",
      vote: 0,
    },

    {
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Jamaica.svg/1200px-Flag_of_Jamaica.svg.png",
      name: "Jamaica",
      capital: "Kingston",
      population: "2 838 582",
      id: "4",
      vote: 0,
    },
  ]);

  const handleCountryUpvote = (id: string) => {
    return () => {
      const updatedCountriesList = countriesList.map((country) => {
        if (country.id === id) {
          return { ...country, vote: country.vote + 1 };
        }
        return { ...country };
      });

      setCountryList(updatedCountriesList);
    };
  };

  const handleCountriesSortByLikes = (type: "asc" | "desc") => {
    const copiedcountriesList = [...countriesList];
    if (type === "asc") {
      const sortedCountriesList = copiedcountriesList.sort((a, b) => {
        return a.vote - b.vote;
      });
      setCountryList(sortedCountriesList);
    }

    if (type === "desc") {
      const sortedCountriesList = copiedcountriesList.sort((a, b) => {
        return b.vote - a.vote;
      });

      setCountryList(sortedCountriesList);
    }
  };
  return (
    <>
      <Sorting
        onSortAsc={() => handleCountriesSortByLikes("asc")}
        onSortDesc={() => handleCountriesSortByLikes("desc")}
      />
      <div className={styles.countryCard}>
        {countriesList.map((country) => (
          <div key={country.id}>
            <div className={styles.countryDetails}>
              <CountryName name={country.name} />
              <Vote
                onUpVote={handleCountryUpvote(country.id)}
                voteCount={country.vote}
              />
              <CountryFlag flag={country.flag} />
              <Link className={styles.links} to={`/home/${country.id}`}>
                {" "}
                More Info
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
