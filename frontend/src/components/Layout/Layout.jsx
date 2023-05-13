import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addColleges } from "../../features/collegesSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./index.css";
import { persistor } from "../../app/store";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("q")
    ? new URL(request.url).searchParams.get("q")
    : "";
}

export const Layout = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .get(`http://localhost:8080/api/college?q=${e.target[0].value}`)
  //     .then((docs) => {
  //       dispatch(addColleges(docs.data));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   navigate(`/colleges?q=${e.target[0].value}`);
  // };

  const query = useLoaderData();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/college?q=${query}`)
      .then(({data}) => {
        console.log(data);
        persistor.purge(['persistedReducerColleges']);
        dispatch(addColleges(data));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <div className="layout-container">
        <div className="navbar-container">
          <div className="navbar-wrapper">
            <NavBar />
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
