import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Table, Row, Col, Popconfirm, DatePicker } from 'antd';
import { Link } from 'react-router';
import moment from 'moment';
import AjaxGet from '../../utils/ajaxGet'
import $ from 'jquery'
const Option = Select.Option;
// 日期 format
const dateFormat = 'YYYY/MM/DD';
class PutInStorage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            option: []
        }
    }
    componentDidMount() {
        this.getList(1, 10)
    }
    getList = (page, number) => {
        $.ajax({
            url: 'api/inventory/listorder',
            data: {
                page: page,
                number: number
            },
            success: (result) => {
                console.log(result)
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
        console.log(pagination)
        this.setState({
            pagination: pager
        })
        this.getList(pagination.current, 10)
    }
    onDelete = (id) => {
        $.ajax({
            type: 'post',
            url: 'api/provider/delete',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                providerIds: id
            },
            traditional: true,
            success: (result) => {
                if (result.code == "0") {
                    let dataSource = [...this.state.data];
                    dataSource = dataSource.filter((obj) => {
                        return id !== obj.id;
                    });
                    console.log(dataSource)
                    this.setState({
                        data: dataSource,
                        pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });
                }
            }
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
                    <span style={{ marginRight: '10px', cursor: 'pointer' }} onClick={this.addOneROw}>
                        <a href="javascript:void(0);">修改</a>
                    </span>
                    <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(record.id)}>
                        <a href="javascript:void(0);">删除</a>
                    </Popconfirm>
                </span>
            }
        }]
        return <div>
            <BreadcrumbCustom first="进销存管理" second="库存单据" />
            <Card>
                <Row gutter={24} style={{ marginBottom: "10px" }}>
                    <Col span={8} >单据编号：<Input style={{ width: '200px' }} />
                    </Col>
                    <Col span={8} >
                        单据时间：
                        <DatePicker.RangePicker
                            format={dateFormat}
                            showToday={true}
                        />
                    </Col>
                    <Col span={8} >
                        <div style={{ height: '28px', lineHeight: '28px' }}>
                            制单人：
                            <span style={{ verticalAlign: 'middle' }}>🐟涵</span>
                        </div>
                    </Col>
                </Row>
                < Table bordered pagination={this.state.pagination} columns={conlums} dataSource={this.state.data} onChange={(pagination) => this.handleTableChange(pagination)} />
            </Card>
        </div>
    }
}
export default PutInStorage