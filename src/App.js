import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Game from "./pages/Game/Game";
import Homepage from "./pages/Homepage/Homepage";
import Customization from "./pages/Customization/Customization";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/game">
          <Game />
        </Route>
        <Route exact path="/customization">
          <Customization />
        </Route>
        <Route exact path="/homepage">
          <Homepage />
        </Route>
        <Route path="/">
          <Redirect to="/homepage" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
