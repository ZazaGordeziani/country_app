import { httpClient } from "@/api";
import { Country } from "@/pages/views/countryDetails";
import { CountryReducerInitialState } from "@/pages/home/components/country-card/reducer/reducer";

// export const getCountries = () => {
//   return httpClient.get("/countries").then((res) => res.data);
// };

//

// export const getCountries = async (
//   sortType?: "like" | "-like",
// ): Promise<CountryReducerInitialState> => {
//   try {
//     const searchParams = new URLSearchParams();

//     // If sortType is provided, add _sort query parameter for sorting by vote
//     if (sortType) {
//       searchParams.append("_sort", sortType === "like" ? "vote" : "-vote");
//     }

//     // Make the API call with the searchParams (which may or may not contain _sort)
//     const response = await httpClient.get(
//       "/countries" +
//         (searchParams.size > 0 ? `?${searchParams.toString()}` : ""),
//     );

//     // Return the response data on success
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//     throw error;
//   }
// };

// export const getCountries = async (
//   sortType?: "like" | "-like",
// ): Promise<CountryReducerInitialState> => {
//   try {
//     const searchParams = new URLSearchParams();

//     // sorting based on votecounts
//     if (sortType) {
//       const order = sortType === "like" ? "asc" : "desc";
//       searchParams.append("_sort", "vote");
//       searchParams.append("_order", order);
//     }

//     const response = await httpClient.get(
//       "/countries" +
//         (searchParams.size > 0 ? `?${searchParams.toString()}` : ""),
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//     throw error;
//   }
// };

export const getCountries = async ({
  sortType,
  page = 1,
  limit = 10,
}: {
  sortType?: "like" | "-like";
  page: number;
  limit: number;
}): Promise<{ rows: CountryReducerInitialState; nextOffset?: number }> => {
  try {
    const searchParams = new URLSearchParams();

    // vote count sorting
    if (sortType) {
      const order = sortType === "like" ? "asc" : "desc";
      searchParams.append("_sort", "vote");
      searchParams.append("_order", order);
    }

    // Pagination
    searchParams.append("_page", String(page));
    searchParams.append("_limit", String(limit));

    const response = await httpClient.get(
      "/countries" +
        (searchParams.size > 0 ? `?${searchParams.toString()}` : ""),
    );

    const nextOffset = response.data.length < limit ? undefined : page + 1;

    return {
      rows: response.data,
      nextOffset,
    };
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const deleteCountry = ({ id }: { id: string | number }) => {
  console.log("Deleting the following country:", id);
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

//
//

// export const updateVote = async ({
//   id,
//   currentVote,
// }: {
//   id: string;
//   currentVote: number;
// }) => {
//   try {
//     //  Fetch the full  data
//     const countryResponse = await httpClient.get(`/countries/${id}`);
//     const countryData = countryResponse.data;

//     // Increse the vote
//     const updatedVote = currentVote + 1;

//     //  data with updated vote
//     const updatedCountry = {
//       ...countryData,
//       vote: updatedVote,
//     };

//     // send new data back to server
//     const response = await httpClient.put(`/countries/${id}`, updatedCountry);

//     return response.data.vote;
//   } catch (error) {
//     console.error("Error updating vote:", error);
//     throw error;
//   }
// };

//
// export const updateVote = async ({
//   id,
//   currentVote,
// }: {
//   id: string;
//   currentVote: number;
// }) => {
//   try {
//     // Increment the vote by 1
//     const updatedVote = currentVote + 1;

//     // Create the updated country object with the new vote
//     const updatedCountry = {
//       vote: updatedVote,
//     };

//     // Send the updated data to the server
//     const response = await httpClient.patch(`/countries/${id}`, updatedCountry);

//     // Return the updated vote count
//     return response.data.vote; // Assuming response.data contains the updated vote
//   } catch (error) {
//     console.error("Error updating vote:", error);
//     throw error;
//   }
// };

//

export const updateVote = async ({
  id,
  currentVote,
}: {
  id: string;
  currentVote: number;
}) => {
  try {
    // Increment the vote by 1
    const updatedVote = currentVote + 1;

    // Create the updated country object with the new vote
    const updatedCountry = {
      vote: updatedVote,
    };

    // Send the updated data to the server
    const response = await httpClient.patch(`/countries/${id}`, updatedCountry);

    // Return the updated vote count
    return response.data.vote; // Assuming response.data contains the updated vote
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
