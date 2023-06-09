import React from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { TextField, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
const process = import.meta.env;

const labels = {
  0: "-",
  1: "Worst",
  2: "Not worst",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value > 1 ? "s" : ""}, ${labels[value]}`;
}

const AddReview = () => {
  const [RatingValue, setRatingValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  const { professor_id } = useParams();
  const college_id = React.useRef(null);
  const [profName, setProfName] = React.useState("");
  const user = useSelector(selectUser);
  const [ attd_value , setAttdValue] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Update the page title
    document.title = "Add a Review | Know Your Professors Excusively";

    axios
      .get(`${process.VITE_API_BASE_URL}/professor/${professor_id}?prof_only=true`)
      .then(({ data }) => {
        setProfName(
          data.fname +
            `${data.mname !== "" ? " " + data.mname + " " : " "}` +
            data.lname
        );
        college_id.current = data.college_id;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [professor_id]);

  const handleAttdChange = (e) => {
    setAttdValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      text: e.target.querySelector("#review-text").value,
      professor_id: professor_id,
      course: e.target.querySelector("#course").value,
      rating: RatingValue,
      user_id: user._id,
      votes: 0,
      mandatory_attd: attd_value,
    };

    axios
      .post(`${process.VITE_API_BASE_URL}/review`, reviewData)
      .then(({ data }) => {
        // console.log(data);
        navigate(`/colleges/${college_id.current}/${professor_id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2 className="review-header">Review: {profName}</h2>
      <form onSubmit={handleSubmit} className="addreview-form">
        {RatingValue !== null ? (
          <Box sx={{ fontSize: "1.3rem" }}>{labels[hover !== -1 ? hover : RatingValue]}</Box>
        ) : (
          <Box sx={{ fontSize: "1.3rem" }}>-</Box>
        )}
        <Box
          sx={{
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
          }}>
          <Rating
            size="large"
            name="hover-feedback"
            value={RatingValue}
            getLabelText={getLabelText}
            onChange={(event, newRatingValue) => {
              setRatingValue(newRatingValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </Box>
        <TextField
          id="course"
          type="search"
          label="Course/Subject"
          inputProps={{ maxLength: 200 }}
        />
        <TextField
          id="review-text"
          type="search"
          label="Add something more?"
          inputProps={{ maxLength: 200 }}
        />
        <Typography sx={{fontSize: "1.3rem"}}>Was attendance mandatory?</Typography>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="attd"
          value={attd_value}
          className="radio-group-attd"
          onChange={handleAttdChange}>
          <FormControlLabel
            value={true}
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
        <button
          type="submit"
          disabled={RatingValue === 0 || RatingValue === null ? true : false}>
          Add Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
