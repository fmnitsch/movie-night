import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import TopRanked from "./Components/TopRanked/TopRanked";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/movie-night" exact component={Home} />
          <Route path="/movie-night/top-ranked" component={TopRanked} />
        </Switch>
      </Router>
    );
  }
}

export default App;
