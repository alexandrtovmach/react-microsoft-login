import * as React from 'react';

export interface MicrosoftLoginProps extends React.Props<MicrosoftLogin> {
  clientId: string
  graphScopes?: [string],
  buttonTheme?: "dark_short" | "light_short" | "dark" | "light",
  className?: string,
  withUserData?: boolean,
  debug?: boolean,
}

export interface MicrosoftLoginButtonProps extends React.Props<MicrosoftLoginButton> {
  buttonTheme: "dark_short" | "light_short" | "dark" | "light",
  buttonClassName?: string,
  onClick?: any
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