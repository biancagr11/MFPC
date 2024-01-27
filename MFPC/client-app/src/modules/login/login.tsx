import React, { useState, useContext } from 'react';
import { Card, Form, Input, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { LoginRequest } from '../../interfaces/Requests';
import { Button } from 'antd';
import { LoginContext } from './login-store.ts';
import { observer } from 'mobx-react';
import FormContainer from '../../shared-components/FormContainer.tsx';
import { useNavigate } from 'react-router-dom';

const Login = observer(() => {
  const loginStore = useContext(LoginContext);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const loginSubmit = (values: LoginRequest) => {
    setIsLoginButtonDisabled(true);
    
    loginStore.login(values)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        setIsLoginButtonDisabled(false);
      });

      setIsLoginButtonDisabled(false);
  };

  return (
    <FormContainer>
    <h1 style={{color: '#0a46aa'}}>
        Login to Your Journal
        </h1>

      <Card bordered={false}>
        <Form name='basic'
          onFinish={loginSubmit}
        >
          <Form.Item
            label={"Username"}
            name='username'
            rules={[
              { required: true, message: "Username is required" }
            ]}
            hasFeedback
          >
            <Input
              placeholder='johndoe@gmail.com'
              suffix={
                <Tooltip title={"Title"}>
                  <InfoCircleOutlined style={{ color: '#df7153' }} />
                </Tooltip>
              }
            />
          </Form.Item>

          <Form.Item
            label={"Password"}
            name='password'
            rules={[
              { required: true, message: "Password is required" }
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder='******'
              suffix={
                <Tooltip title={"Password"}>
                  <InfoCircleOutlined style={{ color: '#2B4162' }} />
                </Tooltip>
              }
            />
          </Form.Item>

          <Button 
          disabled={isLoginButtonDisabled} 
          htmlType='submit'
          style={{color: '#0a46aa'}}> 
          {"Login"}
          </Button>
        </Form>
      </Card>
    </FormContainer>
  );
});

export default Login;