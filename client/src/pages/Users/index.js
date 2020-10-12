import { Grid, Grow, makeStyles, Typography } from "@material-ui/core";
import FixedButton from "components/Atoms/FixedButton";
import InputSearch from "components/Atoms/InputSearch";
import { useAsyncState } from "components/core/AsyncState";
import { SwitchStatus } from "components/core/SwitchStatus";
import CardUserList from "components/Organisms/Cards/User/List";
import DialogAddUser from "components/Organisms/Dialogs/User/Add";
import DialogDeleteUser from "components/Organisms/Dialogs/User/Delete";
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
  const [openDialogDeleteUser, setOpenDialogDeleteUser] = useState(false);
  const [userSelected, setUserSelected] = useAsyncState({});

  // HANDLERS
  const handleToggleDialogAddUser = () => {
    setOpenDialogAddUser(!openDialogAddUser);
  };

  const handleToggleDialogDeleteUser = () => {
    setOpenDialogDeleteUser(!openDialogDeleteUser);
  };

  const handleSelectUserToDelete = (_id) => {
    const auxUserSelected = users.find((user) => user._id === _id);
    if (auxUserSelected) {
      setUserSelected(auxUserSelected).then((x) => {
        handleToggleDialogDeleteUser();
      });
    }
  };

  const handleAddUser = async (values) => {
    return userService
      .addUser({ user: values })
      .then((response) => {
        setUsers([...users, response.data.user]);
        handleToggleDialogAddUser();
        return { status: true };
      })
      .catch((err) => {
        if (
          err.response.data.message.includes("email address is already taken")
        ) {
          return { status: false, errors: { email: "Email is already taken" } };
        }
      });
  };

  const handleDeleteUser = (_id) => {
    userService.deleteUser(_id).then((x) => {
      setUsers([...users.filter((user) => user._id !== _id)]).then((x) => {
        setUserSelected({}).then((x) => {
          handleToggleDialogDeleteUser();
        });
      });
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
      <DialogDeleteUser
        open={openDialogDeleteUser}
        handlers={{
          onCancel: handleToggleDialogDeleteUser,
          onClose: handleToggleDialogDeleteUser,
          onSubmit: handleDeleteUser,
        }}
        data={userSelected}
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
                    <CardUserList
                      data={user}
                      handlers={{ onDelete: handleSelectUserToDelete }}
                    />
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
