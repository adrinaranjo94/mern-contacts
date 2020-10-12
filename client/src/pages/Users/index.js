import { Grid, Grow, makeStyles, Typography } from "@material-ui/core";
import FixedButton from "components/Atoms/FixedButton";
import InputSearch from "components/Atoms/InputSearch";
import { useAsyncState } from "components/core/AsyncState";
import { SwitchStatus } from "components/core/SwitchStatus";
import CardUser from "components/Organisms/Cards/User";
import DialogAddUser from "components/Organisms/Dialogs/AddUser";
import React, { useState } from "react";
import UserServices from "services/user.services";

const useStyles = makeStyles(() => ({
  headerContainer: {
    background: "#3f51b5",
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
  const [status, setStatus] = useState("action_download");
  const [openDialogAddUser, setOpenDialogAddUser] = useState(false);

  // HANDLERS
  const handleToggleDialogAddUser = () => {
    setOpenDialogAddUser(!openDialogAddUser);
  };

  const handleAddUser = async (values) => {
    console.log(values);
    return userService
      .addUser({ user: values })
      .then((response) => {
        setUsers([...users, response.data.user]);
        handleToggleDialogAddUser();
        return { status: true };
      })
      .catch((err) => {
        if (
          err.response.data.message.includes("email addres is already taken")
        ) {
          return { status: false, errors: { email: "Email is already taken" } };
        }
      });
  };
  // EMD HANDLERS

  const downloadUsers = () => {
    setStatus("downloading");
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
  };

  return (
    <Grid container>
      <FixedButton handlers={{ onClick: handleToggleDialogAddUser }} />
      <DialogAddUser
        open={openDialogAddUser}
        handlers={{
          onClose: handleToggleDialogAddUser,
          onCancel: handleToggleDialogAddUser,
          onSubmit: handleAddUser,
        }}
      />
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
          action_download={() => {
            downloadUsers();
            return null;
          }}
          success={() => (
            <Grid container>
              {users.map((user, index) => (
                <Grow
                  in={true}
                  timeout={index === 0 ? 200 : (index + 1) * 200}
                  key={`user-${user._id}`}
                >
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
