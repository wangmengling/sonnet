import React,{ Component } from "react";
import { Link ,withRouter, Redirect} from "react-router-dom";
import NumberCard from "./NumberCard";
import { Row, Col, Card } from 'antd'
import { color } from "../../utils/theme";
import  "./DashBoard.less";
var numbers =  [
    {
      icon: 'pay-circle-o',
      color: color.green,
      title: 'Online Review',
      number: 2781,
    }, {
      icon: 'team',
      color: color.blue,
      title: 'New Customers',
      number: 3241,
    }, {
      icon: 'message',
      color: color.purple,
      title: 'Active Projects',
      number: 253,
    }, {
      icon: 'shopping-cart',
      color: color.red,
      title: 'Referrals',
      number: 4324,
    },
  ];
class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const numberCards = numbers.map((item, key) => (<Col key={key} lg={6} md={12}>
            <NumberCard {...item} />
          </Col>))
        return(
            <div className="DashBoard">
                <div className="DashBoard-NumberCards">
                    {numberCards}
                </div>
                
            </div>
        );
    }
}

export default withRouter(DashBoard);