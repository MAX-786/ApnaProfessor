/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from "react";

import './App.css';
// import AddReview from './components/AddReview/AddReview';
// import NavBar from './components/NavBar';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import {persistor} from './app/store';
import axios from 'axios';
import { addColleges } from "./features/collegesSlice";
// import PrivateRoutes from "./utils/PrivateRoutes";



function App() {
  const dispatch = useDispatch();
  React.useEffect( () => {
    axios
    .get(`http://localhost:8080/api/college/all`)
    .then(({data}) => {
      dispatch(addColleges(data));
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);
  return <Outlet />
}

export default App;
