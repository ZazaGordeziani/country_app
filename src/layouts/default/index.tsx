// import React, { PropsWithChildren } from "react";
import Header from "@/components/header";
import { HeaderTitle } from "@/components/header/headerTitle";
import { HeaderNav } from "@/components/header/HeaderNav";
import { HeaderNavItem } from "@/components/header/headerNavItem";
import { PageContainer } from "@/components/base/page-container";
import Footer from "@/components/base/footer";
import { Link, NavLink, NavLinkRenderProps } from "react-router-dom";

import { Outlet } from "react-router-dom";

import styles from "@/layouts/default/index.module.css";

const DefaultLayOut = () => {
  const handleActiveNav = ({ isActive }: NavLinkRenderProps) => {
    if (isActive) {
      return styles["active_headerLink"];
    } else {
      return styles["headerLink"];
    }
  };
  return (
    <>
      <Header>
        <Link className={styles.headerLink} to="/">
          <HeaderTitle title="Travel Around and Explore New Cultures" />
        </Link>
        <HeaderNav>
          <NavLink className={handleActiveNav} to="home">
            <HeaderNavItem text="Home" />
          </NavLink>
          <NavLink className={handleActiveNav} to="booking">
            <HeaderNavItem text="Booking" />
          </NavLink>
          <NavLink className={handleActiveNav} to="about">
            <HeaderNavItem text="About us" />
          </NavLink>
          <NavLink className={handleActiveNav} to="contact">
            <HeaderNavItem text="Contact us" />
          </NavLink>
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
