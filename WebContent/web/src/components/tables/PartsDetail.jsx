import React from 'react';
import { Row, Col, Card, Select, Table, Iconconst, Popconfirm, InputNumber, Icon } from 'antd';
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
import EditableCell from './EditableCell.jsx'
import update from 'immutability-helper'
import $ from 'jquery'
import PartsSearch from '../model/PartsSearch.jsx'
const Option = Select.Option,
    total = {
        key: '',
        view: false,
        id: 'total',
        index: '',
        parts: [],
        total: '合计',
        singleSummation: '0'
    }
class PartsDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parts: [],
        }
    }
    componentDidMount() {
        let parts = []
        for (let item of this.props.parts) {
            parts.push(item.inventory)
        }
        parts.push(total)
        console.log(this.props.parts)
        for (let item of parts) {
            item.key = item.id
        }
        this.setState({
            parts: parts
        })
    }

    handleInvChange = (index, value) => {
        this.props.changeInvSelect(index, value);
    }


    modifyParts = (key, value, index) => {
        this.setState({
            parts: update(this.state.parts, { [index]: { [key]: { $set: value } } })
        })
    }

    handleCancel = () => {
        this.setState({
            view: false
        })
    }

    handleOk = (data) => {
        console.log(data)
        let datalist = this.state.parts
        if (datalist.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let same = 0;
                for (let j = 0; j < datalist.length; j++) {
                    if (data[i].partId == datalist[j].id) {
                        same++
                    }
                }
                if (same == 0) {
                    let obj = {
                        name: data[i].partName,
                        brandName: data[i].brand,
                        standard: data[i].standard,
                        property: data[i].attribute,
                        price: data[i].price,
                        amount: data[i].inventory,
                        key: data[i].key
                    }
                    datalist.unshift(obj)
                }
            }
        } else {
            datalist.unshift(...data)
        }
        this.setState({
            view: false,
            parts: datalist
        })
    }

    onDelete = (index) => {
        const dataSource = [...this.state.parts];
        dataSource.splice(index, 1);
        this.setState({ parts: dataSource });
    }

    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    }

    render() {
        const projectOptions = this.props.optionInventory.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        })
        return <Card bodyStyle={{ background: '#fff' }} style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '16px', marginBottom: '10px' }}>   {this.props.title}配件&nbsp;&nbsp;&nbsp;
            <div style={{ display: 'inline-block', color: '#49a9ee', cursor: 'pointer' }} onClick={() => { this.setState({ view: true }) }}><Icon type="plus-circle-o" />&nbsp;增加</div></div>
            <PartsSearch view={this.state.view} handleCancel={this.handleCancel} handleOk={this.handleOk}></PartsSearch>
            <Table className="accountTable" dataSource={this.state.parts} bordered>
                <Col
                    title="序号"
                    dataIndex="index"
                    key="index"
                    render={(text, record, index) => {
                        return <span>{index + 1}</span>
                    }}
                />
                <Col
                    title=""
                    dataIndex="total"
                    key="total"
                />
                <Col
                    title="配件名称"
                    key="name"
                    dataIndex="name"

                />
                <Col
                    title="配件品牌"
                    key="brandName"
                    dataIndex="brandName"
                />
                <Col
                    title="规格"
                    key="standard"
                    dataIndex="standard"
                />
                <Col
                    title="属性"
                    key="property"
                    dataIndex="property"
                />
                <Col
                    title="配件价格"
                    key="price"
                    dataIndex="price"
                />
                <Col
                    title="可用库存"
                    key="amount"
                    dataIndex="amount"
                />
                <Col
                    title="数量"
                    key="number"
                    dataIndex="number"
                    render={(text, record, index) => {
                        if (index + 1 < this.state.parts.length) {
                            return <InputNumber min={1} max={99} defaultValue={1} onChange={(value) => { this.modifyParts('number', value, index) }} />
                        }
                    }}
                />
                <Col
                    title="单项合计"
                    key="singleSummation"
                    dataIndex="singleSummation"
                    render={(text, record, index) => {
                        if (index == (this.state.parts.length - 1)) {
                            console.log(record)
                            let total = 0
                            for (let item of this.state.parts) {
                                if (item.price) {
                                    total = total + (item.number ? item.number : 1) * item.price
                                }
                            }
                            return <span>{total}</span>
                            this.savePartPrice(total)
                        }
                        return <span>{(record.number ? record.number : 1) * record.price}</span>
                    }}
                />
                <Col
                    title="操作"
                    key="action"
                    render={(text, record, index) => {
                        if (!record.total) {
                            return <span>
                                <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                                    <a href="javascript:void(0);">删除</a>
                                </Popconfirm>
                            </span>
                        }
                    }}
                />
            </Table>
        </Card>
    }
}
export default PartsDetail