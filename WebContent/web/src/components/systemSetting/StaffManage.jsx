import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import $ from 'jquery'
import update from 'immutability-helper'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Input, Select, Icon, Modal } from 'antd';
import moment from 'moment';
import { Link } from 'react-router';
const { RangePicker } = DatePicker,
    RadioGroup = Radio.Group;
// 日期 format
const dateFormat = 'YYYY/MM/DD';


class StaffManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            filteredInfo: null,
            sortedInfo: null,
            selectedRowKeys: [],
            visible: false,
            data: [],
            staffId: null,
            staffName: '',
            form: {
                id: '',
                name: '',
                gender: '',
                phone: '',
                position: '',
                level: '',
                comment: ''
            }
        }
    }
    componentDidMount() {
        this.getList(1, 10)
    }
    getList = (page, pageSize) => {
        $.ajax({
            url: 'api/staff/list',
            data: {
                page: page,
                number: pageSize
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
    clearFilters = () => {
        this.setState({ filteredInfo: null });
    }
    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    }
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    }

    tabCallback = (key) => {
        console.log(key);
    }

    // tab1模态框的处理函数

    showModal = () => {
        console.log('111')
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '员工工号',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '员工姓名',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender'
        }, {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone'
        }, {
            title: '职位',
            dataIndex: 'position',
            key: 'position'
        }, {
            title: '级别',
            dataIndex: 'level',
            key: 'level'
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
            key: 'operation'
        }];

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };
        return (
            <div>
                <BreadcrumbCustom first="产品管理" second="项目管理" />
                <Card>
                    <div>
                        <Row>
                            <Col span={9}>
                                <div style={{ marginBottom: 16 }}>
                                    <Input addonBefore="员工工号" />
                                </div>
                            </Col>
                            <Col span={5}>
                                <div style={{ marginBottom: 16 }}>
                                    <Input addonBefore="员工姓名" />
                                </div>
                            </Col>
                            <Col span={2}>
                                <Button type="primary"  >查询</Button>
                            </Col>

                            {/*查询的模态框*/}
                            {/*<Modal
                                title="项目查询"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                width='80%'
                            >
                                <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                    <Col span={5}>
                                        <Input addonBefore="员工工号" disabled />
                                    </Col>
                                    <Col span={5}>
                                        <Input addonBefore="员工姓名" />
                                    </Col>
                                    <Col span={5}>
                                        <Input addonBefore="职位" />
                                    </Col>
                                    <Col span={2}>
                                        <Button type="primary">查询</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Table
                                            rowSelection={rowSelection}
                                            columns={columns}
                                            dataSource={this.state.data}
                                            bordered
                                        />
                                    </Col>
                                </Row>
                            </Modal>*/}
                            <Modal
                                title="新增员工"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        员工姓名：
                                    </Col>
                                    <Col span={8}>
                                        <Input value={this.state.form.name} onChange={(e)=>this.setFormData('name',e.target.value)} />
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        性别：
                                    </Col>
                                    <Col span={8}>
                                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                                            <Radio value={1}>男</Radio>
                                            <Radio value={2}>女</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        手机号码：
                                    </Col>
                                    <Col span={8}>
                                        <Input value={this.state.form.phone} onChange={(e)=>this.setFormData('phone',e.target.value)} />
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        职位：
                                    </Col>
                                    <Col span={8}>
                                        <Input value={this.state.form.position} onChange={(e)=>this.setFormData('position',e.target.value)}/>
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        级别：
                                    </Col>
                                    <Col span={8}>
                                        <Input value={this.state.form.level} onChange={(e)=>this.setFormData('level',e.target.value)}/>
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        备注：
                                    </Col>
                                    <Col span={8}>
                                        <Input value={this.state.form.comment} onChange={(e)=>this.setFormData('comment',e.target.value)}/>
                                    </Col>
                                </Row>
                            </Modal>
                        </Row>
                        <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                            <Col span={2}>
                                <Button onClick={() => { this.showModal() }}>新增员工</Button>
                            </Col>
                            <Col span={8}>
                                <Button>删除员工</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table
                                    loading={this.state.loading}
                                    rowSelection={rowSelection}
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
export default StaffManage