import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";

export default function ListColleges(props) {
  const { colleges } = props;

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}>
      {colleges?.map((college) => (
        <div key={college._id}>
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
  );
}
