import React from "react";
export declare type MicrosoftLoginButtonTheme = "dark_short" | "light_short" | "dark" | "light";
interface MicrosoftLoginButtonProps {
    buttonTheme: MicrosoftLoginButtonTheme;
    buttonClassName?: string;
    onClick?: any;
}
declare const MicrosoftLoginButton: React.FunctionComponent<MicrosoftLoginButtonProps>;
export default MicrosoftLoginButton;
