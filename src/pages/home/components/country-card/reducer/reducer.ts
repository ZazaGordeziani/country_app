// import { CountriesList } from "@/pages/home/components/country-card/reducer/state";

export type CountryReducerInitialState = {
  flag: string;
  nameKa: string;
  nameEn: string;
  capital: string;
  population: string;
  id: string;
  vote: number;
  isDeleted?: boolean;
}[];

type CountriesReducerAction =
  | { type: "upvote"; payload: { id: string } }
  | { type: "sort"; payload: { sortType: string } }
  | {
      type: "create";
      payload: { countryFields: CountryReducerInitialState[0] };
    }
  | { type: "delete"; payload: { id: string } }
  | { type: "undo"; payload: { country: CountryReducerInitialState[0] } };

// | "sort" | "create" | "delete" | "undo";
// payload: string;

export const countriesReducer = (
  countriesList: CountryReducerInitialState,
  action: CountriesReducerAction,
) => {
  if (action.type === "upvote") {
    return countriesList.map((country) => {
      if (country.id === action.payload.id) {
        return { ...country, vote: country.vote + 1 };
      }
      return country;
    });
  }

  if (action.type === "sort") {
    const activeCountries = countriesList.filter(
      (country) => !country.isDeleted,
    );
    const deletedCountries = countriesList.filter(
      (country) => country.isDeleted,
    );

    const sortedActiveCountries = activeCountries.sort((a, b) => {
      return action.payload.sortType === "asc"
        ? a.vote - b.vote
        : b.vote - a.vote;
    });

    return [...sortedActiveCountries, ...deletedCountries];
  }

  if (action.type === "create") {
    const newCountry = {
      ...action.payload.countryFields,
      vote: 0,
      id: (Number(countriesList.at(-1)?.id) + 1).toString(),
      isDeleted: false,
    };
    return [...countriesList, newCountry];
  }

  if (action.type === "delete") {
    const updatedCountriesList = countriesList.map((country) => {
      if (country.id === action.payload.id) {
        return { ...country, isDeleted: true };
      }
      return country;
    });

    const deletedCountry = updatedCountriesList.find(
      (country) => country.id === action.payload.id,
    );
    const filteredCountriesList = updatedCountriesList.filter(
      (country) => country.id !== action.payload.id,
    );

    if (deletedCountry) {
      return [...filteredCountriesList, deletedCountry];
    }
  }

  if (action.type === "undo") {
    const restoredCountry = action.payload.country;
    const updatedCountriesList = countriesList.filter(
      (country) => country.id !== restoredCountry.id,
    );

    const indexToInsert = Number(restoredCountry.id) - 1;
    updatedCountriesList.splice(indexToInsert, 0, {
      ...restoredCountry,
      isDeleted: false,
    });
    return updatedCountriesList;
  }

  return countriesList;
};
