import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: "80px",
    height: "80px",
    marginBottom: "12px",
  },
  divider: {
    margin: "16px 0",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  mr8: {
    marginRight: "8px",
  },
}));

const CardUserView = (props) => {
  const { history, user } = props;
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12} className={classes.headerContainer}>
            <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
            <Typography variant="body1">
              {`${user.name} ${user.lastName}`}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.divider}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">
              Phone Number: {user.phoneNumber}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.divider}>
          <Divider />
        </Grid>
        <Grid item xs={12} className={classes.actionsContainer}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              history.push("/users");
            }}
            className={classes.mr8}
          >
            Back to users
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              history.push("?action=edit");
            }}
            color="primary"
          >
            Edit user
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

CardUserView.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default CardUserView;
