import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Card from "./components/country-card/card";
import Footer from "./components/footer/footer";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Hero>
        <h1>Welcome to Global Getaways </h1>
      </Hero>
      <Card />
      <Footer />
    </>
  );
};

App.displayName = "App component";

export default App;
