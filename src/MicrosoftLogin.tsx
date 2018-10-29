import * as React from "react";
import { UserAgentApplication } from "msal";

import { MicrosoftLoginProps } from "../index";
import MicrosoftLoginButton from "./MicrosoftLoginButton";
// {
//   "@odata.context": string,
//   businessPhones: [string],
//   displayName: string,
//   givenName: string,
//   id: string,
//   jobTitle: string,
//   mail: string,
//   mobilePhone: string,
//   officeLocation: string,
//   preferredLanguage: string,
//   surname: string,
//   userPrincipalName: string
// }

export default class MicrosoftLogin extends React.Component<MicrosoftLoginProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      msalInstance: new UserAgentApplication(props.clientId, null, this.oAuthCallback)
    };
  }

  oAuthCallback(errorDesc: any, token: string|null, error: any, tokenType: any) {
    const { debug } = this.props;
    if (token) {
      debug && console.log(token);
    } else {
      console.error(errorDesc, token, error, tokenType);
    }
  }

  login() {
    const { msalInstance } = this.state;
    const { debug, graphScopes } = this.props;
    msalInstance.loginPopup(graphScopes)
      .then((idToken: string) => {
        debug && console.log("'id_token' getting with 'loginPopup' SUCCEDEED: ", idToken);
        return msalInstance.acquireTokenSilent(graphScopes);
      })
      .catch((error: any) => {
        debug && console.log("'access_token' getting with 'acquireTokenSilent' is FAILED: ", error);
        return msalInstance.acquireTokenPopup(graphScopes);
      })
      .then((accessToken: string) => {
        debug && console.log("'access_token' getting SUCCEDEED: ", accessToken);
        return this.getUserData(accessToken);
      })
      .catch((error: any) => {
        console.error(error);
        
      });
  }

  getUserData(token: string) {
    var headers = {
      Authorization: `Bearer ${token}`
    }
    var options = {
         method: "GET",
         headers: headers
    };
    var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

    fetch(graphEndpoint, options)
      .then((response) => response.json())
      .then(data => console.log(data))
  }


  render() {
    const { buttonTheme, className } = this.props;
    return (
      <div>
        <MicrosoftLoginButton
          buttonTheme={buttonTheme || "light"}
          buttonClassName={className}
          onClick={this.login.bind(this)}
        />
      </div>
    );
  }
}
