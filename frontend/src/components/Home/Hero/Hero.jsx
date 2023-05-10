/* eslint-disable no-unused-vars */
import React from 'react';
import './index.css';

function Hero() {
  return (
    <div className="hero">
      <img src="/src/assets/kyte-logo.png" alt="Website Logo" className="hero-logo" />
      <p className="dynamic-paragraph">This is a dynamic paragraph.</p>
      <input type="text" placeholder="Search" className="search-bar" />
      <button className="button">Click Me</button>
    </div>
  );
}

export default Hero