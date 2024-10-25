import React, { useState } from "react";
import {
  useNavigate,
  Link,
  NavLink,
  useParams,
  Outlet,
} from "react-router-dom";
import Header from "@/components/header";
import { HeaderTitle } from "@/components/header/headerTitle";
import { HeaderNav } from "@/components/header/HeaderNav";
import { HeaderNavItem } from "@/components/header/headerNavItem";
import { PageContainer } from "@/components/base/page-container";
import Footer from "@/components/base/footer";
import langData from "@/components/header/LangData/langdata";
import styles from "@/layouts/default/index.module.css";

const DefaultLayOut = () => {
  const { lang } = useParams();
  const [showLangOptions, setShowLangOptions] = useState(false);
  const navigate = useNavigate();

  const handleActiveNav = ({ isActive }) =>
    isActive ? styles["active_langLink"] : styles["langLink"];

  const handleLanguageChange = (newLang) => {
    navigate(`/${newLang}/home`);
  };

  const currentLang = langData[lang] || langData.en;

  return (
    <>
      <Header currentLang={currentLang} onLanguageChange={handleLanguageChange}>
        <Link className={styles.headerLink} to="/">
          <HeaderTitle title={currentLang.title} />
        </Link>
        <HeaderNav>
          <NavLink className={handleActiveNav} to="home">
            <HeaderNavItem text={currentLang.home} />
          </NavLink>
          <NavLink className={handleActiveNav} to="booking">
            <HeaderNavItem text={currentLang.booking} />
          </NavLink>
          <NavLink className={handleActiveNav} to="about">
            <HeaderNavItem text={currentLang.about} />
          </NavLink>
          <NavLink className={handleActiveNav} to="contact">
            <HeaderNavItem text={currentLang.contact} />
          </NavLink>
          <div
            className={styles.lang}
            onMouseEnter={() => setShowLangOptions(true)}
            onMouseLeave={() => setShowLangOptions(false)}
          >
            <HeaderNavItem text={currentLang.chooseLanguage} />
            {showLangOptions && (
              <div className={styles.dropdown}>
                <div onClick={() => handleLanguageChange("ka")}>Ka</div>
                <div onClick={() => handleLanguageChange("en")}>En</div>
              </div>
            )}
          </div>
        </HeaderNav>
      </Header>
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer copywright=" © 2024 Global Travel. All Rights Reserved." />
    </>
  );
};

export default DefaultLayOut;
