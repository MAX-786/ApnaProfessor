/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./index.css";
import { Pagination, Box, Tab, Tabs } from "@mui/material";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Review from "./Review";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const Professor = () => {
  const { professor_id } = useParams();
  const [reviews, setReiews] = useState([]);
  const [professor, setProfessor] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [reviewsCount, setReiewsCount] = useState(0);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/professor/${professor_id}?page=${page}`)
      .then(({ data }) => {
        setReiews(data.docs);
        setProfessor(data.professor);
        setPageCount(data.totalPages);
        setReiewsCount(data.totalDocs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [professor_id, page]);

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleAddReview = () => {
    navigate(`/add/review/${professor_id}`, {state: { from : location.pathname }});
  };

  return (
    <div className="professor-container">
      <Typography
        sx={{ fontSize: 24, borderBottom: "1px solid black" }}
        color="text.secondary"
        gutterBottom>
        Professor:{" "}
        <b>
          {professor?.fname +
            `${professor?.mname !== "" ? " " + professor?.mname + " " : " "}` +
            professor?.lname}
        </b>
      </Typography>
      <div className="reviews-wrapper">
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", alignSelf: "start" }}>
          <Tabs
            aria-label="lab API tabs example"
            value={1}
            indicatorColor="secondary">
            <Tab
              sx={{ textTransform: "capitalize", color: "black !important" }}
              label={`${reviewsCount} student Rating${
                reviewsCount > 1 ? "s" : ""
              }`}
              value={1}
            />
          </Tabs>
        </Box>
        {reviews?.map((review) => {  
          return <Review key={review._id} review={review} isVoted={user?.reviews_voted?.includes(review._id) || false} />;
        })}
        <Button id="add-review" onClick={handleAddReview} variant="outlined">
          Add a Review
        </Button>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Professor;
