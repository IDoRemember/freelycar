import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import $ from 'jquery'
import update from 'immutability-helper'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Input, Select, Icon, Modal, Popconfirm } from 'antd';
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
            visible: false,
            data: [],
            selectedIds: [],
            staffId: null,
            staffName: '',
            positionOptions: ['店长', '维修工', '洗车工', '客户经理', '收营员', '会计'],
            levelOptions: ['', '初级', '中级', '高级'],
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
    onDelete = (idArray) => {
        $.ajax({
            type: 'post',
            url: 'api/staff/delete',
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
        $.ajax({
            url: 'api/staff/add',
            type: 'post',
            dataType: 'json',
            data: {
                name: this.state.form.name,
                phone: this.state.form.phone,
                position: this.state.form.position,
                level: this.state.form.level,
                gender: this.state.form.gender,
                comment: this.state.form.comment
            },
            success: (result) => {
                this.setState({
                    loading: false
                })
                console.log(result)
                if (result.code == "0") {
                    this.getList(1, 10)
                }
            }
        })
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const positionOptions = this.state.positionOptions.map((item, index) => {
            return <Option key={index} value={item}>{item}</Option>
        }), levelOptions = this.state.levelOptions.map((item, index) => {
            return <Option key={index} value={item}>{item}</Option>
        })
        columns = [{
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
            key: 'operation',
            render: (text, record, index) => {
                return <span>
                    <span style={{ marginRight: '10px' }}> <a href="javascript:void(0);">修改</a></span>

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
                                        <Input value={this.state.form.name} onChange={(e) => this.setFormData('name', e.target.value)} />
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        性别：
                                    </Col>
                                    <Col span={8}>
                                        <RadioGroup onChange={(e) => this.setFormData('gender', e.target.value)} value={this.state.form.gender}>
                                            <Radio value={'男'}>男</Radio>
                                            <Radio value={'女'}>女</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        手机号码：
                                    </Col>
                                    <Col span={8}>
                                        <Input value={this.state.form.phone} onChange={(e) => this.setFormData('phone', e.target.value)} />
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        职位：
                                    </Col>
                                    <Col span={8}>
                                        <Select
                                            showSearch
                                            style={{ width: '200px' }}
                                            placeholder="选择商品类别进行搜索"
                                            optionFilterProp="children"
                                            onChange={(value) => this.handleChange(value)}
                                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                            getPopupContainer={() => document.getElementById('provider-area')}
                                        >
                                            {positionOptions}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ marginBottom: '10px' }}>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        级别：
                                    </Col>
                                    <Col span={8}>
                                        <Select
                                            showSearch
                                            style={{ width: '200px' }}
                                            placeholder="选择商品类别进行搜索"
                                            optionFilterProp="children"
                                            onChange={(value) => this.handleChange(value)}
                                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                            getPopupContainer={() => document.getElementById('provider-area')}
                                        >
                                            {levelOptions}
                                        </Select>
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