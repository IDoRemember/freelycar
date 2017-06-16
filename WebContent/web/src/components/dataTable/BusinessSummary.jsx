import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import Chart from '../charts/EchartsPie.jsx'
import { Row, Col, Card, Button } from 'antd';
class BusinessSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return <div>
            <BreadcrumbCustom first="数据报表" second="营业汇总" />

        </div>
    }
}
export default BusinessSummary