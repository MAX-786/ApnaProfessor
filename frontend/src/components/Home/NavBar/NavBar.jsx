/* eslint-disable no-unused-vars */
import React from 'react';
import NavSearch from './NavSearch';
import Select from './Select';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import './index.css';
import SocialLinks from '../../SocialLinks/SocialLinks';
import UserWebMenu from '../UserWebMenu/UserWebMenu';
import UserMobileMenu from '../UserMobileMenu/UserMobileMenu';
import InstaIcon from '../../../assets/instagram.svg';
import GithubIcon from '../../../assets/github.svg';
import LinkedinIcon from '../../../assets/linkedin.svg';

const NavBar = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogIn = () => {
    console.log("login");
    navigate("/login");
  }

  return (
    <div className='header-container'>
        <div className="header-wrapper">
          <div className="header">
            <div className="social-links">
              <SocialLinks link="#" socialName="Follow us Instagram" imgSrc={InstaIcon} />
              <SocialLinks link="#" socialName="Follow us GitHub" imgSrc={GithubIcon} />
              <SocialLinks link="#" socialName="Follow us LinkedIn" imgSrc={LinkedinIcon} />
            </div>
            <div className="user-items">
              <UserWebMenu />
              <UserMobileMenu />
            </div>
          </div>
        </div>
    </div>
  )
}

        {/* <div className="header-wrapper">
            <header id="header" role='banner'>
            {user === null && <button onClick={handleLogIn} >LogIn</button>}
            <Select />
            <NavSearch for="professor" />
            <NavSearch for="college" />

            </header>
        </div> */}

export default NavBar