import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Spin } from 'antd'

const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  }
const FormItem = Form.Item
class RoleAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        const store = this.props.store;
        let spinLoding = <Spin  size="small"  tip="添加中..."/>;
        if (store.loading) {
          spinLoding = <Spin  size="small"  tip="添加中..."/>;
        }else {
          spinLoding = "";
        }
        return (
            <Modal {...this.props}>
                <div className="RoleAdd">
                    <Form layout="horizontal">
                        <FormItem label="角色名称" hasFeedback {...formItemLayout}>
                        {this.props.form.getFieldDecorator('name', {
                            initialValue: "",
                            rules: [
                            {
                                required: true,
                            },
                            ],
                        })(<Input />)}
                        </FormItem>
                    </Form>
                </div>
                <div>{spinLoding}</div>
            </Modal>
        )
    }
}


RoleAdd.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    item: PropTypes.object,
    onOk: PropTypes.func,
}
  
  export default Form.create()(RoleAdd)