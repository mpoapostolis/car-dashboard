import React, { Component } from "react";
import Router from "./routes";
import "./App.css";

class App extends Component {

  render() {
    return (
      <main className="App">
        <Router {...this.props} />
      </main>
    );
  }
}

export default App;
