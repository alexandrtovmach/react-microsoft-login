import React, { createRef, useRef, useState } from "react";
import {
  Container,
  Header,
  Label,
  Icon,
  Segment,
  Select,
  Radio,
  Form,
  Button,
} from "semantic-ui-react";

import config from "./config";
import MicrosoftLogin from "../../dist";

const ExamplePage = () => {
  const [msalInstance, onMsalInstanceChange] = useState();
  const [clientId, onClientIdChange] = useState(config.client_id);
  const [callbackUrl, onCallbackUrlChange] = useState(
    config.callbackUrl || window.location.href
  );
  const [buttonTheme, onButtonThemeChange] = useState(
    config.themeOptions[0].value
  );
  const [graphScopes, onGraphScopesChange] = useState([
    config.graphScopesOptions[0].value,
  ]);
  const [withUserData, onWithUserDataChange] = useState(true);
  const [customClassName, onCustomClassNameChange] = useState("my-button");
  const [customButton, onCustomButtonChange] = useState(false);
  const [forceRedirectStrategy, onForceRedirectStrategyChange] = useState(
    false
  );
  const [debug, onDebugChange] = useState(true);

  const loginHandler = (err, data, msal) => {
    console.log(err, data);
    if (!err && data) {
      onMsalInstanceChange(msal);
    }
  };

  const logoutHandler = () => {
    msalInstance.logout();
  };

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
                  onChange={(e) => onClientIdChange(e.target.value)}
                  placeholder="f8c7976f-3e93-482d-88a3-62a1133cbbc3"
                  value={clientId}
                />
              </Form.Field>
              <Form.Field>
                <label>Redirect URI</label>
                <input
                  onChange={(e) =>
                    onCallbackUrlChange(e.target.value, "callbackUrl")
                  }
                  placeholder="https://example.com"
                  value={callbackUrl}
                />
              </Form.Field>
              <Form.Field>
                <label>Button theme</label>
                <Select
                  onChange={(e, data) =>
                    onButtonThemeChange(data.value, "buttonTheme")
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
                    onGraphScopesChange(data.value, "graphScopes")
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
                  onChange={(e) =>
                    onCustomClassNameChange(e.target.value, "customClassName")
                  }
                  placeholder="my-class-name"
                  value={customClassName}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  onChange={(e, data) =>
                    onWithUserDataChange(data.checked, "withUserData")
                  }
                  label="With user data"
                  defaultChecked={withUserData}
                  toggle
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  onChange={(e, data) => onDebugChange(data.checked, "debug")}
                  label="Debug"
                  defaultChecked={debug}
                  toggle
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  onChange={(e, data) =>
                    onForceRedirectStrategyChange(
                      data.checked,
                      "forceRedirectStrategy"
                    )
                  }
                  label="Force redirect strategy"
                  defaultChecked={forceRedirectStrategy}
                  toggle
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  onChange={(e, data) =>
                    onCustomButtonChange(data.checked, "customButton")
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
            {msalInstance ? (
              <Button onClick={logoutHandler}>Logout</Button>
            ) : (
              <MicrosoftLogin
                withUserData={withUserData}
                debug={debug}
                clientId={clientId}
                forceRedirectStrategy={forceRedirectStrategy}
                authCallback={loginHandler}
                buttonTheme={buttonTheme}
                className={customClassName}
                graphScopes={graphScopes}
                children={customButton && <Button>Custom button</Button>}
                useLocalStorageCache={true}
              />
            )}
          </Segment>
        </Container>
      </Segment>
    </div>
  );
};

export default ExamplePage;
