/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./index.css";
import { Country, State, City } from "country-state-city";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const AddCollege = () => {
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [location, setLocation] = React.useState({
    country: "",
    state: "",
    city: "",
  });

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(countryCode);
  const cities = City.getCitiesOfState(countryCode, stateCode);

  const user = useSelector(selectUser) || {};

  React.useEffect(() => {
    // Update the page title
    document.title = "Add a College | Know Your Teachers Excusively";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const collegeData = {
      name: e.target.querySelector("#name").value,
      user_id: user._id,
      country: e.target.querySelector("#country-select").value,
      state: e.target.querySelector("#state-select").value,
      city: e.target.querySelector("#city-select").value,
    };

    axios
      .post("http://localhost:8080/api/college", collegeData)
      .then((err, res) => {
        if (err) console.log(err);
        else console.log(res);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField type="text" id="name" name="name" placeholder="Name" />
        <Box
          sx={{
            width: 300,
            margin: "10px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "200px",
          }}>
          <Autocomplete
            onChange={(e, opt) => {
              setCountryCode(opt.isoCode);
              setLocation((prev) => ({ ...prev, country: opt.name }));
            }}
            id="country-select"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => {
              return (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.isoCode.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.isoCode.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.name} ({option.isoCode})
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Autocomplete
            id="state-select"
            sx={{ width: 300 }}
            onChange={(e, opt) => {
              setStateCode(opt?.isoCode);
            }}
            options={states}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.name} ({option.isoCode})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Autocomplete
            id="city-select"
            sx={{ width: 300 }}
            options={cities}
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
                label="City"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Box>
        <button type="submit">Add College</button>
      </form>
    </div>
  );
};

export default AddCollege;
