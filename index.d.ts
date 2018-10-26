import * as React from 'react';

export interface AppProps extends React.Props<App> {
  color: string;
}

declare class App extends React.Component<AppProps, any> {
}

declare module 'hello-world' {
}

export default App;