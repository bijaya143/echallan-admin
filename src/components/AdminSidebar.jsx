import React from "react";
import { NavLink } from "react-router-dom";
import "./css/AdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faFile,
  faGavel,
  faTrafficLight,
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <h3 className="profile-name">Admin Panel</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              <FontAwesomeIcon
                icon={faTachometerAlt}
                className="sidebar-icon"
              />{" "}
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" activeClassName="active">
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" /> Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/tickets" activeClassName="active">
              <FontAwesomeIcon icon={faFile} className="sidebar-icon" /> Tickets
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/disputes" activeClassName="active">
              <FontAwesomeIcon icon={faGavel} className="sidebar-icon" />{" "}
              Disputes
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/admin/road-traffic" activeClassName="active">
              <FontAwesomeIcon icon={faTrafficLight} className="sidebar-icon" />{" "}
              Road Traffic
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
