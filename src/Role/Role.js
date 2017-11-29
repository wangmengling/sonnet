import React,{ Component } from "react";
import { withRouter } from "react-router-dom";
import { Table, Icon, Button } from 'antd';
import RoleAdd from "./RoleAdd";
import "./Role.less";

const columns = [{
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
    width: 700,
    render: text => <a href="#">d{text}</a>,
  },{
    title: '操作',
    key: 'action',
    width: 360,
    render: (text, record) => (
      <span>
        <a href="#">Action 一 {record.name}</a>
        <span className="ant-divider" />
        <a href="#">Delete</a>
        <span className="ant-divider" />
        <a href="#" className="ant-dropdown-link">
          More actions <Icon type="down" />
        </a>
      </span>
    ),
  }];
  
  const data = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      key: i,
      name: 'John Brown',
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }
class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bordered: true,
          loading: false,
          pagination: true,
          size: 'default',
          rowSelection: {},
          scroll: undefined,
          visible: false,
        }
    }

    onAdd() {
        this.setState({ visible: true });
      }
    render() {
        return (
            <Modal {...modalOpts}>
            <div className="Role">
                <div className="Role_Create_Button">
                    <Button onClick={onAdd}>创建角色</Button>
                </div>
                <div className="RoleList">
                    <Table {...this.state} columns={columns} dataSource={data} />
                </div>
                <RoleAdd
                //   ref={this.saveFormRef}
                  visible={this.state.visible}
                //   onCancel={this.handleCancel}
                //   onCreate={this.handleCreate}
                />
            </div>
            </Model>
        );
    }
}

export default withRouter(Role);