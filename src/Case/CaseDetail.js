import React,{ Component } from "react";
import { withRouter,Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Card } from 'antd';
import  "./CaseDetail.less";
import VideoPlayer from '../components/MediaPlayer/VideoPlayer'

class CaseDetail extends Component {
    render(){
        return (
            <div className="CaseDetail">
                <Card className="CaseDetailCardBox"  style={{ width: '100%' }}>
                    <div className="CaseDetail">
                        <div>龙湖变身大股东，能给城南带来一座天街吗</div>
                        <div>
                            <div>
                                
                            </div>
                            <div className="ImageAndVideo">
                                <div className="ShowImage"><img style={{width:'100%'}} src="http://s0.ifengimg.com/2018/02/26/ddb26e51b475579111d140ae31159fa2.jpg" /></div>
                            </div>
                        </div>
                    </div>
                </Card>
                {/* <Card className="CaseDetailCardBox"  style={{ width: '100%' }}>
                    <div className="ImageAndVideo">
                        <div className="ShowImage"><img style={{width:'100%'}} src="http://s0.ifengimg.com/2018/02/26/ddb26e51b475579111d140ae31159fa2.jpg" /></div>
                        <div className="ShowVideo"><VideoPlayer   style={{width:'100%'}} src="http://jelmerdemaat.nl/online-demos/conexus/video/small.mp4" autoPlay={false} /></div>
                    </div>
                </Card> */}
            </div>
        )
    }
}


export default withRouter(CaseDetail);