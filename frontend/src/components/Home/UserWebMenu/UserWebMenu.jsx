/* eslint-disable no-unused-vars */
import React from 'react'
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../features/userSlice";
import { auth } from "../../../firebase";
import {persistor} from '../../../app/store';
import { useNavigate } from 'react-router-dom';

const UserWebMenu = () => {

  const user = useSelector(selectUser) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.signOut();
    dispatch(logout());
    persistor.purge();
  }

  const handleLogIn = () => {
    navigate("/login");
  }

  return (
    <div className="user-web-menu-wrapper">
      { Object.keys(user).length === 0 ? <button className="login" onClick={handleLogIn}>Log In</button> : <button className="logout" onClick={handleLogOut}>Log Out</button>}
    </div>
  )
}

export default UserWebMenu