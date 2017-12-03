import React,{ Component } from "react";
import { withRouter } from "react-router-dom";
import { Table, Icon, Button } from 'antd';
import { observer } from "mobx-react";
import RoleAdd from "./RoleAdd";
import "./Role.less";

const columns = [{
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
    width: 700,
    render: text => <a href="#">{text}</a>,
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
@observer
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
        }
    }

    componentWillMount() {
      this.props.store.getRoleList();
    }

    saveFormRef = (form) => {
      this.form = form;
    }

    handleCancel = () => {
      this.props.store.visible = false;
    }

    handleCreate = () => {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        // console.log('Received values of form: ', values);
        // this.props.store.visible = false;
        this.props.store.roleAdd(values.name);
        // form.resetFields();
      });
    }

    onAdd() {
        this.props.store.visible = true;
    }

    render() {
      const store = this.props.store;
        return (
            <div className="Role">
                <div className="Role_Create_Button">
                    <Button onClick={this.onAdd.bind(this)}>创建角色</Button>
                </div>
                <div className="RoleList">
                    <Table {...this.state} columns={columns} dataSource={store.roleList} />
                </div>
                <RoleAdd
                  ref={this.saveFormRef}
                  visible={store.visible}
                  onCancel={this.handleCancel}
                  onOk={this.handleCreate}
                  store={store}
                />
            </div>
        );
    }
}

export default withRouter(Role);