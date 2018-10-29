import * as React from 'react';

export interface MicrosoftLoginProps extends React.Props<MicrosoftLogin> {
  color: string;
}

export interface MicrosoftLoginButtonProps extends React.Props<MicrosoftLoginButton> {
  theme: "dark_short" | "light_short" | "dark" | "light"
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