/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./index.css";
import { Pagination, Box, Tab, Tabs } from "@mui/material";

const Professor = () => {
  const { professor_id } = useParams();
  const [reviews, setReiews] = useState([]);
  const [professor, setProfessor] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [reviewsCount, setReiewsCount] = useState(0);

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

  return (
    <div className="professor-container">
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        {professor?.name}
      </Typography>
      <div className="reviews-wrapper">
        <Box sx={{ borderBottom: 1, borderColor: "divider", alignSelf: "start" }}>
          <Tabs aria-label="lab API tabs example" value={1} indicatorColor="secondary" >
            <Tab sx={{ textTransform: "capitalize", color: "black !important" }} label={`${reviewsCount} student Rating${ reviewsCount > 1 ? "s" : "" }`} value={1} />
          </Tabs>
        </Box>
        {reviews?.map((review) => (
          <Card
            key={review._id}
            sx={{
              maxWidth: 720,
              width: "100%",
              margin: "10px auto",
              border: "2px outset lightgray",
            }}>
            <CardContent>
              <Rating name="read-only" value={review.rating} readOnly />
              <Typography
                sx={{ mb: 1.5, textAlign: "right" }}
                color="text.secondary">
                {new Date(review.createdAt).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </Typography>
              <Typography sx={{ fontSize: "1rem", textAlign: "left" }}>
                {review.text}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Report this review
              </Button>
            </CardActions>
            {/* <p>{review?.course}</p> */}
          </Card>
        ))}
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Professor;
