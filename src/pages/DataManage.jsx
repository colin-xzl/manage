import React from "react";

import "./less/DataManager.less";

import { Button, Form, Input, message } from "antd";

import { GetUserApi } from "../request/api";
import { useEffect } from "react";

export default function DataManage() {
  useEffect(() => {
    GetUserApi().then((res) => {
      if (res.errCode === 0) {
      } else {
        message.error(res.message);
      }
    });
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="outer">
      <Form
        style={{ width: "400px" }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Change Username: " name="ChangeUsername">
          <Input placeholder="Please Enter New Username" />
        </Form.Item>

        <Form.Item label="Change Password: " name="ChangePassword">
          <Input.Password placeholder="Please Enter New Password" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
