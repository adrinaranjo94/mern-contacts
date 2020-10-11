import React from "react";

import PropTypes from "prop-types";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    margin: "24px",
  },
  actions: {
    justifyContent: "flex-end",
  },
  viewIcon: {
    color: "rgba(0, 0, 0, 0.54)",
    "&:hover": {
      color: "green",
    },
  },
  editIcon: {
    color: "rgba(0, 0, 0, 0.54)",
    "&:hover": {
      color: "yellow",
    },
  },
  deleteIcon: {
    color: "rgba(0, 0, 0, 0.54)",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
}));

const CardUser = (props) => {
  const classes = useStyles();
  const { data, handlers } = props;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar>{data?.name[0] || ""}</Avatar>}
        title={`${data?.name || ""} ${data?.lastName || ""}`}
        subheader={`${data?.email || ""}`}
      />
      <CardActions className={classes.actions}>
        <Link
          to={`/users/${data._id}?action=view`}
          className={classes.viewIcon}
        >
          <VisibilityIcon />
        </Link>
        <Link
          to={`/users/${data._id}?action=edit`}
          className={classes.editIcon}
        >
          <CreateIcon className={classes.editIcon} />
        </Link>
        <DeleteIcon
          onClick={() => {
            handlers.onDelete(data._id);
          }}
          className={classes.deleteIcon}
        />
      </CardActions>
    </Card>
  );
};

CardUser.propTypes = {
  classes: PropTypes.array,
  styles: PropTypes.object,
  data: PropTypes.object,
  handlers: PropTypes.object,
};

export default CardUser;
