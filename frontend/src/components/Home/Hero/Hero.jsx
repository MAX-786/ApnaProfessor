/* eslint-disable no-unused-vars */
import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

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
      <p className="dynamic-paragraph">This is a dynamic paragraph.</p>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Find your College/School"
          className="search-bar"
        />
        <button type="submit" className="button">
          Find
        </button>
      </form>
    </div>
  );
}

export default Hero;
