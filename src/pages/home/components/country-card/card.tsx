import React, { useReducer, MouseEvent, useState } from "react";
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
import {
  createCountry,
  deleteCountry,
  getCountries,
  updateCountry,
} from "@/api/countries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  >(null);

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["countries-list"],
    queryFn: getCountries,
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (countries) => {
      dispatch({ type: "set_Data", payload: countries });
    },
  });

  console.log(data);
  // console.log(isLoading);
  // console.log(isError);
  // console.log(countriesList);
  const queryClient = useQueryClient();
  const { mutate: updateCountryMutate } = useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries(["countries-list"]);
    },
    onError: (error) => {
      console.error("Error deleting country:", error);
    },
  });

  const handleCountryUpvote = (id: string) => () => {
    dispatch({ type: "upvote", payload: { id } });
  };

  const handleCountriesSortByLikes = (sortType: "asc" | "desc") => {
    dispatch({ type: "sort", payload: { sortType } });
  };

  // const handleCreateCountry = (countryFields: {
  //   nameKa: string;
  //   nameEn: string;
  //   flag: string;
  // }) => {
  //   if (
  //     !countryFields.nameKa ||
  //     !countryFields.nameEn ||
  //     countryFields.nameEn.length < 2 ||
  //     countryFields.nameKa.length < 2
  //   ) {
  //     setFormValidationErrorMsg(
  //       "Country name should consist of more than 2 letters!!!",
  //     );
  //   }
  //   dispatch({ type: "create", payload: { countryFields } });
  // };

  const { mutate: createCountryMutate } = useMutation({
    mutationFn: createCountry, // Assume createCountry is your POST function
    onSuccess: () => {
      queryClient.invalidateQueries(["countries-list"]); // Invalidate and refetch countries list
    },
    onError: (error) => {
      console.error("Error creating country:", error);
    },
  });

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
      return;
    }

    createCountryMutate(countryFields); // Call the mutation function
  };

  const handleCountryDelete = (e: MouseEvent, id: string) => {
    e.preventDefault();
    updateCountryMutate({ id });
    dispatch({ type: "delete", payload: { id } });
  };

  const handleEditCountry = (country: CountryReducerInitialState[0]) => {
    setEditCountry(country);
  };

  const { mutate: updateCountryMutation } = useMutation({
    mutationFn: updateCountry,
    onSuccess: () => {
      console.log("Country updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating country:", error);
    },
  });

  const handleUpdateCountry = async (
    updatedCountry: CountryReducerInitialState[0],
  ) => {
    updateCountryMutation({ id: updatedCountry.id, payload: updatedCountry });
    dispatch({ type: "update", payload: { country: updatedCountry } });
    setEditCountry(null);
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
        {isLoading ? "loading......" : null}
        {isError ? "Error" : null}
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
            {/* edit window is displayed after country card on which the edit is clicked */}
            {editCountry && editCountry.id === country.id && (
              <div className={styles.editSection}>
                <h3>{lang === "ka" ? "რედაქტირება" : "Edit Country"}</h3>
                <form
                  className={styles.editWindow}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateCountry(editCountry);
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
                      setEditCountry({
                        ...editCountry,
                        capital: e.target.value,
                      })
                    }
                    placeholder="Capital"
                  />
                  <input
                    type="text"
                    value={editCountry.population}
                    onChange={(e) =>
                      setEditCountry({
                        ...editCountry,
                        population: e.target.value,
                      })
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
