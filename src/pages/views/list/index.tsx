import Hero from "@/pages/components/hero";
import Card from "@/pages/home/components/country-card/card";
import HeroTitle from "@/pages/home/components/hero/hero-title/title";
import HeroSubtitle from "@/pages/home/components/hero/hero-subtitle";
import CountryName from "@/pages/home/components/country-card/country-name/countryName";
import CountryFlag from "@/pages/home/components/country-card/country-flag/country-flag";
// import { CountryCapital } from "@/pages/home/components/country-card/country-capital/capital";
// import { CountryPopulation } from "@/pages/home/components/country-card/country-population/population";
import { CountriesList } from "@/pages/home/static/dummy-data";

// const country = {
//   name: "Nicaragua",
//   capital: "Managua",
//   population: "100000000",
// };

const HomeListView = () => {
  return (
    <>
      <Hero>
        <HeroTitle title="Welcome to Global Getaways" />
        <HeroSubtitle subtitle="Let us guide you to your next adventure!" />
      </Hero>

      {}

      <Card>
        <CountryName name={CountriesList[0].name} />
        <CountryFlag flag={CountriesList[0].flag!} />
        {/* <CountryCapital capital={CountriesList[0].capital} />
        <CountryPopulation population={CountriesList[0].population} /> */}
      </Card>

      {}

      <Card>
        <CountryName name={CountriesList[1].name} />
        <CountryFlag flag={CountriesList[1].flag!} />
        {/* <CountryCapital capital={CountriesList[1].capital} />
        <CountryPopulation population={CountriesList[1].population} /> */}
      </Card>

      {}
      <Card>
        <CountryName name={CountriesList[2].name} />
        <CountryFlag flag={CountriesList[2].flag!} />
        {/* <CountryCapital capital={CountriesList[2].capital} />
        <CountryPopulation population={CountriesList[2].population} /> */}
      </Card>
    </>
  );
};

export default HomeListView;
