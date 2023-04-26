/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import './App.css';
// import AddReview from './components/AddReview/AddReview';
import NavBar from './components/NavBar';
import { Outlet } from "react-router-dom";
// import PrivateRoutes from "./utils/PrivateRoutes";



function App() {


  return (
    <>
      <NavBar />
      <Outlet />

    </>
  )
}

export default App;
