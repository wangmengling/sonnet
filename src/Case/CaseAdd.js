import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { observer } from "mobx-react";
import "./CaseAdd.less";
import { CaseStore } from "../../stores";
import API from "../../config/API.config";
import { Steps,Form, Input, Tooltip, Icon, Checkbox, Select, Row, Col, Upload, Button, AutoComplete, DatePicker } from 'antd';
import CaseAddBase from "./CaseAddBase";
import CaseAddImage from "./CaseAddImage";
import CaseAddThumbAndVideo from "./CaseAddThumbAndVideo";
import CaseAddComplete from "./CaseAddComplete";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const Step = Steps.Step;

const steps = [{
    title: '基础信息',
    content: 'First-content',
  }, {
    title: '缩略图',
    content: 'Second-content',
  }, {
    title: '图片',
    content: 'Three-content',
  }, {
    title: '完成',
    content: 'Last-content',
  }];

@observer
class CaseAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false
        };
    }

    componentWillMount() {
        // this.props.store.detail();
        this.props.store.detailData = {};
        this.props.store.current = 0;
        if (this.props.location.state) {
            var {caseId} = this.props.location.state;
            CaseStore.detailById(API.api.case.detailById,caseId);
        }
    }
    
    next() {
        // this.props.store.current = this.props.store.current + 1;
        this.props.store.isNext = true;
        console.log(this.props.store.current);
        // this.refs.form.validateFields((err, values) => {
        //     this.props.onSubmit(err, values)
        //     if (!err) {
        //         // this.hideModelHandler()
        //     }
        // });
        // this.refs.form.submit();
        
    }

    prev() {
        const current = this.props.store.current - 1;
        this.props.store.current = current;
    }

    render() {
        const current = this.props.store.current;
        return (
            <div className="CaseAddContent">
            <Steps current={current}>
                {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className="steps-content">
            {
                    current == 0
                    &&
                    // <CaseAddComplete  store={this.props.store}/>
                    <CaseAddBase 
                        store={this.props.store} 
                        styleStore={this.props.styleStore} 
                        colorStore={this.props.colorStore} 
                        userStore={this.props.userStore}
                        
                    />
                }
                {
                    current ==  1
                    &&
                    <CaseAddThumbAndVideo store={this.props.store}  uploadStore={this.props.uploadStore}/>
                }
                {
                    current == 2
                    &&
                    <CaseAddImage store={this.props.store}/>
                }
                {
                    current == 3 
                    && 
                    <CaseAddComplete  store={this.props.store}/>
                }
            </div>
            <div className="steps-action">
                {
                    current < steps.length - 2 && current > 0
                    &&
                    <Button type="primary" onClick={() => this.next()}>下一步</Button>
                }
                {/* {
                    current === steps.length - 1
                    &&
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
                } */}
                {
                    current > 0 && current < 3
                    &&
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    前一步
                    </Button>
                }
                {/* {
                    current == 3
                    &&
                    <Link to="/case/add" >
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    继续添加
                    </Button>
                    </Link>
                } */}
            </div>
                
            </div>
        );
    }
}
// const CaseAdd = Form.create()(CaseAddForm);
export default withRouter(CaseAdd);

