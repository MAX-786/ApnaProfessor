/* eslint-disable no-unused-vars */
import React from "react";
import NavSearch from "./NavSearch";
import Select from "./Select";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import { useNavigate } from "react-router-dom";
import "./index.css";
import SocialLinks from "../../SocialLinks/SocialLinks";
import UserWebMenu from "../UserWebMenu/UserWebMenu";
import UserMobileMenu from "../UserMobileMenu/UserMobileMenu";
import InstaIcon from "../../../assets/instagram.svg";
import GithubIcon from "../../../assets/github.svg";
import LinkedinIcon from "../../../assets/linkedin.svg";

const NavBar = () => {
  return (
    <div className="header-container">
      <div className="header-wrapper">
        <div className="header">
          <div className="social-links">
            <SocialLinks
              link="#"
              socialName="Follow us Instagram"
              imgSrc={InstaIcon}
            />
            <SocialLinks
              link="#"
              socialName="Follow us GitHub"
              imgSrc={GithubIcon}
            />
            <SocialLinks
              link="#"
              socialName="Follow us LinkedIn"
              imgSrc={LinkedinIcon}
            />
          </div>
          <div className="user-items">
            <UserWebMenu />
            <UserMobileMenu />
          </div>
        </div>
      </div>
      <div className="wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"></path>
        </svg>
      </div>
    </div>
  );
};

{
  /* <div className="header-wrapper">
            <header id="header" role='banner'>
            {user === null && <button onClick={handleLogIn} >LogIn</button>}
            <Select />
            <NavSearch for="professor" />
            <NavSearch for="college" />

            </header>
        </div> */
}

export default NavBar;
