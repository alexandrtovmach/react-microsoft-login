import React from "react";
import { UserAgentApplication, AuthResponse, AuthError } from "msal";
import { User } from "@microsoft/microsoft-graph-types";

import MicrosoftLoginButton, {
  MicrosoftLoginButtonTheme,
} from "./MicrosoftLoginButton";

type MicrosoftLoginPrompt = "login" | "select_account" | "consent" | "none";
type GraphAPIUserData = AuthResponse & User;
interface MicrosoftLoginProps {
  /**
   * Application (client) ID
   */
  clientId: string;

  /**
   * Callback function which takes two arguments (error, authData)
   */
  authCallback: (error?: AuthError, result?: AuthResponse) => void;

  /**
   * Array of Graph API permission names.
   */
  graphScopes?: string[];

  /**
   * A URL indicating a directory that MSAL can request tokens from.
   * In Azure AD, it is of the form https://<instance>/<tenant>>, where <instance> is the directory host
   * (e.g. https://login.microsoftonline.com) and <tenant> is an identifier within the directory itself
   * (e.g. a domain associated to the tenant, such as contoso.onmicrosoft.com,
   * or the GUID representing the TenantID property of the directory)
   * In Azure AD B2C, it is of the form https://<instance>/tfp/<tenantId>/<policyName>/
   */
  tenantUrl?: string;

  /**
   * Name of theme for button style.
   */
  buttonTheme?: MicrosoftLoginButtonTheme;

  /**
   * Make an additional request to GraphAPI to get user data.
   */
  withUserData?: boolean;

  /**
   * Enable detailed logs of authorization process.
   */
  debug?: boolean;

  /**
   * Additional class name string.
   */
  className?: string;

  /**
   * Prompt behavior for interactive requests
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-prompt-behavior
   */
  prompt?: MicrosoftLoginPrompt;

  /**
   * Force redirect login strategy. This strategy used by default on IE browsers to avoid issues.
   * If set true login will be executed only with redirect strategy in all browsers.
   */
  forceRedirectStrategy?: boolean;

  /**
   * The redirect URI of the application, this should be same as the value in the application registration portal.
   */
  redirectUri?: string;
}

interface MicrosoftLoginState {
  msalInstance?: UserAgentApplication;
  scopes: string[];
}

const CLIENT_ID_REGEX = /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/;
const getUserAgentApp = ({
  clientId,
  tenantUrl,
  redirectUri,
}: {
  clientId: string;
  tenantUrl?: string;
  redirectUri?: string;
}) => {
  if (clientId && CLIENT_ID_REGEX.test(clientId)) {
    return new UserAgentApplication({
      auth: {
        ...(redirectUri && { redirectUri }),
        ...(tenantUrl && { authority: tenantUrl }),
        clientId,
        validateAuthority: true,
        navigateToLoginRequestUrl: false,
      },
    });
  }
};

const getScopes = (graphScopes: string[]) => {
  const scopes = graphScopes || [];
  if (!scopes.find((el: string) => el.toLowerCase() === "user.read")) {
    scopes.push("user.read");
  }
  return scopes;
};

export default class MicrosoftLogin extends React.Component<
  MicrosoftLoginProps,
  MicrosoftLoginState
