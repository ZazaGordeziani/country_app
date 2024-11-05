import { useParams } from "react-router-dom";
import styles from "./country-create-form.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

type CountryCreateFormProps = {
  onCountryCreate: (countryFields: {
    nameKa: string;
    nameEn: string;
    flag: string;
  }) => void;
  errorMsg: string;
};

const text = {
  countryNameKa: "ქვეყნის სახელი",
  countryNameEn: "Country Name",
  countryFlagImgSourceKa: "სურათის ბმული",
  countryFlagImgSourceEn: "Country Flag Image Source",
  addNewCountryKa: "ქვეყნის დამატება",
  addNewCountryEn: "Add New Country",
  chooseFileKa: "ფაილის არჩევა",
  chooseFileEn: "Choose File",
  noFileChosenKa: "ფაილი არ არის არჩეული",
  noFileChosenEn: "No file chosen",
};

const CountryCreateForm: React.FC<CountryCreateFormProps> = ({
  onCountryCreate,
  errorMsg,
}) => {
  const { lang } = useParams();
  const [fieldErrorMsg, setFieldErrorMsg] = useState("");
  const [nameKa, setNameKa] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [flag, setFlag] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleChangeNameKa = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 2 || value.length > 50) {
      setFieldErrorMsg(
        "Name should not consist of less than 2 and more than 50 letters!",
      );
    } else {
      setFieldErrorMsg("");
    }
    setNameKa(value);
  };

  const handleChangeNameEn = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 2 || value.length > 50) {
      setFieldErrorMsg(
        "Name should not consist of less than 2 and more than 50 letters!",
      );
    } else {
      setFieldErrorMsg("");
    }
    setNameEn(value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const allowedTypes = ["image/png", "image/svg+xml"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setFieldErrorMsg("Only PNG and SVG files are allowed.");
        setFile(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFlag(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setFieldErrorMsg("Please upload a file.");
      return;
    }

    if (!nameKa || !nameEn || !flag) {
      setFieldErrorMsg("All fields are required.");
      return;
    }

    const newCountry = {
      nameKa,
      nameEn,
      flag,
    };

    onCountryCreate(newCountry);

    setNameKa("");
    setNameEn("");
    setFlag("");
    setFile(null);
    setFieldErrorMsg("");
  };

  return (
    <form className={styles.details} onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/png, image/svg+xml"
        onChange={handleFileChange}
        style={{ display: "inline-block" }}
      />
      <input
        value={nameKa}
        onChange={handleChangeNameKa}
        name="nameKa"
        placeholder={text.countryNameKa}
      />
      <input
        value={nameEn}
        onChange={handleChangeNameEn}
        name="nameEn"
        placeholder={text.countryNameEn}
      />
      <button type="submit">
        {lang === "ka" ? text.addNewCountryKa : text.addNewCountryEn}
      </button>
      <span>{fieldErrorMsg || errorMsg}</span>
    </form>
  );
};

export default CountryCreateForm;
