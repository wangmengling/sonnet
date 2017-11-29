import React from 'react';
import { Form, Icon, Input, Button, Checkbox, DatePicker, Spin } from 'antd';
import { Link ,withRouter, Redirect} from "react-router-dom";
import { observer } from "mobx-react";

import "./Login.less";
const FormItem = Form.Item;
@observer
class NormalLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
    this.handleSubmit = this.handleSubmit.bind(this);
}
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.store.login(values.userName,values.password)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const store = this.props.store;

    let spinLoding = <Spin  size="small"  tip="登录中..."/>;
    if (store.loading) {
      spinLoding = <Spin  size="small"  tip="登录中..."/>;
    }else {
      spinLoding = "";
    }

    if (store.loginCompleted) {
        this.props.history.push('/dashBoard');
    }

    return (
      <div className="Login-Root">
        <div className="Login-Dash">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/register">register now!</a>
          <br />
        </FormItem>
        <div className="Login-loading">{spinLoding}</div>
      </Form>
      </div>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);
export default withRouter(Login);
// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);



