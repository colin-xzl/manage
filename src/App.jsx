import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import Header from "./components/Header";
import Aside from "./components/Aside";
import Bread from "./components/Bread";

export default function App() {
  const { Sider, Content } = Layout;

  return (
    <div>
      <Layout id="app">
        <Header></Header>
        <Layout>
          <Sider>
            <Aside></Aside>
          </Sider>
          <Content className="contentBox">
            <Bread></Bread>
            <div className="content">
              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
        <footer>copyright &copy; Zhenglin Xiao</footer>
      </Layout>
    </div>
  );
}
