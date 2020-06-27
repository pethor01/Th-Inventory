import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home"
import Stores from "../components/Stores"
import Store from "../components/Store"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/stores" exact component={Stores} />
      <Route path="/store/:id" exact component={Store} />
    </Switch>
  </Router>
);
