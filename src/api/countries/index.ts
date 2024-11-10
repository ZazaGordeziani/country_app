import { httpClient } from "@/api";
import { CountryReducerInitialState } from "@/pages/home/components/country-card/reducer/reducer";

// export const getCountries = () => {
//   return httpClient.get("/countries").then((res) => res.data);
// };

export const getCountries = async () => {
  try {
    const response = await httpClient.get("/countries").then((res) => res.data); // Await the API call
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
