import Hero from "@/pages/components/hero";
import Card from "@/pages/components/country-card/card";
import HeroTitle from "@/pages/components/hero/hero-title/title";
import HeroSubtitle from "@/pages/components/hero/hero-subtitle";
import CountryName from "@/pages/components/country-card/country-name/countryName";
import { CountryCapital } from "@/pages/components/country-card/country-capital/capital";
import { CountryPopulation } from "@/pages/components/country-card/country-population/population";

const country = {
  name: "Nicaragua",
  capital: "Managua",
  population: "6,359,689",
};

const HomeListView = () => {
  return (
    <>
      <Hero>
        <HeroTitle title="Welcome to Global Getaways" />
        <HeroSubtitle subtitle="Let us guide you to your next adventure!" />
      </Hero>
      <Card>
        <CountryName name={country.name} />
        <CountryCapital capital={country.capital} />
        <CountryPopulation population={country.population} />
      </Card>
    </>
  );
};

export default HomeListView;
