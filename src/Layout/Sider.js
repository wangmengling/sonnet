import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;

class Sider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: '1',
      collapse:true,
      openKeys: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.getAncestorKeys = this.getAncestorKeys.bind(this);
  }
  handleClick (e){
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange (openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys(key) {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        style={{ width: 224 ,height: '100vh'}}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      >
        {/* <SubMenu key="sub1" title={<span><Icon type="laptop" /><span>面板</span></span>}> */}
          <Menu.Item key="1"><Link to="/dashBoard" ><span><Icon type="laptop" /><span>面板</span></span></Link></Menu.Item>
          {/* <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu> */}
        <SubMenu key="sub2" title={<span><Icon type="user" /><span>用户</span></span>}>
          <Menu.Item key="5"><Link to="/role/list" >角色管理</Link></Menu.Item>
         <Menu.Item key="6"> <Link to="/user/list" >用户列表</Link></Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="sub3"><span><Icon type="setting" /><span>订单管理</span></span></Menu.Item>
        <Menu.Item key="sub4"><span><Icon type="setting" /><span>案例</span></span></Menu.Item>
      </Menu>
    );
  }
}
export default Sider;
// ReactDOM.render(<Sider />, mountNode);