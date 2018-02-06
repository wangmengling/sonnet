import React from "react";
import { observable, computed, action, autorun } from "mobx";
import { browserHistory } from 'react-router-dom';
import API from "../config/API.config";
import Fetch from "../utils/Fetch";
import { message } from "antd";
class UploadStore {
    @action uploadVideo(formData) {
        console.log("ddddddddddd");
        console.log(formData);
        Fetch.post(API.api.upload.video,formData).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    @action uploadThumb(formData) {
        console.log("ddddddddddd");
        console.log('fileDDD',formData.get('filedata'));
        Fetch.post(API.api.upload.thumb,formData).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }
}

export default  new UploadStore();