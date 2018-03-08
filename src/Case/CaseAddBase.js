import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import PropTypes from 'prop-types'
import "./CaseAddBase.less";
import { CaseStore } from "../../stores/Index";
import {Form, Input, Tooltip, Icon, Checkbox, Select, Row, Col, Upload, Button, AutoComplete, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import moment from 'moment';

Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}


@observer
class CaseAddBaseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            loading:false
        }; 
    }

    componentWillMount() {
        this.props.userStore.list();
        this.props.styleStore.list();
        this.props.colorStore.list();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            // this.props.store.current = 1;
            if (!err) {
                console.log('Received values of form: ', values);
                // this.props.store.current = 1;
                if (this.props.store.detailData._id) {
                    this.props.store.update(values,this.props.store.detailData._id);
                }else {
                    this.props.store.caseAddBase(values);
                }
                
            }
            console.log(values);
        });
    }

    // handleConfirmBlur = (e) => {
    //     const value = e.target.value;
    //     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    // }

    // checkPassword = (rule, value, callback) => {
    //     const form = this.props.form;
    //     if (value && value !== form.getFieldValue('password')) {
    //         callback('Two passwords that you enter is inconsistent!');
    //     } else {
    //         callback();
    //     }
    // }

    // checkConfirm = (rule, value, callback) => {
    //     console.log(value);
    //     const form = this.props.form;
    //     if (value && this.state.confirmDirty) {
    //         form.validateFields(['confirm'], { force: true });
    //     }
    //     callback();
    // }

    

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const { detailData } = this.props.store;

        const styleStore = this.props.styleStore;
        const colorStore = this.props.colorStore;
        const userStore = this.props.userStore;
        const dateFormat = 'YYYY/MM/DD';
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        // const prefixSelector = getFieldDecorator('prefix', {
        //     initialValue: '86',
        // })(
        //     <Select style={{ width: 70 }}>
        //         <Option value="86">+86</Option>
        //         <Option value="87">+87</Option>
        //     </Select>
        //     );


        autorun(() => {
            if (this.props.store.getCurrent == 0 && this.props.store.isNext == true) {
                
            }
        });
        let time = "";
        if (detailData.time) {
            time = (new Date(parseInt(detailData.time))).toLocaleString();
        }else {
            time = (new Date()).toLocaleString();
        }
        return (
            <div className="CaseAddBaseContent">
                <Form className="CaseAddBaseForm"  ref="form"  name="CaseAddBaseForm" id="CaseAddBaseForm" onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                婚礼主题&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('title', {
                            initialValue: detailData.title,
                            rules: [
                            {
                                required: true, message: 'Please input your Title!',
                            }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="婚礼日期"
                    >
                        {getFieldDecorator('time', {
                            initialValue: moment(time, dateFormat),
                            rules: [{
                                type: 'object',
                                required: true,
                                message: 'Please select time!'
                            }],
                        })(
                            <DatePicker/>
                            // <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat}/>
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="策划人"
                        hasFeedback
                    >
                        {getFieldDecorator('username', {
                            initialValue: detailData.username,
                            rules: [
                                { required: true, message: 'Please select UserName!' },
                            ],
                        })(
                            <Select placeholder="请选择策划人">
                                {userStore.userList.map(
                                    (data, idx) => <Option value={data.username} key={idx}>{data.username}</Option>
                                )}
                            </Select>
                            )}
                    </FormItem>
                    
                    <FormItem
                        {...formItemLayout}
                        label="婚礼风格"
                    >
                        {getFieldDecorator('style', {
                            initialValue: detailData.style,
                            rules: [
                                { 
                                    required: true, 
                                    message: 'Please select your favourite style!', 
                                    // type: 'array' 
                                },
                            ],
                        })(
                            <Select mode="multiple" placeholder="Please select favourite style">
                                {styleStore.dataList.map(
                                    (data, idx) => <Option value={data.name} key={idx}>{data.name}</Option>
                                )}
                            </Select>
                            )}
                    </FormItem>
                    

                    <FormItem
                        {...formItemLayout}
                        label="婚礼色系"
                    >
                        {getFieldDecorator('color', {
                            initialValue: detailData.color,
                            rules: [
                                { required: true, 
                                    message: 'Please select your favourite colors!', 
                                    // type: 'array'
                                 },
                            ],
                        })(
                            <Select mode="multiple" placeholder="Please select favourite colors">
                                {colorStore.dataList.map(
                                    (data, idx) => <Option value={data.name} key={idx}>{data.name}</Option>
                                )}
                            </Select>
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="室内室外"
                    >
                        {getFieldDecorator('position', {
                            initialValue: detailData.position,
                            rules: [
                                { required: true, 
                                    message: 'Please select your favourite position!', 
                                    // type: 'array'
                                 },
                            ],
                        })(
                            <Select mode="single" placeholder="Please select favourite position">
                                {/* {colorStore.dataList.map(
                                    (data, idx) => <Option value={data.name} key={idx}>{data.name}</Option>
                                )} */}
                                <Option value="室内" key="0">室内</Option>
                                <Option value="室外" key="1">室外</Option>
                            </Select>
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                联系人&nbsp;
                            </span>
                        )}
                    >
                        {getFieldDecorator('contact', {
                            initialValue: detailData.contact,
                            // rules: [
                            // {
                            //     required: true, 
                            //     message: 'Please input your contact!',
                            // }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                联系电话&nbsp;
                            </span>
                        )}
                    >
                        {getFieldDecorator('phone', {
                            initialValue: detailData.phone,
                            // rules: [
                            // {
                            //     required: true, 
                            //     message: 'Please input your contact!',
                            // }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                地址&nbsp;
                                <Tooltip title="酒店名称或者酒店地址?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('address', {
                            initialValue: detailData.address,
                            rules: [
                            //     {
                            //     type: 'title', message: 'The input is not valid Title!',
                            // },
                             {
                                required: true, message: 'Please input your Title!',
                            }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" loading={this.props.store.addLoading}>新增</Button>
                    </FormItem>
                </Form>    
            </div>
        );
    }
}

const CaseAddBase = Form.create()(CaseAddBaseForm);
export default withRouter(CaseAddBase);

