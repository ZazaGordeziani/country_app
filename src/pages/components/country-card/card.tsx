import { PropsWithChildren } from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    // <div className={styles.countryCard}>
    <Link style={{ color: "red" }} to="/home/1">
      <article className={styles.countryDetails}>{children}</article>
    </Link>
    // </div>
  );
};

export default Card;
