import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link } from 'react-router';
import { Row, Col, Select, Input, Card, Dropdown, Menu, Icon, DatePicker, Modal, Button } from 'antd';
import styled from "styled-components"
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
import AjaxNative from '../../utils/ajaxNative'
import axios from 'axios';
const Option = Select.Option;
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
            option: [],
            visible: false
        }
    }
    componentDidMount() {
        console.log('开始掉接口')
        let data = { 'aa': 'bb' };
        axios.post('/fitness/api/sms/verification', {phone:'111'}).then((res) => {
            console.log(res);
        }).catch( (error)=> {
            console.log(error);
        });
    }
    handleChange = (value) => {
        console.log(`selected ${value}`)
    }
    timeonChange = (time) => {
        console.log(time)
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
        console.log('haha')
        const plateOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })
        return <div className="gutter-example" >
            <div style={{ marginBottom: '15px' }}>
                <div style={{ width: '30%', display: 'inline-block' }}>单据编号：
                    <span style={{ width: '150px' }}>S0000001</span>
                </div>
                <div style={{ width: '30%', display: 'inline-block' }}>单据日期：
                    <span style={{ width: '150px' }}>2017-05-24 15:22:20</span>
                </div>
                <div style={{ width: '30%', display: 'inline-block' }}>开单人：
                    <span style={{ width: '150px' }}>小易爱车</span>
                </div>
            </div>
            <Card bodyStyle={{ background: '#fff' }} style={{ marginBottom: '10px' }}>
                <Row gutter={16} style={{ marginBottom: "10px" }}>
                    <Col span={6} >车牌号码：
                        <span style={{ width: '100px' }}>苏A12345</span>
                    </Col>
                    <Col span={6} >
                        客户姓名：
                        <span style={{ width: '100px' }}>张蕾西</span>
                    </Col>
                    <Col span={6} >
                        停车位置：
                        <span style={{ width: '100px' }}>B276</span>
                    </Col>
                    <Col span={6}>
                        会员卡号：
                        <span style={{ width: '100px' }}>12343443</span>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '10px' }}>
                    <Col span={6} >
                        车辆型号：
                        <span style={{ width: '100px' }}>奥迪A6</span>
                    </Col>
                    <Col span={6}>
                        手机号码：
                        <span style={{ width: '100px' }}>18362981113</span>
                    </Col>
                    <Col span={6}>
                        接车时间：
                        <span style={{ width: '100px' }}>2017-05-24</span>
                    </Col>
                    <Col span={6}>
                        会员卡种：
                        <span style={{ width: '100px' }}>铂金卡</span>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '10px' }}>
                    <Col span={6}>
                        上次里程：
                        <span style={{ width: '100px' }}>8888km</span>
                    </Col>
                    <Col span={6}>
                        历史消费：
                        <span style={{ width: '100px' }}>￥19999</span>
                    </Col>
                    <Col span={6}>
                        施工人员：
                          <span style={{ width: '100px' }}>阿俊、阿康</span>
                    </Col>
                    <Col span={6}>
                        剩余次数:
                        <span style={{ width: '100px' }}>100</span>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '10px' }}>
                    <Col span={6}>
                        本次里程：
                        <span style={{ width: '100px' }}>9000km</span>
                    </Col>
                    <Col span={6}>
                        实时积分：
                        <span style={{ width: '100px' }}>5000</span>
                    </Col>
                    <Col span={6} >
                        交车时间：
                        <span style={{ width: '100px' }}>2017-06-20</span>
                    </Col>
                    <Col span={6}>
                        提示信息：
                        <span style={{ width: '100px' }} >
                            共消费2次,  最近消费2017-05-24 15:22
                        </span>
                    </Col>

                </Row>
            </Card>
        </div>
    }
}
export default CustomerInfo