import React,{ Component  } from "react";
import Filter from "./Filter";
import API from "../../config/API.config";
import { withRouter,Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import { Table, Icon, Switch, Radio, Form, Popconfirm, List, Card, Spin} from 'antd';
import { observer } from "mobx-react";
const FormItem = Form.Item;
import  "./CaseList.less";
import { Meta } from "antd/lib/list/Item";
@observer
class CaseList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bordered: true,
        pagination: true,
        size: 'default',
        rowSelection: {},
        scroll: undefined,
      }
      this.props.store.pageSize = 10;
      this.props.store.pageIndex = 0;
    }

    componentWillMount() {
      this.props.store.pageIsMoreData = true;
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
      // this.props.store.loading = true;
      if (data.length >= this.props.store.count) {
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
      var loadView = "";
      if (this.props.store.loading == true && this.props.store.hasMore == true) {
        loadView =<Spin className="demo-loading" />;
      }else {
        loadView = "";
      }
      return (
            <div  className="demo-infinite-container">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.props.store.loading && this.props.store.hasMore}
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
                      <Link to={{
                        pathname: '/case/detail',
                        search: `?caseId=${item._id}`,
                        // hash: '#the-hash',
                        // state: { fromDashboard: true }
                      }}>
                      <Card
                        hoverable
                        cover={<img src={API.api.baseUrl+item.thumbUrl} />}
                      >
                        <Meta 
                          title={item.title}
                          // description="www.instagram.com" 
                        ></Meta>
                      </Card>
                      </Link>
                    </List.Item>
                  )}
                >
                  {/* {this.props.store.loading && this.props.store.hasMore && <Spin className="demo-loading" />} */}
                  {loadView}
                </List>
              </InfiniteScroll>
            </div>
        );
    }
}

export default withRouter(CaseList);