import React,{ Component } from "react";
import { withRouter } from "react-router-dom";
import { Table, Icon, Button, Popconfirm } from 'antd';
import { observer } from "mobx-react";
import ColorAdd from "./ColorAdd";
// import "./Role.less";
@observer
class ColorList extends Component {
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
        // this.handleRoleUpdate = this.handleRoleUpdate.bind(this);
    }

    componentWillMount() {
      this.props.store.list();
    }

    saveFormRef = (form) => {
      this.form = form;
    }

    handleCancel = () => {
      this.props.store.visible = false;
      this.props.store.updateData = {};
    }

    handleCreate = () => {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        // console.log('Received values of form: ', values);
        // this.props.store.visible = false;
        if (this.props.store.updateData.name) {
          this.props.store.update(values.name,this.props.store.updateData._id);
        }else {
          this.props.store.add(values.name);
        }
        // form.resetFields();
      });
    }

    onAdd() {
        this.props.store.updateData = {};
        this.props.store.visible = true;
    }

    onUpdate(index) {
      const data = this.props.store.dataList[index]
      // this.props.store.update(data.name,data._id)
      this.props.store.visible = true;
      this.props.store.updateData = data;
    }

    onDelete(index) {
      const data = this.props.store.dataList[index];
      console.log(data._id);
      this.props.store.delete(data._id);
    }

    columns = [{
      title: '色系名称',
      dataIndex: 'name',
      key: 'name',
      width: 700,
      render: text => <a href="#">{text}</a>,
    },{
      title: '操作',
      key: 'action',
      width: 360,
      render: (text, record, index) => (
        <span>
          <a title="update"  className="mgl10" onClick={this.onUpdate.bind(this,index)}> update </a>
          <span className="ant-divider" />
          <Popconfirm title="删除不可恢复，你确定要删除吗?" onConfirm={this.onDelete.bind(this,index)} >  
              <a title="用户删除"  className="mgl10" >  
              <Icon type="delete"/>
              </a>  
              {/* onClick={this.onDelete.bind(this,index)} */}
          </Popconfirm>
        </span>
      ),
    }];

    render() {
      const store = this.props.store;
        return (
            <div className="Role">
                <div className="Role_Create_Button">
                    <Button onClick={this.onAdd.bind(this)}>创建色系</Button>
                </div>
                <div className="RoleList">
                    <Table {...this.state} columns={this.columns} dataSource={store.dataList} />
                </div>
                <ColorAdd
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


export default withRouter(ColorList);