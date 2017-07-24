import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Table, Row, Col, Popconfirm, DatePicker } from 'antd';
import { Link } from 'react-router';
import moment from 'moment';
import $ from 'jquery'
import update from 'immutability-helper'
const Option = Select.Option,
    Search = Input.Search
// 日期 format
const dateFormat = 'YYYY/MM/DD';
class PutInStorage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            option: [],
            orderNumber: '',
            orderMaker: '',
            adminList: []
        }
    }
    componentDidMount() {
        this.getList(1, 10)
        this.getAdminList()
    }

    componentWillReceiveProps(){
        this.getList(1,10)
    }

    
    getAdminList = () => {
        $.ajax({
            url: 'api/admin/list',
            data: {
                page: 1,
                number: 99
            },
            success: (result) => {
                if (result.code == "0") {
                    this.setState({
                        adminList: result.data
                    })
                }
            }
        })
    }
    getList = (page, number) => {
        $.ajax({
            url: 'api/inventory/listorder',
            data: {
                page: page,
                number: number
            },
            success: (result) => {
                if (result.code == "0") {
                    let data = result.data
                    for (let item of data) {
                        item['key'] = item.id
                    }
                    if (data[data.length - 1]['key']) {
                        this.setState({
                            data: data,
                            pagination: { total: result.realSize },
                        })
                    }
                } else if (result.code == "2") {
                    this.setState({
                        data: [],
                        pagination: { total: 0 }
                    })
                }
            }
        })
    }
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        })
        this.getList(pagination.current, 10)
    }
    onDelete = (id) => {
        $.ajax({
            type: 'post',
            url: 'api/inventory/delorder',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                orderId: id
            },
            traditional: true,
            success: (result) => {
                if (result.code == "0") {
                    let dataSource = [...this.state.data];
                    dataSource = dataSource.filter((obj) => {
                        return id !== obj.id;
                    });
                    this.setState({
                        data: dataSource,
                        pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });
                }
            }
        })
    }
    queryList = (inventoryOrderId, adminId, page, number) => {
        $.ajax({
            type: 'get',
            url: 'api/inventory/query',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                inventoryOrderId: inventoryOrderId,
                adminId: adminId,
                page: page,
                number: number
            },
            traditional: true,
            success: (result) => {
                if (result.code == "0") {
                    let data = result.data
                    for (let item of data) {
                        item['key'] = item.id
                    }
                    this.setState({
                        data: data,
                        pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });
                }
            }
        })
    }
    setOrderNumber = (value) => {
        this.setState({
            orderNumber: value
        })
    }
    setOrderMaker = (value) => {
        this.setState({
            orderMaker: value
        })
    }
    render() {
        const projectOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        }), conlums = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '库存编号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return <span><Link to={"/app/buySellStock/productReceipts/" + text} >{text}</Link></span>
            }
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate'
        }, {
            title: '合计金额',
            dataIndex: 'totalPrice',
            key: 'totalPrice'
        }, {
            title: '合计数量',
            dataIndex: 'totalAmount',
            key: 'totalAmount'

        }, {
            title: '制单人',
            dataIndex: 'orderMaker',
            key: 'orderMaker',
            render: (text, record, index) => {
                return <span>{text ? text.name : ''}</span>
            }
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => {
                return <span>
                    <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(record.id)}>
                        <a href="javascript:void(0);">作废</a>
                    </Popconfirm>
                </span>
            }
        }], adminList = this.state.adminList.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        })

        return <div>
            <Card>
                <Row gutter={24} style={{ marginBottom: "10px" }}>
                    <Col span={8} >单据编号：<Input
                        placeholder="输入单据编号"
                        style={{ width: '200px', marginBottom: '10px' }}
                        value={this.state.orderNumber}
                        onChange={(e) => this.setOrderNumber(e.target.value)}
                    />
                    </Col>
                    <Col span={8} >
                        <div style={{ height: '28px', lineHeight: '28px' }} id='provider-area'>
                            制单人：
                           <Select
                                showSearch
                                style={{ width: '200px' }}
                                placeholder="选择制单人"
                                optionFilterProp="children"
                                onChange={(value) => this.setOrderMaker(value)}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                getPopupContainer={() => document.getElementById('provider-area')}
                            >
                                {adminList}
                            </Select>
                        </div>
                    </Col>
                    <Col span={8} >
                        <div style={{ height: '28px', lineHeight: '28px' }}>
                            <Button onClick={() => this.queryList(this.state.orderNumber, null, 1, 10)}>
                                查询
                            </Button>
                        </div>
                    </Col>
                </Row>
                < Table bordered pagination={this.state.pagination} columns={conlums} dataSource={this.state.data} onChange={(pagination) => this.handleTableChange(pagination)} />
            </Card>
        </div>
    }
}
export default PutInStorage