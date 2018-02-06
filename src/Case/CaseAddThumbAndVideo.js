import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import './CaseAddThumbAndVideo.less'
import VideoPlayer from '../components/MediaPlayer/VideoPlayer'
import {
    Form, InputNumber,
    Slider, Button, Upload, Icon, Rate,message
} from 'antd';
const FormItem = Form.Item;


import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
const Dragger = Upload.Dragger;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}



class CaseAddThumbAndVideoForm extends Component {

    state = {
        loading: false,
        imageUrl: "",
        videoUrl: "",
        cropResult: "",
        cropStatus: false, //是否在编辑状态
        imgFile:[],
        videoFile:[]
    };

    _crop() {
        // image in dataUrl
        console.log("ddddddd");
        console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }
    //上传视频
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // if (!err) {
            //     console.log('Received values of form: ', values);
            // }else {
                // let formData = new FormData();
                // var index = 0;
                // formData.append('filedata'+index ,this.state.imgFile);
                // index++;
                // formData.append('filedata'+index ,this.state.videoFile);
                // console.log('fileDDD',formData.get('filedata').type);
            // }
            // this.handleVideoSubmit();
            this.handleThumbSubmit();
        });
    }

    //上传视频
    handleVideoSubmit() {
        let formData = new FormData();
        formData.append('video' ,this.state.videoFile);
        this.props.uploadStore.uploadVideo(formData);
    }

    //上传缩略图
    handleThumbSubmit() {
        let formData = new FormData();
        formData.append('thumb' ,this.state.imgFile);
        console.log(this.state.imageUrl);
        console.log(this.state.imgFile);
        console.log(formData.getAll('thumb')); // ["sean", "will"]
        this.props.uploadStore.uploadThumb(formData);
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    //视频处理
    handleVideoChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log(info.file);
            getBase64(info.file.originFileObj, videoUrl => this.setState({
                videoUrl,
                loading: false,
            }));
        }
    }

    
    
    beforeVideoUpload = (file) => {
        const isMP4 = file.type === 'video/mp4';
        if (!isMP4) {
            message.error('You can only upload MP4 file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
            message.error('Image must smaller than 20MB!');
        }
        if (isMP4 && isLt2M) {
            this.setState(({ videoFile }) => ({
                // videoFile: [...videoFile, file],
                videoFile: file,
            }));
        }
        return isMP4 && isLt2M;
    }

    //图片处理
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log(info.file);
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
                cropStatus: true
            }));
        }
    }

     beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        if (isJPG && isLt2M) {
            this.setState(({ imgFile }) => ({
                // videoFile: [...videoFile, file],
                imgFile: file,
            }));
        }
        return isJPG && isLt2M;
    }

    cropImage() {
        console.log(this.state.cropStatus);
        if (this.state.cropStatus) {
            if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
                return;
            }
            this.setState({
                cropResult: this.refs.cropper.getCroppedCanvas().toDataURL(),
            });
        } else {

        }
        this.setState({ cropStatus: !this.state.cropStatus });
    }

    render() {
        const props = {
            name: 'file',
            multiple: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const imageUrl = this.state.imageUrl;
        const videoUrl = this.state.videoUrl;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        var cropView = "";
        if (imageUrl) {
            if (this.state.cropStatus) {
                cropView = (
                    <div>
                        <Cropper
                            ref='cropper'
                            src={imageUrl}
                            style={{ height: 400, width: '100%' }}
                            // Cropper.js options
                            aspectRatio={16 / 9}
                            guides={false}
                            crop={this._crop.bind(this)} />
                        <Button style={{ marginTop: 10, float: 'right' }} onClick={this.cropImage.bind(this)} >裁剪图片</Button>
                    </div>
                )
            } else {
                cropView = (
                    <div>
                        <img src={this.state.cropResult} style={{ height: 400, width: '100%' }} />
                        <div style={{ marginTop: 10, float: 'right' }}>
                            <Button onClick={this.cropImage.bind(this)} >编辑图片</Button>
                            <Upload 
                            name="files"
                            action="/upload.do"
                            showUploadList={false}
                            multiple={false}
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                            style={{ marginLeft: 10 }}
                            >
                                <Button>
                                <Icon type="upload" /> 重新选择图片
                                </Button>
                            </Upload>
                            {/* <Button style={{ marginLeft: 10 }} onClick={() => { this.setState({ imageUrl: "" }) }} >重新选择图片</Button> */}
                        </div>

                    </div>
                )

            }
        } else {
            cropView = (
                <Upload.Dragger
                    name="files"
                    action="/upload.do"
                    showUploadList={false}
                    multiple={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或者拖拽图片文件到这个区域上传</p>
                    {/* <p className="ant-upload-hint">Support for a single or bulk upload.</p> */}
                    {/* <img src={imageUrl} className="previewImage" alt="" /> */}

                </Upload.Dragger>
            )
        }


        var videoView = "";
        if (videoUrl) {
            videoView = (
                <div>
                    <VideoPlayer src={videoUrl} autoPlay={false} />
                    <div style={{ marginTop: 10, float: 'right' }}>
                        <Upload 
                        name="files"
                        multiple={false}
                        beforeUpload={this.beforeVideoUpload}
                        onChange={this.handleVideoChange}
                        showUploadList={false}
                        >
                            <Button >
                            <Icon type="upload" /> 重新选择视频
                            </Button>
                        </Upload>
                    </div>
                    
                    {/* <Button style={{ marginTop: 10, float: 'right' }} onClick={() => { this.setState({ videoUrl: "" }) }} >重新选择视频</Button> */}
                </div>
            );
        } else {
            videoView = (
                <Upload.Dragger
                    name="files"
                    multiple={false}
                    beforeUpload={this.beforeVideoUpload}
                    onChange={this.handleVideoChange}
                    showUploadList={false}
                // action="/upload.do"
                >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或者拖拽视频文件到这个区域上传</p>
                    {/* <p className="ant-upload-hint">Support for a single or bulk upload.</p> */}
                </Upload.Dragger>
            );
        }

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="焦点图"
                        extra=""
                    >
                        {/* {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })( */}
                            <div>
                                {cropView}
                            </div>
                            {/* )} */}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="视频"
                    >
                        <div className="dropbox">
                            {/* {getFieldDecorator('dragger', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })( */}
                                <div>
                                    {videoView}
                                </div>
                                {/* )} */}
                        </div>
                    </FormItem>

                    <FormItem
                        wrapperCol={{ span: 12, offset: 6 }}
                    >
                        <Button  type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const CaseAddThumbAndVideo = Form.create()(CaseAddThumbAndVideoForm);
export default withRouter(CaseAddThumbAndVideo);