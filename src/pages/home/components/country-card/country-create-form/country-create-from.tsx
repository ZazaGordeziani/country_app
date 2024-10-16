import styles from "./country-create-form.module.css";
import { FormEvent } from "react";

type CountryCreateFormProps = {
  onCountryCreate: (e: FormEvent<HTMLFormElement>) => void;
};

const CountryCreateForm: React.FC<CountryCreateFormProps> = ({
  onCountryCreate,
}) => {
  return (
    <form className={styles.details} onSubmit={onCountryCreate}>
      <input name="name" />
      <input name="flag" />

      <button type="submit">Add new Country</button>
    </form>
  );
};

export default CountryCreateForm;