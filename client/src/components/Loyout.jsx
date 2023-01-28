import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  CopyOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import "./layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;

const LayoutDesign = ({ children }) => {
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //to get localstorage data
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && <Spinner />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <h2 className="logo-title">MP POS</h2>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/products" icon={<UnorderedListOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="cart-item dflex" onClick={() => navigate("/cart")}>
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            textAlign: "left",
            borderRadius: "10px",
            minHeight: 280,
            background: colorBgContainer,
            boxShadow: "1px 1px 3px rgb(159 129 129)",
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDesign;
