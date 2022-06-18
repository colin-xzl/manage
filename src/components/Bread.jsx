import React, { useEffect } from "react";

import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Bread() {
  const [breadName, setBreadName] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    switch (pathname) {
      case "/list":
        setBreadName("Viewing Lists");
        break;
      case "/edit":
        setBreadName("Editing some Data");
        break;
      case "/datamanage":
        setBreadName("Manage all the Data");
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <HomeOutlined />
      </Breadcrumb.Item>

      <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
