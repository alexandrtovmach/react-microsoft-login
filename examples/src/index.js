import React from "react";
import { render } from "react-dom";
import MicrosoftLogin from "../../dist";

const App = () => (
  <MicrosoftLogin
  // buttonTheme="light"
  />
);
render(<App />, document.getElementById("root"));
