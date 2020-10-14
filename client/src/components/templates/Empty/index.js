import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  text: {
    marginTop: "16px",
  },
}));

const EmptyTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SentimentVeryDissatisfiedIcon fontSize="large" />
      <Typography variant="body1" className={classes.text}>
        {props.text || "Empty users list"}
      </Typography>
    </div>
  );
};

export { EmptyTemplate };
