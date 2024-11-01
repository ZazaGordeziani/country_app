import React, { useReducer, MouseEvent, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CountryName from "@/pages/home/components/country-card/country-name/countryName";
import CountryFlag from "@/pages/home/components/country-card/country-flag/country-flag";
import Vote from "@/pages/home/components/country-card/vote";
import Sorting from "@/pages/home/components/country-card/sorting";
import CountryCreateForm from "@/pages/home/components/country-card/country-create-form/country-create-from";
import { CountriesList } from "@/pages/home/components/country-card/reducer/state";
import {
  countriesReducer,
  CountryReducerInitialState,
} from "@/pages/home/components/country-card/reducer/reducer";
import styles from "./card.module.css";
const text = {
  moreInfoKa: "დამატებითი ინფორმაცია",
  moreInfoEn: "More Info",
  deleteKa: "წაშლა",
  deleteEn: "Delete",
  undoKa: "დაბრუნება",
  undoEn: "Undo",
};

const Card: React.FC = () => {
  const { lang } = useParams();
  // const { currentLang } = useOutletContext<OutletContext>();
  const [formValidationErrorMsg, setFormValidationErrorMsg] = useState("");
  const [countriesList, dispatch] = useReducer(countriesReducer, CountriesList);

  console.log(lang);
  // console.log(currentLang[0]);

  const handleCountryUpvote = (id: string) => () => {
    dispatch({ type: "upvote", payload: { id } });
  };

  const handleCountriesSortByLikes = (sortType: "asc" | "desc") => {
    dispatch({ type: "sort", payload: { sortType } });
  };

  const handleCreateCountry = (countryFields: {
    nameKa: string;
    nameEn: string;
    flag: string;
  }) => {
    if (
      !countryFields.nameKa ||
      !countryFields.nameEn ||
      countryFields.nameEn.length < 2 ||
      countryFields.nameKa.length < 2
    ) {
      setFormValidationErrorMsg(
        "Country name should consist of more than 2 letters!!!",
      );
    }
    dispatch({ type: "create", payload: { countryFields } });
  };

  const handleCountryDelete = (e: MouseEvent, id: string) => {
    e.preventDefault();
    dispatch({ type: "delete", payload: { id } });
  };

  const handleUndoDelete = (country: CountryReducerInitialState[0]) => {
    dispatch({ type: "undo", payload: { country } });
  };

  return (
    <>
      <Sorting
        onSortAsc={() => handleCountriesSortByLikes("asc")}
        onSortDesc={() => handleCountriesSortByLikes("desc")}
      />
      <CountryCreateForm
        errorMsg={formValidationErrorMsg}
        onCountryCreate={handleCreateCountry}
      />
      <div className={styles.countryCard}>
        {countriesList.map((country) => (
          <div
            key={country.id}
            className={
              country.isDeleted ? styles.deleted : styles.countryDetails
            }
          >
            <CountryName
              name={lang === "ka" ? country.nameKa : country.nameEn}
            />{" "}
            {/* Language-based rendering */}
            <Vote
              onUpVote={handleCountryUpvote(country.id)}
              voteCount={country.vote}
            />
            <CountryFlag flag={country.flag} />
            {!country.isDeleted && (
              <Link className={styles.links} to={`/home/${country.id}`}>
                <span>{lang === "ka" ? text.moreInfoKa : text.moreInfoEn}</span>
                <button
                  className={styles.delete}
                  onClick={(e) => handleCountryDelete(e, country.id)}
                >
                  {lang === "ka" ? text.deleteKa : text.deleteEn}
                </button>
              </Link>
            )}
            {country.isDeleted && (
              <button
                className={styles.undoButton}
                onClick={() => handleUndoDelete(country)}
              >
                {lang === "ka" ? text.undoKa : text.undoEn}
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
