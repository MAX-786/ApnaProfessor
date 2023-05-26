import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addColleges } from "../../features/collegesSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./index.css";

export const Layout = () => {
  // const navigate = useNavigate();

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .get(`${process.VITE_API_BASE_URL}/college?q=${e.target[0].value}`)
  //     .then((docs) => {
  //       dispatch(addColleges(docs.data));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   navigate(`/colleges?q=${e.target[0].value}`);
  // };

  return (
    <>
      <div className="layout-container">
        <div className="navbar-container">
          <NavBar />
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
