import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

const DialogDefault = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handlers?.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
};

DialogDefault.defaultProps = {
  open: false,
};

DialogDefault.propTypes = {
  open: PropTypes.bool,
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default DialogDefault;
