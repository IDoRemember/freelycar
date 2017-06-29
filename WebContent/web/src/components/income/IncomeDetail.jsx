import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import { Row, Col, Card, Button, Radio, DatePicker, Table } from 'antd';
import moment from 'moment';
import $ from 'jquery';
import { Link } from 'react-router';

// 日期 format
const dateFormat = 'YYYY/MM/DD';

//表格
class IncomeDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            selectedRowKeys: [],
            loading: false,
            data: []
        }
    }
    componentDidMount() {
        this.getIncomeExpend(this.props.params.mode,1,10)
    }
    componentWillReceiveProps(newprops) {
        this.getIncomeExpend(this.props.params.mode,1,10)
    }
    getIncomeExpend = (mode,page,number) => {
        $.ajax({
            url: 'api/stat/' + mode,
            data: {
                income: 1,
                expend: 0,
                page:page,
                number:number
            },
            success: (result) => {
                if (result.code == "0") {
                    let data = result.data
                    for (let item of data) {
                        item['key'] = item.id
                    }
                    if (data[data.length - 1]['key']) {
                        this.setState({
                            incomeStat: result.incomeStat,
                            data: data,
                            pagination: { total: result.realSize },
                        })
                    }
                }
            }
        })
    }
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.log(pagination)
        this.setState({
            pagination: pager
        })
        this.getIncomeExpend(this.props.params.mode)
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
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '车牌号',
            dataIndex: 'licensePlate',
            key: 'licensePlate',

        }, {
            title: '时间',
            dataIndex: 'payDate',
            key: 'payDate'
        }, {
            title: '项目',
            dataIndex: 'type',
            key: 'type',
            render: (text, record, index) => {
                return <span>{text == 1 ? '消费' : '办卡'}</span>
            }
        }, {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount'
        }];
        return (
            <div>
                <BreadcrumbCustom first="收支查询" second="收入明细" />
                <Card>
                    <div className="table-operations">
                        <Button><Link to='/app/incomeManage/incomeSearch/incomedetail/today'>当日</Link></Button>
                        <Button><Link to='/app/incomeManage/incomeSearch/incomedetail/thisweek'>本周</Link></Button>
                        <Button><Link to='/app/incomeManage/incomeSearch/incomedetail/thismonth'>本月</Link></Button>
                    </div>
                    <div style={{ color: 'red', margin: '30px 0', fontSize: '18px' }}>合计金额：<span>{this.state.incomeStat}</span></div>
                    <Table bordered columns={columns} dataSource={this.state.data} onChange={this.handleTableChange} />
                </Card>
            </div>
        );
    }
}
export default IncomeDetail