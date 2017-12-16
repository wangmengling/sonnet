import React,{ Component  } from "react";
import Filter from "./Filter";
import { withRouter } from "react-router-dom";
import { Table, Icon, Switch, Radio, Form, Popconfirm} from 'antd';
import { observer } from "mobx-react";
import UserAdd from "./UserAdd";
const FormItem = Form.Item;
import  "./UserList.less";

const columns = [{
  title: '名字',
  dataIndex: 'username',
  key: 'username',
  width: 150,
  render: text => <a href="#">{text}</a>,
},{
  title: '角色',
  dataIndex: 'role',
  key: 'role',
  width: 150,
  render: text => <a href="#">{text}</a>,
},  {
  title: '操作',
  key: 'action',
  width: 360,
  render: (text, record) => (
    <span>
      <a href="#">详情</a>
      <span className="ant-divider" />
      <a href="#">删除</a>
      <span className="ant-divider" />
    </span>
  ),
}];

const param = (updateAction,deleteAction) => {
  return [{
    title: '名字',
    dataIndex: 'username',
    key: 'username',
    width: 150,
    render: text => <a href="#">{text}</a>,
  },{
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    width: 150,
    render: text => <a href="#">{text}</a>,
  },  {
    title: '操作',
    key: 'action',
    width: 360,
    render: (text, record) => (
      <span>
        <a title="update"  className="mgl10" onClick={updateAction}> 更改 </a>
        <span className="ant-divider" />
        <Popconfirm title="删除不可恢复，你确定要删除吗?" onConfirm={deleteAction} >  
            <a title="用户删除"  className="mgl10" >  
            {/* <Icon type="delete"/> */}
            删除
            </a>  
            {/* onClick={this.onDelete.bind(this,index)} */}
        </Popconfirm>
      </span>
    ),
  }];
};


// const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const showHeader = true;
const scroll = { y: 240 };

// const filterProps = {
//   filter: {
//     ...location.query,
//   },
//   onFilterChange (value) {
//     console.log(value);
//   },
//   onSearch (fieldsValue) {
//     console.log(fieldsValue);
//   },
// }

@observer
class UserList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bordered: true,
        loading: false,
        pagination: true,
        size: 'default',
        showHeader,
        rowSelection: {},
        scroll: undefined,
        
      }
      this.onAdd = this.onAdd.bind(this);
      this.deleteAction = this.deleteAction.bind(this);
      this.updateAction = this.updateAction.bind(this);
    }

    componentWillMount() {
      this.props.store.list();
      this.props.roleStore.getRoleList();
    }

    handleToggle = (prop) => {
      return (enable) => {
        this.setState({ [prop]: enable });
      };
    }
  
    handleSizeChange = (e) => {
      this.setState({ size: e.target.value });
    }
  
    handleHeaderChange = (enable) => {
      this.setState({ showHeader: enable ? showHeader : false });
    }
  
    handleRowSelectionChange = (enable) => {
      this.setState({ rowSelection: enable ? {} : undefined });
    }


    saveFormRef = (form) => {
      this.form = form;
    }

    handleCancel = () => {
      // this.setState({ visible: false });
      this.props.store.visible = false;
    }

    handleCreate = (data) => {
      this.props.store.userAdd(data);
    }

    onAdd() {
      // this.setState({ visible: true });
      this.props.store.visible = true;
    }

    deleteAction() {
      console.log("asdfasdfasdf");
    }

    updateAction() {
      console.log("asdfasdfasdfddd=====");
    }

    filterProps = {
      filter: {
        ...location.query,
      },
      
      onSearch (fieldsValue) {
        // console.log(fieldsValue);
      },
    }

    onFilterChange (value) {
      // console.log(value);
      this.props.store.searchParams["params"] = value;
      this.props.store.list();
    }

    render() {
      const state = this.state;
      this.filterProps["onAdd"] = this.onAdd;
        return (
            <div>
                <div className="userList-filter">
                <Filter {...this.filterProps} onFilterChange={this.onFilterChange.bind(this)}/>
                </div>
                {/* <Table columns={columns} dataSource={data} onChange={onChange} /> */}
                <Table {...this.state} columns={param(this.updateAction,this.deleteAction)} dataSource={this.props.store.userList} />
                <UserAdd
                  ref={this.saveFormRef}
                  visible={this.props.store.visible}
                  onCancel={this.handleCancel}
                  onOk={this.handleCreate}
                  roleStore={this.props.roleStore}
                />
            </div>
        );
    }
}

export default withRouter(UserList);