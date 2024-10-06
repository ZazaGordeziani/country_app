import styles from "./header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.titleBox}>
        <img
          className={styles.globeIcon}
          src="https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/earth-icon.png"
          alt="globe image"
        />
        <h1 className={styles.headerTitle}>
          {" "}
          Travel Around and Explore New Cultures{" "}
        </h1>
      </div>

      <nav className={styles.nav}>
        <p className={styles.navItem}>Booking</p>
        <p className={styles.navItem}>About us</p>
        <p className={styles.navItem}>Contact us</p>
      </nav>
    </header>
  );
};

export default Header;
