import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { IndexRoute, browserHistory, Switch } from "react-router";
import Home from "./components/Home";
import Create from "./components/Create";
import Edit from "./components/Edit";
export default function app() {
  return (
    <div>
      <Router>
        <Route exact path={"/"} component={Create} />
        <Route path="/Add" component={Home} />
        <Route path="/edit/:uid" component={Edit} />
      </Router>
    </div>
  );
}
