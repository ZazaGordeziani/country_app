import axios from "axios";
import { promises as fs } from "fs";

const API_URL = "https://restcountries.com/v3.1/all"; // URL to fetch country data
const FILE_PATH = "./database.json"; // Local server to save data

const seedCountries = async () => {
  try {
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

    // Delete the existing data from the file
    // await fs.truncate(FILE_PATH, 0); //file path content length will get 0

    // add  new data
    await fs.writeFile(
      FILE_PATH,
      JSON.stringify({ countries: formattedCountries }, null, 2),
    );
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error while retrieving or saving data:", err);
  }
};

seedCountries();
