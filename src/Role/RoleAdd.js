import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'

const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  }

class RoleAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <Modal {...this.props}>
            <div className="RoleAdd">
            
                <Form layout="horizontal">
                    <FormItem label="Name" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: item.name,
                        rules: [
                        {
                            required: true,
                        },
                        ],
                    })(<Input />)}
                    </FormItem>
                </Form>
                
            </div>
            </Modal>
        )
    }
}


// RoleAdd.propTypes = {
//     form: PropTypes.object.isRequired,
//     type: PropTypes.string,
//     item: PropTypes.object,
//     onOk: PropTypes.func,
// }
  
  export default Form.create()(RoleAdd)
// export default RoleAdd;