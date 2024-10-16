// import { CountriesList } from "@/pages/home/components/country-card/reducer/state";

type CountryReducerInitialState = {
  flag: string;
  name: string;
  capital: string;
  population: string;
  id: string;
  vote: number;
}[];

type CountriesReducerAction = {
  type: "upvote" | "sort" | "create" | "delete";
  payload: any;
};

export const countriesReducer = (
  countriesList: CountryReducerInitialState,
  action: CountriesReducerAction
) => {
  if (action.type === "upvote") {
    const updatedCountriesList = countriesList.map((country) => {
      if (country.id === action.payload.id) {
        return { ...country, vote: country.vote + 1 };
      }
      return { ...country };
    });
    // console.log(state);
    return updatedCountriesList;
  }

  if (action.type === "sort") {
    const copiedcountriesList = [...countriesList];

    if (action.payload.sortType === "asc") {
      const sortedCountriesList = copiedcountriesList.sort((a, b) => {
        return a.vote - b.vote;
      });

      return sortedCountriesList;
    }

    if (action.payload.sortType === "desc") {
      const sortedCountriesList = copiedcountriesList.sort((a, b) => {
        return b.vote - a.vote;
      });

      return sortedCountriesList;
    }
  }

  if (action.type === "create") {
    const updatedCountryList = [
      ...countriesList,
      {
        ...action.payload.countryObj,

        vote: "0",
        id: (Number(countriesList.at(-1)?.id) + 1).toString(),
      },
    ];
    return updatedCountryList;
  }

  if (action.type === "delete") {
    const deletedCountry = countriesList.find(
      (country) => country.id === action.payload.id
    );
    const filteredCountriesList = countriesList.filter(
      (country) => country.id !== action.payload.id
    );

    if (deletedCountry) {
      return [...filteredCountriesList, deletedCountry];
    }

    // return country.id !== action.payload.id;

    // return filteredCountriesList;
  }

  return countriesList;
};
