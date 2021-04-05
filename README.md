# react-microsoft-login

[![npm](https://img.shields.io/npm/v/react-microsoft-login?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/react-microsoft-login)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-microsoft-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-microsoft-login)
[![npm](https://img.shields.io/npm/dt/react-microsoft-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-microsoft-login)

React component for a simple login with Microsoft services, based on [Official Microsoft Authentication Library for JavaScript](https://github.com/AzureAD/microsoft-authentication-library-for-js).

<p align="center">
  <img src="https://user-images.githubusercontent.com/28801003/65941169-0cc1c000-e433-11e9-909d-bd97be8100b2.jpg" alt="buttons">
</p>

**[DEMO HERE](https://alexandrtovmach.github.io/react-microsoft-login/)**

## 🚀 Get started

1. Install package:
   ```sh
   npm i react-microsoft-login
   # or
   yarn add react-microsoft-login
   ```
2. Import and configure component:

   ```jsx
   import React from "react";
   import MicrosoftLogin from "react-microsoft-login";

   export default (props) => {
     const authHandler = (err, data) => {
       console.log(err, data);
     };

     return (
       <MicrosoftLogin clientId={YOUR_CLIENT_ID} authCallback={authHandler} />
     );
   };
   ```

3. `YOUR_CLIENT_ID` is the key which you need to generate for your Microsoft app. [How to create Microsoft app?](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-register-an-app) When finished, on the app Overview page, note down the Application (client) ID value.

## 📖 API

| Parameter             | Type                                               | Default                | Description                                                                                                                                                                                                                               |
| --------------------- | -------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientId              | string                                             | required               | Application (client) ID                                                                                                                                                                                                                   |
| authCallback          | function                                           | required               | Callback function which takes three arguments `(error, authData, msalInstance)`                                                                                                                                                           |
| graphScopes           | array                                              | `["user.read"]`        | Array of Graph API permission names. [More about Graph API permissions](https://developer.microsoft.com/en-us/graph/docs/concepts/permissions_reference).                                                                                 |
| redirectUri           | string                                             | `window.location.href` | The redirect URI of the application, this should be same as the value in the application registration portal.                                                                                                                             |
| postLogoutRedirectUri | string                                             |                        | You can configure the URI to which it should redirect after sign-out by setting postLogoutRedirectUri. This URI should also be registered as the logout URI in your application registration.                                             |
| tenantUrl             | string                                             |                        | A URL indicating a directory that MSAL can request tokens from. [More about MSAL tenant auth](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics).                                                       |
| prompt                | enum("login", "select_account", "consent", "none") |                        | Specify custom [prompt behavior](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-prompt-behavior)                                                                                                                 |
| buttonTheme           | enum("dark_short", "light_short", "dark", "light") | `"light"`              | Theme for button style that based on [Official Microsoft brand design](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-add-branding-in-azure-ad-apps).                                                              |
| withUserData          | boolean                                            |                        | Boolean flag to make an additional request to GraphAPI to get user data.                                                                                                                                                                  |
| forceRedirectStrategy | boolean                                            |                        | Boolean flag to force redirect login strategy for all browsers. This strategy used by default just for IE browsers to avoid issues.                                                                                                       |
| useLocalStorageCache  | boolean                                            |                        | You can set cookie storage to `localStorage` for persistent login between tabs and sessions. Session storage is used by default. [More about SSO with MSAL](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-sso). |
| debug                 | boolean                                            |                        | Boolean flag to enable detailed logs of authorization process.                                                                                                                                                                            |
| className             | string                                             |                        | Additional class name string.                                                                                                                                                                                                             |
| children              | ReactComponent                                     |                        | Alternative way to provide custom button element as a children prop instead of [Official Microsoft brand design](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-add-branding-in-azure-ad-apps)                     |

### Sign out

Since version 1.12.0 and higher msalInstance returned as third argument in callback function, after success auth. With this instance you can do many things and logout is one of them:

```jsx
import React, { useState } from "react";
import MicrosoftLogin from "../../dist";

const ExamplePage = () => {
  const [msalInstance, onMsalInstanceChange] = useState();

  const loginHandler = (err, data, msal) => {
    console.log(err, data);
    // some actions
    if (!err && data) {
      onMsalInstanceChange(msal);
    }
  };

  const logoutHandler = () => {
    msalInstance.logout();
  };

  return msalInstance ? (
    <button onClick={logoutHandler}>Logout</button>
  ) : (
    <MicrosoftLogin clientId={clientId} authCallback={loginHandler} />
  );
};

export default ExamplePage;
```

## 📝 License

[MIT](https://github.com/alexandrtovmach/react-microsoft-login/blob/master/LICENSE)
