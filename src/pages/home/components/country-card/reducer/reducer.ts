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
      payload: {
        countryFields: { nameKa: string; nameEn: string; flag: string };
      };
    }
  | { type: "delete"; payload: { id: string } }
  | { type: "undo"; payload: { country: CountryReducerInitialState[0] } }
  | { type: "set_Data"; payload: CountryReducerInitialState }
  | { type: "update"; payload: { country: CountryReducerInitialState[0] } };

// | "sort" | "create" | "delete" | "undo";
// payload: string;

// export const countriesReducer = (
//   countriesList: CountryReducerInitialState,
//   action: CountriesReducerAction,
// ) => {
//   if (action.type === "set_Data") {
//     // console.log(" countries in reducer:", action.payload);
//     return action.payload;
//   }

//   if (action.type === "upvote") {
//     return countriesList.map((country) => {
//       if (country.id === action.payload.id) {
//         return { ...country, vote: country.vote + 1 };
//       }
//       return country;
//     });
//   }

//   if (action.type === "sort") {
//     const activeCountries = countriesList.filter(
//       (country) => !country.isDeleted,
//     );
//     const deletedCountries = countriesList.filter(
//       (country) => country.isDeleted,
//     );

//     const sortedActiveCountries = activeCountries.toSorted((a, b) => {
//       return action.payload.sortType === "asc"
//         ? a.vote - b.vote
//         : b.vote - a.vote;
//     });

//     return [...sortedActiveCountries, ...deletedCountries];
//   }

//   if (action.type === "create") {
//     const newCountry: CountryReducerInitialState[0] = {
//       ...action.payload.countryFields,
//       capital: "",
//       population: "",
//       vote: 0,
//       id: (Number(countriesList.at(-1)?.id) + 1).toString(),
//       isDeleted: false,
//     };
//     return [...countriesList, newCountry];
//   }

//   if (action.type === "delete") {
//     const updatedCountriesList = countriesList.map((country) => {
//       if (country.id === action.payload.id) {
//         return { ...country, isDeleted: true };
//       }
//       return country;
//     });

//     const deletedCountry = updatedCountriesList.find(
//       (country) => country.id === action.payload.id,
//     );
//     const filteredCountriesList = updatedCountriesList.filter(
//       (country) => country.id !== action.payload.id,
//     );

//     if (deletedCountry) {
//       return [...filteredCountriesList, deletedCountry];
//     }
//   }

//   if (action.type === "undo") {
//     const restoredCountry = action.payload.country;
//     const updatedCountriesList = countriesList.filter(
//       (country) => country.id !== restoredCountry.id,
//     );

//     const indexToInsert = Number(restoredCountry.id) - 1;
//     updatedCountriesList.splice(indexToInsert, 0, {
//       ...restoredCountry,
//       isDeleted: false,
//     });
//     return updatedCountriesList;
//   }

//   return countriesList;
// };

export const countriesReducer = (
  countriesList: CountryReducerInitialState,
  action: CountriesReducerAction,
) => {
  if (action.type === "set_Data") {
    return action.payload;
  }

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

    const sortedActiveCountries = activeCountries.toSorted((a, b) => {
      return action.payload.sortType === "asc"
        ? a.vote - b.vote
        : b.vote - a.vote;
    });

    return [...sortedActiveCountries, ...deletedCountries];
  }

  if (action.type === "create") {
    const newCountry: CountryReducerInitialState[0] = {
      ...action.payload.countryFields,
      capital: "",
      population: "",
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

  // Update a country (edit the country details)
  if (action.type === "update") {
    return countriesList.map((country) => {
      if (country.id === action.payload.country.id) {
        // If the country ID matches, return a new object with updated fields
        return {
          ...country,
          nameKa: action.payload.country.nameKa,
          nameEn: action.payload.country.nameEn,
          flag: action.payload.country.flag,
          capital: action.payload.country.capital,
          population: action.payload.country.population,
        };
      }
      return country;
    });
  }

  return countriesList;
};
