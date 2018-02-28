import React,{ Component  } from "react";
import Filter from "./Filter";
import API from "../../config/API.config";
import { withRouter } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import { Table, Icon, Switch, Radio, Form, Popconfirm, List, Card, Spin} from 'antd';
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
        hasMore: true,
      }
      this.onAdd = this.onAdd.bind(this);
      this.props.store.pageSize = 10;
      this.props.store.pageIndex = 0;
    }

    componentWillMount() {
      this.props.store.list();
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
      this.props.store.searchParams["params"] = value;
      this.props.store.list();
    }

    

    handleInfiniteOnLoad = () => {
      let data = this.props.store.dataList;
      this.props.store.loading = true;
      if (data.length > 14) {
        message.warning('Infinite List loaded all');
        this.props.store.hasMore = false;
        this.props.store.loading = false;
        return;
      }
      this.props.store.pageIndex += 1;
      this.props.store.list();
    }

    render() {
      const state = this.state;
      const store = this.props.store;
        return (
            <div  className="demo-infinite-container">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}
              >
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
                >
                  {this.props.store.loading && this.props.store.hasMore && <Spin className="demo-loading" />}
                </List>
              </InfiniteScroll>
            </div>
        );
    }
}

export default withRouter(CaseList);