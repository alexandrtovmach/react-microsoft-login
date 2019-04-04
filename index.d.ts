import * as React from 'react';

export interface MicrosoftLoginProps extends React.Props<MicrosoftLogin> {
  /**
   * Application (client) ID
   */
  clientId: string,

  /**
   * Callback function which takes two arguments (error, authData)
   */
  authCallback: (error: any, result?: any) => void,

  /**
   * Array of Graph API permission names.
   */
  graphScopes?: [string],

  /**
   * A URL indicating a directory that MSAL can request tokens from.
   * In Azure AD, it is of the form https://<instance>/<tenant>>, where <instance> is the directory host
   * (e.g. https://login.microsoftonline.com) and <tenant> is an identifier within the directory itself
   * (e.g. a domain associated to the tenant, such as contoso.onmicrosoft.com,
   * or the GUID representing the TenantID property of the directory)
   * In Azure AD B2C, it is of the form https://<instance>/tfp/<tenantId>/<policyName>/
   */
  tenantUrl?: string,

  /**
   * Name of theme for button style. 
   */
  buttonTheme?: "dark_short" | "light_short" | "dark" | "light",

  /**
   * Make an additional request to GraphAPI to get user data.
   */
  withUserData?: boolean,

  /**
   * Enable detailed logs of authorization process.
   */
  debug?: boolean,
  
  /**
   * Additional class name string.
   */
  className?: string,
}

export interface MicrosoftLoginButtonProps extends React.Props<MicrosoftLoginButton> {
  buttonTheme: "dark_short" | "light_short" | "dark" | "light",
  buttonClassName?: string,
  onClick?: any
}

export interface GraphAPIUserData {
  "@odata.context": string,
  businessPhones: [string],
  displayName: string,
  givenName: string,
  id: string,
  jobTitle: string,
  mail: string,
  mobilePhone: string,
  officeLocation: string,
  preferredLanguage: string,
  surname: string,
  userPrincipalName: string
}

declare class MicrosoftLogin extends React.Component<MicrosoftLoginProps, any> {
}
declare class MicrosoftLoginButton extends React.Component<MicrosoftLoginButtonProps, any> {
}

declare module 'microsoft-login' {
}
declare module 'microsoft-login-button' {
}

export default MicrosoftLogin;