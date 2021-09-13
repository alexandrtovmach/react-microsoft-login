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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var MicrosoftLoginButton_1 = __importDefault(require("./MicrosoftLoginButton"));
var helpers_1 = require("./helpers");
var MicrosoftLogin = function (_a) {
    var graphScopes = _a.graphScopes, clientId = _a.clientId, tenantUrl = _a.tenantUrl, redirectUri = _a.redirectUri, postLogoutRedirectUri = _a.postLogoutRedirectUri, children = _a.children, buttonTheme = _a.buttonTheme, className = _a.className, _b = _a.withUserData, withUserData = _b === void 0 ? false : _b, authCallback = _a.authCallback, _c = _a.forceRedirectStrategy, forceRedirectStrategy = _c === void 0 ? false : _c, prompt = _a.prompt, debug = _a.debug, useLocalStorageCache = _a.useLocalStorageCache;
    var msalInstance = helpers_1.getUserAgentApp({
        clientId: clientId,
        tenantUrl: tenantUrl,
        redirectUri: redirectUri,
        postLogoutRedirectUri: postLogoutRedirectUri,
        useLocalStorageCache: useLocalStorageCache,
    });
    var scopes = helpers_1.getScopes(graphScopes);
    var log = helpers_1.getLogger(debug);
    if (!msalInstance) {
        log("Initialization", "clientID broken or not provided", true);
        return null;
    }
    react_1.useEffect(function () {
        msalInstance.handleRedirectCallback(function (error, authResponse) {
            if (!error && authResponse) {
                log("Fetch Azure AD 'token' with redirect SUCCEEDED", authResponse);
                log("Fetch Graph API 'access_token' in silent mode STARTED");
                getGraphAPITokenAndUser(true);
            }
            else {
                log("Fetch Azure AD 'token' with redirect FAILED", error, true);
                authCallback(error);
            }
        });
    }, []);
    // attempt silent login
    // return msalInstance to user login handler on reload if token is present
    react_1.useEffect(function () {
        var clientToken = useLocalStorageCache
            ? localStorage.getItem("msal.idtoken")
            : sessionStorage.getItem("msal.idtoken");
        clientToken &&
            getGraphAPITokenAndUser(forceRedirectStrategy || helpers_1.checkToIE());
    }, [msalInstance]);
    var login = function () {
        log("Login STARTED");
        if (forceRedirectStrategy || helpers_1.checkToIE()) {
            redirectLogin();
        }
        else {
            popupLogin();
        }
    };
    var finalStep = function (authResponseWithAccessToken) {
        log("Fetch Graph API 'access_token' SUCCEEDED", authResponseWithAccessToken);
        if (withUserData) {
            getUserData(authResponseWithAccessToken);
        }
        else {
            log("Login SUCCEEDED");
            authCallback(null, authResponseWithAccessToken, msalInstance);
        }
    };
    var getGraphAPITokenAndUser = function (isRedirect) { return __awaiter(void 0, void 0, void 0, function () {
        var silentRes, err_1, popupRes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 7]);
                    return [4 /*yield*/, msalInstance.acquireTokenSilent({ scopes: scopes })];
                case 2:
                    silentRes = _a.sent();
                    finalStep(silentRes);
                    return [3 /*break*/, 7];
                case 3:
                    err_1 = _a.sent();
                    log("Fetch Graph API 'access_token' in silent mode is FAILED", err_1, true);
                    if (!isRedirect) return [3 /*break*/, 4];
                    log("Fetch Graph API 'access_token' with redirect STARTED");
                    msalInstance.acquireTokenRedirect({ scopes: scopes });
                    return [3 /*break*/, 6];
                case 4:
                    log("Fetch Graph API 'access_token' with popup STARTED");
                    return [4 /*yield*/, msalInstance.acquireTokenPopup({ scopes: scopes })];
                case 5:
                    popupRes = _a.sent();
                    finalStep(popupRes);
                    _a.label = 6;
                case 6: return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    log("Login FAILED", error_1, true);
                    authCallback(error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var popupLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
        var authResponse, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log("Fetch Azure AD 'token' with popup STARTED");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, msalInstance.loginPopup({ scopes: scopes, prompt: prompt })];
                case 2:
                    authResponse = _a.sent();
                    log("Fetch Azure AD 'token' with popup SUCCEEDED", authResponse);
                    log("Fetch Graph API 'access_token' in silent mode STARTED");
                    getGraphAPITokenAndUser();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    log("Fetch Azure AD 'token' with popup FAILED", err_2, true);
                    authCallback(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var redirectLogin = function () {
        log("Fetch Azure AD 'token' with redirect STARTED");
        msalInstance.loginRedirect({ scopes: scopes, prompt: prompt });
    };
    var getUserData = function (authResponseWithAccessToken) { return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, options, response, userData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accessToken = authResponseWithAccessToken.accessToken;
                    log("Fetch Graph API user data STARTED");
                    options = {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    };
                    return [4 /*yield*/, fetch("https://graph.microsoft.com/v1.0/me", options)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    userData = _a.sent();
                    log("Fetch Graph API user data SUCCEEDED", userData);
                    log("Login SUCCEEDED");
                    authCallback(null, __assign(__assign({}, userData), authResponseWithAccessToken), msalInstance);
                    return [2 /*return*/];
            }
        });
    }); };
    return children ? (typeof children === "function" ? (children(login)) : (react_1.default.createElement("div", { onClick: login }, children))) : (react_1.default.createElement(MicrosoftLoginButton_1.default, { buttonTheme: buttonTheme || "light", buttonClassName: className, onClick: login }));
};
exports.default = MicrosoftLogin;
//# sourceMappingURL=MicrosoftLogin.js.map