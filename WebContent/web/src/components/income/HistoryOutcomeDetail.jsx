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
            title: '支出项目',
            dataIndex: 'project',
            key: 'project'
        }, {
            title: '金额',
            dataIndex: 'money',
            key: 'money'
        }, {
            title: '支出时间',
            dataIndex: 'time',
            key: 'time'
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark'
        }];


        //表格
        const data = [{
            key: '1',
            index:'1',
            project: 'New York No. 1 Lake Park',
            money: 'New York No. 1 Lake Park',
            time: 32,
            remark: 'John Brown'
        }, {
            key: '2',
            index:'2',
            project: 'New York No. 1 Lake Park',
            money: 'New York No. 1 Lake Park',
            time: 32,
            remark: 'John Brown'
        }, {
            key: '3',
            index:'3',
            project: 'New York No. 1 Lake Park',
            money: 'New York No. 1 Lake Park',
            time: 32,
            remark: 'John Brown'
        }, {
            key: '4',
            index:'4',
            project: 'New York No. 1 Lake Park',
            money: 'New York No. 1 Lake Park',
            time: 32,
            remark: 'John Brown'
        }];

        return (
            <div>
                <BreadcrumbCustom first="收支查询" second="历史支出明细" />
                <Card>
                    <div>
                        <h1 style={{color:'red'}}>当月支出总金额： 4800</h1>
                    </div>
                    <br/>
                    <br/>

                    <Table bordered columns={columns} dataSource={data} onChange={this.handleChange} />
                </Card>
            </div>
        );
    }
}
export default BeautyOrder