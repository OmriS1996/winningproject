import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Game from "./pages/Game/Game";
import Homepage from "./pages/Homepage/Homepage";
import Customization from "./pages/Customization/Customization";
import AppContext from "./Context/Context";

function App() {
  const [characterData, setCharacterData] = useState({
    hat: "",
    shirt: "",
    pants: "",
  });

  return (
    <AppContext.Provider
      value={{
        characterData: characterData,
        setCharacterData: setCharacterData,
      }}
    >
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
    </AppContext.Provider>
  );
}

export default App;
