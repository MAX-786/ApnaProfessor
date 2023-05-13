/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { Pagination, Typography } from "@mui/material";

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

  return (
    <div className="professors-container">
      <div className="professors-wrapper">
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          {college?.name}
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}>
          {professors.map((professor) => (
            <div key={professor._id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <Link to={`/colleges/${college_id}/${professor._id}`}>
                  <ListItemText
                    primary={professor.name}
                    secondary={new Date(professor?.createdAt).toLocaleString(
                      "en-GB",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    )}
                  />
                </Link>
              </ListItem>
            </div>
          ))}
        </List>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} sx={{ display: "flex", flexDirection: "column", alignItems: "center"}} />
      </div>
    </div>
  );
};

export default Professors;
