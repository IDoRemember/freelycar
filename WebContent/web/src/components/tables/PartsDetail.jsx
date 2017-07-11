import React from 'react';
import { Row, Col, Card, Select, Table, Iconconst, Popconfirm, InputNumber } from 'antd';
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
import EditableCell from './EditableCell.jsx'
import update from 'immutability-helper'
import $ from 'jquery'
const Option = Select.Option;
class PartsDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
    }

    handleInvChange = (index, value) => {
        this.props.changeInvSelect(index, value);
    }

    numberChange = (index, value) => {
        //console.log(index, value);
        let price = this.state.data[index].price;
        this.setState({
            data: update(this.state.data, { [index]: { singleSummation: { $set: price * value } } })
        }, () => {
            // console.log(this.state.data);
        })
    }


    addOneROw = () => {
        let oneRow = {
            key: this.state.data.length,
            index: this.state.data.length,
            project: 'xiuche',
            price: '0',
            number: '1',
            singleSummation: '0',
            DeductionCardTime: '0',
        }
        let data = this.state.data
        data.splice(data.length - 1, 0, oneRow)
        this.setState({
            data: data
        })
    }
    onDelete = (index) => {
        const dataSource = [...this.state.data];
        dataSource.splice(index, 1);
        this.setState({ data: dataSource });
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
        console.log(this.props.dataInventory)
        return <Card bodyStyle={{ background: '#fff' }} style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '18px', marginBottom: '10px' }}>配件明细</div>
            <Table className="accountTable" dataSource={this.props.dataInventory} bordered>
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
                    render={(text, record, index) => {
                        if (index + 1 < this.props.dataInventory.length) {
                            return <Select showSearch
                                style={{ width: '100px' }}
                                placeholder="输入配件名称"
                                onSelect={(e) => this.handleInvChange(index, e)}
                            >
                                {projectOptions}
                            </Select>
                        }

                    }}
                />
                <Col
                    title="配件品牌"
                    key="brandName"
                    dataIndex="inventory"
                    render={(text, record, index) => {
                        return <span>{record.brandName}</span>
                    }}
                />
                <Col
                    title="规格"
                    key="standard"
                    dataIndex="inventory"
                    render={(text, record, index) => {
                        return <span>{record.standard}</span>
                    }}
                />
                <Col
                    title="属性"
                    key="property"
                    dataIndex="inventory"
                    render={(text, record, index) => {
                        return <span>{record.property}</span>
                    }}
                />
                <Col
                    title="配件价格"
                    key="price"
                    dataIndex="inventory"
                    render={(text, record, index) => {
                        return <span>{text}</span>
                    }}
                />

                <Col
                    title="可用库存"
                    key="amount"
                    dataIndex="inventory"
                    render={(text, record, index) => {
                        return <span>{text}</span>
                    }}
                />
                <Col
                    title="数量"
                    key="number"
                    dataIndex="number"
                    render={(text, record, index) => {
                        if (index + 1 < this.props.dataInventory.length) {
                            return <InputNumber min={1} max={99} defaultValue={1} onChange={(e) => { this.numberChange(index, e) }} />
                        }
                    }}
                />
                <Col
                    title="单项合计"
                    key="singleSummation"
                    dataIndex="singleSummation"
                />
                <Col
                    title="操作"
                    key="action"
                    render={(text, record, index) => {
                        if (!record.total) {
                            return <span>
                                <span style={{ marginRight: '10px', cursor: 'pointer' }} onClick={this.addOneROw}>
                                    <a href="javascript:void(0);">新增</a>
                                </span>
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