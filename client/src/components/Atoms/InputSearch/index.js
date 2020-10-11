import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    background: "#fff",
    padding: "8px 16px",
    borderRadius: "8px",
    alignItems: "center",
    maxWidth: "400px",
    flex: "1",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },

  input: {
    outline: "none",
    border: 0,
    flex: "1",
    fontSize: "14px",
  },
}));

const InputSearch = (props) => {
  const classes = useStyles();
  return (
    <div
      className={
        props.classes
          ? [[...props.classes], classes.root].join(" ")
          : classes.root
      }
    >
      <input
        type="text"
        placeholder="Type to search user"
        className={classes.input}
        disabled={props.disabled}
      />
      <SearchIcon />
    </div>
  );
};

InputSearch.defaultProps = {
  disabled: false,
};

InputSearch.propTypes = {
  classes: PropTypes.array,
  disabled: PropTypes.bool,
};

export default InputSearch;
