import * as React from "react";
import { UserAgentApplication, Account, AuthResponse, AuthError } from "msal";
import { IdToken } from "msal/lib-commonjs/IdToken";

type MicrosoftLoginButtonTheme = "dark_short" | "light_short" | "dark" | "light";
interface MicrosoftLoginProps extends React.Props<MicrosoftLogin> {
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
  graphScopes?: [string];

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
  prompt?: "login" | "select_account" | "consent" | "none"

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

interface GraphAPIUserData extends AuthResponse {
  "@odata.context": string;
  accessToken: string;
  account: Account;
  businessPhones: [string];
  displayName: string;
  givenName: string;
  id: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation: string;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
  accountState: string;
  idToken: IdToken;
  idTokenClaims: any;
  scopes: [string];
  tenantId: string;
  tokenType: string;
  uniqueId: string;
}

interface MicrosoftLoginState {
  msalInstance?: UserAgentApplication;
  scopes: [string];
}

declare class MicrosoftLogin extends React.Component<
  MicrosoftLoginProps,
  MicrosoftLoginState
> {}

export { MicrosoftLogin, MicrosoftLoginProps, MicrosoftLoginState, MicrosoftLoginButtonTheme, GraphAPIUserData };

export default MicrosoftLogin;
