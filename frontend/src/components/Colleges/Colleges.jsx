/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColleges, getColleges } from "../../features/collegesSlice";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./index.css";
import ListColleges from "./ListColleges/ListColleges";
import { persistor } from "../../app/store";
import { Button, Pagination } from "@mui/material";

export async function loader({ request }) {
  const query = new URL(request.url).searchParams.get("q")
    ? new URL(request.url).searchParams.get("q")
    : "";
  const page = new URL(request.url).searchParams.get("page")
    ? new URL(request.url).searchParams.get("page")
    : "";
    
  let colleges;
  await axios
    .get(`http://localhost:8080/api/college?q=${query}&page=${page}`)
    .then(({ data }) => {
      // console.log(query);
      colleges = {
        ...data,
        query: query,
      };
    })
    .catch((err) => {
      console.log(err);
    });

  return colleges;
}

export const Colleges = () => {
  const colleges = useLoaderData();
  // console.log(colleges);
  const navigate = useNavigate();

  const handleAddCollege = () => {
    navigate("/add/college");
  };

  const handlePageChange = (e,v) => {
    navigate(`/colleges?q${colleges.query}&page=${v}`);
  }

  return (
    <>
      <div className="colleges-list-container">
        <p className="colleges-list-header">
          Found {colleges?.totalDocs} college
          {colleges?.totalDocs > 1 ? "s" : ""} containing &quot;
          {colleges?.query}&quot;{" "}
        </p>
        <ListColleges colleges={colleges?.docs} />
        <Pagination
          page={colleges.page}
          count={colleges.totalPages}
          onChange={handlePageChange}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
        <Button variant="outlined" id="add-college" onClick={handleAddCollege}>
          Add new college
        </Button>
      </div>
    </>
  );
};
