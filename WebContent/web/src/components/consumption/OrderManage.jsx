import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link } from 'react-router';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const columns = [
    {
        title: ' ', dataIndex: 'delete', key: 'delete', render: () => {
            return <div><Icon type="delete" /></div>
        }
    },
    { title: '单据编号', dataIndex: 'receiptNumber', key: 'receiptNumber' },
    { title: '单据时间', dataIndex: 'receiptTime', key: 'receiptTime' },
    { title: '车牌号码', dataIndex: 'busNumber', key: 'busNumber' },
    { title: '客户名称', dataIndex: 'customerName', key: 'customerName' },
    { title: '手机号码', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: '项目类别', dataIndex: 'itemClassification', key: 'itemClassification' },
    { title: '车辆状态', dataIndex: 'carState', key: 'carState' },
    { title: '停车位置', dataIndex: 'carPark', key: 'carPark' },
    { title: '接车时间', dataIndex: 'receiveCarTime', key: 'receiveCarTime' },
    { title: '交车时间', dataIndex: 'handCarTime', key: 'handCarTime' },
    { title: '结算状态', dataIndex: 'closeState', key: 'closeState' },
    {
        title: '操作', dataIndex: 'operation', key: 'operation', render: (text, record, index) => {
            return <span>
                <span style={{ marginRight: '10px' }}>
                    <Link to="">
                        查看
                    </Link>
                </span>

            </span>
        }
    },
]
const data = [
    {
        key: 1,
        serialNumber: '02933123334',
        receiptNumber: '2017-05-24',
        busNumber: '苏A2345',
        customerName: '海蜇',
        phoneNumber: '15251873222',
        itemClassification: '洗车',
        carState: '已接车', carPark: '  ',
        receiveCarTime: '2017-05-24 14:00:00',
        handCarTime: '  ',
        closeState: '已结算',

    },
    {
        key: 2,
        serialNumber: '02933123335',
        receiptNumber: '2017-05-24',
        busNumber: '苏A12345',
        customerName: 'JZW',
        phoneNumber: '15251873232',
        itemClassification: '维修',
        carState: '已交车', carPark: '  ',
        receiveCarTime: '2017-05-24 14:00:00',
        handCarTime: '  ',
        closeState: '已结算',

    }

];
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

            </div>
        )
    }
}
export default OrderManage