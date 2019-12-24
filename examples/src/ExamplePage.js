import React from "react";
import {
  Container,
  Header,
  Label,
  Icon,
  Segment,
  Select,
  Radio,
  Form,
  Button
} from "semantic-ui-react";

import config from "./config";
import MicrosoftLogin from "../../dist";

export default class ExaplePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clientId: config.client_id,
      callbackUrl: config.callbackUrl || window.location.href,
      buttonTheme: config.themeOptions[0].value,
      graphScopes: [config.graphScopesOptions[0].value],
      withUserData: true,
      customClassName: "my-button",
      customButton: false,
      forceRedirectStrategy: false,
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
  }

  render() {
    const {
      clientId,
      buttonTheme,
      graphScopes,
      withUserData,
      debug,
      customButton,
      customClassName,
      callbackUrl,
      forceRedirectStrategy
    } = this.state;

    return (
      <div className="viewport">
        <Segment basic>
          <Container text>
            <Header as="h2">
              react-microsoft-login
              <Label
                basic
                size="mini"
                as="a"
                href="https://github.com/alexandrtovmach/react-microsoft-login"
              >
                <Icon name="github" />
                GitHub
              </Label>
              <Label
                basic
                size="mini"
                as="a"
                href="https://www.npmjs.com/package/react-microsoft-login"
              >
                <Icon name="npm" />
                NPM
              </Label>
            </Header>

            <p>
              React component for easy login to Microsoft services using OAuth
              technology without backend.
            </p>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Client ID</label>
                  <input
                    onChange={e =>
                      this.handleChange(e.target.value, "clientId")
                    }
                    placeholder="f8c7976f-3e93-482d-88a3-62a1133cbbc3"
                    value={clientId}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Redirect URI</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "callbackUrl")}
                    placeholder='https://example.com'
                    value={callbackUrl}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Button theme</label>
                  <Select
                    onChange={(e, data) =>
                      this.handleChange(data.value, "buttonTheme")
                    }
                    labeled
                    label="Button theme"
                    placeholder="Select button theme"
                    options={config.themeOptions}
                    defaultValue={buttonTheme}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Graph scopes</label>
                  <Select
                    onChange={(e, data) =>
                      this.handleChange(data.value, "graphScopes")
                    }
                    labeled
                    multiple
                    label="Graph scopes"
                    placeholder="Select your scopes"
                    options={config.graphScopesOptions}
                    defaultValue={graphScopes}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Custom class name</label>
                  <input
                    onChange={e =>
                      this.handleChange(e.target.value, "customClassName")
                    }
                    placeholder="my-class-name"
                    value={customClassName}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    onChange={(e, data) =>
                      this.handleChange(data.checked, "withUserData")
                    }
                    label="With user data"
                    defaultChecked={withUserData}
                    toggle
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    onChange={(e, data) =>
                      this.handleChange(data.checked, "debug")
                    }
                    label="Debug"
                    defaultChecked={debug}
                    toggle
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    onChange={(e, data) =>
                      this.handleChange(data.checked, "forceRedirectStrategy")
                    }
                    label="Force redirect strategy"
                    defaultChecked={forceRedirectStrategy}
                    toggle
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    onChange={(e, data) =>
                      this.handleChange(data.checked, "customButton")
                    }
                    label="Custom button content (children prop)"
                    defaultChecked={customButton}
                    toggle
                  />
                </Form.Field>
                <Form.Field>
                  <label>Auth callback</label>
                  <code>{`(err, data) => console.log(err, data)`}</code>
                </Form.Field>
              </Form>
            </Segment>
            <Segment>
              <MicrosoftLogin
                withUserData={withUserData}
                debug={debug}
                clientId={clientId}
                forceRedirectStrategy={forceRedirectStrategy}
                authCallback={this.loginHandler}
                buttonTheme={buttonTheme}
                className={customClassName}
                graphScopes={graphScopes}
                children={customButton && <Button>Custom button</Button>}
              />
            </Segment>
          </Container>
        </Segment>
      </div>
    );
  }
}
