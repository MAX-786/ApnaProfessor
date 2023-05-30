/* eslint-disable no-unused-vars */
import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { TextField, Autocomplete } from "@mui/material";
import { useSelector } from "react-redux";
import { getColleges } from "../../../features/collegesSlice";
import kypeLogo from "../../../assets/kype-black.svg";

function Hero() {
  const navigate = useNavigate();
  const colleges = useSelector(getColleges);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate(`/colleges?q=${e.target[0].value}`);
  };

  return (
    <div className="hero">
      <img
        src={kypeLogo}
        alt="KYPE"
        className="hero-logo"
      />
      <p className="dynamic-paragraph">Explore and Share Reviews!</p>
      <form onSubmit={handleOnSubmit} className="hero-search-form">
        <Autocomplete
        sx={{ width: "360px"}}
          freeSolo
          id="search-field"
          disableClearable
          options={colleges.map((clg) => (clg.name))}
          renderInput={(params) => (
            <TextField
              {...params}
              className="search-bar"
              label="Find your College/School"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
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
