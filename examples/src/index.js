import React from "react";
import { render } from "react-dom";
import MicrosoftLogin from "../../dist";

const conf = {
  client_id: "f8c7976f-3e93-482d-88a3-62a1133cbbc3",
  graphScopes: ["user.read"]
};

const App = () => (
  <MicrosoftLogin
    buttonTheme="light"
    clientId={conf.client_id}
    graphScopes={conf.graphScopes}
  />
);
render(<App />, document.getElementById("root"));
