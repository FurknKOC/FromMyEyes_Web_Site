import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
// pages
import Index from "views/Index.js";
import Login from "views/Login.js";
import NucleoIcons from "views/NucleoIcons.js";
import CreateUser from "./views/CreateUser";
import UserPage from "./views/UserPage";
import FindUserPage from "./views/FindUserPage";
// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/nucleo-icons"
        render={(props) => <NucleoIcons {...props} />}
      />
      <Route
          path="/views/Login"
          render={(props) => <Login {...props} />}
      />
      <Route
          path="/views/CreateUser"
          render={(props) => <CreateUser {...props} />}
      />
      <Route
          path="/views/UserPage"
          render={(props) => <UserPage {...props} />}
      />
      <Route
          path="/views/FindUserPage"
          render={(props) => <FindUserPage {...props} />}
      />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
