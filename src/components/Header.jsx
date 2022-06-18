import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoImg from "../assets/logo2.jpeg";
import defaultAvatar from "../assets/defaultImg.png";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import { useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(defaultAvatar);
  const [username, setUsername] = useState("John Doe");

  useEffect(() => {
    let username1 = localStorage.getItem("username");
    let avatar1 = localStorage.getItem("avatar");

    setUsername(username1 || "John Doe");

    if (avatar1) {
      setAvatar("http://47.93.114.103:6688/" + avatar1);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    message.success("Log out successfully");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Profile
            </a>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "2",
          label: (
            <span onClick={logout} target="_blank">
              Log Out
            </span>
          ),
        },
      ]}
    />
  );

  return (
    <header>
      <img src={logoImg} alt="logo" className="logo"></img>
      <div className="right">
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()} className="dropdown">
            <img src={avatar} className="avatar" alt="defaultAvatar" />
            <span>{username}</span>
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </header>
  );
}
