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
            data: [],
            selectedIds: [],
            form: {
                id: '',
                account: '',
                name: '',
                level: '',
                position: ''
            }
        }
    }
    componentDidMount() {
        this.queryAccount(this.props.params.id, 1, 10)
    }

    queryAccount = (sid, page, number) => {

        $.ajax({
            url: 'api/staff/detail',
            data: {
                staffId: sid,
                page: page,
                number: number
            },
            type: 'get',
            dataType: 'json',
            success: (result) => {
                console.log(result)
                let staffInfo = result.staffInfo;
                this.setState({
                    form: update(this.state.form,
                        {
                            ['id']: { $set: staffInfo.id },
                            ['name']: { $set: staffInfo.name },
                            ['position']: { $set: staffInfo.position },
                            ['level']: { $set: staffInfo.level }
                        })
                });
                this.setState({
                    loading: false
                })
                if (result.code == "0") {

                    let arr = result.data;
                    for (let item of arr) {
                        item.key = item.id;
                    }

                    this.setState({
                        data: result.data
                        //pagination: { total: result.realSize }
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




    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.log(pagination)
        this.setState({
            pagination: pager
        })
        this.queryaccount(pagination.current, 10)
    }

    render() {
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '客户名称',
            dataIndex: 'clientName',
            key: 'clientName'
        }, {
            title: '车牌号码',
            dataIndex: 'licensePlate',
            key: 'licensePlate'
        }, {
            title: '车辆型号',
            dataIndex: 'carType',
            key: 'carType'
        }, {
            title: '项目名称',
            dataIndex: 'projects',
            key: 'projects',
            render: (text, record, index) => {
                let project = text.map((item, index) => {
                    if (index < text.length - 1) {
                        return <span key={index}>{item.projectName} 、</span>
                    } else {
                        return <span key={index}>{item.projectName}</span>
                    }
                })

                return <span>{project}</span>
            }
        }, {
            title: '金额',
            dataIndex: 'totalPrice',
            key: 'totalPrice'
        }, {
            title: '服务时间',
            dataIndex: 'deliverTime',
            key: 'deliverTime'
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
                            <Col span={4}  >
                                <div style={{ marginBottom: 16 }}>
                                    员工工号：
                                    <span>
                                        {this.state.form.id}
                                    </span>
                                </div>
                            </Col>

                            <Col span={4} >
                                <div style={{ marginBottom: 16 }}>
                                    员工姓名：
                                    <span>
                                        {this.state.form.name}
                                    </span>
                                </div>
                            </Col>

                            <Col span={4} >
                                <div style={{ marginBottom: 16 }}>
                                    职位：
                                    <span>
                                        {this.state.form.position}
                                    </span>
                                </div>
                            </Col>

                            <Col span={4} >
                                <div style={{ marginBottom: 16 }}>
                                    等级：
                                    <span>
                                        {this.state.form.level}
                                    </span>
                                </div>
                            </Col>

                        </Row>
                        <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                            <Col span={2}>
                                服务详情
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