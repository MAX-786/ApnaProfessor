/* eslint-disable react/prop-types */
import React from "react";
import "./index.css";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, addReviewId, removeReviewId } from "../../features/userSlice";
const process = import.meta.env;

const Review = ({ review, isVoted }) => {
  const [isUpvoted, setIsUpvoted] = React.useState(isVoted);
  const [votes, setVotes] = React.useState(review.votes);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleUpvote = async () => {
    if (user ? Object.keys(user).length === 0 : true) {
      // Not loggedIn
      alert("Please LogIn to upvote!");
      return;
    }

    const data = {
      isUpvoted: !isUpvoted,
      user_id: user._id,
    };
    await axios
      .post(`${process.VITE_API_BASE_URL}/review/${review._id}`, data)
      .then((res) => {
        setIsUpvoted((prev) => !prev);
        setVotes((prev) => (!isUpvoted ? prev + 1 : prev - 1));
        if (!isUpvoted) dispatch(addReviewId(review._id));
        else dispatch(removeReviewId(review._id));
        // console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    // console.log(!isUpvoted, review._id);
  };

  return (
    <Card
      key={review._id}
      sx={{
        maxWidth: 720,
        width: "100%",
        margin: "10px auto",
        border: "2px outset lightgray",
        borderRadius: "1rem",
        bgcolor: "#c0fff3",
      }}>
      <CardContent>
        <Rating size="large" name="read-only" value={review.rating} readOnly />
        <Typography sx={{ mb: 1.5, textAlign: "right" }} color="text.secondary">
          {new Date(review.createdAt).toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Typography>
        <Typography sx={{ fontSize: "1rem", textAlign: "left" }}>
          {review.text}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <div className="rating-upvote-container">
          <Button size="small" color="primary" onClick={handleUpvote}>
            {isUpvoted ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
          </Button>
          <Typography variant="caption">{votes}</Typography>
        </div>

        <Button size="small" color="primary">
          <FlagOutlinedIcon />
        </Button>
      </CardActions>
      {/* <p>{review?.course}</p> */}
    </Card>
  );
};

export default Review;
