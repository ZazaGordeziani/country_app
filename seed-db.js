import axios from "axios";

const API_URL = "https://restcountries.com/v3.1/all"; // URL to fetch country data
const SERVER_URL = "http://localhost:3000/countries"; // Server URL to save data

// Function to fetch and post data
const seedCountries = async () => {
  try {
    // Fetch data from the API
    const response = await axios.get(API_URL);
    console.log("Fetched country data successfully!");

    const countries = response.data;
    console.log(countries);

    const formattedCountries = countries.map((country) => ({
      nameEn: country.name?.common || "",
      nameKa: "",
      id: country.ccn3,
      population: country.population || "",
      capital: country.capital?.[0] || "",
      flag: country.flags?.svg || "",
      vote: 0,
    }));

    //add data to server
    const postResponse = await axios.post(SERVER_URL, {
      countries: formattedCountries,
    });

    if (postResponse.status === 201) {
      console.log("Database seeded successfully!");
    } else {
      console.error("Failed to seed database on server.");
    }
  } catch (err) {
    console.error("Error while retrieveing data:", err);
  }
};

seedCountries();
