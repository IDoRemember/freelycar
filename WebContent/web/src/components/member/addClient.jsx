import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Row, Col, DatePicker } from 'antd';
import { Link } from 'react-router';
const RadioGroup = Radio.Group;
const Option = Select.Option;
class PayHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            man: 'man',
            female: 'female',
        }
    }
    handleChange = (value) => {
        console.log(`selected ${value}`)
    }
    render() {
         const plateOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })
        return (
            <div>
                <Card title='客户信息'>
                    <Row gutter={16}>
                        <Col span={8} offset={4}>姓名:
                            <Input style={{ width: '150px' }} />
                        </Col>
                        <Col span={8}>年龄:
                            <Input style={{ width: '150px' }} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8} offset={4}>手机号:
                            <Input style={{ width: '150px' }} />
                        </Col>
                        <Col span={8}>性别：
                            <div style={{ display: 'inline-block' }}>
                                <RadioGroup onChange={this.onChange} value={this.state.value}>
                                    <Radio value={this.state.man}>男</Radio>
                                    <Radio value={this.state.fe}>女</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8} offset={4}>生日：
                            <Input style={{ width: '150px' }} />
                        </Col>
                        <Col span={8}>身份证号:
                            <Input style={{ width: '150px' }} />
                        </Col>
                    </Row>
                </Card>
                <Card title='车辆信息'>
                    <Row gutter={16}>
                        <Col span={8} offset={4}>车牌号：
                            <Input style={{ width: '150px' }} />
                        </Col>
                        <Col span={8}>车辆品牌:
                            <Select showSearch
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
                    <Row gutter={16}>
                        <Col span={8} offset={4}>生日：
                            <Input style={{ width: '150px' }} />
                        </Col>
                        <Col span={8}>身份证号:
                            <Input style={{ width: '150px' }} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8} offset={4}>生日：
                            <Input style={{ width: '150px' }} />
                        </Col>
                        <Col span={8}>身份证号:
                            <Input style={{ width: '150px' }} />
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}