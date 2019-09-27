import * as React from "react";
import { UserAgentApplication, AuthResponse } from "msal";

import { MicrosoftLoginProps, GraphAPIUserData } from "../index";
import MicrosoftLoginButton from "./MicrosoftLoginButton";

const CLIENT_ID_REGEX = /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/;
const getUserAgentApp = (clientId: string, tenantUrl?: string) => {
  if (clientId && CLIENT_ID_REGEX.test(clientId)) {
    return new UserAgentApplication({
      auth: {
        clientId,
        authority: tenantUrl,
        validateAuthority: true
      }
    });
  }
};

const getScopes = (graphScopes: [string]) => {
  const scopes = graphScopes || [];
  if (!scopes.find((el: string) => el.toLowerCase() === "user.read")) {
    scopes.push("user.read");
  }
  return scopes;
};

interface MicrosoftLoginState {
  msalInstance?: UserAgentApplication;
  scopes: [string];
}

export default class MicrosoftLogin extends React.Component<
  MicrosoftLoginProps,
  MicrosoftLoginState
> {
  constructor(props: any) {
    super(props);
    const { graphScopes, clientId, tenantUrl } = props;
    this.state = {
      msalInstance: getUserAgentApp(clientId, tenantUrl),
      scopes: getScopes(graphScopes)
    };
  }

  componentDidMount() {
    const { msalInstance } = this.state;
    // avoid duplicate code execution in iframe and popup window on page load
    if (!msalInstance) {
      this.log("Initialization", "clientID broken or not provided", true);
    }
  }

  componentDidUpdate(prevProps: any) {
    const { clientId, tenantUrl } = this.props;
    if (prevProps.clientId !== clientId || prevProps.tenantUrl !== tenantUrl) {
      this.setState({
        msalInstance: getUserAgentApp(clientId, tenantUrl)
      });
    }
  }

  login = () => {
    const { msalInstance, scopes } = this.state;
    const {
      withUserData = false,
      authCallback,
      forceRedirectStrategy = false
    } = this.props;

    if (msalInstance) {
      this.log("Login STARTED");
      if (forceRedirectStrategy || this.checkToIE()) {
        this.redirectLogin(msalInstance, scopes);
      } else {
        this.popupLogin(msalInstance, scopes, withUserData, authCallback);
      }
    } else {
      this.log("Login FAILED", "clientID broken or not provided", true);
    }
  };

  getGraphAPITokenAndUser(
    msalInstance: any,
    scopes: string[],
    withUserData: boolean,
    authCallback: any,
    isRedirect: boolean
  ) {
    return msalInstance
      .acquireTokenSilent({ scopes })
      .catch((error: Error) => {
        this.log(
          "Fetch Graph API 'access_token' in silent mode is FAILED",
          error,
          true
        );

        this.log(
          `Fetch Graph API 'access_token' with ${
            isRedirect ? "redirect" : "popup"
          } STARTED`
        );
        if (isRedirect) {
          this.log("Fetch Graph API 'access_token' with redirect STARTED");
          msalInstance.acquireTokenRedirect({ scopes });
        } else {
          this.log("Fetch Graph API 'access_token' with popup STARTED");
          msalInstance.acquireTokenPopup({ scopes });
        }
      })
      .then((authResponseWithAccessToken: AuthResponse) => {
        this.log(
          "Fetch Graph API 'access_token' SUCCEDEED",
          authResponseWithAccessToken
        );
        if (withUserData) {
          this.getUserData(authResponseWithAccessToken);
        } else {
          this.log("Login SUCCEDED");
          authCallback(null, { authResponseWithAccessToken });
        }
      })
      .catch((error: Error) => {
        this.log("Login FAILED", error, true);
        authCallback(error);
      });
  }

  popupLogin(
    msalInstance: any,
    scopes: string[],
    withUserData: boolean,
    authCallback: any
  ) {
    this.log("Fetch Azure AD 'token' with popup STARTED");
    msalInstance
      .loginPopup(scopes)
      .then((authResponse: AuthResponse) => {
        this.log("Fetch Azure AD 'token' with popup SUCCEDEED", authResponse);

        this.log("Fetch Graph API 'access_token' in silent mode STARTED");
        this.getGraphAPITokenAndUser(
          msalInstance,
          scopes,
          withUserData,
          authCallback,
          false
        );
      })
      .catch((error: Error) => {
        this.log("Fetch Azure AD 'token' with popup FAILED", error, true);
        authCallback(error);
      });
  }

  redirectLogin(msalInstance: any, scopes: string[]) {
    this.log("Fetch Azure AD 'token' with redirect STARTED");
    msalInstance.handleRedirectCallback(() => {
      console.log("handleRedirectCallback");
    });
    console.log("loginRedirect");
    msalInstance.loginRedirect({ scopes });
  }

  getUserData(authResponseWithAccessToken: AuthResponse) {
    const { authCallback } = this.props;
    const { accessToken } = authResponseWithAccessToken;
    this.log("Fetch Graph API user data STARTED");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    return fetch("https://graph.microsoft.com/v1.0/me", options)
      .then((response: Response) => response.json())
      .then((userData: GraphAPIUserData) => {
        this.log("Fetch Graph API user data SUCCEDEED", userData);
        this.log("Login SUCCEDED");
        authCallback(null, {
          ...userData,
          ...authResponseWithAccessToken
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
    const { debug } = this.props;
    if (debug) {
      const style = `background-color: ${
        isError ? "#990000" : "#009900"
      }; color: #ffffff; font-weight: 700; padding: 2px`;
      console.groupCollapsed("MSLogin debug");
      console.log(`%c${name}`, style);
      content && console.log(content.message || content);
      console.groupEnd();
    }
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
