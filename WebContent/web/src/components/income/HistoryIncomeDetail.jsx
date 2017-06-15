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
            title: '车牌号',
            dataIndex: 'license',
            key: 'license'
        }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time'
        }, {
            title: '项目',
            dataIndex: 'project',
            key: 'project'
        }, {
            title: '金额',
            dataIndex: 'money',
            key: 'money'
        }];

        //表格
        const data = [{
            key: '1',
            index:'1',
            license: 'John Brown',
            time: 32,
            project: 'New York No. 1 Lake Park',
            money: 'New York No. 1 Lake Park'
        }, {
            key: '2',
            index:'2',
            license: 'John Brown',
            time: 32,
            project: 'New York No. 1 Lake Park',
            money: 'New York No. 1 Lake Park'
        }, {
            key: '3',
            index:'3',
            license: 'John Brown',
            time: 32,
            project: 'New York No. 1 Lake Park',
            money: 'New York No. 1 Lake Park'
        }, {
            key: '4',
            index:'4',
            license: 'John Brown',
            time: 32,
            project: 'New York No. 1 Lake Park',
            money: 'New York No. 1 Lake Park'
        }];

        return (
            <div>
                <BreadcrumbCustom first="收支查询" second="历史收入明细" />
                <Card>
                    <div>
                        <h1 style={{color:'red'}}>当月收入总金额： 4800</h1>
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