import * as React from "react";
import { UserAgentApplication } from "msal";

import { MicrosoftLoginProps, GraphAPIUserData } from "../index";
import MicrosoftLoginButton from "./MicrosoftLoginButton";

export default class MicrosoftLogin extends React.Component<
  MicrosoftLoginProps,
  any
> {
  constructor(props: any) {
    super(props);
    const { debug, graphScopes, withUserData } = props;
    const scope = ((graphScopes && graphScopes.length) || []) as string[];
    scope.some(el => el.toLowerCase() === "user.read") ||
      scope.push("user.read");

    this.state = {
      msalInstance: new UserAgentApplication(props.clientId, null, () => {}),
      scope: scope,
      debug: debug || false,
      withUserData: withUserData || false
    };
  }

  componentDidMount() {
    const { msalInstance, scope, debug, withUserData } = this.state;
    const { authCallback } = this.props;
    // avoid duplicate code execution on page load in case of iframe and popup window.
    if (
      msalInstance.getUser() &&
      !msalInstance.isCallback(window.location.hash) &&
      window.localStorage.outlook_login_initiated
    ) {
      window.localStorage.removeItem("outlook_login_initiated");
      debug && this.log("Fetch Azure AD 'token' with redirect SUCCEDEED", true);
      debug &&
        this.log("Fetch Graph API 'access_token' in silent mode STARTED", true);
      this.getGraphAPITokenAndUser(
        msalInstance,
        scope,
        withUserData,
        authCallback,
        true,
        debug
      );
    } else if (
      !msalInstance.isCallback(window.location.hash) &&
      window.localStorage.outlook_login_initiated
    ) {
      window.localStorage.removeItem("outlook_login_initiated");
      debug &&
        this.log(
          "Fetch Azure AD 'token' with redirect FAILED",
          "Something went wrong",
          true
        );
      authCallback("Something went wrong");
    }
  }

  login() {
    const { msalInstance, scope, withUserData, debug } = this.state;
    const { authCallback } = this.props;
    debug && this.log("Login STARTED", true);

    if (this.checkToIE()) {
      this.redirectLogin(msalInstance, scope, debug);
    } else {
      this.popupLogin(msalInstance, scope, withUserData, authCallback, debug);
    }
  }

  getGraphAPITokenAndUser(
    msalInstance: any,
    scope: string[],
    withUserData: boolean,
    authCallback: any,
    isRedirect: boolean,
    debug: boolean
  ) {
    return msalInstance
      .acquireTokenSilent(scope)
      .catch((error: any) => {
        debug &&
          this.log(
            "Fetch Graph API 'access_token' in silent mode is FAILED",
            error,
            true
          );
        debug &&
          this.log(
            `Fetch Graph API 'access_token' with ${
              isRedirect ? "redirect" : "popup"
            } STARTED`,
            true
          );
        return isRedirect
          ? msalInstance.acquireTokenRedirect(scope)
          : msalInstance.acquireTokenPopup(scope);
      })
      .then((accessToken: string) => {
        debug &&
          this.log("Fetch Graph API 'access_token' SUCCEDEED", accessToken);
        if (withUserData) {
          this.getUserData(accessToken);
        } else {
          debug && this.log("Login SUCCEDED", true);
          authCallback(null, { accessToken });
        }
      })
      .catch((error: any) => {
        this.log("Login FAILED", error, true);
        authCallback(error);
      });
  }

  popupLogin(
    msalInstance: any,
    scope: string[],
    withUserData: boolean,
    authCallback: any,
    debug: boolean
  ) {
    debug && this.log("Fetch Azure AD 'token' with popup STARTED", true);
    msalInstance.loginPopup(scope).then((idToken: string) => {
      debug && this.log("Fetch Azure AD 'token' with popup SUCCEDEED", idToken);
      debug &&
        this.log("Fetch Graph API 'access_token' in silent mode STARTED", true);
      this.getGraphAPITokenAndUser(
        msalInstance,
        scope,
        withUserData,
        authCallback,
        false,
        debug
      );
    });
  }

  redirectLogin(msalInstance: any, scope: string[], debug: boolean) {
    debug && this.log("Fetch Azure AD 'token' with redirect STARTED", true);
    window.localStorage.setItem("outlook_login_initiated", "true");
    msalInstance.loginRedirect(scope);
  }

  getUserData(token: string) {
    const { authCallback, debug } = this.props;
    debug && this.log("Fetch Graph API user data STARTED", true);
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return fetch("https://graph.microsoft.com/v1.0/me", options)
      .then((response: Response) => response.json())
      .then((userData: GraphAPIUserData) => {
        debug && this.log("Fetch Graph API user data SUCCEDEED", userData);
        debug && this.log("Login SUCCEDED", true);
        authCallback(null, {
          ...userData,
          accessToken: token
        });
      });
  }

  checkToIE(): boolean {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ");
    const msie11 = ua.indexOf("Trident/");
    const msedge = ua.indexOf("Edge/");
    const isIE = msie > 0 || msie11 > 0;
    const isEdge = msedge > 0;
    return isIE || isEdge;
  }

  log(name: string, content: any, isError?: boolean) {
    const style = `background-color: ${
      isError ? "#990000" : "#009900"
    }; color: #ffffff; font-weight: 700; padding: 2px`;
    console.groupCollapsed("MSLogin debug");
    console.log(`%c${name}`, style);
    console.log(content);
    console.groupEnd();
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
