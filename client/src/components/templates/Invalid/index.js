import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    minHeight: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  mt16: {
    marginTop: "16px",
  },
}));

const InvalidTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ErrorOutlineIcon fontSize="large" />
      <Typography variant="body1" className={classes.mt16}>
        {props.text || "Invalid"}
      </Typography>
      {props.button ? (
        props.button.link ? (
          <Button
            className={classes.mt16}
            component={Link}
            to={props.button.link}
            variant="outlined"
            color="secondary"
          >
            {props.button.label}
          </Button>
        ) : (
          <Button
            className={classes.mt16}
            variant="outlined"
            color="secondary"
            onClick={props.onClick}
          >
            {props.button.label}
          </Button>
        )
      ) : null}
    </div>
  );
};

export { InvalidTemplate };
