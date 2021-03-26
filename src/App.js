import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", `/page=:pageNo`]} component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
