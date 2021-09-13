import { UserAgentApplication } from "msal";
export declare const getUserAgentApp: ({ clientId, tenantUrl, redirectUri, postLogoutRedirectUri, useLocalStorageCache, }: {
    clientId: string;
    tenantUrl?: string | undefined;
    redirectUri?: string | undefined;
    postLogoutRedirectUri?: string | undefined;
    useLocalStorageCache?: boolean | undefined;
}) => UserAgentApplication | undefined;
export declare const getScopes: (graphScopes?: string[] | undefined) => string[];
export declare const getLogger: (isDebugMode?: boolean | undefined) => (name: string, content?: any, isError?: boolean | undefined) => void;
export declare const checkToIE: () => boolean;
