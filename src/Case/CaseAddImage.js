'use strict';
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {Form, Upload, Icon, Modal } from 'antd';
import PicturesWall from "../components/PicturesWall/PicturesWall";
const FormItem = Form.Item;

class CaseAddImageForm extends Component {
    
      render() {
        
        return (
          <div className="clearfix">
            <PicturesWall store={this.props.store}/>
          </div>
        );
      }
}

// const CaseAddImage = Form.create()(CaseAddImageForm);
export default withRouter(CaseAddImageForm);

