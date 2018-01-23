import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import PropTypes from 'prop-types'
import "./CaseAddBase.less";
import {Form, Input, Tooltip, Icon, Checkbox, Select, Row, Col, Upload, Button, AutoComplete, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];


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
            imageUrl:"",
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
            if (!err) {
                console.log('Received values of form: ', values);
                // this.props.store.current = 1;
                this.props.store.caseAddBase(values);
            }
            console.log(values);
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        console.log(value);
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    uploadImage = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const styleStore = this.props.styleStore;
        const colorStore = this.props.colorStore;
        const userStore = this.props.userStore;
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
            );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const imageUrl = this.state.imageUrl;

        autorun(() => {
            if (this.props.store.getCurrent == 0 && this.props.store.isNext == true) {
                // document.getElementById("CaseAddBaseForm").submit();
                // this.document.forms['CaseAddBaseForm'].submit();
                // this.refs.CaseAddBaseForm.onSubmit;
                // this.props.form.validateFields((err, values) => {
                //         this.props.onSubmit(err, values)
                //         // if (!err) {
                //         //     // this.hideModelHandler()
                //         // }
                // });
                // this.props.form.submit();
            }
        });
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
                        {getFieldDecorator('date-picker', {
                            rules: [{
                                type: 'object',
                                required: true,
                                message: 'Please select time!'
                            }],
                        })(
                            <DatePicker />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="策划人"
                        hasFeedback
                    >
                        {getFieldDecorator('userName', {
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
                            rules: [
                                { required: true, message: 'Please select your favourite colors!', type: 'array' },
                            ],
                        })(
                            <Select mode="multiple" placeholder="Please select favourite colors">
                                {styleStore.dataList.map(
                                    (data, idx) => <Option value={data.name} key={idx}>{data.name}</Option>
                                )}
                            </Select>
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                地址&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('address', {
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

                    <FormItem
                        {...formItemLayout}
                        label="婚礼色系"
                    >
                        {getFieldDecorator('color', {
                            rules: [
                                { required: true, message: 'Please select your favourite colors!', type: 'array' },
                            ],
                        })(
                            <Select mode="multiple" placeholder="Please select favourite colors">
                                {colorStore.dataList.map(
                                    (data, idx) => <Option value={data.name} key={idx}>{data.name}</Option>
                                )}
                            </Select>
                            )}
                    </FormItem>
                    {/* <FormItem
                    {...formItemLayout}
                    label="图片"
                    >
                    <div className="dropbox">
                        {getFieldDecorator('image', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                        })(
                        // <Upload.Dragger name="files" action="/upload.do">
                        //     <p className="ant-upload-drag-icon">
                        //     <Icon type="inbox" />
                        //     </p>
                        //     <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        //     <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        // </Upload.Dragger>
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="//jsonplaceholder.typicode.com/posts/"
                            beforeUpload={beforeUpload}
                            onChange={this.uploadImage}
                        >
                            {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
                        </Upload>
                        )}
                    </div>
                    </FormItem> */}
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </FormItem>
                </Form>    
            </div>
        );
    }
}

const CaseAddBase = Form.create()(CaseAddBaseForm);
export default withRouter(CaseAddBase);

