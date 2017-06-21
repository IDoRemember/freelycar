import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import Chart from '../charts/EchartsPie.jsx'
import { Row, Col, Card, Button, Radio, DatePicker } from 'antd';
import moment from 'moment';
import { Link } from 'react-router';
// 日期 format
const dateFormat = 'YYYY/MM/DD';
class BusinessSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return <div>
            <BreadcrumbCustom first="数据报表" second="营业汇总" />
<<<<<<< HEAD
            <Card>
                <div>
                    <Row>
                        <Col span={18}>
                            <Radio.Group onChange={this.handleModeChange} value={this.state.mode} style={{ marginBottom: 8 }}>
                                <Radio.Button value="top">今日</Radio.Button>
                                <Radio.Button value="left">本月</Radio.Button>
                            </Radio.Group>

                        </Col>

                        {/*日期选择器*/}
                        <Col span={6}>
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
                        <Col span={12}>
                            <div style={{ padding: '30px', textAlign: 'center' }} >
                                <Card className="nature-income" title="实收金额">
                                    <h1>￥100</h1>
                                </Card>
                            </div>
                        </Col>

                        <Col span={12}>
                            <div style={{ padding: '30px', textAlign: 'center' }}>
                                <Card className="nature-outcome" title="会员消费金额">
                                    <h1>￥100</h1>
                                </Card>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ padding: '30px', textAlign: 'center' }}>
                                <Card className="nature-outcome" title="散客消费金额">
                                    <h1>￥100</h1>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Chart></Chart>
            </Card>
=======
>>>>>>> 59beaab70cae185602bc1476710db7a68e61df67
        </div>
    }
}
export default BusinessSummary