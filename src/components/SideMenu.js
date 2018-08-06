import React, { Component } from 'react';
import { Link,BrowserRouter as Router } from "react-router-dom";
import { Menu,Icon } from 'antd';

class SideMenu extends Component {
    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{marginTop:'50px'}} >
          
            <Menu.Item key="1">
              <Link to='/'>
                <Icon type="user" />
                <span className="nav-text">Profile</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='repo'>
                  <Icon type="code" />
                  <span className="nav-text">All repositories</span>
              </Link>
            </Menu.Item>
           
          </Menu>
        );
    }
}

export default SideMenu;