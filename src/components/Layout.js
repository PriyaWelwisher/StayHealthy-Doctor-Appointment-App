import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Badge} from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

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
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-fill",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-shared-2-fill",
    },
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

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
                  className={`d-flex menu-item ${isActive && "active-menu-item"
                    }`}
                  key={menu.path} // Added a key to each menu item
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            {/* {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-circle-r-line",
    }, */}
            <div
              className={`d-flex menu-item 
                  `} onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}
            // Added a key to each menu item
            >
              <i className='ri-logout-circle-r-line'></i>
              {!collapsed && <Link to='/login'>Logout</Link>}
            </div>
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
              <Badge count={user?.unseenNotifications.length} onClick={()=>navigate("/notifications")}>
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-3" to="/profile" >
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
