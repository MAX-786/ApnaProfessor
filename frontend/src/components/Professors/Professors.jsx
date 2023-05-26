/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProfessors, getProfessors } from "../../features/professorsSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import "./index.css";
import { Button, Pagination, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Professors = () => {
  const { college_id } = useParams();
  const [professors, setProfessors] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [professorCount, setProfessorCount] = useState(0);
  const [college, setCollege] = useState(null);

  const professorsState = useSelector(getProfessors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setProfessors(professorsState);
  }, [professorsState]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/college/${college_id}?page=${page}`)
      .then(({ data }) => {
        dispatch(addProfessors(data.docs));
        setProfessors(data.docs);
        setPageCount(data.totalPages);
        setProfessorCount(data.totalDocs);
        setCollege(data.college);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleAddProfessor = () => {
    navigate("/add/professor", {
      state: { from: location.pathname + location.search },
    });
  };

  const calculateAverageRating = (totalRating, totalCount) => {
    let sum = 0;

    for (let star in totalRating) {
      const count = totalRating[star];
      sum += parseInt(star[4]) * count;
    }

    if (totalCount === 0) {
      return 0; // Return 0 if there are no reviews yet
    }

    const averageRating = sum / totalCount;
    const roundedRating = averageRating.toFixed(1); // Round to 1 decimal place

    return parseFloat(roundedRating);
  };

  return (
    <div className="professors-container">
      <div className="professors-wrapper">
        <Typography
          sx={{
            fontSize: 24,
            borderBottom: "1px solid black",
            textAlign: "left",
          }}
          color="text.secondary"
          gutterBottom>
          College: <b>{college?.name}</b>
        </Typography>
        <List
          className="professors-list"
          sx={{
            width: "100%",
            maxWidth: 720,
            bgcolor: "background.paper",
          }}>
          {professors.map((professor) => (
            <div key={professor._id} className="professor-item-container">
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    alt="average rating"
                    sx={{ width: 56, height: 56, bgcolor: "white" }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "1.8rem",
                      }}>
                      {calculateAverageRating(
                        professor.total_rating,
                        professor.review_count
                      )}
                    </Typography>
                  </Avatar>
                  <Typography
                    variant="helper-text"
                    sx={{ fontSize: "8px", marginLeft: "6px" }}>
                    overall rating
                  </Typography>
                </ListItemAvatar>
                <Link to={`/colleges/${college_id}/${professor._id}`}>
                  <ListItemText
                    sx={{ marginLeft: "1rem" }}
                    primary={
                      professor.fname +
                      `${
                        professor.mname !== ""
                          ? " " + professor.mname + " "
                          : " "
                      }` +
                      professor.lname
                    }
                    secondary={`${professor?.review_count} reviews`}
                  />
                </Link>
                <Typography variant="helper-text" sx={{ position: "absolute", right: 0, top: "1rem", fontSize: "11px", fontWeight: 300 }}>
                  {new Date(professor?.createdAt).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              </ListItem>
            </div>
          ))}
        </List>
        <Button
          id="add-professor"
          onClick={handleAddProfessor}
          variant="outlined">
          Add new Professor
        </Button>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
      </div>
    </div>
  );
};

export default Professors;
