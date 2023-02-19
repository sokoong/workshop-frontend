import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, notification } from "antd";
import Auth from "../hooks/Auth";

function Login() {
  const { login } = Auth();

  const onFinish = async (values) => {
    try {
      await login(values);
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-80 bg-white mx-auto shadow rounded p-5 pt-10 pb-10 relative mt-10">
      <div className="flex justify-center mb-5">
        <img className="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600" alt="" />
        <h1 className="pt-1.5 ml-2 font-sarabun">Workshop</h1>
      </div>
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username: admin" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password: admin" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="/forgot">
            <u>Forgot password</u>
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button bg-primary text-white mr-3">
            Log in
          </Button>
          Or
          <a href="/register">
            <u>register now!</u>
          </a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
