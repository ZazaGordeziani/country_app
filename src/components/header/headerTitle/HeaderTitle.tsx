import React from "react";
import styles from "./headerTitle.module.css";

export const HeaderTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h1 className={styles.headerTitle}> {title} </h1>;
};
