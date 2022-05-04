import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Form, Input, Checkbox } from "antd";
import Edit from "./Edit";

const { SubMenu } = Menu;
function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setisEditVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get")
      .then((res) => res.json())
      .then((data) => setBookmarks(data["bookmarks"]));
  }, []);

  const add = async (values) => {
    let res = await fetch("http://localhost:5000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    let r = await res.json();
    console.log(r);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    setBookmarks([...bookmarks, values]);
    add(values);

    handleCancel();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const _delete = async (id) => {
    console.log(id);
    let res = await fetch("http://localhost:5000/delete/" + id);
    let r = await res.json();
    console.log(r);
    setBookmarks(bookmarks.filter((i) => i._id !== id));
  };

  const updateData = () => {
    fetch("http://localhost:5000/get")
      .then((res) => res.json())
      .then((data) => setBookmarks(data["bookmarks"]));
  };

  const _edit = async (id, values) => {
    console.log(id, values);
    let res = await fetch("http://localhost:5000/edit", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    let r = await res.json();
    console.log(r);
    setBookmarks(bookmarks.filter((i) => i._id !== id));
  };

  return (
    <div>
      <Menu style={{ display: "flex" }}>
        <Menu.Item key="mail" onClick={showModal}>
          Add Bookmark
        </Menu.Item>

        <Input
          onChange={(event) => {
            console.log(event.target.value, bookmarks[0].name);
            setBookmarks(
              bookmarks.filter((i) => i.name.include(event.target.value))
            );
          }}
          style={{
            width: "50%",
            height: "30%",
            marginLeft: "10px",
            marginTop: "10px",
          }}
          placeholder="Search value"
        />
      </Menu>
      <Modal
        title="Add Bookmark"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input bookmark name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="url"
            name="url"
            rules={[{ required: true, message: "Please input bookmark url!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {bookmarks.map((i) => {
        return (
          <Card
            type="inner"
            title={i.name + "                          " + i.url}
            extra={
              <div>
                <Button onClick={() => setisEditVisible(true)}> Edit </Button>

                <Button onClick={() => _delete(i._id)}> Delete </Button>
              </div>
            }
            size="default"
          >
            <Edit
              data={i}
              update={updateData}
              visible={isEdit}
              id={i._id}
              setVisible={() => setisEditVisible(false)}
            />
          </Card>
        );
      })}
    </div>
  );
}

export default App;
