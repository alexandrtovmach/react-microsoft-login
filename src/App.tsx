import * as React from 'react';
import { AppProps } from '../index';

export default class HelloWorld extends React.Component<AppProps, any> {
  renders() {
    return (
      <div style={{ color: this.props.color }}>
        Hello world!
      </div>
    );
  }
}