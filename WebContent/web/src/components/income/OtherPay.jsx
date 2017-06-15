import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import AjaxGet from '../../utils/ajaxGet'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Input, Select, Pagination, Popconfirm } from 'antd';
import moment from 'moment';
import { Link } from 'react-router';
import axios from 'axios';
const Option = Select.Option;
// 日期 format
const dateFormat = 'YYYY/MM/DD';


class OtherPay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNum: 1,/*翻页查询*/
            pageSize: 10,/*分页查询*/
            activePage: 1,/*默认显示一页*/
            selectedRowKeys: [],
            loading: false,
            selectedRow: [],
            option: [],
            conlums: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index'
            }, {
                title: '单据编号',
                dataIndex: 'number',
                key: 'number'
            }, {
                title: '单据日期',
                dataIndex: 'billDate',
                key: 'billDate'
            }, {
                title: '支出类别',
                dataIndex: 'category',
                key: 'category'
            }, {
                title: '支出金额',
                dataIndex: 'amount',
                key: 'amount'
            }, {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks'
            }, {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            }, {
                title: '操作',
                dataIndex: 'actualPay',
                key: 'actualPay',
                render: (text, record, index) => {
                    return <span>
                        <span style={{ marginRight: '10px', cursor: 'pointer' }} onClick={this.addOneROw}>
                            <a href="javascript:void(0);">新增</a>
                        </span>
                        <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                            <a href="javascript:void(0);">删除</a>
                        </Popconfirm>
                    </span>
                }
            }],
            data :[{
                key: '1',
                index: '1',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }, {
                key: '2',
                index: '2',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }, {
                key: '3',
                index: '3',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }, {
                key: '4',
                index: '4',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }]
        }
    }
    componentDidMount() {
        AjaxGet('GET', 'data/LicensePlate.json', (res) => {
            this.setState({ option: res.data })
        })
    }
    onDelete = (index) => {
        const dataSource = [...this.state.data];
        dataSource.splice(index, 1);
        this.setState({ data: dataSource });
    }

    searchGroupManage = (params) => {
        console.log(params)
        //根据当前页和pagesize调接口
        axios.post('/fitness/api/sms/verification', { phone: '111' }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }
    handleChange = (value) => {
        console.log(`selected ${value}`)
    }


    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        }, rows = this.state.conlums;//获取接口里面的数据
        let pagination
        if (rows) {
            //分页
            pagination = {
                total: rows.length,
                showSizeChanger: true,
                onShowSizeChange: (current, pageSize) => {
                    this.searchGroupManage({ page: current, size: pageSize });
                },
                onChange: (current) => {
                    this.searchGroupManage({ page: current, size: this.state.pageSize });
                }
            }
        }
        const plateOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })
        return (
            < div >
                <BreadcrumbCustom first="收支管理" second="其他支出" />
                <Card style={{ marginBottom: '10px' }}>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col span={12}>
                            支出类别：<Select
                                style={{ width: '100px' }}
                                placeholder="输入车牌号码"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {plateOptions}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <span>查找日期 : </span>
                            <DatePicker.RangePicker
                                defaultValue={[moment(), moment()]}
                                format={dateFormat}
                                showToday={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} offset={16}>
                            <Button type="primary" style={{ width: '100px', height: '50px' }} size={'large'}><Link to="" style={{ color: '#fff' }}>查询</Link></Button>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <div className="table-operations">
                        <Button onClick={this.setAgeSort}>新增</Button>
                        <Button onClick={this.clearFilters}>删除</Button>
                    </div>
                    <Table bordered columns={this.state.conlums} dataSource={this.state.data} onChange={this.handleChange} rowSelection={rowSelection} pagination={pagination} >
                    </Table>
                </Card>
            </div >
        );
    }
}
export default OtherPay