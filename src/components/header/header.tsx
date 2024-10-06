import React, { PropsWithChildren } from "react";
import styles from "./header.module.css";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  const childArray = React.Children.toArray(children);
  const headerTitle = childArray[0];
  const navItems = childArray[1];

  return (
    <header className={styles.header}>
      <div className={styles.titleBox}>
        <img
          className={styles.globeIcon}
          src="https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/earth-icon.png"
          alt="globe image"
        />
        {headerTitle}
      </div>
      {navItems}
    </header>
  );
};

export default Header;
