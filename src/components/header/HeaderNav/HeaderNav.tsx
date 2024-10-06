import React, { PropsWithChildren } from "react";
import styles from "./HeaderNav.module.css";
export const HeaderNav: React.FC<PropsWithChildren> = ({ children }) => {
  return <nav className={styles.nav}>{children}</nav>;
};
