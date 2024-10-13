import { PropsWithChildren } from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

// import CountryFlag from "@/pages/home/components/country-card/country-flag/country-flag";

// import { CountriesList } from "@/pages/home/static/dummy-data";
const Card: React.FC<PropsWithChildren<{ id: string }>> = ({
  // flag,
  id,
  children,
}) => {
  return (
    <div className={styles.countryCard}>
      <Link className={styles.links} to={`/home/${id}`}>
        <div className={styles.countryDetails}>{children}</div>
      </Link>
    </div>
  );
};

export default Card;
