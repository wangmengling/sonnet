import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import "./CaseAdd.less";
import { Steps,Form, Input, Tooltip, Icon, Checkbox, Select, Row, Col, Upload, Button, AutoComplete, DatePicker } from 'antd';
import CaseAddBase from "./CaseAddBase";
import CaseAddImage from "./CaseAddImage";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const Step = Steps.Step;

const steps = [{
    title: '基础信息',
    content: 'First-content',
  }, {
    title: '图片',
    content: 'Second-content',
  }, {
    title: '完成',
    content: 'Last-content',
  }];

@observer
class CaseAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            loading:false
        };
    }

    
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const {current} = this.state;
        return (
            <div className="CaseAddContent">
            <Steps current={current}>
                {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className="steps-content">
            {
                    this.state.current == 0
                    &&
                    <CaseAddBase store={this.props.store} styleStore={this.props.styleStore} colorStore={this.props.colorStore} userStore={this.props.userStore}/>
                }
                {
                    this.state.current ==  1
                    &&
                    <CaseAddImage />
                }
                {
                    this.state.current == 2
                    &&
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                    </Button>
                }
            </div>
            <div className="steps-action">
                {
                    this.state.current < steps.length - 1
                    &&
                    <Button type="primary" onClick={() => this.next()}>下一步</Button>
                }
                {
                    this.state.current === steps.length - 1
                    &&
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
                }
                {
                    this.state.current > 0
                    &&
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    前一步
                    </Button>
                }
            </div>
                
            </div>
        );
    }
}
// const CaseAdd = Form.create()(CaseAddForm);
export default withRouter(CaseAdd);

