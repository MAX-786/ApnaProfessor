/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColleges, getColleges } from "../../features/collegesSlice";
import { useLoaderData, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./index.css";
import ListColleges from "./ListColleges/ListColleges";

export const Colleges = () => {
  const collegesState = useSelector(getColleges);

  return (
    <>
      <div className="colleges-list-container">
        <ListColleges colleges={collegesState} />
      </div>
    </>
  );
};
