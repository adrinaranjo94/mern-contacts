import { Grid, Grow, makeStyles, Typography } from "@material-ui/core";
import InputSearch from "components/Atoms/InputSearch";
import { useAsyncState } from "components/core/AsyncState";
import { SwitchStatus } from "components/core/SwitchStatus";
import CardUser from "components/Organisms/Cards/User";
import React, { useEffect, useState } from "react";
import UserServices from "services/user.services";

const useStyles = makeStyles(() => ({
  headerContainer: {
    background: "blue",
    minHeight: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "sticky",
    top: "0",
    zIndex: "10",
  },
  content: { minHeight: "calc(100vh - 150px)" },
  title: {
    color: "#fff",
  },
  input: {
    position: "absolute",
    bottom: "-20px",
  },
}));
export const UsersPage = () => {
  const classes = useStyles();
  const userService = new UserServices();
  const [users, setUsers] = useAsyncState([]);
  const [status, setStatus] = useState("downloading");
  useEffect(() => {
    userService
      .getUsers()
      .then((response) => {
        setStatus("loading");
        setTimeout(() => {
          setUsers(response.data.users).then((x) => {
            setStatus("success");
          });
        }, 1000);
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);
  return (
    <Grid container>
      <Grid item xs={12} className={classes.headerContainer}>
        <Typography variant="h4" className={classes.title}>
          Contacts
        </Typography>
        <InputSearch
          classes={[classes.input]}
          disabled={status !== "success" ? true : false}
        />
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <SwitchStatus
          status={status}
          success={() => (
            <Grid container>
              {users.map((user, index) => (
                <Grow in={true} timeout={index === 0 ? 200 : index * 200 + 200}>
                  <Grid item xs={12} md={6} lg={4}>
                    <CardUser data={user} />
                  </Grid>
                </Grow>
              ))}
            </Grid>
          )}
        />
      </Grid>
    </Grid>
  );
};
