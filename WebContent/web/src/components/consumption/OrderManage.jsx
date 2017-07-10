import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, DatePicker } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link } from 'react-router';
import OrderTable from './OrderTable.jsx'
import $ from 'jquery'
import update from 'immutability-helper'
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
class OrderManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
            type: '美容',
            data: [],
            query: {
                id: null,
                licensePlate: '',
                programId: null,
                payState: '',
                startDate: '',
                endDate: '',
                dataType: null,
            }
        }
    }
    handleSelectChange = (value) => {
        this.setState({
            type: value
        })
    }
    componentDidMount() {
        this.getList()
    }

    getList = () => {
        $.ajax({
            url: 'api/order/list',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                page: 1,
                number: 10
            },
            success: (res) => {
                if (res.code == '0') {
                    let dataArray = res.data
                    for (let item of dataArray) {
                        item.key = item.id
                    }
                    this.setState({
                        data: dataArray
                    })
                }
            }
        })
    }

    setQueryData = (key, data) => {
        this.setState({
            query: update(this.state.query, { [key]: { $set: data } })
        })
    }
    startClear = () => {
        this.setState({
            query: {
                id: null,
                licensePlate: '',
                programId: null,
                payState: '',
                startDate: '',
                endDate: '',
                dataType: null,
            }
        })
    }
    getQuery = () => {
        $.ajax({
            url: 'api/order/query',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                ConsumOrder: {
                    id: this.state.query.id,
                    licensePlate: this.state.query.licensePlate,
                    programId: this.state.query.programId,
                    payState: this.state.query.payState
                },
                startDate: this.state.query.startDate,
                endDate: this.state.query.endDate,
                dateType: this.state.query.dataType,
                page: 1,
                number: 10
            }),
            success: (res) => {
                if (res.code == '0') {
                    let dataArray = res.data
                    for (let item of dataArray) {
                        item.key = item.id
                    }
                    this.setState({
                        data: dataArray
                    })
                }
            }
        })
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
                       <Input style={{ width: '120px' }} onChange={(e) => this.setQueryData('id', e.target.value)} />
                        </Col>
                        <Col span={8} id="type">
                            项目类别：
                        <Select style={{ width: 120 }} onChange={(value) => this.setQueryData('programId', value)} getPopupContainer={() => document.getElementById('type')}>
                                <Option value="1">美容</Option>
                                <Option value="2">维修</Option>
                            </Select>
                        </Col>
                        <Col span={8} >
                            车辆状态：
                            <div style={{ display: "inline-block" }}>
                                <Button size="large" shape="circle" >接</Button>
                                <Button size="large" shape="circle" >完</Button>
                                <Button size="large" shape="circle" >交</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: "10px" }}>
                        <Col span={8} id="car-number">
                            车牌号码：
                         <Input style={{ width: '120px' }} onChange={(e) => this.setQueryData('licensePlate', e.target.value)} />
                        </Col>
                        <Col span={8} id="pay-state">
                            结算状态：
                        <Select style={{ width: 120 }} onChange={(value) => this.setQueryData('payState', value)} getPopupContainer={() => document.getElementById('pay-state')}>
                                <Option value="0">挂单中</Option>
                                <Option value=" 1">已结算</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: "10px" }} id="area">
                        <Col span={8} >
                            时间类型：
                        <Select defaultValue="单据时间" style={{ width: 120 }} onChange={(value) => this.setQueryData('dateType', value)} getPopupContainer={() => document.getElementById('area')}>
                                <Option value="0">单据时间</Option>
                                <Option value="1">接车时间</Option>
                                <Option value="2">交车时间</Option>
                                <Option value="3">完工时间</Option>
                            </Select>
                        </Col>
                        <Col span={8} id="timepicker">
                            <div>
                                <RangePicker onChange={onChange} getPopupContainer={() => document.getElementById('timepicker')} />
                            </div>
                        </Col>
                        <Col span={8} />
                    </Row>
                    <Row gutter={16} style={{ marginBottom: "10px" }}>
                        <Col span={8}>
                            <Button type="primary" onClick={() => this.getQuery}>查询</Button>
                            <Button type="primary" onClick={() => this.startClear}>清空</Button>
                        </Col>
                    </Row>
                </Card>
                <OrderTable data={this.state.data} />
            </div>
        )
    }
}
export default OrderManage