import styles from "./footer.module.css";

const Footer: React.FC<{ copywright: string }> = ({ copywright }) => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.media}>
          <img
            className={styles.footerLogos}
            src="https://img.icons8.com/?size=100&id=118467&format=png&color=000000"
            alt="facebook logo"
          />
          <img
            className={styles.footerLogos}
            src="https://img.icons8.com/?size=100&id=8824&format=png&color=000000"
            alt="twitter logo"
          />
          <img
            className={styles.footerLogos}
            src="https://img.icons8.com/?size=100&id=32309&format=png&color=000000"
            alt="instagram logo"
          />
        </div>

        <h2 className={styles.footerCopyright}>{copywright}</h2>
      </div>
    </>
  );
};

export default Footer;
