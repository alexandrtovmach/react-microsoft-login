import React, { useEffect } from "react";
import { AuthResponse, AuthError, UserAgentApplication } from "msal";
import { User } from "@microsoft/microsoft-graph-types";

import MicrosoftLoginButton, {
  MicrosoftLoginButtonTheme,
} from "./MicrosoftLoginButton";
import { checkToIE, getLogger, getScopes, getUserAgentApp } from "./helpers";

type MicrosoftLoginPrompt = "login" | "select_account" | "consent" | "none";
interface MicrosoftLoginProps {
  /**
   * Application (client) ID
   */
  clientId: string;

  /**
   * Callback function which takes two arguments (error, authData)
   */
  authCallback: (
    error: AuthError | null,
    result?: AuthResponse | (AuthResponse & User),
    instance?: UserAgentApplication
  ) => void;

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
   * You can configure the URI to which it should redirect after sign-out by setting postLogoutRedirectUri.
   * This URI should also be registered as the logout URI in your application registration.
   */
  postLogoutRedirectUri?: string;

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

  /**
   * Set whether to use localStorage or sessionStorage for MSAL Single Sign-On
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-sso
   */
  useLocalStorageCache?: boolean;
}

const MicrosoftLogin: React.FunctionComponent<MicrosoftLoginProps> = ({
  graphScopes,
  clientId,
  tenantUrl,
  redirectUri,
  postLogoutRedirectUri,
  children,
  buttonTheme,
  className,
  withUserData = false,
  authCallback,
  forceRedirectStrategy = false,
  prompt,
  debug,
  useLocalStorageCache,
}) => {
  const msalInstance = getUserAgentApp({
    clientId,
    tenantUrl,
    redirectUri,
    postLogoutRedirectUri,
    useLocalStorageCache,
  });
  const scopes = getScopes(graphScopes);
  const log = getLogger(debug);

  if (!msalInstance) {
    log("Initialization", "clientID broken or not provided", true);
    return null;
  }

  useEffect(() => {
    msalInstance.handleRedirectCallback(
      (error: AuthError, authResponse: AuthResponse) => {
        if (!error && authResponse) {
          log("Fetch Azure AD 'token' with redirect SUCCEEDED", authResponse);
          log("Fetch Graph API 'access_token' in silent mode STARTED");
          getGraphAPITokenAndUser(true);
        } else {
          log("Fetch Azure AD 'token' with redirect FAILED", error, true);
          authCallback(error);
        }
      }
    );
  }, []);

  // attempt silent login
  // return msalInstance to user login handler on reload if token is present
  useEffect(() => {
    const clientToken = useLocalStorageCache
      ? localStorage.getItem("msal.idtoken")
      : sessionStorage.getItem("msal.idtoken");

    clientToken && getGraphAPITokenAndUser(true);
  }, [msalInstance]);

  const login = () => {
    log("Login STARTED");
    if (forceRedirectStrategy || checkToIE()) {
      redirectLogin();
    } else {
      popupLogin();
    }
  };

  const finalStep = (authResponseWithAccessToken: AuthResponse) => {
    log(
      "Fetch Graph API 'access_token' SUCCEEDED",
      authResponseWithAccessToken
    );
    if (withUserData) {
      getUserData(authResponseWithAccessToken);
    } else {
      log("Login SUCCEEDED");
      authCallback(null, authResponseWithAccessToken, msalInstance);
    }
  };

  const getGraphAPITokenAndUser = async (isRedirect?: boolean) => {
    try {
      try {
        const silentRes = await msalInstance.acquireTokenSilent({ scopes });
        finalStep(silentRes);
      } catch (err) {
        log(
          "Fetch Graph API 'access_token' in silent mode is FAILED",
          err,
          true
        );
        if (isRedirect) {
          log("Fetch Graph API 'access_token' with redirect STARTED");
          msalInstance.acquireTokenRedirect({ scopes });
        } else {
          log("Fetch Graph API 'access_token' with popup STARTED");
          const popupRes = await msalInstance.acquireTokenPopup({ scopes });
          finalStep(popupRes);
        }
      }
    } catch (error) {
      log("Login FAILED", error, true);
      authCallback(error);
    }
  };

  const popupLogin = async () => {
    log("Fetch Azure AD 'token' with popup STARTED");
    try {
      const authResponse = await msalInstance.loginPopup({ scopes, prompt });
      log("Fetch Azure AD 'token' with popup SUCCEEDED", authResponse);
      log("Fetch Graph API 'access_token' in silent mode STARTED");
      getGraphAPITokenAndUser();
    } catch (err) {
      log("Fetch Azure AD 'token' with popup FAILED", err, true);
      authCallback(err);
    }
  };

  const redirectLogin = () => {
    log("Fetch Azure AD 'token' with redirect STARTED");
    msalInstance.loginRedirect({ scopes, prompt });
  };

  const getUserData = async (authResponseWithAccessToken: AuthResponse) => {
    const { accessToken } = authResponseWithAccessToken;
    log("Fetch Graph API user data STARTED");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      "https://graph.microsoft.com/v1.0/me",
      options
    );
    const userData = await response.json();
    log("Fetch Graph API user data SUCCEEDED", userData);
    log("Login SUCCEEDED");
    authCallback(
      null,
      {
        ...userData,
        ...authResponseWithAccessToken,
      },
      msalInstance
    );
  };

  return children ? (
    <div onClick={login}>{children}</div>
  ) : (
    <MicrosoftLoginButton
      buttonTheme={buttonTheme || "light"}
      buttonClassName={className}
      onClick={login}
    />
  );
};

export default MicrosoftLogin;
