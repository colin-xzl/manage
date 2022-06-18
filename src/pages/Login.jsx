import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { LoginApi } from "../request/api";
import "./less/Login.less";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";

import logoImg from "../assets/logo.png";
export default function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    LoginApi({ username: values.username, password: values.password }).then(
      (res) => {
        if (res.errCode === 0) {
          console.log(res);
          message.success("Login Successfully !");
          localStorage.setItem("avatar", res.data.avatar);
          localStorage.setItem("cms-token", res.data["cms - token"]);
          localStorage.setItem("editable", res.data.editable);
          localStorage.setItem("player", res.data.player);
          localStorage.setItem("username", res.data.username);

          setTimeout(() => {
            navigate("/list");
          }, 1000);
        } else {
          message.error(res.message);
        }
      }
    );
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
          <Form.Item>
            <Link to="/register" className="register">
              Register Now
            </Link>
          </Form.Item>
          <Form.Item>
            <Button className="button" size="large" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
