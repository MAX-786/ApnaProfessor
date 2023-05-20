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
    document.title = "Add a Professor | Know Your Teachers Excusively";
  }, []);

  const colleges = useSelector(getColleges);
  const user = useSelector(selectUser);
  const [clgId, setClgId] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const professorData = {
      fname: e.target.querySelector("#fname").value,
      mname: e.target.querySelector("#mname")?.value ? e.target.querySelector("#mname").value : "",
      lname: e.target.querySelector("#lname").value,
      user_id: user._id,
      college_id: clgId,
      department: e.target.querySelector("#dep").value,
      courses: [],
    };

    axios
      .post("http://localhost:8080/api/professor", professorData)
      .then(({ data }) => {
        alert(`${data.fname + `${data.mname !== "" ? ( " " + data.mname + " ") : " "}` + data.lname} is added successfully!`);
        navigate(`/colleges/${data.college_id}/${data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", width: 300, margin: "10px auto"}}>
          <label htmlFor="fname">First Name</label>
          <TextField type="text" name="fname" id="fname" />
          <label htmlFor="mname">Middle Name</label>
          <TextField type="text" name="mname" id="mname" />
          <label htmlFor="lname">Last Name</label>
          <TextField type="text" name="lname" id="lname" />
          <label htmlFor="dep">Professor&apos;s Department</label>
          <TextField type="text" name="dep" id="dep" />
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
