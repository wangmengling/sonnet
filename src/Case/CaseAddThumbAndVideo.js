import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import  './CaseAddThumbAndVideo.less'
import VideoPlayer from '../components/MediaPlayer/VideoPlayer'
import {
    Form, InputNumber,
    Slider, Button, Upload, Icon, Rate,
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

class CaseAddThumbAndVideoForm extends Component {

    state = {
        loading: false,
        imageUrl:""
    };

    _crop() {
        // image in dataUrl
        console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
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
          }));
        }
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

        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="Upload"
                        extra=""
                    >
                        {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <div>
                            <Upload.Dragger 
                            name="files" 
                            action="/upload.do"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                            >
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                    {/* <img src={imageUrl} className="previewImage" alt="" /> */}
                                    
                            </Upload.Dragger>
                            <Cropper
                            ref='cropper'
                            src={imageUrl}
                            style={{height: 400, width: '100%'}}
                            // Cropper.js options
                            aspectRatio={16 / 9}
                            guides={false}
                            crop={this._crop.bind(this)} />
                            </div>
                            )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="Dragger"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('dragger', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <div>
                                <Upload.Dragger name="files" action="/upload.do">
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </Upload.Dragger>
                                
                                
                                </div>
                                )}
                        </div>
                    </FormItem>

                    <FormItem
                        wrapperCol={{ span: 12, offset: 6 }}
                    >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                </Form>
                <VideoPlayer src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay={false} />
                {/* <Cropper
                    ref='cropper'
                    src='http://roadmanfong.github.io/react-cropper/example/img/child.jpg'
                    style={{height: 400, width: '100%'}}
                    // Cropper.js options
                    aspectRatio={16 / 9}
                    guides={false}
                    crop={this._crop.bind(this)} /> */}
            </div>
        )
    }
}
const CaseAddThumbAndVideo = Form.create()(CaseAddThumbAndVideoForm);
export default withRouter(CaseAddThumbAndVideo);