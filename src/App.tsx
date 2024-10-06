import "./App.css";

const country = {
  name: "Nicaragua",
  capital: "Managua",
  population: "6,359,689",
};

function App() {
  return (
    <>
      <div className="main-container">
        <header className="header">
          <div className="title-box">
            <img
              className="globe-icon"
              src="https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/earth-icon.png"
              alt="globe image"
            />
            <h1 className="header-title">
              {" "}
              Travel Around and Explore New Cultures{" "}
            </h1>
          </div>

          <nav className="nav">
            <p className="nav-item">Booking</p>
            <p className="nav-item">About us</p>
            <p className="nav-item">Contact us</p>
          </nav>
        </header>
        <div className="body">
          <div className="hero">
            <h1 className="hero-title">Welcome to Global Getaways</h1>
            <p className="hero-subtitle">
              Let us guide you to your next adventure!
            </p>
          </div>
          <div className="country-card">
            <img
              className="flag"
              src="https://cdn.britannica.com/19/7219-050-7D2C062F/Flag-Nicaragua.jpg"
              alt="Nicaragua Flag"
            />
            <div className="country-details">
              <h2>Name: {country.name}</h2>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
