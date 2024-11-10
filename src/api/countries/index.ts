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
// useEffect(() => {
//   axios
//     .get("http://localhost:3000/countries") // Fetch countries inside useEffect
//     .then((response) => {
//       const recievedCountries = response.data;
//       dispatch({
//         type: "set_Data",
//         payload: recievedCountries, // Pass the countries array directly
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching countries:", error); // In case of error
//     });
// }, []);

// useEffect(() => {
//   console.log("Updated countriesList:", countriesList);
// }, [countriesList]);
