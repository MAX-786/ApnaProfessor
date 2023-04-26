/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import "./index.css";

const AddReview = () => {
  const [emptyReview, setEmptyReview] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("0");
  // const reviewText = useRef(null)

  const handleReviewChange = (e) => {
    if (rating !== "0" && e.target.value !== "") setEmptyReview(false);
    else setEmptyReview(true);
    setReviewText(e.target.value);
  };

  const handleRatingChange = (e) => {
    if (e.target.value !== "0") setEmptyReview(false);
    else setEmptyReview(true);
    setRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reviewText);
    console.log(rating);
  }

  return (
    <div>
      <h3 className="reveiw-header">Add review</h3>

      <fieldset className="rating-card" onClick={handleRatingChange}>
        <legend>{rating === "0" ? "Give a rating!" : `You are giving ${rating} star${rating !== "1" ? 's' : ''}`}</legend>
        <input type="radio" id="star5" name="rating" value="5" />
        <label htmlFor="star5"></label>
        <input type="radio" id="star4" name="rating" value="4" />
        <label htmlFor="star4"></label>
        <input type="radio" id="star3" name="rating" value="3" />
        <label htmlFor="star3"></label>
        <input type="radio" id="star2" name="rating" value="2" />
        <label htmlFor="star2"></label>
        <input type="radio" id="star1" name="rating" value="1" />
        <label htmlFor="star1"></label>
      </fieldset>
      <input
        type="textarea"
        name="review-text"
        id="review-text"
        onChange={handleReviewChange}
        placeholder="Tell us a word about your professor..."
      />
      <button type="submit" disabled={emptyReview ? true : false} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddReview;
