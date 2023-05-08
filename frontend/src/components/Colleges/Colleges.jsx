/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addColleges, getColleges } from '../../features/collegesSlice';

const Colleges = () => {

  const [colleges, setColleges] = useState([]);
  const collegesState = useSelector(getColleges);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setColleges(collegesState);
  },[collegesState]);

  useEffect(() => {
    // console.log(collegesState);
    if (!collegesState?.length) {
      axios
      .get("http://localhost:8080/api/college/")
      .then((docs) => {
        dispatch(addColleges(docs.data)); 
        setColleges(collegesState); 
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [dispatch]);
  



  return (
    <div>
      {colleges.map((college) => 
        (<div key={college._id}>
          <p>Name: {college.name}</p>
          <p>Added on: {(new Date(college?.createdAt)).toLocaleString("en-GB",{ year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
        </div>)
      )}
    </div>
  )
}

export default Colleges