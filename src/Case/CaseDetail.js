import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Card, Tag, List, Button } from 'antd';
import { CaseStore } from "../../stores";
import "./CaseDetail.less";
import VideoPlayer from '../components/MediaPlayer/VideoPlayer'
import API from "../../config/API.config";
import Lightbox from 'react-image-lightbox';

const images = [
    'http://img.blog.csdn.net/20171219205022816?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc29uZzI3OTgxMTc5OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast',
    'http://img.blog.csdn.net/20171219205022816?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc29uZzI3OTgxMTc5OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast',
    'http://img.blog.csdn.net/20171219205022816?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc29uZzI3OTgxMTc5OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast',
    'http://img.blog.csdn.net/20171219205022816?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc29uZzI3OTgxMTc5OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast',
];

@observer
class CaseDetail extends Component {
    constructor(props, context) {
        super(props, context);
        // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }
    componentWillMount() {
        // this.props.store.detail();
        var { caseId } = this.props.location.state;
        CaseStore.detailById(API.api.case.detailById, caseId);
    }
    render() {
        var detailData = CaseStore.detailData;
        let time = "";
        if (detailData.time) {
            time = (new Date(parseInt(detailData.time))).toLocaleString();
        }
        const { photoIndex, isOpen } = this.state;
        return (
            <div className="CaseDetail">
                <div className="DetailHeader">
                    <div className="DetailTitle">
                        {detailData.title}
                    </div>
                    <div className="DetailAction">
                        <Link to={{
                            pathname: '/case/update',
                            search: `?caseId=${detailData._id}`,
                            // hash: '#the-hash',
                            state: { caseId: detailData._id }
                        }}>
                            <Button>
                                编辑
                            </Button>
                        </Link>
                    </div>
                </div>
                <Card className="CaseDetailCardBox" bordered={false} style={{ width: '100%' }}>
                    <div className="DetailMore">
                        <div className="DetailMoreCategory">
                            <div>
                                <span><span className="DetailMoreCategoryLeft">联系人：</span><span className="DetailMoreCategoryRight">{detailData.contact}</span></span>
                                <span className="DetailMoreRight"><span className="DetailMoreCategoryLeft">联系电话：</span><span className="DetailMoreCategoryRight">{detailData.phone}</span></span>
                            </div>
                            <div>
                                <span><span className="DetailMoreCategoryLeft">策划人：</span><span className="DetailMoreCategoryRight">{detailData.username}</span></span>
                                <span className="DetailMoreRight"><span className="DetailMoreCategoryLeft">婚礼日期：</span><span className="DetailMoreCategoryRight">{time}</span></span>
                            </div>
                            <div>
                                <span><span className="DetailMoreCategoryLeft">风格：</span><span className="DetailMoreCategoryRight">{detailData.title}</span></span>
                                <span className="DetailMoreRight"><span className="DetailMoreCategoryLeft">色系：</span><span className="DetailMoreCategoryRight">{detailData.color}</span></span>
                            </div>
                            <div>
                                <span><span className="DetailMoreCategoryLeft">室内室外：</span><span className="DetailMoreCategoryRight">{detailData.position}</span></span>
                                <span className="DetailMoreRight"><span className="DetailMoreCategoryLeft">地址：</span><span className="DetailMoreCategoryRight">{detailData.address}</span></span>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="CaseDetailCardThumbAndVideo" bordered={false} style={{ width: '100%' }}>
                    <div className="ThumbAndVideo">
                        <div className="ShowThumb"><img style={{ width: '100%', border: '0.5px red' }} src={API.api.baseUrl + detailData.thumbUrl} /></div>
                        <div className="ShowVideo"><VideoPlayer style={{ width: '100%', height: '100%' }} src={API.api.baseUrl + detailData.videoUrl} autoPlay={false} /></div>
                    </div>
                </Card>

                <Card className="CaseDetailCardImage" bordered={false} style={{ width: '100%' }}>
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                        dataSource={detailData.imageUrl}
                        renderItem={(item,index )=> (
                            <List.Item>
                                <Card
                                    hoverable
                                    bodyStyle={{ padding: '0px' }}
                                // cover={<img src={API.api.baseUrl + item} />}
                                >
                                    <img style={{ width: '100%', height: '100%' }} src={API.api.baseUrl + item[0]["src"]} onClick={() => this.setState({ isOpen: true,photoIndex:index })}/>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Card>
                {isOpen && (
                    <Lightbox
                        mainSrc={API.api.baseUrl + detailData.imageUrl[photoIndex][0]["src"]}
                        nextSrc={API.api.baseUrl + detailData.imageUrl[(photoIndex + 1) % detailData.imageUrl.length][0]["src"]}
                        prevSrc={API.api.baseUrl + detailData.imageUrl[(photoIndex + detailData.imageUrl.length - 1) % detailData.imageUrl.length][0]["src"]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + detailData.imageUrl.length - 1) % detailData.imageUrl.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % detailData.imageUrl.length,
                            })
                        }
                    />
                )}
            </div>
        )
    }
}


export default withRouter(CaseDetail);