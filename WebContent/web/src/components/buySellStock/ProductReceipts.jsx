import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Table, Row, Col, Popconfirm, DatePicker } from 'antd';
import { Link } from 'react-router';
import moment from 'moment';
import AjaxGet from '../../utils/ajaxGet'
const Option = Select.Option;
// 日期 format
const dateFormat = 'YYYY/MM/DD';
class PutInStorage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            conlums: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index'
            }, {
                title: '库存编号',
                dataIndex: 'stockNumber',
                key: 'stockNumber',
                render: (text, record, index) => {
                    return <span><Link to={"/app/buySellStock/productReceipts/"+text} >{text}</Link></span>
                }
            }, {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            }, {
                title: '合计金额',
                dataIndex: 'amount',
                key: 'amount'
            }, {
                title: '合计数量',
                dataIndex: 'totalNumber',
                key: 'totalNumber'

            }, {
                title: '制单人',
                dataIndex: 'makingPeople',
                key: 'makingPeople'
            }, {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record, index) => {
                    return <span>
                        <span style={{ marginRight: '10px', cursor: 'pointer' }} onClick={this.addOneROw}>
                            <a href="javascript:void(0);">修改</a>
                        </span>
                        <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                            <a href="javascript:void(0);">删除</a>
                        </Popconfirm>
                    </span>
                }
            }],
            data: [{
                key: '1',
                index: '1',
                stockNumber: '1111222233333',
                createTime: '涵涵',
                category: '美容保养',
                time: 'John Brown',
                amount: 32,
                totalNumber: '18362981113',
                makingPeople: '涵涵',
            }],
            option: []
        }
    }
    componentDidMount() {
        AjaxGet('GET', 'data/LicensePlate.json', (res) => {
            this.setState({ option: res.data })
        })
    }
    render() {
        const projectOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })
        return <div>
            <BreadcrumbCustom first="进销存管理" second="库存单据" />
            <Card>
                <Row gutter={24} style={{ marginBottom: "10px" }}>
                    <Col span={8} >单据编号：<Input style={{ width: '200px' }} />
                    </Col>
                    <Col span={8} >
                        单据时间：
                        <DatePicker.RangePicker
                            defaultValue={[moment(), moment()]}
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

                < Table className="accountTable" bordered columns={this.state.conlums} dataSource={this.state.data} onChange={this.handleChange} />

            </Card>
        </div>
    }
}
export default PutInStorage