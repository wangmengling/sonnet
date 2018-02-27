import React from "react";
import { Upload, Icon, Modal, Input, Button } from 'antd';
import API from "../../../config/API.config";
import { CaseStore } from "../../../stores/Index";

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
    //   {
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // }
    ],
    imageUrlArray: []
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  onProgress = (progress) => {
    
  }
  
  onSuccess = (data,file) => {
    var imageUrlArray = this.state.imageUrlArray;
    if (data && data.code == 1) {
      this.setState({imageUrlArray:imageUrlArray});
    }
  }

  submitUpload = () => {
    if (this.state.fileList.length > 0) {
      var imageUrl = [];
      this.state.fileList.map(function(value){
        var response = value.response;
        if (response && response.code == 1) {
          imageUrl.push(response.data);
        }
      })
      var params = {"_id":CaseStore.detailData._id,"imageUrl":imageUrl};
      CaseStore.updateImageUrl(params);
    }
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        {/* <div>
            <Input type="text"  value="默认分组" style={{border:'0',backgroundColor:'rgba(255,255,255,0)'}} />
        </div> */}
        <div>
          <Upload
            action={API.api.upload.image}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            onProgress={this.onProgress}
          >
            {fileList.length >= 40 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <div>
            <Button type="primary"  onClick={this.submitUpload} loading={false}>完成上传</Button>
        </div>
      </div>
    );
  }
}

export default PicturesWall;