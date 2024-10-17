import styles from "./country-create-form.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

type CountryCreateFormProps = {
  onCountryCreate: (countryFields: { name: string; flag: string }) => void;
  errorMsg: string;
};

const CountryCreateForm: React.FC<CountryCreateFormProps> = ({
  onCountryCreate,
}) => {
  const [fieldErrorMsg, setFiledErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState("");

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (name.length < 2 || name.length > 50) {
      setFiledErrorMsg(
        "Name should not consist less than 2 and more than 50 letters!!!"
      );
    } else {
      setFiledErrorMsg("");
    }
    setName(value);
  };

  const handleChangeFLag = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFlag(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCountryCreate({ name, flag });
  };

  return (
    <form className={styles.details} onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={handleChangeName}
        name="name"
        placeholder="Country Name"
      />
      <input
        value={flag}
        onChange={handleChangeFLag}
        name="flag"
        placeholder="Country Flag Image Source"
      />

      <button type="submit">Add new Country</button>
      <span>{fieldErrorMsg}</span>
    </form>
  );
};

export default CountryCreateForm;
