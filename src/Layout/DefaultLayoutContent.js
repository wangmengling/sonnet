import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import { UserStore } from "../../stores";
import HeaderView from "./HeaderView";
import Slider from "./Slider";
import './DefaultLayoutContent.less';
class DefaultLayoutContent extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  logout() {
    UserStore.signOut();
  }
  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          {/* <div className="logo" /> */}
          <Slider />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 , height:47}}>
            {/* <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            /> */}
            <HeaderView user={UserStore.userModel} logout={this.logout} switchSider={this.toggle}/>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DefaultLayoutContent;