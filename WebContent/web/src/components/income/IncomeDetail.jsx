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
const data = [{
    key: '1',
    index:'1',
    time: 'John Brown',
    actualIncome: 32,
    actualPay: 'New York No. 1 Lake Park',
}, {
    key: '2',
    index:'2',
    time: 'John Brown',
    actualIncome: 32,
    actualPay: 'New York No. 1 Lake Park',
}, {
    key: '3',
    index:'3',
    time: 'John Brown',
    actualIncome: 32,
    actualPay: 'New York No. 1 Lake Park',
}, {
    key: '4',
    index:'4',
    time: 'John Brown',
    actualIncome: 32,
    actualPay: 'New York No. 1 Lake Park',
}];

class BeautyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            selectedRowKeys: [],
            loading: false,
        }
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
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title: '时间',
            dataIndex: 'time',
            key: 'time'
        }, {
            title: '实收金额',
            dataIndex: 'actualIncome',
            key: 'actualMoney'
        }, {
            title: '实际支出',
            dataIndex: 'actualPay',
            key: 'actualPay'
        }];
        return (
            <div>
                <BreadcrumbCustom first="收支查询" second="收入明细" />
                <Card>
                    <div className="table-operations">
                        <Button onClick={this.setAgeSort}>当日</Button>
                        <Button onClick={this.clearFilters}>本周</Button>
                        <Button onClick={this.clearAll}>本月</Button>
                    </div>
                    <Table bordered columns={columns} dataSource={data} onChange={this.handleChange} />
                </Card>
            </div>
        );
    }
}
export default BeautyOrder