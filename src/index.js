import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import StartPage from "./views/startpage";
import CallPage from "./views/callpage";
import "./app.css";

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={StartPage} />
      <Route
        path="/:room"
        component={({ match }) => <CallPage room={match.params.room} />}
      />
    </React.Fragment>
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
