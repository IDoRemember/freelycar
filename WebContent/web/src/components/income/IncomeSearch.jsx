import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import $ from 'jquery';
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

class IncomeSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: 'today',
            incomeStat: '',
            expendStat: ''
        }
    }
    componentDidMount() {
        this.getIncomeExpend(this.state.mode)
    }
    getIncomeExpend = (mode) => {
        $.ajax({
            url: 'api/stat/' + mode,
            data: {
                today:new Date('2017/06/27'),
                income: 1,
                expend: 1
            },
            success: (result) => {
                if (result.code == "0") {
                    this.setState({
                        incomeStat: result.incomeStat,
                        expendStat: result.expendStat
                    })
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
    onTimeSelected = (dates,dateStrings) =>{
        console.log(dates,dateStrings)
        if(this.state.mode == 'date') {
             $.ajax({
            url: 'api/stat/query',
            data: {
                startDate:new Date(dateStrings[0]),
                endDate:new Date(dateStrings[1])
            },
            success: (result) => {
                if (result.code == "0") {
                    this.setState({
                        incomeStat: result.incomeStat,
                        expendStat: result.expendStat
                    })
                }
            }
        })
        }
    }
    render() {
        return (
            <div>
                <BreadcrumbCustom first="收支查询" />
                <div>
                    <Row>
                        <Col span={12}>
                            <Radio.Group onChange={this.handleModeChange} value={this.state.mode} style={{ marginBottom: 8 }}>
                                <Radio.Button value="today" >今日</Radio.Button>
                                <Radio.Button value="thismonth">本月</Radio.Button>
                                <Radio.Button value="date">区间查找</Radio.Button>
                            </Radio.Group>
                        </Col>
                        {/*日期选择器*/}
                        <Col span={12}>
                            <span>选择查找日期 : </span>
                            <DatePicker.RangePicker
                                defaultValue={[moment(), moment()]}
                                format={dateFormat}
                                showToday={true}
                                onChange={(dates,dateStrings)=>{this.onTimeSelected(dates,dateStrings)}}
                            />
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <div style={{ background: '#ECECEC', padding: '30px', textAlign: 'center' }} >
                                <Card className="nature-income" title="实际收入">
                                    <h1>¥{this.state.incomeStat}</h1>
                                    <p><Link to='/app/incomeManage/incomeSearch/incomedetail' activeClassName="active">详情</Link></p>
                                </Card>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ background: '#ECECEC', padding: '30px', textAlign: 'center' }}>
                                <Card className="nature-outcome" title="实际支出">
                                    <h1>¥{this.state.expendStat}</h1>
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
export default IncomeSearch