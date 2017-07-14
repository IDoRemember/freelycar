import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import Chart from '../charts/EchartsPie.jsx'
import { Row, Col, Card, Button, Radio, DatePicker, Table } from 'antd';
import moment from 'moment';
import $ from 'jquery';
import { Link } from 'react-router';
// 日期 format
const dateFormat = 'YYYY/MM/DD';
class BusinessSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: 'paytoday',
            pay: [],
            data: [{
                key: 1,
                index: 1,
                payway: '金额',
                cash: '¥0',
                easyfubao: '¥0',
                alipay: '¥0',
                wechatpay: '¥0'
            }, {
                key: 2,
                index: 2,
                payway: '比例',
                cash: '0%',
                easyfubao: '0%',
                alipay: '0%',
                wechatpay: '0%'
            }],
            proportionData: [{
                key: 1,
                index: 1,
                projectCategory: '美容服务',
                number: '0',
                proportion: '0%',
                money: '¥0'
            }, {
                key: 2,
                index: 2,
                projectCategory: '美容服务',
                number: '0',
                proportion: '0%',
                money: '¥0'
            }]
        }
    }
    componentDidMount() {
        this.getIncomeExpend(this.state.mode)
    }

    getIncomeExpend = (mode, data) => {
        $.ajax({
            url: 'api/stat/' + mode,
            type: 'get',
            dataType: 'json',
            data: data == undefined ? {} : data,
            success: (result) => {
                //console.log(result);
                if (result.code == "0") {
                    let pay = {};
                    pay.key = -1;
                    let recordingMethod = result.data;
                    for (let item of recordingMethod) {
                        let payMethod = item.payMethod;
                        if (payMethod == '0') {
                            pay.cash = item.value;
                        } else if (payMethod == '1') {
                            pay.card = item.value;
                        } else if (payMethod == '2') {
                            pay.alipay = item.value;
                        } else if (payMethod == '3') {
                            pay.weixin = item.value;
                        } else if (payMethod == '4') {
                            pay.yifubao = item.value;
                        }
                    }
                    this.setState({
                        pay: [...this.state.pay, pay]
                    }, () => {
                        console.log(this.state.pay);
                    });

                }
            }
        })
    }

    handleModeChange = (e) => {
        const mode = e.target.value;
        this.setState({ mode: mode });
        if (mode == 'today') {
            this.getIncomeExpend(mode)
        } else if (mode == 'thismonth') {
            this.getIncomeExpend(mode)
        }
    }

    onTimeSelected = (dates, dateStrings) => {
        console.log(dates, dateStrings)
        localStorage.setItem('datastrings', dateStrings)
        if (this.state.mode == 'payrange') {
            $.ajax({
                url: 'api/stat/payrange',
                data: {
                    startTime: new Date(dateStrings[0]),
                    endTime: new Date(dateStrings[1]),
                },
                success: (result) => {
                    if (result.code == "0") {
                        console.log(result)
                    }
                }
            })
        }
    }

    render() {
        return <div>
            <BreadcrumbCustom first="数据报表" second="营业汇总" />
            <Card>
                <div>
                    <Row>
                        <Col span={12}>
                            <Radio.Group onChange={() => this.handleModeChange} value={this.state.mode} style={{ marginBottom: 8 }}>
                                <Radio.Button value="paytoday">今日</Radio.Button>
                                <Radio.Button value="paymonth">本月</Radio.Button>
                                <Radio.Button value="payrange">区间查找</Radio.Button>
                            </Radio.Group>
                        </Col>
                        {/*日期选择器*/}
                        <Col span={12}>
                            <div>
                                <span>查找日期 : </span>
                                <DatePicker.RangePicker
                                    format={dateFormat}
                                    showToday={true}
                                    onChange={(dates, dateStrings) => { this.onTimeSelected(dates, dateStrings) }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col span={8}>
                            <div style={{ padding: '10px', textAlign: 'center' }} >
                                <Card className="nature-income" title="实收金额">
                                    <h1>￥0</h1>
                                </Card>
                            </div>
                        </Col>

                        <Col span={8}>
                            <div style={{ padding: '10px', textAlign: 'center' }}>
                                <Card className="nature-outcome" title="会员消费金额">
                                    <h1>￥0</h1>
                                </Card>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{ padding: '10px', textAlign: 'center' }}>
                                <Card className="nature-grey" title="散客消费金额">
                                    <h1>￥0</h1>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <h2 style={{ padding: '10px' }}>收款方式</h2>
                    <Table className="accountTable" dataSource={this.state.pay} bordered>
                        <Col
                            title="支付方式"
                            dataIndex="payway"
                            key="payway"

                        />
                        <Col
                            title="现金"
                            dataIndex="cash"
                            key="cash"
                            render={(text, record, index) => {
                                if (text == undefined)
                                    return <span>0</span>
                                else
                                    return <span>{text}</span>
                            }}
                        />
                        <Col
                            title="刷卡"
                            dataIndex="card"
                            key="card"
                            render={(text, record, index) => {
                                if (text == undefined)
                                    return <span>0</span>
                                else
                                    return <span>{text}</span>
                            }}
                        />
                        <Col
                            title="易付宝"
                            key="yifubao"
                            dataIndex="yifubao"
                            render={(text, record, index) => {
                                if (text == undefined)
                                    return <span>0</span>
                                else
                                    return <span>{text}</span>
                            }}
                        />
                        <Col
                            title="支付宝"
                            key="alipay"
                            dataIndex="alipay"
                            render={(text, record, index) => {
                                if (text == undefined)
                                    return <span>0</span>
                                else
                                    return <span>{text}</span>
                            }}
                        />
                        <Col
                            title="微信支付"
                            key="weixin"
                            dataIndex="weixin"
                            render={(text, record, index) => {
                                if (text == undefined)
                                    return <span>0</span>
                                else
                                    return <span>{text}</span>
                            }}
                        />
                    </Table>
                </div>
                <div>
                    <h2 style={{ padding: '10px' }}>项目类别</h2>
                </div>
                <Chart></Chart>
                <Table className="accountTable" dataSource={this.state.proportionData} bordered>
                    <Col
                        title="项目类别"
                        dataIndex="projectCategory"
                        key="projectCategory"
                    />
                    <Col
                        title="数量"
                        dataIndex="number"
                        key="number"
                    />
                    <Col
                        title="占比"
                        key="proportion"
                        dataIndex="proportion"
                    />
                    <Col
                        title="金额"
                        key="money"
                        dataIndex="money"
                    />
                </Table>
            </Card>
        </div>
    }
}
export default BusinessSummary