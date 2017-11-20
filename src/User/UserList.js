import React,{ Component  } from "react";
import Filter from "./Filter";
import { Table, Icon, Switch, Radio, Form } from 'antd';
import UserAdd from "./UserAdd";
const FormItem = Form.Item;
import  "./UserList.less";

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 150,
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: 70,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
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
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

// const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const scroll = { y: 240 };

const filterProps = {
  filter: {
    ...location.query,
  },
  onFilterChange (value) {
    // dispatch(routerRedux.push({
    //   pathname: location.pathname,
    //   query: {
    //     ...value,
    //     page: 1,
    //     pageSize,
    //   },
    // }))
  },
  onSearch (fieldsValue) {
    // fieldsValue.keyword.length ? dispatch(routerRedux.push({
    //   pathname: '/user',
    //   query: {
    //     field: fieldsValue.field,
    //     keyword: fieldsValue.keyword,
    //   },
    // })) : dispatch(routerRedux.push({
    //   pathname: '/user',
    // }))
  },
  // onAdd () {
  //   // dispatch({
  //   //   type: 'user/showModal',
  //   //   payload: {
  //   //     modalType: 'create',
  //   //   },
  //   // })
  //   // this.setState({ visible: true });
  // },
  switchIsMotion () {
    // dispatch({ type: 'user/switchIsMotion' })
  },
}


class UserList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bordered: true,
        loading: false,
        pagination: true,
        size: 'default',
        showHeader,
        footer,
        rowSelection: {},
        scroll: undefined,
        visible: false,
      }
      this.onAdd = this.onAdd.bind(this);
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
  
    handleFooterChange = (enable) => {
      this.setState({ footer: enable ? footer : undefined });
    }
  
    handleRowSelectionChange = (enable) => {
      this.setState({ rowSelection: enable ? {} : undefined });
    }


    saveFormRef = (form) => {
      this.form = form;
    }

    handleCancel = () => {
      this.setState({ visible: false });
    }

    handleCreate = () => {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ visible: false });
      });
    }

    onAdd() {
      // dispatch({
      //   type: 'user/showModal',
      //   payload: {
      //     modalType: 'create',
      //   },
      // })
      this.setState({ visible: true });
    }

    render() {
      const state = this.state;
      filterProps["onAdd"] = this.onAdd;
        return (
            <div>
                <div className="userList-filter">
                <Filter {...filterProps} />
                </div>
                {/* <Table columns={columns} dataSource={data} onChange={onChange} /> */}
                <Table {...this.state} columns={columns} dataSource={data} />
                <UserAdd
                  ref={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default UserList;