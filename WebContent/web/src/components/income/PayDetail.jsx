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
const data = [{
    key: '1',
    index: '1',
    payment: '采购入库',
    money: 32,
    paymentTime: '2017-5-23 14:00:08',
    Remarks: '无'
}, {
    key: '2',
    index: '2',
    payment: '固定支出',
    money: 32,
    paymentTime: '2017-5-23 14:00:08',
    Remarks: '无'
}, {
    key: '3',
    index: '3',
    payment: '固定支出',
    money: 32,
    paymentTime: '2017-5-23 14:00:08',
    Remarks: '无'
}, {
    key: '4',
    index: '4',
    payment: '采购入库',
    money: 32,
    paymentTime: '2017-5-23 14:00:08',
    Remarks: '无'
}];

class PayDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            selectedRowKeys: [],
            loading: false,
        }
    }
    componentDidMount() {
        this.getIncomeExpend(this.props.params.mode)
    }
    getIncomeExpend = (mode) => {
        $.ajax({
            url: 'api/stat/' + mode,
            data: {
                income: 0,
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
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    clearFilters = () => {
        this.setState({ filteredInfo: null });
    }
    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    }
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    }


    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: '支出项目',
            dataIndex: 'payment',
            key: 'payment'
        }, {
            title: '金额',
            dataIndex: 'money',
            key: 'money'
        }, {
            title: '支出时间',
            dataIndex: 'paymentTime',
            key: 'paymentTime'
        }, {
            title: '备注',
            dataIndex: 'Remarks',
            key: 'Remarks'
        }];
        return (
            <div>
                <BreadcrumbCustom first="收支查询" second="支出明细" />
                <Card>
                    <div className="table-operations">
                        <Button><Link to='/app/incomeManage/incomeSearch/incomedetail/today'>当日</Link></Button>
                        <Button><Link to='/app/incomeManage/incomeSearch/incomedetail/thisweek'>本周</Link></Button>
                        <Button><Link to='/app/incomeManage/incomeSearch/incomedetail/thismonth'>本月</Link></Button>
                    </div>
                    <div style={{ color: 'red', margin: '30px 0', fontSize: '18px' }}>合计金额：<span>{}</span></div>
                    <Table bordered columns={columns} dataSource={data} onChange={this.handleChange} />
                </Card>
            </div>
        );
    }
}
export default PayDetail