import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Table, Row, Col, Popconfirm, InputNumber } from 'antd';
import { Link } from 'react-router';
import AjaxGet from '../../utils/ajaxGet'
import $ from 'jquery'
import PartsSearch from '../model/PartsSearch.jsx'
import update from 'immutability-helper'
const Option = Select.Option;
class PutInStorage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            view: false,
            data: [],
            option: []
        }
    }
    componentDidMount() {
        $.ajax({
            url: 'api/idgen/generate',
            data: {
                type: 4
            },
            success: (result) => {
                this.setState({
                    id: result.id
                })
            }
        })
        AjaxGet('GET', 'data/LicensePlate.json', (res) => {
            this.setState({ option: res.data })
        })
    }
    handleCancel = () => {
        this.setState({
            view: false
        })
    }
    modeShow = () => {
        console.log(this.state.view)
        this.setState({
            view: true
        })
    }
    handleOk = (data) => {
        console.log(data)
        let datalist = this.state.data
        if (datalist.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let same = 0;
                for (let j = 0; j < datalist.length; j++) {
                    if (data[i].partId == datalist[j].partId) {
                        same++
                    }
                }
                if (same == 0) {
                    datalist.push(data[i])
                }
            }
        } else {
            datalist.push(...data)
        }

        this.setState({
            view: false,
            data: datalist
        })

    }
    changeNumber = (value, index) => {
        this.setState({
            data: update(this.state.data, { [index]: { ['number']: { $set: value } } })
        })
    }
    handleSelectedChange = (value, index) => {
        this.setState({
            data: update(this.state.data, { [index]: { ['providerId']: { $set: value } } })
        })
    }
    onDelete = (index) => {
        const dataSource = [...this.state.data];
        dataSource.splice(index, 1);
        this.setState({ data:dataSource });
    }
    saveData = ()=>{
        
    }
    render() {
        let totalPrice = 0
        for (let item of this.state.data) {
            totalPrice = totalPrice + (item.number ? item.price * item.number : item.price)
        }
        return <div>
            <BreadcrumbCustom first="进销存管理" second="入库" />
            <Card>
                <Row gutter={24} style={{ marginBottom: "10px" }}>
                    <Col span={8} >单据编号：<span>{this.state.id}</span>
                    </Col>
                    <Col span={8} >
                        单据时间：
                        <span>2017-5-27 14:00:08</span>
                    </Col>
                    <Col span={8} >
                        制单人：
                        <span style={{ verticalAlign: 'middle' }}>🐟涵</span>
                    </Col>
                </Row>
                <Button type="primary" style={{ marginLeft: '10px', marginBottom: '10px' }} onClick={() => this.modeShow()} size={'large'}>添加配件入库</Button>

                <PartsSearch view={this.state.view} handleCancel={this.handleCancel} handleOk={this.handleOk}></PartsSearch>
                <Table loading={this.state.data ? false : true} className="accountTable" dataSource={this.state.data} bordered>
                    <Col
                        title="序号"
                        dataIndex="index"
                        key="index"
                        render={(text, record, index) => { return <span>{index + 1}</span> }}
                    />
                    <Col
                        title="配件编号"
                        dataIndex="partId"
                        key="partId"
                    />
                    <Col
                        title="配件名称"
                        key="partName"
                        dataIndex="partName"
                    />
                    <Col
                        title="配件类别"
                        key=" category"
                        dataIndex="category"
                        render={(text, record, index) => {
                            return <span>{text.typeName}</span>
                        }}
                    />
                    <Col
                        title="规格属性"
                        key="attribute"
                        dataIndex="attribute"
                    />
                    <Col
                        title="单价"
                        key="price"
                        dataIndex="price"
                    />
                    <Col
                        title="数量"
                        key="number"
                        dataIndex="number"
                        render={(text, record, index) => {
                            return <InputNumber min={1} style={{ width: '100px' }} onChange={(value) => this.changeNumber(value, index)} />
                        }}
                    />
                    <Col
                        title="供应商"
                        key="supplier"
                        dataIndex="supplier"
                        render={(text, record, index) => {
                            const providersOptions = record.providers.map((item, index) => {
                                return <Option key={item.id} value={item.id + ''}>{item.name}</Option>
                            })
                            if (text) {
                                return <span>{text}</span>
                            } else {
                                return <Select
                                    mode="combobox"
                                    showSearch
                                    style={{ width: '100px' }}
                                    placeholder="输入供应商名称"
                                    optionFilterProp="children"
                                    optionLabelProp="children"
                                    labelInValue
                                    onChange={(value) => this.handleSelectedChange(value, index)}
                                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                >
                                    {providersOptions}
                                </Select>
                            }
                        }}
                    />
                    <Col
                        title="单项合计"
                        key="DeductionCardTime"
                        dataIndex="DeductionCardTime"
                        render={(text, record, index) => {
                            return <span>{record.number ? record.number * record.price : record.price}</span>
                        }}
                    />
                    <Col
                        title="操作"
                        key="action"
                        render={(text, record, index) => {
                            return <span>
                                <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                                    <a href="javascript:void(0);">删除</a>
                                </Popconfirm>
                            </span>
                        }}
                    />
                </Table>
                <div style={{ marginTop: '40px', borderTop: '1px solid #a1a1a1' }}>
                    <Row gutter={24} style={{ margin: "40px 0", fontSize: '18px' }}>
                        <Col span={12} >合计金额：<span>{totalPrice}</span>
                        </Col>
                        <Col span={12} >
                            合计数量：
                        <span>{this.state.data.length}</span>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ margin: "40px 0", fontSize: '18px' }}>
                        <Col span={12} >
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button onClick={()=>this.saveData()} type="primary" style={{ width: '100px', height: '50px' }} size={'large'}>保存</Button>
                            <Button style={{ width: '100px', height: '50px' }} size={'large'}>取消</Button>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
    }
}
export default PutInStorage