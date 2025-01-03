import React, { useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import CountryName from "@/pages/home/components/country-card/country-name/countryName";
import CountryFlag from "@/pages/home/components/country-card/country-flag/country-flag";
// import Vote from "@/pages/home/components/country-card/vote";
// import Sorting from "@/pages/home/components/country-card/sorting";
import CountryCreateForm from "@/pages/home/components/country-card/country-create-form/country-create-from";
import {
  // countriesReducer,
  // countriesReducer,
  CountryReducerInitialState,
} from "@/pages/home/components/country-card/reducer/reducer";
import styles from "./card.module.css";
import {
  createCountry,
  deleteCountry,
  getCountries,
  // getDataForSorting,
  updateCountry,
  updateVote,
} from "@/api/countries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Sorting from "@/pages/home/components/country-card/sorting";
import Vote from "@/pages/home/components/country-card/vote";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useWindowSize } from "react-use";
import { useInfiniteQuery } from "@tanstack/react-query";

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
  const [editCountry, setEditCountry] = useState<
    CountryReducerInitialState[0] | null
  >(null);
  const { width } = useWindowSize();

  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = searchParams.get("sortType") as "like" | "-like";

  // Data fetching
  // const {
  //   data: countriesList = [],
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["countries-list", sortType],
  //   queryFn: () => getCountries(sortType),
  //   retry: 0,
  //   refetchOnWindowFocus: false,
  //   gcTime: 1000 * 60,
  //   staleTime: 1000 * 60,
  // });

  // //virtualizer
  // const virtualizer = useWindowVirtualizer({
  //   count: countriesList.length,
  //   estimateSize: () => (width <= 768 ? 800 : 348),
  //   overscan: 5, // How many items will be render outside the viewport
  // });
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["countries-list", sortType],
      queryFn: ({ pageParam = 1 }) =>
        getCountries({ sortType, page: pageParam, limit: 10 }),
      getNextPageParam: (lastPage) => lastPage.nextOffset,
      initialPageParam: 1,
    });

  const allRows = data ? data.pages.flatMap((page) => page.rows) : [];

  // Virtualizer
  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    estimateSize: () => (width <= 768 ? 800 : 348),
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  React.useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    virtualItems,
  ]);

  // Country creation mutation
  const { mutate: createCountryMutate } = useMutation({
    mutationFn: createCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries-list"] });
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
    createCountryMutate(countryFields);
  };

  // Sorting
  const handleSort = (sortType: "asc" | "desc") => {
    const newSortType = sortType === "asc" ? "like" : "-like";
    setSearchParams({ sortType: newSortType });
  };

  // Country deletion
  const { mutate: deleteCountryMutate } = useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => {
      console.log("Country deleted");

      queryClient.invalidateQueries({ queryKey: ["countries-list"] });
    },
    onError: (error) => {
      console.error("Error deleting country:", error);
    },
  });

  const handleCountryDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    console.log("Deleting country with id:", id);
    deleteCountryMutate({ id });
  };

  //edit section
  const handleEditCountry = (country: CountryReducerInitialState[0]) => {
    setEditCountry(country);
  };

  const { mutate: updateCountryMutation } = useMutation({
    mutationFn: updateCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries-list"] });
    },
    onError: (error) => {
      console.error("Error updating country:", error);
    },
  });

  const handleUpdateCountry = async (
    updatedCountry: CountryReducerInitialState[0],
  ) => {
    updateCountryMutation({ id: updatedCountry.id, payload: updatedCountry });
  };

  // Vote mutation
  const { mutate: updateVoteMutation } = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries-list"] });
    },
    onError: (error) => {
      console.error("Error updating vote:", error);
    },
  });

  const handleUpvote = (id: string, currentVote: number) => {
    updateVoteMutation({ id, currentVote });
  };

  return (
    <>
      <Sorting
        onSortAsc={() => handleSort("asc")}
        onSortDesc={() => handleSort("desc")}
      />
      <CountryCreateForm
        errorMsg={formValidationErrorMsg}
        onCountryCreate={handleCreateCountry}
      />

      <div className={styles.countryCard}>
        {isLoading && "Loading..."}
        {/* {isError && "Error"} */}
        <div></div>

        {/* Virtualize the countries list */}
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const country = allRows[virtualItem.index];
            return (
              <div
                key={country.id}
                className={
                  country.isDeleted ? styles.deleted : styles.countryDetails
                }
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <CountryName
                  name={lang === "ka" ? country.nameKa : country.nameEn}
                />
                <Vote
                  onUpVote={() => handleUpvote(country.id, country.vote)}
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
                        onClick={(e) => {
                          console.log("clicked");
                          handleCountryDelete(e, country.id);
                        }}
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
                {editCountry && editCountry.id === country.id && (
                  <div className={styles.editSection}>
                    <h3>{lang === "ka" ? "რედაქტირება" : "Edit Country"}</h3>
                    <form
                      className={styles.editWindow}
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateCountry(editCountry);
                        setEditCountry(null);
                      }}
                    >
                      <input
                        type="text"
                        value={editCountry.nameKa}
                        onChange={(e) =>
                          setEditCountry({
                            ...editCountry,
                            nameKa: e.target.value,
                          })
                        }
                        placeholder="Georgian Name"
                      />
                      <input
                        type="text"
                        value={editCountry.nameEn}
                        onChange={(e) =>
                          setEditCountry({
                            ...editCountry,
                            nameEn: e.target.value,
                          })
                        }
                        placeholder="English Name"
                      />
                      <input
                        type="text"
                        value={editCountry.flag}
                        onChange={(e) =>
                          setEditCountry({
                            ...editCountry,
                            flag: e.target.value,
                          })
                        }
                        placeholder="Flag URL"
                      />
                      <button type="submit">
                        {lang === "ka" ? "განახლება" : "Update"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Card;