> {
  constructor(props: any) {
    super(props);
    const { graphScopes, clientId, tenantUrl, redirectUri } = props;
    this.state = {
      msalInstance: getUserAgentApp({ clientId, tenantUrl, redirectUri }),
      scopes: getScopes(graphScopes),
    };
  }

  componentDidMount() {
    const { msalInstance, scopes } = this.state;
    const { authCallback, withUserData = false } = this.props;
    if (!msalInstance) {
      this.log("Initialization", "clientID broken or not provided", true);
    } else {
      msalInstance.handleRedirectCallback(
        (error: AuthError, authResponse: AuthResponse) => {
          if (!error && authResponse) {
            this.log(
              "Fetch Azure AD 'token' with redirect SUCCEDEED",
              authResponse
            );
            this.log("Fetch Graph API 'access_token' in silent mode STARTED");
            this.getGraphAPITokenAndUser({
              msalInstance,
              scopes,
              withUserData,
              authCallback,
              isRedirect: true,
            });
          } else {
            this.log(
              "Fetch Azure AD 'token' with redirect FAILED",
              error,
              true
            );
            authCallback(error);
          }
        }
      );
    }
  }

  componentDidUpdate(prevProps: any) {
    const { clientId, tenantUrl, redirectUri } = this.props;
    if (
      prevProps.clientId !== clientId ||
      prevProps.tenantUrl !== tenantUrl ||
      prevProps.redirectUri !== redirectUri
    ) {
      this.setState({
        msalInstance: getUserAgentApp({ clientId, tenantUrl, redirectUri }),
      });
    }
  }

  login = () => {
    const { msalInstance, scopes } = this.state;
    const {
      withUserData = false,
      authCallback,
      forceRedirectStrategy = false,
      prompt,
    } = this.props;

    if (msalInstance) {
      this.log("Login STARTED");
      if (forceRedirectStrategy || this.checkToIE()) {
        this.redirectLogin({ msalInstance, scopes, prompt });
      } else {
        this.popupLogin({
          msalInstance,
          scopes,
          withUserData,
          authCallback,
          prompt,
        });
      }
    } else {
      this.log("Login FAILED", "clientID broken or not provided", true);
    }
  };

  getGraphAPITokenAndUser({
    msalInstance,
    scopes,
    withUserData,
    authCallback,
    isRedirect,
  }: {
    msalInstance: UserAgentApplication;
    scopes: string[];
    withUserData: boolean;
    authCallback: any;
    isRedirect: boolean;
  }) {
    return msalInstance
      .acquireTokenSilent({ scopes })
      .catch((error: any) => {
        this.log(
          "Fetch Graph API 'access_token' in silent mode is FAILED",
          error,
          true
        );
        if (isRedirect) {
          this.log("Fetch Graph API 'access_token' with redirect STARTED");
          msalInstance.acquireTokenRedirect({ scopes });
        } else {
          this.log("Fetch Graph API 'access_token' with popup STARTED");
          return msalInstance.acquireTokenPopup({ scopes });
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
      .catch((error: AuthError) => {
        this.log("Login FAILED", error, true);
        authCallback(error);
      });
  }

  popupLogin({
    msalInstance,
    scopes,
    withUserData,
    authCallback,
    prompt,
  }: {
    msalInstance: UserAgentApplication;
    scopes: string[];
    withUserData: boolean;
    authCallback: any;
    prompt?: MicrosoftLoginPrompt;
  }) {
    this.log("Fetch Azure AD 'token' with popup STARTED");
    msalInstance
      .loginPopup({ scopes, prompt })
      .then((authResponse: AuthResponse) => {
        this.log("Fetch Azure AD 'token' with popup SUCCEDEED", authResponse);
        this.log("Fetch Graph API 'access_token' in silent mode STARTED");
        this.getGraphAPITokenAndUser({
          msalInstance,
          scopes,
          withUserData,
          authCallback,
          isRedirect: false,
        });
      })
      .catch((error: AuthError) => {
        this.log("Fetch Azure AD 'token' with popup FAILED", error, true);
        authCallback(error);
      });
  }

  redirectLogin({
    msalInstance,
    scopes,
    prompt,
  }: {
    msalInstance: UserAgentApplication;
    scopes: string[];
    prompt?: MicrosoftLoginPrompt;
  }) {
    this.log("Fetch Azure AD 'token' with redirect STARTED");
    msalInstance.loginRedirect({ scopes, prompt });
  }

  getUserData(authResponseWithAccessToken: AuthResponse) {
    const { authCallback } = this.props;
    const { accessToken } = authResponseWithAccessToken;
    this.log("Fetch Graph API user data STARTED");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return fetch("https://graph.microsoft.com/v1.0/me", options)
      .then((response: Response) => response.json())
      .then((userData: GraphAPIUserData) => {
        this.log("Fetch Graph API user data SUCCEDEED", userData);
        this.log("Login SUCCEDED");
        authCallback(undefined, {
          ...userData,
          ...authResponseWithAccessToken,
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
