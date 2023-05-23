import React from "react";
import "./index.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { getColleges } from "../../features/collegesSlice";
import { useNavigate } from "react-router-dom";

const AddProfessor = () => {
  React.useEffect(() => {
    // Update the page title
    document.title = "Add a Professor | Know Your Professors Excusively";
  }, []);

  const colleges = useSelector(getColleges);
  const user = useSelector(selectUser);
  const [clgId, setClgId] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const professorData = {
      fname: e.target.querySelector("#fname").value,
      mname: e.target.querySelector("#mname")?.value
        ? e.target.querySelector("#mname").value
        : "",
      lname: e.target.querySelector("#lname").value,
      user_id: user._id,
      college_id: clgId,
      department: e.target.querySelector("#dep").value,
      courses: [],
    };

    axios
      .post("http://localhost:8080/api/professor", professorData)
      .then(({ data }) => {
        alert(
          `${
            data.fname +
            `${data.mname !== "" ? " " + data.mname + " " : " "}` +
            data.lname
          } is added successfully!`
        );
        navigate(`/colleges/${data.college_id}/${data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="addcollege-header">Add a professor</h2>
        <h4 className="addcollege-sub-header">
          Before adding a professor, please make sure that it does not exists!
        </h4>
        <Box
          sx={{
            width: 300,
            margin: "10px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "400px",
          }}>
          <TextField type="search" label="First Name" name="fname" id="fname" />
          <TextField
            type="search"
            label="Middle Name (optional)"
            name="mname"
            id="mname"
          />
          <TextField type="search" label="Last Name" name="lname" id="lname" />
          <TextField type="search" label="Department" name="dep" id="dep" />
          <Autocomplete
            id="college-select"
            sx={{ width: 300 }}
            onChange={(e, opt) => {
              setClgId(opt._id);
            }}
            options={colleges}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="College"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <button type="submit">Add Professor</button>
        </Box>
      </form>
    </div>
  );
};

export default AddProfessor;
