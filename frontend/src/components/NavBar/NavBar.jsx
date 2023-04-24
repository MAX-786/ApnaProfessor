/* eslint-disable no-unused-vars */
import React from 'react';
import NavSearch from './NavSearch';
import Select from './Select';

const NavBar = () => {
  return (
    <div className='header-container'>
        <div className="header-wrapper">
            <header id="header" role='banner'>
            
            <Select />
            <NavSearch for="teacher" />
            <NavSearch for="college" />
            </header>
        </div>
    </div>
  )
}

export default NavBar