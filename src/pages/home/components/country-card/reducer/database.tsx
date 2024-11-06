// import axios from "axios";
// import { useEffect, useState } from "react";

// interface Country {
//   name: {
//     common: string;
//   };
// }

// const AddCountries: React.FC = () => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   // const [isPosted, setIsPosted] = useState(false); //

//   useEffect(() => {
//     // Fetch countries
//     axios
//       .get("https://restcountries.com/v3.1/all")
//       .then((response) => {
//         setCountries(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching countries:", error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     // Poste countries only if they haven't been posted yet
//     if (countries.length > 0) {
//       Promise.all(
//         countries.map((country) =>
//           axios.post("http://localhost:3000/countries", {
//             name: country.name.common,
//           }),
//         ),
//       )
//         .then((postResponses) => {
//           console.log("All countries posted:", postResponses);
//           // setIsPosted(true); // to avoid duplicate countries
//         })
//         .catch((error) => {
//           console.error("Error posting countries:", error);
//         });
//     }
//   }, []); // Dependency array includes countries and hasPosted

//   return (
//     <div>
//       {isLoading ? (
//         "Loading..."
//       ) : (
//         <div>
//           {countries.map((country) => (
//             <div key={country.name.common}>{country.name.common}</div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddCountries;
