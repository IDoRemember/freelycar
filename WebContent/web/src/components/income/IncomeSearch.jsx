import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import { Row, Col, Card, Button, Radio, DatePicker, Table } from 'antd';
import moment from 'moment';

import { Link } from 'react-router';

// 日期 format
const dateFormat = 'YYYY/MM/DD';

//表格
const columns = [{
    title: '时间',
    key: 'time',
    dataIndex: 'time'
}, {
    title: '实际收入',
    key: 'actualincome',
    dataIndex: 'actualincome',
    render: (text, record, index) => {
        let incomeId = 111
        return <Link to={`/app/incomeManage/historyIncomeDetail/:"${incomeId}`}>{text}</Link>
    }
}, {
    title: '实际支出',
    key: 'actualpayment',
    dataIndex: 'actualpayment',
    render: (text, record, index) => {
        let outcomeId = 111
        return <Link to={`/app/incomeManage/historyOutcomeDetail/:"${outcomeId}`}>{text}</Link>
    }
}];

const data = [{
    key: '1',
    time: '2012-12-12',
    actualincome: '￥300,000.00',
    actualpayment: 'New York No. 1 Lake Park',
}, {
    key: '2',
    time: '2012-12-12',
    actualincome: '￥1,256,000.00',
    actualpayment: 'London No. 1 Lake Park',
}, {
    key: '3',
    time: '2012-12-12',
    actualincome: '￥120,000.00',
    actualpayment: 'Sidney No. 1 Lake Park',
}];




class BeautyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: 0
        }
    }


    handleModeChange = (e) => {
        const mode = e.target.value;
        this.setState({ mode: mode });
    }

    render() {
        return (
            <div>
                <BreadcrumbCustom first="收支查询" />
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
                            <div style={{ background: '#ECECEC', padding: '30px', textAlign: 'center' }} >
                                <Card className="nature-income" title="实际收入">
                                    <h1>￥100</h1>
                                    <p><Link to='/app/incomeManage/incomeSearch/incomedetail' activeClassName="active">详情</Link></p>
                                </Card>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ background: '#ECECEC', padding: '30px', textAlign: 'center' }}>
                                <Card className="nature-outcome" title="实际支出">
                                    <h1>￥100</h1>
                                    <p><Link to='/app/incomeManage/incomeSearch/paydetail' activeClassName="active">详情</Link></p>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
                {/*历史收支查询*/}
                <div>

                    <Row>
                        <Col span={24}>
                            <div style={{ background: '#ECECEC', padding: '30px', textAlign: 'center' }} >
                                <Card title='历史收支查询' style={{ textAlign: 'left' }}>
                                    <Table
                                        columns={columns}
                                        dataSource={data}
                                        bordered
                                        className="accountTable"
                                    />
                                    <div style={{ marginTop: '10px', float: 'right' }}>
                                        <Link to="/app/incomeManage/historyAccount">更多>></Link>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );









    }
}
export default BeautyOrder