import { httpClient } from "@/api";
import { Country } from "@/pages/views/countryDetails";
import { CountryReducerInitialState } from "@/pages/home/components/country-card/reducer/reducer";

// export const getCountries = () => {
//   return httpClient.get("/countries").then((res) => res.data);
// };

export const getCountries = async (): Promise<CountryReducerInitialState> => {
  try {
    const response = await httpClient.get("/countries"); // Await the API call
    return response.data; // inca scase of success return the data
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const deleteCountry = ({ id }: { id: string | number }) => {
  return httpClient.delete(`/countries/${id}`);
};

export const updateCountry = ({
  id,
  payload,
}: {
  id: string | number;
  payload: CountryReducerInitialState[0];
}) => {
  return httpClient.put(`/countries/${id}`, payload);
};

// update vote
// export const updateVote = ({
//   vote,
//   payload,
// }: {
//   vote: number;
//   payload: CountryReducerInitialState[0];
// }) => {
//   const response = httpClient.get(`/countries/${vote}`);

//   const currentVote = response.data.vote
//   const addedVote = response +1
//   return httpClient.put(`${}`, payload);
// };

//country creation

export const createCountry = async (countryFields: {
  nameKa: string;
  nameEn: string;
  flag: string;
}) => {
  try {
    const response = await httpClient.post("/countries", countryFields);
    return response.data;
  } catch (error) {
    console.error("Error creating country:", error);
    throw error;
  }
};

export const getCountry = async (id: string): Promise<Country> => {
  try {
    const response = await httpClient.get(`/countries/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};

export const updateVote = async ({
  id,
  currentVote,
}: {
  id: string;
  currentVote: number;
}) => {
  try {
    //  Fetch the full  data
    const countryResponse = await httpClient.get(`/countries/${id}`);
    const countryData = countryResponse.data;

    // Increse the vote
    const updatedVote = currentVote + 1;

    //  data with updated vote
    const updatedCountry = {
      ...countryData,
      vote: updatedVote,
    };

    // send new data back to server
    const response = await httpClient.put(`/countries/${id}`, updatedCountry);

    return response.data.vote;
  } catch (error) {
    console.error("Error updating vote:", error);
    throw error;
  }
};

export const getDataForSorting = async ({
  queryKey,
}: {
  queryKey: [string, "asc" | "desc"];
}): Promise<CountryReducerInitialState> => {
  try {
    const [, sortType] = queryKey; // Destructure the queryKey to get the sortType

    const response = await httpClient.get("/countries"); // Fetch all countries
    const countries = response.data; // Get the data

    // Sort countries based on the sortType (ascending or descending)
    const sortedCountries = countries.sort((a: Country, b: Country) => {
      const compare = a.vote - b.vote; // Sorting by name (can be changed)
      return sortType === "asc" ? compare : -compare;
    });

    return sortedCountries; // Return sorted countries
  } catch (error) {
    console.error("Error fetching countries with sorting:", error);
    throw error;
  }
};
