import Hero from "@/pages/home/components/hero";
import Card from "@/pages/home/components/country-card/card";
import HeroTitle from "@/pages/home/components/hero/hero-title/title";
import HeroSubtitle from "@/pages/home/components/hero/hero-subtitle";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import CountryName from "@/pages/home/components/country-card/country-name/countryName";
// import CountryFlag from "@/pages/home/components/country-card/country-flag/country-flag";
// import { CountryCapital } from "@/pages/home/components/country-card/country-capital/capital";
// import { CountryPopulation } from "@/pages/home/components/country-card/country-population/population";
// import { CountriesList } from "@/pages/home/static/dummy-data";

// const country = {
//   name: "Nicaragua",
//   capital: "Managua",
//   population: "100000000",
// };

const HomeListView = () => {
  const { lang } = useParams();

  console.log(lang);

  return (
    <>
      <Hero>
        <HeroTitle title="Welcome to Global Getaways" />
        <HeroSubtitle subtitle="Let us guide you to your next adventure!" />
      </Hero>

      {}

      <Card />
    </>
  );
};

export default HomeListView;
