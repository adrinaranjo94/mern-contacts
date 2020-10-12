import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor";
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
  search: { fontWeight: "bold" },
}));

const NotFoundTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <YoutubeSearchedForIcon fontSize="large" />
      <Typography variant="body1" className={classes.text}>
        <span className={classes.search}>{props.search}</span> not found...
      </Typography>
    </div>
  );
};

export { NotFoundTemplate };
