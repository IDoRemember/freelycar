import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link } from 'react-router';
import { Row, Col, Select, Input, Card, Dropdown, Menu, Icon, DatePicker, Modal, Button } from 'antd';
import styled from "styled-components"
import update from 'immutability-helper'
import $ from 'jquery'
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const MemberButton = styled.div`
    display:inline-block;
    padding:10px 30px;
    font-size:15px;
    background:#01adff;
    color:#fff;
    border-radius:5px;
`
class CustomerInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            option: [],
            visible: false,
            carInfo: {
                carId: '',
                clientId: '',
                licensePlate: '',
                clientName: '',
                carBrand: '',
                phone: '',
                consumAmout: '',
                tips: '',
                gender: '',
                lastMiles: '',
                consumTimes: '',
                lastVisit: '',
                pickCarStaff: '',
                parkingLocation: '',
                miles: '',
                pickTime: '',
                carType: ''
            }
        }
    }

    licenseChange = (value) => {
        if (value.length == 7) {
            let data = {};
            data.licensePlate = value;
            $.ajax({
                url: 'api/car/getcar',
                data: data,
                type: 'get',
                dataType: 'json',
                success: (res) => {
                    if (res.code == '0') {
                        let data = res.data, cars = data.cars, carBrand, lastMiles, carId, carType;
                        for (let item of cars) {
                            if (item.licensePlate == value) {
                                carBrand = item.type.brand.name;
                                lastMiles = item.lastMiles;
                                carId = item.id;
                                carType = item.type.type
                            }
                        }
                        this.setState({
                            carInfo: update(this.state.carInfo,
                                {
                                    ['carId']: { $set: carId },
                                    ['clientId']: { $set: data.id },
                                    ['clientName']: { $set: data.name },
                                    ['carBrand']: { $set: carBrand },
                                    ['phone']: { $set: data.phone },
                                    ['gender']: { $set: data.gender },
                                    ['lastMiles']: { $set: lastMiles },
                                    ['consumAmout']: { $set: data.consumAmout },
                                    ['consumTimes']: { $set: data.consumTimes },
                                    ['lastVisit']: { $set: data.lastVisit },
                                    ['licensePlate']: { $set: value },
                                    ['carType']: { $set: carType }
                                })
                        }, () => {
                            this.props.saveInfo(this.state.carInfo)
                        })
                        this.props.getCards(data.cards)

                    }else {
                        message.error(res.msg)
                    }
                }
            });
        }
    }

    handleValueChange = (key, value) => {
        this.setState({
            carInfo: update(this.state.carInfo, { [key]: { $set: value } })
        }, () => {
            this.props.saveInfo(this.state.carInfo)
        })

    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    handleOk = () => {
        this.setState({
            visible: false
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        const plateOptions = this.props.staffList.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        })
        return <div className="gutter-example" >
            <div style={{ marginBottom: '15px' }}>
                <div style={{ width: '30%', display: 'inline-block' }}>单据日期：
                    <span style={{ width: '150px' }}>2017-05-24 15:22:20</span>
                </div>
                <div style={{ width: '30%', display: 'inline-block' }}>开单人：
                    <span style={{ width: '150px' }}>小易爱车</span>
                </div>
            </div>
            <Card bodyStyle={{ background: '#fff' }} style={{ marginBottom: '10px' }} >
                <Row gutter={16} style={{ marginBottom: "10px" }}>
                    <Col span={8} ><span style={{ marginLeft: '-8px', color: 'red', marginRight: '2px' }}>*</span>车牌号码：
                        <Input onChange={(e) => { this.licenseChange(e.target.value) }} style={{ width: '100px' }} />
                        <Link to='/app/member/addclient' ><Icon type="plus-circle-o" onClick={this.showModal} style={{ marginLeft: '10px', color: '#108ee9', cursor: 'pointer' }} /></Link>

                    </Col>
                    <Col span={8} >
                        客户姓名：
                        <span style={{ width: '100px' }}>{this.state.carInfo.clientName}</span>
                        <Link to='/app/member/addclient' ><Icon type="plus-circle-o" style={{ marginLeft: '10px', cursor: 'pointer' }} ></Icon></Link>
                    </Col>
                    <Col span={8} >
                        <span style={{ marginLeft: '-8px', color: 'red', marginRight: '2px' }}>*</span>
                        停车位置：
                        <Input style={{ width: '100px' }} onChange={(e) => { this.handleValueChange('parkingLocation', e.target.value) }} />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '10px' }}>
                    <Col span={8} >
                        品牌型号：
                        <span style={{ width: '100px' }}>{this.state.carInfo.carBrand}</span>
                    </Col>
                    <Col span={8}>
                        手机号码：
                        <span style={{ width: '100px' }}>{this.state.carInfo.phone}</span>
                    </Col>
                    <Col span={8}>
                        <span style={{ marginLeft: '-8px', color: 'red', marginRight: '2px' }}>*</span>
                        接车人员：
                          <Select
                            style={{ width: '100px' }}
                            onChange={(value) => this.handleValueChange('pickCarStaff', { id: value })}
                            dropdownStyle={{ overflow: 'scroll' }}
                        >
                            {plateOptions}
                        </Select>

                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '10px' }} >
                    <Col span={8}>
                        上次里程：
                        <span style={{ width: '100px' }}>{this.state.carInfo.lastMiles}km </span>
                    </Col>
                    <Col span={8}>
                        历史消费：
                        <span style={{ width: '100px' }}>￥{this.state.carInfo.consumAmout}</span>
                    </Col>

                    <Col span={8}>
                        接车时间：
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={(time) => this.handleValueChange('pickTime', new Date())} />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '10px' }}>
                    <Col span={8}>
                        本次里程：
                        <Input style={{ width: '100px' }} onChange={(e) => { this.handleValueChange('miles', e.target.value) }} />&nbsp;&nbsp;km
                    </Col>
                    <Col span={8} style={{ height: '28px', lineHeight: '28px' }}>
                        提示信息：
                        <span style={{ width: '100px' }} >
                            共消费{this.state.carInfo.consumTimes}次,  最近消费{this.state.carInfo.lastVisit}
                        </span>
                    </Col>
                </Row>
            </Card>
        </div>
    }
}
export default CustomerInfo