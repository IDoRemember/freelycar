import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link } from 'react-router';
import OrderTable from './OrderTable.jsx'
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
class OrderManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
        }
    }
    handleChange = (value) => {
        console.log(`selected ${value}`)
    }
    render() {
        const plateOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })
        function onChange(date, dateString) {
            console.log(date, dateString);
        }
        
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="消费开单" second="单据管理" />
                <Card bodyStyle={{ background: '#fff' }}>
                    <Row gutter={16} style={{ marginBottom: "10px" }}>
                        <Col span={8} >
                        单据编号：
                        <Select showSearch
                            style={{ width: '100px' }}
                            placeholder="输入单据编号"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                        >
                            {plateOptions}
                        </Select>
                        </Col>
                        <Col span={8} >
                        项目类别：
                        <Select defaultValue="美容" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="美容">美容</Option>
                            <Option value="维修">维修</Option>
                        </Select>
                         </Col>
                        <Col span={8} >
                            车辆状态：
                            <div style={{display:"inline-block"}}>
                             <Button type="primary" size="large" shape="circle" >接</Button>
                             <Button size="large" shape="circle" >完</Button>
                             <Button size="large" shape="circle" >交</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: "10px" }}>
                        <Col span={8} >
                        车牌号码：
                         <Select showSearch
                            style={{ width: '100px' }}
                            placeholder="输入单据编号"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                        >
                            {plateOptions}
                        </Select>
                         </Col>
                        <Col span={8} >
                        结算状态：
                        <Select defaultValue="nonPayment" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="nonPayment">挂单中</Option>
                            <Option value=" Paid">已结算</Option>
                        </Select>
                         </Col>
                        <Col span={8} />
                    </Row>
                    <Row gutter={16} style={{ marginBottom: "10px" }}>
                        <Col span={8} >
                        时间类型：
                        <Select defaultValue="单据时间" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="receiptsTime">单据时间</Option>
                            <Option value="acceptTime">接车时间</Option>
                            <Option value="handTime">交车时间</Option>
                            <Option value="completeTime">完工时间</Option>
                        </Select>
                         </Col>
                        <Col span={8} >
                        <div>
                            <RangePicker onChange={onChange} />
                        </div>
                         </Col>
                        <Col span={8} />
                    </Row>
                    <Row gutter={16} style={{ marginBottom: "10px" }}>
                        <Col span={8}>
                            <Button type="primary">查询</Button>
                            <Button type="primary">清空</Button>
                        </Col>
                    </Row>
                </Card>
                 <OrderTable />
            </div>
        )
    }
}
export default OrderManage