import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useAsyncState } from "components/core/AsyncState";
import { SwitchStatus } from "components/core/SwitchStatus";
import CardUserEdit from "components/Organisms/Cards/User/Edit";
import CardUserView from "components/Organisms/Cards/User/View";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import UserServices from "services/user.services";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
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
            <CardUserView user={user} history={history} />
          </Grid>
        );

      case "edit":
        return (
          <Grid item xs={10}>
            <CardUserEdit
              user={user}
              history={history}
              handlers={{ onSubmit: handleEditUser }}
            />
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
