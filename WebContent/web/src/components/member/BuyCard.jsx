import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, Popconfirm, Radio, Modal } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import CardModal from '../productManage/CardModal.jsx';
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
import $ from 'jquery'
const RadioGroup = Radio.Group;
const Option = Select.Option;
class BuyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            option: [],
            man: 'man',
            female: 'female',
            value: 1,
        }
    }

    onChange = (e) => {
        console.log("radio change", e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    componentDidMount() {
        $.ajax({
            url: 'api/idgen/generate',
            data: {
                type: 0
            },
            success: (result) => {
                this.setState({
                    id: result.id
                })
            }
        })
        AjaxGet('GET', 'data/LicensePlate.json', (res) => {
            this.setState({ option: res.data })
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        });
    }
    handleChange = (value) => {
        console.log(`selected ${value}`)
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
        return (
            <div>
                <BreadcrumbCustom first="会员管理" second="会员办理" />
                <Card title='客户信息'>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>客户姓名：
                            <Select showSearch
                                style={{ width: '140px', marginRight: '8px' }}

                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {plateOptions}
                            </Select>
                        </Col>
                        <Col span={8}>性别：
                            <div style={{ display: 'inline-block', marginLeft: '26px' }}>
                                <RadioGroup onChange={this.onChange} value={this.state.value}>
                                    <Radio value={this.state.man}>男</Radio>
                                    <Radio value={this.state.female}>女</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>手机号:
                            <Input style={{ width: '140px', marginLeft: '21px' }} />
                        </Col>
                        <Col span={8} >车牌号：
                            <Input style={{ width: '150px', marginLeft: '14px' }} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>车辆品牌:
                            <Select showSearch
                                style={{ width: '140px', marginLeft: '10px' }}
                                placeholder="输入车牌号码"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {plateOptions}
                            </Select>
                        </Col>
                        <Col span={8} >推荐人：
                            <Input style={{ width: '150px', marginLeft: '14px' }} />
                        </Col>
                    </Row>
                </Card>

                <Card title='客户信息'>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>客户姓名：
                            <span style={{ marginLeft: '15px' }}>张蕾</span>
                        </Col>
                        <Col span={8}>性别：
                            <span style={{ marginLeft: '15px' }}>女</span>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>手机号:
                            <span style={{ marginLeft: '15px' }}>15252873123</span>
                        </Col>
                        <Col span={8} >车牌号：
                            <span style={{ marginLeft: '15px' }}> 苏A777777</span>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>车辆品牌:
                            <span style={{ marginLeft: '15px' }}>玛莎</span>
                        </Col>
                        <Col span={8} >推荐人：
                            <span style={{ marginLeft: '15px' }}>科科</span>
                        </Col>
                    </Row>
                </Card>

                <Card title="会员信息" style={{ marginTop: '15px' }} >
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>会员卡号：
                            <span style = {{ marginLeft: '13px' }}>{this.state.id}</span>
                        </Col>
                        <Col span={6}>
                            会员卡类：
                        <Select
                                style={{ width: '140px', marginLeft: '13px' }}

                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {plateOptions}
                            </Select>
                            <Icon type="plus-circle-o" onClick={this.showModal} style={{ marginLeft: '10px', color: '#108ee9', cursor: 'pointer' }} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>有效期：
                            <Input style={{ width: '140px', marginLeft: '25px', placeholder: '一年' }} disabled />
                        </Col>
                        <Col span={8} >会员卡号：
                            <Input style={{ width: '140px', marginLeft: '14px' }} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4} >
                            <div style={{ display: 'inline-block', width: '80%' }}>支付方式:
                                 <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                    <Select defaultValue="现金" style={{ width: 140, marginLeft: 15 }} onChange={this.handleChange} >
                                        <Option value="cash">现金</Option>
                                        <Option value="wechatpay">微信</Option>
                                        <Option value="alipay">支付宝</Option>
                                        <Option value="suningpay">易付宝</Option>
                                    </Select>
                                </div>
                            </div>
                        </Col>
                        <Col span={8} >
                            <div style={{ display: 'inline-block', width: '80%' }}>办理人员:
                                 <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                    <Select defaultValue="1" style={{ width: 140, marginLeft: '15px' }} onChange={this.handleChange}>
                                        <Option value="1">小易</Option>
                                        <Option value="2">海蜇</Option>
                                        <Option value="3">科科</Option>
                                    </Select>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <CardModal visible={this.state.visible} onOk={() => this.handleOk}
                    onCancel={() => this.handleCancel}>
                </CardModal>
                <Button type="primary" style={{ display: 'block', margin: '10px auto', width: '100px', height: '50px' }} size={'large'}><Link to="/app/member/membership" style={{ color: '#fff' }}>办理</Link></Button>
            </div>
        )
    }
}
export default BuyCard