import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import Chart from '../charts/EchartsPie.jsx'
import { Row, Col, Card, Button, Radio, DatePicker, Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router';
// 日期 format
const dateFormat = 'YYYY/MM/DD';
class BusinessSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                key: 1,
                index: 1,
                payway: '金额',
                cash: '¥2000',
                easyfubao: '¥2000',
                alipay: '¥2000',
                wechatpay: '¥2000'
            }, {
                key: 2,
                index: 2,
                payway: '比例',
                cash: '25%',
                easyfubao: '25%',
                alipay: '25%',
                wechatpay: '25%'
            }],
            proportionData: [{
                key: 1,
                index: 1,
                projectCategory: '美容服务',
                number: '2000',
                proportion: '20%',
                money: '¥2000'
            }, {
                key: 2,
                index: 2,
                projectCategory: '美容服务',
                number: '2000',
                proportion: '20%',
                money: '¥2000'
            }]
        }
    }

    render() {
        return <div>
            <BreadcrumbCustom first="数据报表" second="营业汇总" />
            <Card>
                <div>
                    <Row>
                        <Col span={12}>
                            <Radio.Group onChange={this.handleModeChange} value={this.state.mode} style={{ marginBottom: 8 }}>
                                <Radio.Button value="top">今日</Radio.Button>
                                <Radio.Button value="left">本月</Radio.Button>
                            </Radio.Group>
                        </Col>

                        {/*日期选择器*/}
                        <Col span={12}>
                            <div>
                                <span>查找日期 : </span>
                                <DatePicker.RangePicker
                                    defaultValue={[moment(), moment()]}
                                    format={dateFormat}
                                    showToday={true}
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
                                    <h1>￥100</h1>
                                </Card>
                            </div>
                        </Col>

                        <Col span={8}>
                            <div style={{ padding: '10px', textAlign: 'center' }}>
                                <Card className="nature-outcome" title="会员消费金额">
                                    <h1>￥100</h1>
                                </Card>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{ padding: '10px', textAlign: 'center' }}>
                                <Card className="nature-grey" title="散客消费金额">
                                    <h1>￥100</h1>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <h2 style={{ padding: '10px' }}>收款方式</h2>
                    <Table className="accountTable" dataSource={this.state.data} bordered>
                        <Col
                            title="支付方式"
                            dataIndex="payway"
                            key="payway"
                        />
                        <Col
                            title="现金"
                            dataIndex="cash"
                            key="cash"
                        />
                        <Col
                            title="易付宝"
                            key="easyfubao"
                            dataIndex="easyfubao"
                        />
                        <Col
                            title="支付宝"
                            key="alipay"
                            dataIndex="alipay"
                        />
                        <Col
                            title="微信支付"
                            key="wechatpay"
                            dataIndex="wechatpay"
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