import React from "react";
import styles from "./headerNavItem.module.css";

export const HeaderNavItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div>
      <p className={styles.navItem}>{text}</p>
    </div>
  );
};
