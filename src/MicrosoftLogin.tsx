import * as React from "react";

import { MicrosoftLoginProps } from "../index";
import MicrosoftLoginButton from "./MicrosoftLoginButton";

const url = `https://login.microsoftonline.com/common/oauth2/authorize?client_id=f8c7976f-3e93-482d-88a3-62a1133cbbc3&response_type=id_token&redirect_uri=http%3A%2F%2Flocalhost%3a3001&response_mode=form_post&scope=openid&state=12345&nonce=7362CAEA-9CA5-4B43-9BA3-34D7C303EBA7`

export default class MicrosoftLogin extends React.Component<
  MicrosoftLoginProps,
  any
  > {
  render() {
    const { buttonTheme, className } = this.props;
    return (
      <div>
        <MicrosoftLoginButton
          buttonTheme={buttonTheme || "light"}
          buttonClassName={className}
        />
      </div>
    );
  }
}
