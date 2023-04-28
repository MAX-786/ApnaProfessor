/* eslint-disable no-unused-vars */
import React from 'react';
import NavSearch from './NavSearch';
import Select from './Select';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

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
            <header id="header" role='banner'>
            {user === null && <button onClick={handleLogIn} >LogIn</button>}
            <Select />
            <NavSearch for="teacher" />
            <NavSearch for="college" />

            </header>
        </div>
    </div>
  )
}

export default NavBar