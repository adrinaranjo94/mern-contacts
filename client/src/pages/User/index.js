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
import { useAsyncState } from "components/core/AsyncState";
import { SwitchStatus } from "components/core/SwitchStatus";
import FormUser from "components/Molecules/Forms/User";
import React, { useState } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import UserServices from "services/user.services";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
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
export const UserPage = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const userService = new UserServices();

  const action = queryParams.get("action");
  const [user, setUser] = useAsyncState({});
  const [status, setStatus] = useState("action_download");

  const downloadUser = () => {
    setStatus("downloading");
    userService
      .getUser(params.userId)
      .then((response) => {
        setStatus("loading");
        setTimeout(() => {
          setUser(response.data.user).then((x) => {
            setStatus("success");
          });
        }, 1000);
      })
      .catch((err) => {
        setStatus("error");
      });
  };

  const handleEditUser = async (values) => {
    return userService
      .updateUser(params.userId, { user: values })
      .then((response) => {
        console.log(response);
        setUser(response.data.user).then((x) => {
          history.push("?action=view");
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (
          err.response.data.message.includes("email address is already taken")
        ) {
          return { status: false, errors: { email: "Email is already taken" } };
        }
      });
  };

  const switchAction = () => {
    switch (action) {
      case "view":
        return (
          <Grid xs={10}>
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
          </Grid>
        );

      case "edit":
        return (
          <Grid item xs={10}>
            <Card>
              <CardContent>
                <FormUser
                  onCancel={() => {
                    history.push("?action=view");
                  }}
                  onSubmit={handleEditUser}
                  data={user}
                  mode="edit"
                />
              </CardContent>
            </Card>
          </Grid>
        );
      default:
        return <Redirect to="?action=view" />;
    }
  };
  return (
    <Grid container className={classes.root}>
      <SwitchStatus
        status={status}
        action_download={() => {
          downloadUser();
          return null;
        }}
        success={() => switchAction()}
      />
    </Grid>
  );
};
