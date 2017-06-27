import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import PartsDetail from '../tables/PartsDetail.jsx';
import update from 'immutability-helper'
import { Row, Col, Card, Button, Select, Table, Popconfirm, Form, InputNumber, Modal, Input } from 'antd';
import AjaxGet from '../../utils/ajaxGet';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
class ProviderManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            options: [],
            pagination: {

            },
            selectedRowKeys: [],
            selectedIds: [],
            queryValue: '',
            form: {
                name: '',
                linkman: '',
                phonenumber: '',
                mail: '',
                landline: '',
                address: '',
                remarks: ''
            },
            conlums: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => {
                    return <span>{index + 1}</span>
                }
            }, {
                title: '供应商名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '联系人',
                dataIndex: 'linkman',
                key: 'linkman'
            }, {
                title: '手机号码',
                dataIndex: 'phonenumber',
                key: 'phonenumber'
            }, {
                title: '手机号码',
                dataIndex: 'landline',
                key: 'landline'
            }, {
                title: '邮箱地址',
                dataIndex: 'mail',
                key: 'mail'
            }, {
                title: '联系地址',
                dataIndex: 'address',
                key: 'address'
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
                dataIndex: 'action',
                key: 'action',
                render: (text, record, index) => {
                    return <span>
                        <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete([record.id])}>
                            <a href="javascript:void(0);">删除</a>
                        </Popconfirm>
                    </span>
                }
            }],
            data: []
        }
    }

    componentDidMount() {
        this.getList(1, 10)
        this.getName()
    }

    getName = () => {
        $.ajax({
            url: 'api/provider/name',
            data: {
            },
            success: (result) => {
                if (result.code == "0") {
                    this.setState({
                        options: result.data
                    })
                }
            }
        })
    }

    getList = (page, pageSize) => {
        $.ajax({
            url: 'api/provider/list',
            data: {
                page: page,
                number: pageSize
            },
            success: (result) => {
                if (result.code == "0") {
                    let datalist = []
                    for (let i = 0; i < result.data.length; i++) {
                        let dataitem = {
                            key: result.data[i].id,
                            id: result.data[i].id,
                            name: result.data[i].name,
                            linkman: result.data[i].contactName,
                            phonenumber: result.data[i].phone,
                            landline: result.data[i].landline,
                            mail: result.data[i].email,
                            address: result.data[i].address,
                            remarks: result.data[i].comment,
                            createTime: result.data[i].createDate
                        }
                        datalist.push(dataitem)
                        if (datalist.length == result.data.length) {
                            this.setState({
                                data: datalist,
                                pagination: { total: result.realSize },

                            })
                        }
                    }
                }
            },
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });

        console.log(this.state.form.name);
        $.ajax({
            type: 'post',
            url: 'api/provider/add',
            //contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                name: this.state.form.name,
                contactName: this.state.form.linkman,
                phone: this.state.form.phonenumber,
                email: this.state.form.mail,
                landline: this.state.form.landline,
                address: this.state.form.address,
                comment: this.state.form.remarks
            },
            success: (result) => {
                if (result.code == "0") {
                    let newdata = {
                        key: result.data.id,
                        id: result.data.id,
                        name: result.data.name,
                        linkman: result.data.contactName,
                        phonenumber: result.data.phone,
                        landline: result.data.landline,
                        mail: result.data.email,
                        address: result.data.address,
                        remarks: result.data.comment,
                        createTime: result.data.createDate
                    }
                    this.setState({
                        data: update(this.state.data, { $push: [newdata] }),
                        pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    })
                }
            }
        })
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleSelected = (value) => {
        this.setState({ queryValue: value })
    }
    startQuery = () => {
        $.ajax({
            type: 'GET',
            url: 'api/provider/query',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                name: this.state.queryValue,
                page: 1,
                number: 10
            },
            traditional: true,
            success: (result) => {
                if (result.code == "0") {
                 let datalist = []
                    for (let i = 0; i < result.data.length; i++) {
                        let dataitem = {
                            key: result.data[i].id,
                            id: result.data[i].id,
                            name: result.data[i].name,
                            linkman: result.data[i].contactName,
                            phonenumber: result.data[i].phone,
                            landline: result.data[i].landline,
                            mail: result.data[i].email,
                            address: result.data[i].address,
                            remarks: result.data[i].comment,
                            createTime: result.data[i].createDate
                        }
                        datalist.push(dataitem)
                        if (datalist.length == result.data.length) {
                            this.setState({
                                data: datalist,
                                pagination: { total: result.realSize },

                            })
                        }
                    }
                }
                console.log(result)
            }
        })
    }
    onDelete = (idArray) => {
        $.ajax({
            type: 'post',
            url: 'api/provider/delete',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                providerIds: idArray
            },
            traditional: true,
            success: (result) => {
                if (result.code == "0") {
                    let dataSource = [...this.state.data];
                    for (let id of idArray) {
                        dataSource = dataSource.filter((obj) => {
                            return id !== obj.id;
                        });
                    }
                    console.log(dataSource)
                    this.setState({
                        data: dataSource,
                        pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });
                }
            }
        })
    }
    onValueChange = (key, value) => {
        this.setState({
            form: update(this.state.form, { [key]: { $set: value } })
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
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let selectedIds = []
                for (let item of selectedRows) {
                    selectedIds.push(item.id)
                }
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedIds: selectedIds
                })
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedIds: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        }, plateOptions = [...new Set(this.state.options)].map((item, index) => {
            return <Option key={index} value={item + ''}>{item}</Option>
        });
        return <div>
            <BreadcrumbCustom first="产品管理" second="供应商管理" />
            <Card>
                <div style={{ marginBottom: '40px' }}>
                    <span>供应商名称：</span>
                    <Select showSearch
                        style={{ width: '200px' }}
                        placeholder="输入供应商名称"
                        optionFilterProp="children"
                        onChange={(value)=>this.handleSelected(value)}
                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    >
                        {plateOptions}
                    </Select>
                    <Button onClick={() => this.startQuery()} type="primary" style={{ margin: '10px 10px 10px 40px', width: '100px', height: '50px' }} size={'large'}>查询</Button>
                </div>
                <div className="table-operations">
                    <Button onClick={this.showModal}>新增供应商</Button>
                    <Modal
                        title="新增供应商"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >

                        <Row gutter={16} style={{ marginBottom: '10px' }}>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                供应商名称：
                            </Col>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                <Input value={this.state.form.name} onChange={(e) => this.onValueChange('name', e.target.value)} />
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ marginBottom: '10px' }}>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                联系人：
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.form.linkman} onChange={(e) => this.onValueChange('linkman', e.target.value)} />
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginBottom: '10px' }}>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                手机号码：
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.form.phonenumber} onChange={(e) => this.onValueChange('phonenumber', e.target.value)} />
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginBottom: '10px' }}>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                座机：
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.form.landline} onChange={(e) => this.onValueChange('landline', e.target.value)} />
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginBottom: '10px' }}>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                邮箱地址：
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.form.mail} onChange={(e) => this.onValueChange('mail', e.target.value)} />
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginBottom: '10px' }}>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                联系地址：
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.form.address} onChange={(e) => this.onValueChange('address', e.target.value)} />
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginBottom: '10px' }}>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                备注：
                            </Col>
                            <Col span={8}>
                                <Input type="textarea" rows={3} value={this.state.form.remarks} onChange={(e) => this.onValueChange('remarks', e.target.value)} />
                            </Col>
                        </Row>
                    </Modal>
                    <Button onClick={() => this.onDelete(this.state.selectedIds)}>删除供应商</Button>
                </div>
                <Table pagination={this.state.pagination} bordered onChange={(pagination) => this.handleTableChange(pagination)} columns={this.state.conlums} dataSource={this.state.data} rowSelection={rowSelection} />
            </Card >
        </div >
    }
}
export default ProviderManage