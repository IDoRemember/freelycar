import React from 'react';
import { Row, Col, Card, Table, Radio, Select, InputNumber, Input, Button, Checkbox } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link } from 'react-router';
import $ from 'jquery';

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
            checkedCard: true,
            disabledCard: true,
            feeDetail: [],
            payMethod: ''//支付方式
        }
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    handleChange = (e) => {
        console.log(e);
        this.setState({
            value: e.target.value,
        });
    }

    onCardChange = (e) => {
        this.setState({
            checkedCard: !this.state.checkedCard,
            disabledCard: this.state.checkedCard
        });
    }

    componentDidMount() {
        $.ajax({
            url: 'api/order/queryid',
            type: 'get',
            // data: { consumOrderId: this.props.params.orderId },
            data: { consumOrderId: 'S201707204zgukg' },
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if (res.code == '0') {
                    let dataArr = res.data.projects;
                    for (let item of dataArr) {
                        item.inventory = res.data.inventoryInfos;
                        item.key = item.id;
                        item.totalPrice = res.data.totalPrice;//所有项目的总价
                    }

                    this.setState({
                        feeDetail: dataArr
                    }, () => {
                        console.log(this.state.feeDetail);
                    });
                }
            }
        });

    }

    confirm = () => {
        $.ajax({
            url: 'api/pay/consumpay',
            type: 'post',
            data: { consumOrdersId: 'S201707204zgukg' },
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if (res.code == '0') {
                    this.setState({
                        optionService: res.data
                    });
                }
            }
        });

    }

    render() {


        const columns = [
            { title: '项目名称', dataIndex: 'name', key: 'itemName' },
            { title: '项目费用', dataIndex: 'price', key: 'itemFee' },
            { title: '实际工时', dataIndex: 'referWorkTime', key: 'workHour' },
            { title: '工时单价', dataIndex: 'pricePerUnit', key: 'perHourCost' },
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
                title: '配件小计', dataIndex: 'inventory', key: 'totalInv', render: (text, record, index) => {
                    let sum = 0;
                    for (let item of text) {
                        sum += item.inventory.price;
                    }

                    return {
                        children: <a>{sum}</a>,
                        props: {
                            rowSpan: index == 0 ? this.state.feeDetail.length : 0
                        }
                    }
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

        let flag = true;
        const cardInfo = this.state.feeDetail.map((item, index) => {


            return item.cardName && <div key={index}>
                <div style={{ display: 'inline-block', width: '20%' }}>会员卡类:
                            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                        {item.cardName}
                    </div>
                </div>

                <div style={{ display: 'inline-block', width: '20%' }}>会员卡号:
                            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                        {item.cardId}
                    </div>
                </div>

                <div style={{ display: 'inline-block' }}>卡扣次数：
                            <div style={{ display: 'inline-block', margin: '10px' }}>
                        {item.payCardTimes}
                    </div>
                </div>
            </div>


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
                                <Checkbox
                                    defaultChecked={cardInfo.length > 0 ? true : false}
                                    checked={this.state.checkedCard}
                                    onChange={() => this.onCardChange()}
                                    style={{ width: '100%' }}
                                    disabled={cardInfo.length > 0 ? false : true}
                                >
                                    <span>抵扣项目费用</span>
                                </Checkbox>

                                {cardInfo}
                                <br />
                                <div style={{ display: 'inline-block', width: '20%' }}>支付方式:
                                            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                        <Select defaultValue="现金" style={{ width: 120 }} onChange={this.handleChange} >
                                            <Option value="cash">现金</Option>
                                            <Option value="wechatpay">微信</Option>
                                            <Option value="alipay">支付宝</Option>
                                            <Option value="suningpay">易付宝</Option>
                                        </Select>
                                    </div>
                                </div>


                                <div style={{ display: 'inline-block', width: '20%' }}>支付金额:
                                            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                        <Input style={{ width: '120px' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
                                    < Button type="primary" onClick={() => { this.confirm() }}>确定</Button>
                                    < Button type="primary">挂单</Button>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default CostClose;