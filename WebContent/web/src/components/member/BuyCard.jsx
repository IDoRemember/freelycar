import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, Popconfirm,Radio } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';

const RadioGroup = Radio.Group;
const Option = Select.Option;
class BuyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            man: 'man',
            female: 'female',
        }
    }

    render() {
        return (
            <div>
                <Card title='客户信息'>
                    <Row gutter={16}>
                        <Col span={8}>客户姓名：
                            <Select showSearch
                                style={{ width: '140px', marginRight: '8px' }}
                                placeholder="输入客户姓名"
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
                                    <Radio value={this.state.fe}>女</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8} offset={4}>手机号:
                            <Input style={{ width: '150px', marginLeft: '10px' }} />
                        </Col>
                        <Col span={8} offset={4}>车牌号：
                            <Input style={{ width: '150px', marginLeft: '14px' }} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>车辆品牌:
                            <Select showSearch
                                style={{ width: '100px', marginLeft: '35px' }}
                                placeholder="输入车牌号码"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {plateOptions}
                            </Select>
                        </Col>
                        <Col span={8} offset={4}>推荐人：
                            <Input style={{ width: '150px', marginLeft: '14px' }} />
                        </Col>
                    </Row>
                </Card>
                <Card title="会员信息">
                    <Row gutter={16}>
                        <Col span={8} offset={4}>会员卡号：
                            <Input style={{ width: '150px', marginLeft: '14px' }} />
                        </Col>
                        <Col span={6}>
                            会员卡类：
                        <Select
                                style={{ width: '100px' }}
                                placeholder="输入车牌号码"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {plateOptions}
                            </Select>
                            <Icon type="plus-circle-o" onClick={this.showModal} style={{ marginLeft: '10px', color: '#108ee9', cursor: 'pointer' }} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8} offset={4}>会员卡号：
                            <Input style={{ width: '150px', marginLeft: '14px' }} disabled>一年</Input>
                        </Col>
                        <Col span={8} offset={4}>会员卡号：
                            <Input style={{ width: '150px', marginLeft: '14px' }} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8} >
                            <div style={{ display: 'inline-block', width: '80%' }}>支付方式:
                                 <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                    <Select defaultValue="现金" style={{ width: 120 }} onChange={handleChange} >
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
                                    <Select defaultValue="1" style={{ width: 120 }} onChange={handleChange} >
                                        <Option value="1">小易</Option>
                                        <Option value="2">海蜇</Option>
                                        <Option value="3">科科</Option>
                                    </Select>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
export default BuyCard