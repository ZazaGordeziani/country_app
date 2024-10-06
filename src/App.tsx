import Header from "@/components/header";
import { HeaderTitle } from "@/components/header/headerTitle";
import { HeaderNav } from "@/components/header/HeaderNav";
import { HeaderNavItem } from "@/components/header/headerNavItem";
import Hero from "@/components/hero";
import Card from "@/components/country-card/card";
import Footer from "@/components/footer";
import HeroTitle from "@/components/hero/hero-title/title";
import { HeroSubtitle } from "@/components/hero/hero-subtitle";
import CountryName from "@/components/country-card/country-name/countryName";
import { CountryCapital } from "@/components/country-card/country-capital/capital";
import { CountryPopulation } from "@/components/country-card/country-population/population";
import "@/App.css";

const country = {
  name: "Nicaragua",
  capital: "Managua",
  population: "6,359,689",
};

const App: React.FC = () => {
  return (
    <>
      <Header>
        <HeaderTitle title="Travel Around and Explore New Cultures" />
        <HeaderNav>
          <HeaderNavItem text="Booking" />
          <HeaderNavItem text="About us" />
          <HeaderNavItem text="Contact us" />
        </HeaderNav>
      </Header>
      <Hero>
        <HeroTitle title="Welcome to Global Getaways" />
        <HeroSubtitle subtitle="Let us guide you to your next adventure!" />
      </Hero>

      <Card>
        <CountryName name={country.name} />
        <CountryCapital capital={country.capital} />
        <CountryPopulation population={country.population} />
      </Card>
      <Footer copywright=" © 2024 Global Travel. All Rights Reserved." />
    </>
  );
};

App.displayName = "App component";

export default App;
