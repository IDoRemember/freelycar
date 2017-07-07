import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import $ from 'jquery'
import update from 'immutability-helper'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Input, Select, Icon, Modal, Popconfirm, message, Switch } from 'antd';
const Option = Select.Option;
const { RangePicker } = DatePicker,
    RadioGroup = Radio.Group;
// 日期 format
const dateFormat = 'YYYY/MM/DD';


class AccountManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            filteredInfo: null,
            sortedInfo: null,
            visible: false,
            data: [],
            selectedIds: [],
            accountId: null,
            accountName: '',
            modifyIndex: null,
            staffOptions: [],
            passwordError: '',
            positionOptions: [
                { id: 1, name: '超级管理员' },
                { id: 2, name: '管理员' },
                { id: 3, name: '技师' },
                { id: 4, name: '财务' }],
            modalstate: 'add',
            form: {
                id: '',
                account: '',
                name: { key: '', label: '' },
                role: { key: '', label: '' },
                current: '',
                comment: '',
                password: '',
                password1: ''
            }
        }
    }

    componentDidMount() {
        this.queryAccount(1, 10)
        this.queryStaff()
    }

    enableAccount(account, type, index) {
        $.ajax({
            url: 'api/admin/changestate',
            type: 'post',
            // contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                account: account,
                type: type ? 1 : 0
            },
            success: (result) => {
                console.log(result)
                if (result.code == "0") {
                    this.setState({
                        data: update(this.state.data, { [index]: { $merge: { current: type } } })
                    })
                }
            }
        })
    }

    queryStaff = () => {
        $.ajax({
            url: 'api/staff/query',
            data: {
                page: 1,
                number: 99
            },
            success: (result) => {
                this.setState({
                    loading: false
                })
                console.log(result)
                if (result.code == "0") {
                    let datalist = result.data
                    for (let item of datalist) {
                        item.key = item.id
                    }
                    this.setState({
                        staffOptions: datalist
                    })
                }
            }
        })
    }

    queryAccount = (page, number) => {
        $.ajax({
            url: 'api/admin/query',
            data: {
                account: this.state.accountId,
                name: this.state.accountName,
                page: page,
                number: number
            },
            success: (result) => {
                this.setState({
                    loading: false
                })
                console.log(result)
                if (result.code == "0") {
                    let datalist = result.data
                    for (let item of datalist) {
                        item.key = item.id
                    }
                    this.setState({
                        data: datalist,
                        pagination: { total: result.realSize }
                    })
                }
            }
        })
    }

    setFormData = (key, value) => {
        console.log(value)
        this.setState({
            form: update(this.state.form, {
                [key]: {
                    $set: value
                }
            })
        })
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    onDelete = (idArray) => {
        $.ajax({
            type: 'post',
            url: 'api/admin/delete',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                accounts: idArray
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

    tabCallback = (key) => {
        console.log(key);
    }

    // tab1模态框的处理函数

    showModal = () => {
        this.setState({
            visible: true,
            modalstate: 'add'
        });
    }

    comparePassword = () => {
        if (this.state.form.password && this.state.form.password1) {
            if (this.state.form.password !== this.state.form.password1) {
                this.setState({
                    passwordError: '两次输入的密码不一致'
                })
            }
        }
    }
    handleOk = (e) => {
        let obj = {}
        if (this.state.modalstate == 'modify') {
            obj = {
                id: this.state.form.id,
                account: this.state.form.account,
                password: this.state.form.password,
                name: this.state.form.name.label,
                staff: { id: this.state.form.name.key },
                phone: this.state.form.phone,
                role: { id: this.state.form.role.key },
                current: this.state.form.current,
                comment: this.state.form.comment
            }
        } else {
            obj = {
                account: this.state.form.account,
                password: this.state.form.password,
                name: this.state.form.name.label,
                phone: this.state.form.phone,
                staff: { id: this.state.form.name.key },
                role: { id: this.state.form.role.key },
                current: this.state.form.current,
                comment: this.state.form.comment
            }
        }
        $.ajax({
            url: 'api/admin/' + this.state.modalstate,
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(obj),
            success: (result) => {
                if (result.code == "0") {
                    if ((this.state.modalstate == 'modify') && (this.state.modifyIndex >= 0)) {
                        this.setState({
                            data: update(this.state.data, { [this.state.modifyIndex]: { $merge: this.state.form } })
                        })
                        message.success('修改成功', 5);
                    } else {
                        result.data.key = result.data.id
                        this.setState({
                            data: update(this.state.data, { $push: [result.data] })
                        })
                        message.success('增加成功', 5)
                    }
                } else {
                    message.error(result.message, 5);
                }
            }
        })
        this.setState({
            visible: false,
        });
    }

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.log(pagination)
        this.setState({
            pagination: pager
        })
        this.queryaccount(pagination.current, 10)
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    modifyInfo = (record, index) => {
        console.log(record, index)
        this.setState({
            visible: true,
            modalstate: 'modify',
            modifyIndex: index,
            form: {
                id: record.id,
                name: {key: record.staff.id+'', label: record.name  },
                account: record.account,
                current: record.current,
                role: { label: record.role.roleName, key: record.role.id+'' },
                comment: record.comment
            }
        })
    }
    render() {
        const positionOptions = this.state.positionOptions.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        }), staffOptions = this.state.staffOptions.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        }),
            columns = [{
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => {
                    return <span>{index + 1}</span>
                }
            }, {
                title: '账号',
                dataIndex: 'account',
                key: 'account'
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '角色',
                dataIndex: 'role',
                key: 'role',
                render: (text, record, index) => {
                    return <span>{text?text.roleName:''}</span>
                }
            }, {
                title: '状态',
                dataIndex: 'current',
                key: 'current',
                render:(text,record,index)=>{
                    return <span>{text?'启用':'禁用'}</span>
                }
            }, {
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate'
            }, {
                title: '备注',
                dataIndex: 'comment',
                key: 'comment'
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record, index) => {
                    return <span>
                        <Switch style={{ marginRight: '10px' }} checked={record.current}   onChange={(value) => this.enableAccount(record.account, value, index)} />
                        <span style={{ marginRight: '10px' }} onClick={() => { this.modifyInfo(record, index) }}> <a href="javascript:void(0);">修改</a></span>
                        <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete([record.id])}>
                            <a href="javascript:void(0);">删除</a>
                        </Popconfirm>
                    </span>
                }
            }];

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let selectedIds = []
                for (let item of selectedRows) {
                    selectedIds.push(item.id);
                }
                this.setState({
                    selectedIds: selectedIds
                })
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedIds: ', selectedRows);
            }
        }
        return (
            <div>
                <BreadcrumbCustom first="系统设置" second="账户管理" />
                <Card>
                    <div>
                        <Row>
                            <Col span={9}>
                                <div style={{ marginBottom: 16 }}>
                                    <Input addonBefore="账号" value={this.state.accountId} onChange={(e) => { this.setState({ accountId: e.target.value }) }} disabled={this.state.modalstate=="modify"}/>
                                </div>
                            </Col>
                            <Col span={5}>
                                <div style={{ marginBottom: 16 }}>
                                    <Input addonBefore="姓名" value={this.state.accountName} onChange={(e) => { this.setState({ accountName: e.target.value }) }}  disabled={this.state.modalstate=="modify"} />
                                </div>
                            </Col>
                            <Col span={2}>
                                <Button type="primary" onClick={() => { this.queryAccount(1, 10) }}>查询</Button>
                            </Col>
                            <Modal
                                title="新增账户"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >   <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        账号：
                                    </Col>
                                    <Col span={8}>
                                        <Input value={this.state.form.account} onChange={(e) => this.setFormData('account', e.target.value)} />
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        姓名：
                                    </Col>
                                    <Col span={8}>
                                        <Select
                                            showSearch
                                            style={{ width: '150px' }}
                                            placeholder="选择员工"
                                            optionFilterProp="children"
                                            value={this.state.form.name}
                                            labelInValue
                                            onChange={(value) => this.setFormData('name', value)}
                                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                            getPopupContainer={() => document.getElementById('provider-area1')}
                                        >
                                            {staffOptions}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        密码：
                                    </Col>
                                    <Col span={8}>
                                        <Input type="password" value={this.state.form.password1} onChange={(e) => this.setFormData('password1', e.target.value)} />
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        密码确认：
                                    </Col>
                                    <Col span={8}>
                                        <Input onBlur={() =>  this.comparePassword } type="password" value={this.state.form.password} onChange={(e) => this.setFormData('password', e.target.value)} />
                                        {(this.state.passwordError != '') && <span style={{ color: 'red' }}>{this.state.passwordError}</span>}
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }} id="provider-area1">
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        角色：
                                    </Col>
                                    <Col span={8}>
                                        <Select
                                            showSearch
                                            style={{ width: '150px' }}
                                            placeholder="选择角色"
                                            optionFilterProp="children"
                                            value={this.state.form.role}
                                            labelInValue
                                            onChange={(value) => this.setFormData('role', value)}
                                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                            getPopupContainer={() => document.getElementById('provider-area1')}
                                        >
                                            {positionOptions}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }} id="provider-area">
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        状态：
                                    </Col>
                                    <Col span={8}>
                                        <RadioGroup onChange={(e) => this.setFormData('current', e.target.value)} value={this.state.form.current}>
                                            <Radio value={true}>启用</Radio>
                                            <Radio value={false}>禁用</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        备注：
                                    </Col>
                                    <Col span={8}>
                                        <Input value={this.state.form.comment} onChange={(e) => this.setFormData('comment', e.target.value)} />
                                    </Col>
                                </Row>
                            </Modal>
                        </Row>
                        <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                            <Col span={2}>
                                <Button onClick={() => { this.showModal() }}>新增账户</Button>
                            </Col>
                            <Col span={8}>
                                <Button onClick={() => { this.onDelete(this.state.selectedIds) }}>删除账户</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table
                                    loading={this.state.loading}
                                    pagination={this.state.pagination}
                                    rowSelection={rowSelection}
                                    onChange={(pagination) => this.handleTableChange(pagination)}
                                    columns={columns}
                                    dataSource={this.state.data}
                                    bordered
                                />
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        );
    }
}
export default AccountManage