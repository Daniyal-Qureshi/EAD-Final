import React from "react";
import { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Form, Input, Checkbox } from "antd";
function Edit(props) {
  console.log(props.data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onFinish = (values) => {
    console.log("Success in edit:", values);
    // setBookmarks([...bookmarks, values]);
    // add(values);
    _edit(values, props.id);
    handleCancel();
    props.update();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.setVisible();
  };

  const _edit = async (values, _id) => {
    console.log("eidt", values);
    values = { ...values, _id: _id };
    let res = await fetch("http://localhost:5000/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    let r = await res.json();
    console.log(r);
  };

  return (
    <div>
      <Modal
        title="Edit Bookmark"
        visible={props.visible}
        onOk={handleOk}
        onCancel={props.setVisible}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{ name: props.data.name, url: props.data.url }}
        >
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="url" name="url">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Edit;
