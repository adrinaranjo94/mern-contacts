import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
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

const LoadingTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={100} />
      <Typography variant="body1" className={classes.text}>
        {props.text || "Loading"}
      </Typography>
    </div>
  );
};

export { LoadingTemplate };
