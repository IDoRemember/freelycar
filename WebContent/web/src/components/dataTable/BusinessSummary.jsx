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
            startTime: '',
            endTime: '',
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
            proportionData: [],
            memberPay: 0,//会员消费
            notMenberPay: 0,//散客消费
        }
    }
    componentDidMount() {
        this.getIncomeExpend(this.state.mode)
    }

    getIncomeExpend = (mode, data) => {
        console.log(mode);
        $.ajax({
            url: 'api/stat/' + mode,
            type: 'get',
            dataType: 'json',
            data: data == undefined ? {} : data,
            success: (result) => {
                console.log(result);
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

                    //项目类别
                    let programPayDetail = result.programPayDetail;
                    for (let item of programPayDetail) {
                        item.key = item.programName;
                    }


                    //会员散客消费
                    let mp = result.memberPay;
                    if (mp)
                        for (let item of mp) {
                            if (item.member)
                                this.setState({ memberPay: item.amount });
                            else
                                this.setState({ notMenberPay: item.amount });
                        }

                    this.setState({
                        pay: [pay],
                        proportionData: programPayDetail
                    });


                } else {
                    this.setState({
                        proportionData: []
                    });
                }
            }
        })
    }

    handleModeChange = (e) => {
        const mode = e.target.value;
        this.setState({ mode: mode });
        if (mode == 'paytoday') {
            this.getIncomeExpend(mode);
        } else if (mode == 'paymonth') {
            this.getIncomeExpend(mode);
        }
    }

    onTimeSelected = (dates, dateStrings) => {
        let obj = {};
        obj.startTime = new Date(dateStrings[0]);
        obj.endTime = new Date(dateStrings[1]);
        this.getIncomeExpend('payrange', obj)

    }

    render() {
        return <div>
            <BreadcrumbCustom first="数据报表" second="营业汇总" />
            <Card>
                <div>
                    <Row>
                        <Col span={12}>
                            <Radio.Group onChange={(e) => this.handleModeChange(e)} value={this.state.mode} style={{ marginBottom: 8 }}>
                                <Radio.Button value="paytoday">今日</Radio.Button>
                                <Radio.Button value="paymonth">本月</Radio.Button>
                                <Radio.Button value="payrange">区间查找</Radio.Button>
                            </Radio.Group>
                        </Col>
                        {/*日期选择器*/}
                        <Col span={12} style={{ display: this.state.mode == 'payrange' ? 'inline-block' : 'none' }}>
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
                    <Row style={{ marginTop: '27px' }}>
                        <Col span={8}>
                            <div style={{ padding: '10px', textAlign: 'center' }} >
                                <Card className="nature-income" title="实收金额">
                                    <h1>￥{this.state.memberPay + this.state.notMenberPay}</h1>
                                </Card>
                            </div>
                        </Col>

                        <Col span={8}>
                            <div style={{ padding: '10px', textAlign: 'center' }}>
                                <Card className="nature-outcome" title="会员消费金额">
                                    <h1>￥{this.state.memberPay}</h1>
                                </Card>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{ padding: '10px', textAlign: 'center' }}>
                                <Card className="nature-grey" title="散客消费金额">
                                    <h1>￥{this.state.notMenberPay}</h1>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <h2 style={{ padding: '10px' }}>收款方式</h2>
                    <Table className="accountTable" dataSource={this.state.pay} bordered>
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
                <Chart proportionData={this.state.proportionData}></Chart>
                <Table className="accountTable" dataSource={this.state.proportionData} bordered>
                    <Col
                        title="项目类别"
                        dataIndex="programName"
                        key="programName"
                        render={(text, record, index) => {
                            return <span>{text}服务</span>
                        }}
                    />
                    <Col
                        title="数量"
                        dataIndex="count"
                        key="count"
                    />
                    <Col
                        title="占比"
                        key="count2"
                        dataIndex="count"
                        render={(text, record, index) => {
                            //项目类别
                            let programPayDetail = this.state.proportionData;
                            let sum = 0;
                            for (let item of programPayDetail) {
                                sum += item.count;
                            }
                            sum = text / sum;
                            sum = sum.toFixed(2);
                            return <span>{sum * 100}%</span>
                        }}
                    />
                    <Col
                        title="金额"
                        key="value"
                        dataIndex="value"
                    />
                </Table>
            </Card>
        </div>
    }
}
export default BusinessSummary