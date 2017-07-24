import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Table, Row, Col, Popconfirm, InputNumber, message } from 'antd';
import { Link } from 'react-router';
import ProductReceipts from './ProductReceipts.jsx'
import $ from 'jquery'
import PartsSearch from '../model/PartsSearch.jsx'
import update from 'immutability-helper'
const Option = Select.Option;
class PutInStorage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: false,
            display: 'none',//添加配件入库以下部分
            data: [],
            error: ''
        }
    }
    componentDidMount() {

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
            data: datalist,
            display: datalist.length > 0 ? 'block' : 'none'
        })
    }
    changeData = (key, value, index) => {
        this.setState({
            data: update(this.state.data, { [index]: { [key]: { $set: value } } })
        })

    }
    // handleSelectedChange = (value, index) => {
    //     this.setState({
    //         data: update(this.state.data, { [index]: { ['selectedProvider']: { $set: value } } })
    //     })
    // }
    onDelete = (index) => {
        const dataSource = [...this.state.data];
        dataSource.splice(index, 1);
        this.setState({
            data: dataSource,
            display: dataSource.length > 0 ? 'block' : 'none'
        });
    }
    saveData = (totalPrice, totalAmount) => {
        if (this.state.data.length < 1) {
            this.setState({
                error: '请新增配件入库'
            })
        }
        if (this.state.error == '') {
            let instockArray = []
            for (let item of this.state.data) {
                let instockObject = {
                    inventoryId: item.partId,
                    name: item.partName,
                    typeName: item.category.typeName,
                    brandName: item.brand,
                    standard: item.standard,
                    property: item.attribute,
                    provider: { id: item.provider.id },
                    amount: item.number ? item.number : 1,
                    price: item.price
                }
                instockArray.push(instockObject)
            }
            $.ajax({
                url: 'api/inventory/instock',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                type: 'post',
                data: JSON.stringify({
                    type: 0,
                    state: 0,
                    totalAmount: totalAmount,
                    totalPrice: totalPrice,

                    inventoryInfos: instockArray
                }),
                traditional: true,
                success: (result) => {
                    if (result.code == '0') {
                        message.success('入库成功', 5);
                        this.setState({
                            data: []
                        })
                    }
                    console.log(result)
                }
            })
        }
        console.log(this.state.data)

    }
    render() {
        let totalPrice = 0
        for (let item of this.state.data) {
            totalPrice = totalPrice + (item.number ? item.price * item.number : item.price)
        }
        return <div>
            <BreadcrumbCustom first="进销存管理" second="入库" />
            <Card style={{ marginBottom: '10px' }}>
                <Row gutter={24} style={{ marginBottom: "10px" }}>
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

                <div style={{ display: this.state.display }}>
                    {this.state.data.length > 0 && <Table loading={this.state.data ? false : true} className="accountTable" dataSource={this.state.data} bordered>
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
                            render={(text, record, index) => {
                                return <InputNumber style={{ width: '100px' }} onChange={(value) => this.changeData('price', value, index)} />
                            }}
                        />
                        <Col
                            title="数量"
                            key="number"
                            dataIndex="number"
                            render={(text, record, index) => {
                                return <InputNumber min={1} style={{ width: '100px' }} onChange={(value) => this.changeData('number', value, index)} />
                            }}
                        />
                        <Col
                            title="供应商"
                            key="provider"
                            dataIndex="provider"
                            render={(text, record, index) => {
                                return <span>{text?text.name:''}</span>
                            }}
                        />
                        <Col
                            title="单项合计"
                            key="DeductionCardTime"
                            dataIndex="DeductionCardTime"
                            render={(text, record, index) => {
                                return <span>{record.number ? record.number * record.price : 0}</span>
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
                    </Table>}
                    {this.state.data.length > 0 && <div style={{ marginTop: '40px', borderTop: '1px solid #a1a1a1' }}>
                        <Row gutter={24} style={{ margin: "20px 0", fontSize: '18px' }}>
                            <Col span={12} >合计金额：<span>{totalPrice}</span>
                            </Col>
                            {/* <Col span={12} >
                                合计数量：
                            <span>{this.state.data.length}</span>
                            </Col> */}
                        </Row>
                        <Row gutter={24} style={{ margin: "20px 0", fontSize: '18px' }}>
                            <Col span={12} >
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <span style={{ color: 'red', marginRight: '20px' }} >{`${this.state.error}`}</span>
                                <Button onClick={() => this.saveData(totalPrice, this.state.data.length)} type="primary" style={{ width: '100px', height: '50px' }} size={'large'}>保存</Button>
                                <Button style={{ width: '100px', height: '50px' }} size={'large'}>取消</Button>
                            </Col>
                        </Row>
                    </div>}
                </div>
            </Card>
            <ProductReceipts totalPrice={this.state.totalPrice}></ProductReceipts>
        </div>
    }
}
export default PutInStorage