import { ReactElement } from "react";
import { AuthResponse, AuthError, UserAgentApplication } from "msal";
import { User } from "@microsoft/microsoft-graph-types";
import { MicrosoftLoginButtonTheme } from "./MicrosoftLoginButton";
declare type MicrosoftLoginPrompt = "login" | "select_account" | "consent" | "none";
interface MicrosoftLoginProps {
    /**
     * Application (client) ID
     */
    clientId: string;
    children: (login: () => void) => ReactElement;
    /**
     * Callback function which takes two arguments (error, authData)
     */
    authCallback: (error: AuthError | null, result?: AuthResponse | (AuthResponse & User), instance?: UserAgentApplication) => void;
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
declare const MicrosoftLogin: ({ graphScopes, clientId, tenantUrl, redirectUri, postLogoutRedirectUri, children, buttonTheme, className, withUserData, authCallback, forceRedirectStrategy, prompt, debug, useLocalStorageCache, }: MicrosoftLoginProps) => JSX.Element | null;
export default MicrosoftLogin;
