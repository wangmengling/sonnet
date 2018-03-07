import React from "react";
import { observable, computed, action, autorun } from "mobx";
import { browserHistory } from 'react-router-dom';
import API from "../config/API.config";
import Fetch from "../utils/Fetch";
import CaseStore from "./CaseStore";
import { message } from "antd";
import axios from "axios";
class UploadStore {
    @observable videoStatus: boolean = false;
    @observable thumbStatus: boolean = false;
    @observable fileList = [];
    @action uploadVideo(formData) {
        this.videoStatus = false;
        var config = {
            processData:false,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              }
        };
        axios.post(API.api.upload.video,formData,config)
        .then(function(data){
            UploadStore.thumbStatus = true;
            if(UploadStore.thumbStatus && UploadStore.thumbStatus) {
                CaseStore.current = 2;
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    @action uploadThumb(formData) {
        this.thumbStatus = false;
        var config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              }
        }
        axios.post(API.api.upload.thumb,formData,config)
        .then(function(data){
            UploadStore.thumbStatus = true;
            if(UploadStore.thumbStatus && UploadStore.thumbStatus) {
                CaseStore.current = 2;
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

    @computed get isUploadDone() {
        return this.thumbStatus && this.videoStatus;
    }
}

export default  new UploadStore();