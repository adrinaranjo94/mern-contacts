import React from "react";
import PropTypes from "prop-types";
import DialogDefault from "../../Default";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  user: {
    fontWeight: "bold",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  mr8: {
    marginRight: "8px",
  },
  content: {
    minHeight: "100px",
  },
}));
const DialogDeleteUser = (props) => {
  const { data, handlers, open } = props;
  const classes = useStyles();
  return (
    <DialogDefault open={open} handlers={handlers} title={"Delete User"}>
      <Grid container>
        <Grid item xs={12} className={classes.content}>
          <Typography variant="body1">
            Are you sure to delete{" "}
            <span className={classes.user}>{data?.name}</span>
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.actionsContainer}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handlers?.onCancel}
            className={classes.mr8}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={() => handlers?.onSubmit(data?._id)}
            color="primary"
          >
            Delete user
          </Button>
        </Grid>
      </Grid>
    </DialogDefault>
  );
};

DialogDeleteUser.defaultProps = {
  open: false,
};

DialogDeleteUser.propTypes = {
  open: PropTypes.bool.isRequired,
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.object.isRequired,
};

export default DialogDeleteUser;
