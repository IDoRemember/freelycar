import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link } from 'react-router';
import { Row, Col, Select, Input, Card, Dropdown, Menu, Icon, DatePicker, Modal, Button } from 'antd';
import styled from "styled-components"
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
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
        AjaxGet('GET', 'data/LicensePlate.json', (res) => {
            this.setState({ option: res.data })
        })
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
                        <Select showSearch
                            style={{ width: '100px' }}
                            placeholder="输入车牌号码"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                        >
                            {plateOptions}
                        </Select>
                        <Icon type="plus-circle-o" onClick={this.showModal} style={{ marginLeft: '10px', color: '#108ee9', cursor: 'pointer' }} />
                        <Modal title="Modal" visible={this.state.visible}
                            onOk={this.handleOk} onCancel={this.handleCancel}
                            okText="OK" cancelText="Cancel">
                            <p>Bla bla ...</p>
                            <p>Bla bla ...</p>
                            <p>Bla bla ...</p>
                        </Modal>
                    </Col>
                    <Col span={6} >
                        客户姓名：
                        <Select showSearch
                            style={{ width: '100px' }}
                            placeholder="输入车牌号码"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                        >
                            {plateOptions}
                        </Select>
                        <Link to='/app/member/customer' ><Icon type="plus-circle-o" style={{ marginLeft: '10px', cursor: 'pointer' }} ></Icon></Link>
                    </Col>
                    <Col span={6} >
                        停车位置：
                        <Input style={{ width: '100px' }} />
                    </Col>
                    <Col span={6}>
                        会员卡号：
                        <Select
                            style={{ width: '100px' }}
                            placeholder="输入车牌号码"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                        >
                            {plateOptions}
                        </Select>
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
                        <DatePicker size="small" showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.timeonChange} />
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
                          <Select mode="multiple"
                            style={{ width: '200px' }}
                            onChange={this.handleChange}>
                            {plateOptions}
                        </Select>
                    </Col>
                    <Col span={6}>
                        剩余次数:
                        <span style={{ width: '100px' }}>100</span>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '10px' }}>
                    <Col span={6}>
                        本次里程：
                        <Input style={{ width: '100px' }} />
                    </Col>
                    <Col span={6}>
                        提示信息：
                        <span style={{ width: '100px' }} >
                            共消费2次,  最近消费2017-05-24 15:22
                        </span>
                    </Col>
                    <Col span={6} >
                    </Col>
                    {this.props.MemberButton && <Col span={6} >
                        <Button type="primary" style={{ width: '100px', height: '50px' }} size={'large'}><Link to="" style={{ color: '#fff' }}>会员办理</Link></Button>
                    </Col>}
                </Row>
            </Card>
        </div>
    }
}
export default CustomerInfo