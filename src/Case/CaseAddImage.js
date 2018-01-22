import React,{ Component } from "react";
import { withRouter } from "react-router-dom";
import {Form, Input, Tooltip, Icon, Checkbox, Select, Row, Col, Upload, Button, AutoComplete, DatePicker } from 'antd';
const FormItem = Form.Item;

class CaseAddImageForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                 <Form className="CaseAddBaseForm" onSubmit={this.handleSubmit}>
                 </Form>
            </div>
        )
    }
}

const CaseAddImage = Form.create()(CaseAddImageForm);
export default withRouter(CaseAddImage);

