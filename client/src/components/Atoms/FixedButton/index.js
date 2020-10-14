import React from "react";
import PropTypes from "prop-types";
import { IconButton, makeStyles } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    bottom: "10px",
    right: "10px",
  },
}));
const FixedButton = (props) => {
  const classes = useStyles();

  return (
    <IconButton
      className={classes.root}
      color="primary"
      onClick={props.handlers?.onClick}
    >
      <AddCircleIcon
        fontSize="large"
        style={{ background: "white", borderRadius: "100%" }}
      />
    </IconButton>
  );
};

FixedButton.propTypes = {
  handlers: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default FixedButton;
