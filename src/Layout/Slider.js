import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from "react-router-dom";
import { PublicStore } from "../../stores";
import { observer } from "mobx-react";
const SubMenu = Menu.SubMenu;
const {Sider} = Layout;
@observer
class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // current: '3',
      // collapsed:true,
      // openKeys: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.getAncestorKeys = this.getAncestorKeys.bind(this);
  }
  handleClick (e){
    console.log('Clicked: ', e);
    // this.setState({ current: e.key });
    PublicStore.sliderSelectCurrent = e.key;
    
    
  }
  onOpenChange (openKeys) {
    // const state = this.state;
    const latestOpenKey = openKeys.find(key => !(PublicStore.sliderItemSelectCurrent.indexOf(key) > -1));
    const latestCloseKey = PublicStore.sliderItemSelectCurrent.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    console.log(nextOpenKeys);
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    // console.log(nextOpenKeys);
    // 
    PublicStore.sliderItemSelectCurrent = nextOpenKeys;
    // this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys(key) {
    const map = {
      sub3: [],
    };
    return map[key] || [];
  }
  render() {
    return (
      <Menu
        mode="inline"
        // openKeys={this.state.openKeys}
        selectedKeys={[PublicStore.sliderSelectCurrent]}
        style={{height: '100vh'}}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
        defaultSelectedKeys={["1"]}
        // openKeys = {["sub1"]}
        openKeys = {PublicStore.sliderItemSelectCurrent}
      >
        <Menu.Item key="1"><Link to="/dashBoard" ><span><Icon type="laptop" /><span>面板</span></span></Link></Menu.Item>
        <SubMenu key="sub1" title={<span><Icon type="user" /><span>用户</span></span>}>
          <Menu.Item key="2"><Link to="/role/list" >角色管理</Link></Menu.Item>
         <Menu.Item key="3"> <Link to="/user/list" >用户列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="idcard" /><span>案例</span></span>}>
          <Menu.Item key="4"> <Link to="/case/list" >案例列表</Link></Menu.Item>
          <Menu.Item key="5"> <Link to="/case/add" >案例新增</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="setting" /><span>设置</span></span>}>
          <Menu.Item key="6"><Link to="/caseCategory/list" >分类管理</Link></Menu.Item>
          <Menu.Item key="7"> <Link to="/style/list" >风格</Link></Menu.Item>
          <Menu.Item key="8"> <Link to="/color/list" >色系</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
export default Slider;