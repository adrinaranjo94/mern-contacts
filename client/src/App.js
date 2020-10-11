import { UserPage } from "pages/User";
import { UsersPage } from "pages/Users";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          return <Redirect to="/users" />;
        }}
      />
      <Route path="/users" exact component={UsersPage} />
      <Route path="/users/:userId" exact component={UserPage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
