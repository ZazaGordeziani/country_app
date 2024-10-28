import { PropsWithChildren } from "react";
import styles from "./sorting.module.css";

const Sorting: React.FC<
  PropsWithChildren<{ onSortAsc: () => void; onSortDesc: () => void }>
> = ({ onSortAsc, onSortDesc }) => {
  return (
    <div className={styles.buttons}>
      <button className={styles.buttonSpec} onClick={onSortAsc}>
        ASC
      </button>
      <button className={styles.buttonSpec} onClick={onSortDesc}>
        DESC
      </button>
    </div>
  );
};

export default Sorting;
