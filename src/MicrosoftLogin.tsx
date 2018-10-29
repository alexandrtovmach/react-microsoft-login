import * as React from 'react';

import { MicrosoftLoginProps } from '../index';
import MicrosoftLoginButton from './MicrosoftLoginButton';

export default class MicrosoftLogin extends React.Component<MicrosoftLoginProps, any> {
  render() {
    return (
      <div>
        <MicrosoftLoginButton
          theme="light"
        />
      </div>
    );
  }
}