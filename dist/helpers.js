"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToIE = exports.getLogger = exports.getScopes = exports.getUserAgentApp = void 0;
var msal_1 = require("msal");
var CLIENT_ID_REGEX = /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/;
var getUserAgentApp = function (_a) {
    var clientId = _a.clientId, tenantUrl = _a.tenantUrl, redirectUri = _a.redirectUri, postLogoutRedirectUri = _a.postLogoutRedirectUri, useLocalStorageCache = _a.useLocalStorageCache;
    if (clientId && CLIENT_ID_REGEX.test(clientId)) {
        return new msal_1.UserAgentApplication({
            auth: __assign(__assign(__assign(__assign({}, (redirectUri && { redirectUri: redirectUri })), (tenantUrl && { authority: tenantUrl })), (postLogoutRedirectUri && { postLogoutRedirectUri: postLogoutRedirectUri })), { clientId: clientId, validateAuthority: true, navigateToLoginRequestUrl: false }),
            cache: __assign({}, (useLocalStorageCache
                ? { cacheLocation: "localStorage" }
                : { cacheLocation: "sessionStorage" })),
        });
    }
};
exports.getUserAgentApp = getUserAgentApp;
var getScopes = function (graphScopes) {
    var scopes = graphScopes || [];
    if (!scopes.find(function (el) { return el.toLowerCase() === "user.read"; })) {
        scopes.push("user.read");
    }
    return scopes;
};
exports.getScopes = getScopes;
var getLogger = function (isDebugMode) { return function (name, content, isError) {
    if (isDebugMode) {
        var style = "background-color: " + (isError ? "#990000" : "#009900") + "; color: #ffffff; font-weight: 700; padding: 2px";
        console.groupCollapsed("MSLogin debug");
        console.log("%c" + name, style);
        content && console.log(content.message || content);
        console.groupEnd();
    }
}; };
exports.getLogger = getLogger;
var checkToIE = function () {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var msie11 = ua.indexOf("Trident/");
    var msedge = ua.indexOf("Edge/");
    var isIE = msie > 0 || msie11 > 0;
    var isEdge = msedge > 0;
    return isIE || isEdge;
};
exports.checkToIE = checkToIE;
//# sourceMappingURL=helpers.js.map