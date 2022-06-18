import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, PageHeader, Modal, Form, Input, message } from "antd";
import E from "wangeditor";

import moment from "moment";
import { useEffect } from "react";

import { ArticleAddApi, ArticleGetApi, ArticleUpdateApi } from "../request/api";
let editor = null;

export default function Edit() {
  const params = useParams();

  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");

  const [subTitle, setSubTitle] = useState("");

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (props) => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        let { title, subTitle } = values;

        if (params.id) {
          ArticleUpdateApi({ title, subTitle, content, id: params.id }).then(
            (res) => {
              if (res.errcode === 0) {
                navigate("list");
              } else {
                message.error(res.message);
              }
              setIsModalVisible(false);
            }
          );
        } else {
          ArticleAddApi({ title, subTitle, content }).then((res) => {
            if (res.errcode === 0) {
              navigate("list");
            } else {
              message.error(res.message);
            }
            setIsModalVisible(false);
          });
        }
      })
      .catch(() => {
        return;
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    editor = new E("#div1");
    editor.config.onchange = (newHtml) => {
      setContent(newHtml);
    };

    editor.create();

    //get Article

    if (params.id) {
      ArticleGetApi({ id: params.id }).then((res) => {
        if (res.errCode === 0) {
          console.log(res.data);
          editor.txt.html(res.data.content);
          setTitle(res.data.title);
          setSubTitle(res.data.subTitle);
        }
      });
    }

    return () => {
      editor.destroy();
    };
  }, [params]);

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        style={{ width: "100vw - 240px" }}
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="Edit"
        subTitle={"Date: " + moment(new Date()).format("YYYY-MM-DD")}
        extra={[
          <Button key="1" type="primary" onClick={showModal}>
            Submit
          </Button>,
        ]}
      ></PageHeader>
      <Modal
        zIndex={99999}
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{ title, subTitle }}
        >
          <Form.Item
            label="title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please Enter the title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="subTitle" name="subTitle">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <div id="div1" style={{ margin: "10px" }}></div>
    </div>
  );
}
