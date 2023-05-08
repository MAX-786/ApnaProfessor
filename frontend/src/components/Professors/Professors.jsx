/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProfessors, getProfessors } from '../../features/professorsSlice';

// eslint-disable-next-line react/prop-types
const Professors = ({ college_id }) => {

  const [professors, setProfessors] = useState([]);
  const professorsState = useSelector(getProfessors);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setProfessors(professorsState);
  },[professorsState]);

  
  useEffect(() => {
    if (!professorsState?.length) {
      axios
      .get(`http://localhost:8080/api/college/${college_id}`)
      .then((docs) => {
        dispatch(addProfessors(docs.data[0].professors)); 
        setProfessors(professorsState);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>{professors?.map((professor) => (
      <div key={professor._id}>
        <p>Name: {professor.name}</p>
        <p>Added on: {(new Date(professor.createdAt)).toLocaleString("en-GB",{ year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
      </div>
    ))}</div>
  )
}

export default Professors