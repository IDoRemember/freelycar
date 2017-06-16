import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon,Radio } from 'antd';
import { Link } from 'react-router';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
const RadioGroup = Radio.Group;
const cardColumns=[
     { title: '卡号', dataIndex: 'cardNum', key: 'cardNum' },
     { title: '会员卡类', dataIndex: 'cardClasses', key: 'cardClasses' },
     { title: '开卡时间', dataIndex: 'transactionTime', key: 'transactionTime' },
     { title: '剩余次数', dataIndex: 'resCount', key: 'resCount' },
     { title: '制单人', dataIndex: 'makePeople', key: 'makePeople' },
]
const cardData=[
    {
        key:1,
        cardNum:'100010',
        cardClasses:'次卡',
        transactionTime:'2017-06-12',
        resCount:'15',
        makePeople:'小易',
    }
]
class ClientDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
            value: man,
        }
    }
    onChange = (e) => {
        console.log("radio change", e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        return (
            <div>
                <BreadcrumbCustom first='会员管理' second='客户信息' third='详细信息' />
                <Card title="应收金额" bordered={false}>
                    <Row gutter={16}>
                        <Col span={8}>姓名：<span>林凡</span></Col>
                        <Col span={8}>手机号：<span>15251872222</span></Col>
                        <Col span={8}>生日：<span>1994-01-01</span></Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>性别：
                            <div style={{ display: 'inline-block' }}>
                                <RadioGroup onChange={this.onChange} value={this.state.value}>
                                    <Radio value={man}>男</Radio>
                                    <Radio value={female}>女</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                        <Col span={8}>身份证号：<span>36020202037634313</span></Col>
                        <Col span={8}>行驶证号：<span>20170273333</span></Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>车主状态：<span>新手</span></Col>
                        <Col span={8}>积分：<span>1000</span></Col>
                    </Row>
                </Card>
                <Card title="会员卡信息">
                    <Button><Icon type='idcard'></Icon>开卡</Button>
                    <Table columns={cardColumns} dataSource={cardData}></Table>
                </Card>
                <Card title="车辆信息">

                </Card>
            </div>
        )
    }
}
export default ClientDetail