/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Professor = () => {

    const { professor_id } = useParams();
    const [reviews, setReiews] = useState([]);

    useEffect(() => {
        axios
        .get(`http://localhost:8080/api/professor/${professor_id}`)
        .then((docs) => {
            console.log(docs.data[0].reviews);
            setReiews(docs.data[0].reviews);
        })
        .catch((err) => {
            console.log(err);
        });
    },[professor_id]);

  return (
    <div>{reviews?.map((review) => (
        <div key={review._id}>
            <p>{review.text}</p>
            <p>{review.rating}</p>
            <p>{review?.course}</p>
            <p>Added on: {(new Date(review.createdAt)).toLocaleString("en-GB",{ year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
        </div>
    ))}</div>
  )
}

export default Professor