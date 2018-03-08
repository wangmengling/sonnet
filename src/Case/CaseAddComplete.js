import React, { Fragment } from 'react';
import { Button, Row, Col } from 'antd';
import { withRouter, Link } from "react-router-dom";
import { observer } from "mobx-react";
import Result from '../components/Result';
import  './CaseAddComplete.less';

class CaseAddComplete extends React.PureComponent {
  render() {
    const onFinish = () => {
        // dispatch(routerRedux.push('/form/step-form'));
    };
    const information = (
      <div className="information">
        {/* <Row>
          <Col span={8} className={styles.label}>付款账户：</Col>
          <Col span={16}>{this.props.detailData.title}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>收款账户：</Col>
          <Col span={16}>{this.props.detailData.title}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>收款人姓名：</Col>
          <Col span={16}>{this.props.detailData.title}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>转账金额：</Col>
          <Col span={16}><span className={styles.money}>{this.props.detailData.title}</span> 元</Col>
        </Row> */}
      </div>
    );
    const actions = (
      <div>
        <Link to="/case/list">
            <Button type="primary" onClick={onFinish}>
                完成
            </Button>
        </Link>
      </div>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description=""
        extra={information}
        actions={actions}
        className="result"
      />
    );
  }
}

export default  withRouter(CaseAddComplete); 