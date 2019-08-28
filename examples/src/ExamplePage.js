import React from 'react';
import { Container, Header, Label, Icon, Segment, Input, Select, Radio, Form, Button } from 'semantic-ui-react';

import config from "./config";
import MicrosoftLogin from "../../dist";

export default class ExaplePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      clientId: config.client_id,
      buttonTheme: "light",
      withUserData: true,
      debug: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  
  handleChange(value, type) {
    this.setState({
      [type]: value
    });
  }

  loginHandler(err, data) {
    console.log(err, data);
  };

  render() {
    const { clientId, buttonTheme, withUserData, debug, customButton } = this.state;
    return (
      <div className="viewport">
        <Segment basic>
          <Container text>
            <Header as='h2'>
              react-microsoft-login
              <Label basic size="mini" as='a' href="https://github.com/alexandrtovmach/react-microsoft-login">
                <Icon name='github' />GitHub
              </Label>
              <Label basic size="mini" as='a' href="https://www.npmjs.com/package/react-microsoft-login">
                <Icon name='npm' />NPM
              </Label>
            </Header>
            
            <p>
              React component for easy login to Microsoft services using OAuth technology without backend.
            </p>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Client ID</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "clientId")}
                    placeholder='f8c7976f-3e93-482d-88a3-62a1133cbbc3'
                    value={clientId}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Button theme</label>
                  <Select
                    onChange={(e, data) => this.handleChange(data.value, "buttonTheme")}
                    labeled
                    label="Button theme"
                    placeholder='Select your country'
                    options={config.themeOptions}
                    defaultValue={buttonTheme}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    onChange={(e, data) => this.handleChange(data.checked, "withUserData")}
                    label="With user data"
                    defaultChecked={withUserData}
                    toggle
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    onChange={(e, data) => this.handleChange(data.checked, "debug")}
                    label="Debug"
                    defaultChecked={debug}
                    toggle
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    onChange={(e, data) => this.handleChange(data.checked, "customButton")}
                    label="Custom button content (children prop)"
                    defaultChecked={customButton}
                    toggle
                  />
                </Form.Field>
                <Form.Field>
                  <label>Auth callback</label>
                  <code>
                    {`(err, data) => console.log(err, data)`}
                  </code>
                </Form.Field>
                <Form.Field>
                  <label>Graph scopes</label>
                  <span>user.read</span>
                </Form.Field>
                <Form.Field>
                  <label>Custom class</label>
                  my-custom-class
                </Form.Field>
              </Form>
            </Segment>
            <Segment>
              <MicrosoftLogin
                withUserData={withUserData}
                debug={debug}
                clientId={clientId}
                authCallback={this.loginHandler}
                buttonTheme={buttonTheme}
                className="my-custom-class"
                graphScopes={config.graphScopes}
                children={customButton && <Button>Custom button</Button>}
              />
            </Segment>
          </Container>
        </Segment>
      </div>
    );
  }
}