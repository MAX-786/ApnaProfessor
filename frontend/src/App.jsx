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
import { PURGE } from "redux-persist";
// import PrivateRoutes from "./utils/PrivateRoutes";



function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    auth.signOut();
  }

  return (
    <>
      {user && <h1>LoggedIn!</h1>}
      {user && <button onClick={handleLogOut}>LogOut</button>}
      
      <NavBar />
      <Outlet />

    </>
  )
}

export default App;
