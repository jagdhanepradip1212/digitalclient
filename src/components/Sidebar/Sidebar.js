import React from "react";
import "../Sidebar/sidebar.css";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    // <div className="sidebar">
    //   <ul>
    //     <li>
    //       <a href="/home">
    //         <AiOutlineHome /> Home
    //       </a>
    //     </li>
    //     <li>
    //       <a href="/category">
    //         <AiOutlineBars /> Category
    //       </a>
    //     </li>
    //     <li>
    //       <a href="/product">
    //         <AiOutlineShop /> Product
    //       </a>
    //     </li>
    //   </ul>
    // </div>

    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/home" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/category" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Category</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/product" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Product</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

       
      </CDBSidebar>
    </div>  );
}

export default Sidebar;
