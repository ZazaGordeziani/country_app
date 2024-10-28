import styles from "./contact.module.css";
import { ChangeEvent, useState, FormEvent, KeyboardEvent } from "react";

const ContactInformation: React.FC = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [lastNameErrorMsg, setlastNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [messageErrorMsg, setMessageErrorMsg] = useState("");

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    if (name.length < 2) {
      setNameErrorMsg("Name should be more than one letter!");
    } else {
      setNameErrorMsg("");
    }
  };

  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);

    if (lastName.length < 2) {
      setlastNameErrorMsg("Last Name should be more than one letter!");
    } else {
      setlastNameErrorMsg("");
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (email.length < 15) {
      setEmailErrorMsg("E-mails should be more than 15 letter!");
    } else {
      setEmailErrorMsg("");
    }
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (message.length < 2) {
      setMessageErrorMsg("Name should be more than 2 letters!");
    } else {
      setMessageErrorMsg("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      lastName,
      email,
      message,
    };

    console.log(formData);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.input}>
        <label htmlFor="Firstname">First Name</label>
        <input
          value={name}
          onChange={handleChangeName}
          onKeyDown={handleKeyDown}
          type="text"
          name="Firstname"
        />
      </div>
      <div>{nameErrorMsg}</div>
      <div className={styles.input}>
        <label htmlFor="Lastname">Last Name</label>
        <input
          value={lastName}
          onChange={handleChangeLastName}
          type="text"
          name="Lastname"
        />
      </div>
      <div>{lastNameErrorMsg}</div>

      <div className={styles.input}>
        <label htmlFor="email">E-mail</label>
        <input
          value={email}
          onChange={handleChangeEmail}
          type="email"
          name="Email"
        />
      </div>
      <div>{emailErrorMsg}</div>

      <div className={styles.input}>
        <label htmlFor="Message">Type your message here!</label>
        <textarea
          value={message}
          onChange={handleChangeMessage}
          name="Message"
        />
      </div>
      <div>{messageErrorMsg}</div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactInformation;
