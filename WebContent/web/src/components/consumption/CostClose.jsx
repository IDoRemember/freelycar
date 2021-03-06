import React from 'react';
import { Row, Col, Card, Table, Radio, Select, InputNumber, Input, Button, Checkbox, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link, hashHistory } from 'react-router';
import update from 'immutability-helper'
import $ from 'jquery';
import PreFixInterge from '../../utils/PreFixInterge.js'

const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};
const Option = Select.Option;
class CostClose extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            feeDetail: [],
            payMethod: '0',//支付方式
            cardCost: 0,//卡抵扣的钱
            allCost: 0,//所有的钱
            referWorkTime: 0,//工时
            pricePerUnit: 0,//单价
            programId: 1,
            checkedCard:true,
        }
    }

    onChange = (key, value, record, index) => {
        this.setState({
            feeDetail: update(this.state.feeDetail, {
                [index]: {
                    [key]: { $set: value },
                }
            })
        },()=>{
            let feeDetail = this.state.feeDetail;
            let newSum = 0;
            for(let item of feeDetail){
                newSum += item.price+(item.referWorkTime*item.pricePerUnit);
            }
            this.setState({
                allCost:newSum
            });

        });



    }

    componentDidMount() {
        $.ajax({
            url: 'api/order/queryid',
            type: 'get',
            data: { consumOrderId: this.props.params.orderId },
            dataType: 'json',
            success: (res) => {
                let cardCost = 0;//卡扣的钱
                if (res.code == '0') {
                    let dataArr = res.data.projects;
                    for (let item of dataArr) {
                        item.inventory = res.data.inventoryInfos;
                        item.key = item.id;
                        item.totalPrice = res.data.totalPrice;//所有项目的总价


                        //计算卡扣的钱
                        if (item.cardName != undefined) {
                            cardCost += item.payCardTimes * item.price;
                        }
                    }

                    this.setState({
                        feeDetail: dataArr,
                        cardCost: cardCost,
                        allCost: res.data.totalPrice,
                        programId: res.data.programId,
                    });
                }
            }
        });

    }

    confirm = () => {
        let obj = {};
        obj.consumOrdersId = this.props.params.orderId;
        obj.payMethod = this.state.payMethod;
        obj.cost = this.state.checkedCard ? (this.state.allCost - this.state.cardCost) : this.state.allCost
        $.ajax({
            url: 'api/pay/consumpay',
            type: 'post',
            data: obj,
            dataType: 'json',
            success: (res) => {
                if (res.code == '0') {
                    message.success('结算成功');
                    hashHistory.push('/app/consumption/orderManage');
                } else {
                    message.error('结算失败');
                }
            }
        });

    }

    render() {
        const columns = [
            { title: '项目名称', dataIndex: 'name', key: 'itemName' },
            { title: '项目费用', dataIndex: 'price', key: 'itemFee' },
            {
                title: '实际工时', dataIndex: 'referWorkTime', key: 'workHour', render: (text, record, index) => {
                    if (this.state.programId == 1) {
                        return <span>{text}</span>
                    } else {
                        return <InputNumber min={1} max={99} defaultValue={text} onChange={(e) => { this.onChange('referWorkTime', e, record, index) }} />
                    }
                }
            },
            {
                title: '工时单价', dataIndex: 'pricePerUnit', key: 'perHourCost', render: (text, record, index) => {
                    if (this.state.programId == 1) {
                        return <span>{text}</span>
                    } else {
                        return <InputNumber min={1} max={99} defaultValue={text} onChange={(e) => { this.onChange('pricePerUnit', e, record, index) }} />
                    }
                }
            },
            {
                title: '配件金额', dataIndex: 'inventory', key: 'productFee', render: (text, record, index) => {
                    let rowId = record.projectId;
                    let sum = 0;
                    for (let item of text) {
                        if (item.projectId == rowId) {
                            sum += item.inventory.price;
                        }
                    }
                    return <span>{sum}</span>

                }
            },
            {
                title: '合计', dataIndex: 'totalPrice', key: 'total', render: (text, record, index) => {
                    return {
                        children: <a>{text}</a>,
                        props: {
                            rowSpan: index == 0 ? this.state.feeDetail.length : 0
                        }
                    }
                }
            },
        ];




        const cardInfo = [];
        this.state.feeDetail.map((item, index) => {
            if (item && item.cardName && item.cardId) {
                const html = <div key={index} style={{ marginLeft: '20px' }}>
                    <div style={{ display: 'inline-block', width: '20%' }}>会员卡号:
                            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                            {PreFixInterge(item.cardId,5)}
                        </div>
                    </div>

                    <div style={{ display: 'inline-block', width: '20%' }}>项目名称:
                            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                            {item.name}
                        </div>
                    </div>


                    <div style={{ display: 'inline-block' }}>卡扣次数：
                            <div style={{ display: 'inline-block', margin: '10px' }}>
                            {item.payCardTimes}
                        </div>
                    </div>
                </div>
                cardInfo.push(html);
            }
        })

        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="消费开单" second="结算中心" />
                <div style={{ fontSize: '20px', textAlign: 'center', marginBottom: '10px' }}>结算中心</div>

                <Row gutter={12} >
                    <Col span={2} offset={2}></Col>
                    <Col className="gutter-row" span={16}>
                        <div className="gutter-box">
                            <Card title="应收金额" bordered={false} >
                                <Table bordered className="accountTable" columns={columns} dataSource={this.state.feeDetail} />
                            </Card>
                            <Card title="支付方式" bordered={false} className="choosetype">

                                <span style={{ display: cardInfo.length > 0 ? 'block' : 'none' }} >抵扣项目费用</span>
                                {cardInfo}
                                <br />
                                <Row>
                                    <Col xs={16} sm={16} md={10} lg={8} xl={6}>支付方式:
                                            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                            <Select defaultValue="0" style={{ width: 120 }} onChange={(e) => { this.setState({ payMethod: e }) }} >
                                                <Option value="0">现金</Option>
                                                <Option value="1">刷卡</Option>
                                                <Option value="2">支付宝</Option>
                                                <Option value="3">微信</Option>
                                                <Option value="4">易付宝</Option>
                                            </Select>
                                        </div>
                                    </Col>


                                    <Col xs={16} sm={16} md={10} lg={8} xl={6}>支付金额:
                                            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                            <Input style={{ width: '120px', color: 'red' }} value={this.state.checkedCard ? (this.state.allCost - this.state.cardCost) : this.state.allCost} disabled />
                                        </div>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: '30px', marginBottom: '50px' }}>
                                    <Col xs={3} offset={10}>
                                        < Button type="primary" onClick={() => { this.confirm() }}>确定</Button>
                                    </Col>
                                    <Col xs={3}>
                                        <Link to="/app/consumption/orderManage">
                                            < Button >挂单</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default CostClose;