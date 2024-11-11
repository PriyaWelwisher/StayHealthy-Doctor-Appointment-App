import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-fill",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-list-check-3",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-stethoscope-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-shared-2-fill",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-circle-r-line",
    },
  ];

  const menuToBeRendered = userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            {/* Dynamically change the sidebar heading */}
            <h1 id="sidebar-heading" className="logo">{collapsed ? "SH" : "StayHealthy"}</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                  key={menu.path} // Added a key to each menu item
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="content">
          <div className="header">
            {/* Close icon for collapsing the sidebar */}

            {collapsed ? (
              <i
                className="ri-menu-unfold-line header-action-icon"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            ) : (
              <i
                className="ri-menu-fold-line header-action-icon"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <i className="ri-notification-line header-action-icon px-3"></i>
              <Link className="anchor" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
