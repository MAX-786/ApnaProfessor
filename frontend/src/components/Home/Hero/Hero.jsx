/* eslint-disable no-unused-vars */
import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

function Hero() {
  const navigate = useNavigate();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate(`/colleges?q=${e.target[0].value}`);
  };

  return (
    <div className="hero">
      <img
        src="/src/assets/kyte-logo.png"
        alt="Website Logo"
        className="hero-logo"
      />
      <p className="dynamic-paragraph">Explore and Share Reviews!</p>
      <form onSubmit={handleOnSubmit} className="hero-search-form">
        <TextField
          type="search"
          label="Find your College/School"
          className="search-bar"
        />
        <button type="submit" className="button">
          Find
        </button>
      </form>
      <div className="wave-hero">
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
}

export default Hero;
