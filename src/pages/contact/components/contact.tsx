import styles from "./contact.module.css";
import { FormEvent, KeyboardEvent } from "react";

const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const answers: { [key: string]: string } = {};
  formData.forEach((value, key) => {
    answers[key] = value.toString();
  });

  console.log(answers); // This will log the pressed key when typing in an input
};

const HandleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") return HandleSubmit;
};

const Inputs = () => {
  return (
    <form className={styles.form} onSubmit={HandleSubmit}>
      <div className={styles.input}>
        <label htmlFor="Firstname">First Name</label>
        <input onKeyDown={HandleKeyDown} type="text" name="Firstname" />
      </div>
      <div className={styles.input}>
        <label htmlFor="Lastname">Last Name</label>
        <input type="text" name="Lastname" />
      </div>
      <div className={styles.input}>
        <label htmlFor="email">E-mail</label>
        <input type="email" name="E-mail" />
      </div>
      <div className={styles.input}>
        <label htmlFor="">Type your message here!</label>
        <textarea name="Message" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
const ContactInformation = () => {
  return <Inputs />;
};

export default ContactInformation;
