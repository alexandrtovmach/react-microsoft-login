import { UserAgentApplication } from "msal";

const CLIENT_ID_REGEX = /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/;

export const getUserAgentApp = ({
  clientId,
  tenantUrl,
  redirectUri,
  postLogoutRedirectUri,
  useLocalStorageCache,
}: {
  clientId: string;
  tenantUrl?: string;
  redirectUri?: string;
  postLogoutRedirectUri?: string;
  useLocalStorageCache?: boolean;
}) => {
  if (clientId && CLIENT_ID_REGEX.test(clientId)) {
    return new UserAgentApplication({
      auth: {
        ...(redirectUri && { redirectUri }),
        ...(tenantUrl && { authority: tenantUrl }),
        ...(postLogoutRedirectUri && { postLogoutRedirectUri }),

        clientId,
        validateAuthority: true,
        navigateToLoginRequestUrl: false,
      },
      cache: {
        ...(useLocalStorageCache
          ? { cacheLocation: "localStorage" }
          : { cacheLocation: "sessionStorage" }),
      },
    });
  }
};

export const getScopes = (graphScopes?: string[]) => {
  const scopes = graphScopes || [];
  if (!scopes.find((el: string) => el.toLowerCase() === "user.read")) {
    scopes.push("user.read");
  }
  return scopes;
};

export const getLogger = (isDebugMode?: boolean) => (
  name: string,
  content?: any,
  isError?: boolean
) => {
  if (isDebugMode) {
    const style = `background-color: ${
      isError ? "#990000" : "#009900"
    }; color: #ffffff; font-weight: 700; padding: 2px`;
    console.groupCollapsed("MSLogin debug");
    console.log(`%c${name}`, style);
    content && console.log(content.message || content);
    console.groupEnd();
  }
};

export const checkToIE = (): boolean => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");
  const msie11 = ua.indexOf("Trident/");
  const msedge = ua.indexOf("Edge/");
  const isIE = msie > 0 || msie11 > 0;
  const isEdge = msedge > 0;
  return isIE || isEdge;
};
