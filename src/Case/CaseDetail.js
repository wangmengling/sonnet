import React,{ Component } from "react";
import { withRouter,Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Card } from 'antd';

class CaseDetail extends Component {
    render(){
        return (
            <div>
                <Card loading title="Card title" style={{ width: '34%' }}>
                    Whatever content
                </Card>
            </div>
        )
    }
}


export default withRouter(CaseDetail);