import React,{ Component  } from "react";
import Filter from "./Filter";
import API from "../../config/API.config";
import { withRouter } from "react-router-dom";
import { Table, Icon, Switch, Radio, Form, Popconfirm, List, Card} from 'antd';
import { observer } from "mobx-react";
const FormItem = Form.Item;
import  "./CaseList.less";
import { Meta } from "antd/lib/list/Item";

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

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

const title = () => 'Here is title';
const showHeader = true;
const scroll = { y: 240 };

@observer
class CaseList extends Component {
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
      this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
      this.props.store.list();
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

    onChangePage (current, pageSize) {
      this.props.store.pageSize = pageSize;
      this.props.store.pageIndex = current - 1;
      this.props.store.list();
    }

    onShowSizeChange (current, pageSize) {
      this.props.store.pageIndex = 0;
      this.props.store.pageSize = pageSize;
      this.props.store.list();
    }

    render() {
      const state = this.state;
      this.filterProps["onAdd"] = this.onAdd;
      const store = this.props.store;
        return (
            <div>
                <div className="userList-filter">
                <Filter {...this.filterProps} onFilterChange={this.onFilterChange.bind(this)}/>
                </div>
                <List
                  grid={{ gutter: 16, column: 3 }}
                  dataSource={this.props.store.dataList}
                  renderItem={item => (
                    <List.Item>
                      <Card
                        hoverable
                        cover={<img src={API.api.baseUrl+item.thumbUrl} />}
                      >
                        <Meta 
                          title={item.title}
                          // description="www.instagram.com" 
                        ></Meta>
                      </Card>
                    </List.Item>
                  )}
                />
            </div>
        );
    }
}

export default withRouter(CaseList);