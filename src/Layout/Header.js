import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import classnames from 'classnames'
import  './Header.less'
// import Menus from './Menus'

const SubMenu = Menu.SubMenu

const Header = ({ user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu }) => {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div className='header'>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName='header-popovermenu' trigger="click" content={<Menus {...menusProps} />}>
          <div className='header-button'>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div
          className='header-button'
          onClick={switchSider}
        >
          <Icon type={classnames({ 'menu-unfold': siderFold, 'menu-fold': !siderFold })} />
        </div>}
      <div className='header-rightWarpper'>
        <div className='header-button'>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
           <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="user" />
              {/* {user.username} */}
            </span>}
          >
            <Menu.Item key="logout">
              Sign out
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header