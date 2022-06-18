import React from "react";
import { useNavigate } from "react-router-dom";

import "./less/Login.less";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";

import logoImg from "../assets/logo.png";

import { RegisterApi } from "../request/api";

export default function Register() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    RegisterApi({
      username: values.username,
      password: values.password,
    }).then((res) => {
      if (res.errCode === 0) {
        message.success("You have successfully registered !");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <div className="login">
      <div className="loginBox">
        <img src={logoImg} alt="logo"></img>
        <Form
          size="large"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              placeholder="USC NetID (username)"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="PASSWORD"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button className="button" size="large" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
