/*
 ** Using modules here
 ** Need a module bundler, let's use webpack
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Component
// State
// LIfecycle
// UI

class App extends React.Component {
  render() {
    /*
     **     This what our JS invocation would look like if we did not have Babel
     */
    // return React.createElement("div", null, "Hello World");
    /*
     **     Instead we can use JSX because we have Babel as an interpreter
     */
    return <div>Hello World</div>;
  }
}

ReactDOM.render(
  /*
   **   React Element
   */
  <App />,
  /*
   **   Where to render the element to
   */
  document.getElementById("app")
);
