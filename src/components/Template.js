import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogoutOutlined, ShoppingOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Auth from "../hooks/Auth";

const Template = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const { user, logout } = Auth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const getItem = (label, key, icon, children, type) => ({ key, icon, children, label, type });
  const handleLogout = () => {
    if (confirm("Are you sure to logout?")) {
      logout();
      window.location.reload();
    }
  };
  const menus = [getItem("Product", "1", <ShoppingOutlined />), getItem("Not available", "2", <CloseCircleOutlined />), getItem("Not available", "sub1", <CloseCircleOutlined />, [getItem("Not available", "3"), getItem("Not available", "4"), getItem("Not available", "5")]), getItem("Not available", "sub2", <CloseCircleOutlined />, [getItem("Not available", "6"), getItem("Not available", "8")]), getItem("Logout", "9", <LogoutOutlined />, undefined, undefined, handleLogout)];
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible width="250" collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="flex justify-center m-2 mt-4 mb-3">
            <img className="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600" alt="" />
            <h1 className="pt-1.5 ml-2 font-sarabun text-white">Workshop</h1>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={menus}
            onClick={(e) => {
              if (e.key === "9") {
                handleLogout();
              }
              if (e.key === "1") {
                navigate("/");
              }
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="text-right" style={{ color: "white" }}>
            Welcome back, {user && user.username}
          </Header>
          <Content className="ml-5 mr-5 relative">
            <Outlet />
          </Content>
          <Footer className="text-center">Workshop ©2023 Using React, Antd, tailwind</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Template;
