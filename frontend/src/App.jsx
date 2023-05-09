/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from "react";

import './App.css';
// import AddReview from './components/AddReview/AddReview';
import NavBar from './components/NavBar';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import {persistor} from './app/store';
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
