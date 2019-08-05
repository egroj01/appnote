import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Axios from 'axios';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

// componentes
import Navigation from '../components/Navigation';
import NotesList from '../components/NotesList';
import CreateNote from '../components/CreateNote';
import CreateUser from '../components/CreateUser';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class MenuApp extends Component  {
  state = {
    collapsed: false,
    users: [],
  };

  async componentDidMount() {
    this.getUsers();
  }
  
  getUsers = async () => {
    const res = await Axios.get('http://localhost:4000/api/users');
    this.setState({users: res.data})
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const Creador = 'Jorge Castillo'
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="home" />
                  <span>Inicio</span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/create">
                  <Icon type="file" />
                  <span>Crear Notas</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/user">
                  <Icon type="user" />
                  <span>Crear Usuario</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub1"
                onClick={this.getUsers()}
                title={
                  <span>
                    <Icon type="user" />
                    <span>User</span>
                  </span>
                }
              >
                {
                  this.state.users.map(user => (
                    <Menu.Item key={user._id}>
                      {user.username}
                    </Menu.Item>))
                }
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="team" />
                    <span>Team</span>
                  </span>
                }
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header 
              style={{ background: "#fff", padding: 0, height: "0px" }}
            />
            <Content style={{ margin: "0px" }}>
              <Navigation style={{ margin: "16px 0" }} />
              <Breadcrumb.Item>{Creador}</Breadcrumb.Item>
              <div
                style={{ padding: 24, background: "#fff", minHeight: 360 }}
                id="navbarNav"
              >
                <Route path="/" exact component={NotesList} />
                <Route path="/edit/:id" component={CreateNote} />
                <Route path="/create" component={CreateNote} />
                <Route path="/user" component={CreateUser} />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              <span>{Creador}</span>
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}