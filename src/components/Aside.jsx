import React from "react";

import {
  OrderedListOutlined,
  DatabaseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("List", "list", <OrderedListOutlined />),
  getItem("Edit", "edit", <EditOutlined />),
  getItem("Data Manage", "datamanage", <DatabaseOutlined />),
];

export default function Sider() {
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultKey, setKey] = useState("");

  useEffect(() => {
    let path = location.pathname;
    let key = path.split("/")[1];
    setKey(key);
  });

  const onClick = (e) => {
    navigate("/" + e.key);
    setKey(e.key);
  };

  return (
    <Menu
      className="aside"
      onClick={onClick}
      selectedKeys={[defaultKey]}
      mode="inline"
      items={items}
    />
  );
}
