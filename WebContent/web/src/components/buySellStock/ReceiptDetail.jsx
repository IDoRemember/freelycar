import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Table, Row, Col, Popconfirm, DatePicker } from 'antd';
import { Link } from 'react-router';
import moment from 'moment';
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
        $.ajax({
            url: 'api/inventory/orderdetail',
            data: {
                inventoryOrderId: this.props.params.receiptId
            },
            success: (result) => {
                let data = result.data.inventoryInfos
                for (let item of data) {
                    item['key'] = item.id
                    item['total'] = result.data.totalPrice
                }
                if (result.code == "0") {
                    this.setState({
                        data: data
                    })
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
            title: '商品名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '商品类别',
            dataIndex: 'typeName',
            key: 'typeName'
        }, {
            title: '属性',
            dataIndex: 'property',
            key: 'property'

        }, {
            title: '单价',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: '数量',
            dataIndex: 'amount',
            key: 'amount'
        }, {
            title: '供应商',
            dataIndex: 'provider',
            key: 'provider',
            render: (text, record, index) => {
                return <span>{text?text.name:''}</span>
            }
        }, {
            title: '合计',
            dataIndex: 'total',
            key: 'total',
            render: (value, record, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (index > 1) {
                    obj.props.rowSpan = 0
                }
                return obj
            }
        }]
        return <div>
            <BreadcrumbCustom first="进销存管理" second="库存单据" third="入库明细" />
            <Card>
                <Row gutter={24} style={{ marginBottom: "10px" }}>
                    <Col span={8} >单据编号：<span>{this.props.params.receiptId}</span>
                    </Col>
                    <Col span={8} >单据编号：<span>{this.props.params.receiptId}</span>
                    </Col>
                </Row>
                < Table className="accountTable" bordered columns={conlums} dataSource={this.state.data} onChange={this.handleChange} />

            </Card>
        </div>
    }
}
export default PutInStorage