import * as React from "react";
import { UserAgentApplication } from "msal";

import { MicrosoftLoginProps, GraphAPIUserData } from "../index";
import MicrosoftLoginButton from "./MicrosoftLoginButton";

const CLIENT_ID_REGEX = /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/;

export default class MicrosoftLogin extends React.Component<
  MicrosoftLoginProps,
  any
> {
  constructor(props: any) {
    super(props);
    const { graphScopes } = props;
    const scope = (graphScopes || []) as string[];
    scope.some(el => el.toLowerCase() === "user.read") ||
      scope.push("user.read");

    this.state = {
      msalInstance:
        props.clientId &&
        CLIENT_ID_REGEX.test(props.clientId) &&
        new UserAgentApplication(
          props.clientId,
          props.tenantUrl || null,
          () => {}
        ),
      scope: scope
    };
  }

  componentDidMount() {
    const { msalInstance } = this.state;
    // avoid duplicate code execution on page load in case of iframe and popup window.
    if (msalInstance) {
      this.initialize(msalInstance);
    } else {
      this.log("Initialization", "clientID broken or not provided", true);
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { clientId, tenantUrl } = this.props;
    if (prevProps.clientId !== clientId || prevProps.tenantUrl !== tenantUrl) {
      this.setState({
        msalInstance:
          clientId &&
          CLIENT_ID_REGEX.test(clientId) &&
          new UserAgentApplication(clientId, tenantUrl || null, () => {})
      });
    }
  }

  initialize(msalInstance: any) {
    const { scope } = this.state;
    const { authCallback, debug = false, withUserData = false } = this.props;
    if (
      msalInstance.getUser() &&
      !msalInstance.isCallback(window.location.hash) &&
      window.localStorage.outlook_login_initiated
    ) {
      window.localStorage.removeItem("outlook_login_initiated");
      debug && this.log("Fetch Azure AD 'token' with redirect SUCCEDEED");
      debug &&
        this.log("Fetch Graph API 'access_token' in silent mode STARTED");
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

  login = () => {
    const { msalInstance, scope } = this.state;
    const {
      withUserData = false,
      authCallback,
      forceRedirectStrategy = false,
      debug = false
    } = this.props;

    if (msalInstance) {
      debug && this.log("Login STARTED");
      if (forceRedirectStrategy || this.checkToIE()) {
        this.redirectLogin(msalInstance, scope, debug);
      } else {
        this.popupLogin(msalInstance, scope, withUserData, authCallback, debug);
      }
    } else {
      this.log("Login FAILED", "clientID broken or not provided", true);
    }
  };

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
            } STARTED`
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
          debug && this.log("Login SUCCEDED");
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
    debug && this.log("Fetch Azure AD 'token' with popup STARTED");
    msalInstance
      .loginPopup(scope)
      .then((idToken: string) => {
        debug &&
          this.log("Fetch Azure AD 'token' with popup SUCCEDEED", idToken);
        debug &&
          this.log("Fetch Graph API 'access_token' in silent mode STARTED");
        this.getGraphAPITokenAndUser(
          msalInstance,
          scope,
          withUserData,
          authCallback,
          false,
          debug
        );
      })
      .catch((error: any) => {
        this.log("Fetch Azure AD 'token' with popup FAILED", error, true);
        authCallback(error);
      });
  }

  redirectLogin(msalInstance: any, scope: string[], debug: boolean) {
    debug && this.log("Fetch Azure AD 'token' with redirect STARTED");
    window.localStorage.setItem("outlook_login_initiated", "true");
    msalInstance.loginRedirect(scope);
  }

  getUserData(token: string) {
    const { authCallback, debug = false } = this.props;
    debug && this.log("Fetch Graph API user data STARTED");
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
        debug && this.log("Login SUCCEDED");
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

  log(name: string, content?: any, isError?: boolean) {
    const style = `background-color: ${
      isError ? "#990000" : "#009900"
    }; color: #ffffff; font-weight: 700; padding: 2px`;
    console.groupCollapsed("MSLogin debug");
    console.log(`%c${name}`, style);
    content && console.log(content);
    console.groupEnd();
  }

  render() {
    const { buttonTheme, className, children } = this.props;
    return children ? (
      <div onClick={this.login}>{children}</div>
    ) : (
      <MicrosoftLoginButton
        buttonTheme={buttonTheme || "light"}
        buttonClassName={className}
        onClick={this.login}
      />
    );
  }
}
