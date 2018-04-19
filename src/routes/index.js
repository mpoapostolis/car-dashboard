import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from "./Dashboard";
import pluck from "ramda/src/pluck";
import AuthWrapper from "../components/AuthWrapper";

const Routes = props => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <AuthWrapper {...routeProps} component={Dashboard} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
