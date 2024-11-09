import React, { useReducer, MouseEvent, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CountryName from "@/pages/home/components/country-card/country-name/countryName";
import CountryFlag from "@/pages/home/components/country-card/country-flag/country-flag";
import Vote from "@/pages/home/components/country-card/vote";
import Sorting from "@/pages/home/components/country-card/sorting";
import CountryCreateForm from "@/pages/home/components/country-card/country-create-form/country-create-from";
import {
  countriesReducer,
  CountryReducerInitialState,
} from "@/pages/home/components/country-card/reducer/reducer";
import styles from "./card.module.css";
import axios from "axios";

const text = {
  moreInfoKa: "დამატებითი ინფორმაცია",
  moreInfoEn: "More Info",
  deleteKa: "წაშლა",
  deleteEn: "Delete",
  undoKa: "დაბრუნება",
  undoEn: "Undo",
  editKa: "რედაქტირება",
  editEn: "Edit",
};

const Card: React.FC = () => {
  const { lang } = useParams();
  const [formValidationErrorMsg, setFormValidationErrorMsg] = useState("");
  const [countriesList, dispatch] = useReducer(countriesReducer, []);
  const [editCountry, setEditCountry] = useState<
    CountryReducerInitialState[0] | null
  >(null); // State to manage the edit form

  // Fetch countries from the server on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/countries") // Fetch countries inside useEffect
      .then((response) => {
        const recievedCountries = response.data;
        dispatch({
          type: "set_Data",
          payload: recievedCountries, // Pass the countries array directly
        });
      })
      .catch((error) => {
        console.error("Error fetching countries:", error); // In case of error
      });
  }, []);

  useEffect(() => {
    console.log("Updated countriesList:", countriesList);
  }, [countriesList]);

  // Handle Upvote
  const handleCountryUpvote = (id: string) => () => {
    dispatch({ type: "upvote", payload: { id } });
  };

  // Handle Sorting
  const handleCountriesSortByLikes = (sortType: "asc" | "desc") => {
    dispatch({ type: "sort", payload: { sortType } });
  };

  // Handle Create Country
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

  // Handle Delete
  const handleCountryDelete = (e: MouseEvent, id: string) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/countries/${id}`)
      .then(() => {
        dispatch({ type: "delete", payload: { id } });
      })
      .catch((error) => {
        console.error("Error deleting country:", error);
      });
  };

  // Handle Edit
  const handleEditCountry = (country: CountryReducerInitialState[0]) => {
    setEditCountry(country); // Set the selected country to be edited
  };

  // Handle Update Country after Edit Form submission
  const handleUpdateCountry = async (
    updatedCountry: CountryReducerInitialState[0],
  ) => {
    try {
      // Send PUT request to update the country data on the server
      const response = await axios.put(
        `http://localhost:3000/countries/${updatedCountry.id}`,
        updatedCountry, // Send the updated country data to the server
      );

      // After successful update, dispatch the action to update the local state
      if (response.status === 200) {
        dispatch({ type: "update", payload: { country: updatedCountry } });
        setEditCountry(null); // Close the edit form after updating
      }
    } catch (error) {
      console.error("Error updating country:", error);
    }
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
            />
            <Vote
              onUpVote={handleCountryUpvote(country.id)}
              voteCount={country.vote}
              isDeleted={country.isDeleted}
            />
            <CountryFlag flag={country.flag} />
            {!country.isDeleted && (
              <div>
                <Link
                  className={styles.links}
                  to={`/${lang}/home/${country.id}`}
                >
                  <span>
                    {lang === "ka" ? text.moreInfoKa : text.moreInfoEn}
                  </span>
                </Link>
                <div className={styles.deleteEditButtons}>
                  <button
                    className={styles.delete}
                    onClick={(e) => handleCountryDelete(e, country.id)}
                  >
                    {lang === "ka" ? text.deleteKa : text.deleteEn}
                  </button>
                  <button
                    className={styles.edit}
                    onClick={() => handleEditCountry(country)}
                  >
                    {lang === "ka" ? text.editKa : text.editEn}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {editCountry && (
        <div className={styles.editSection}>
          <h3>{lang === "ka" ? "რედაქტირება" : "Edit Country"}</h3>
          <form
            className={styles.editWindow}
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateCountry(editCountry); // Handle update submission
            }}
          >
            <input
              type="text"
              value={editCountry.nameKa}
              onChange={(e) =>
                setEditCountry({ ...editCountry, nameKa: e.target.value })
              }
              placeholder="Georgian Name"
            />
            <input
              type="text"
              value={editCountry.nameEn}
              onChange={(e) =>
                setEditCountry({ ...editCountry, nameEn: e.target.value })
              }
              placeholder="English Name"
            />
            <input
              type="text"
              value={editCountry.flag}
              onChange={(e) =>
                setEditCountry({ ...editCountry, flag: e.target.value })
              }
              placeholder="Flag URL"
            />
            <input
              type="text"
              value={editCountry.capital}
              onChange={(e) =>
                setEditCountry({ ...editCountry, capital: e.target.value })
              }
              placeholder="Capital"
            />
            <input
              type="text"
              value={editCountry.population}
              onChange={(e) =>
                setEditCountry({ ...editCountry, population: e.target.value })
              }
              placeholder="Population"
            />
            <div className={styles.editButtons}>
              <button className={styles.button} type="submit">
                {lang === "ka" ? "შენახვა" : "Save"}
              </button>
              <button
                className={styles.button}
                type="button"
                onClick={() => setEditCountry(null)} // Close the edit form
              >
                {lang === "ka" ? "დახურვა" : "Close"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Card;
