import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import "./index.css";

export default function ListColleges(props) {
  const { colleges } = props;

  return (
    <div>
      <List
        className="colleges-list-wrapper"
        sx={{
          width: "100%",
          maxWidth: 720,
          bgcolor: "background.paper",
        }}>
        {colleges?.map((college) => (
          <div key={college._id} className="college-container">
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SchoolIcon />
                </Avatar>
              </ListItemAvatar>
              <Link to={`/colleges/${college._id}`}>
                <ListItemText
                  primary={college.name}
                  secondary={new Date(college?.createdAt).toLocaleString(
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
    </div>
  );
}
