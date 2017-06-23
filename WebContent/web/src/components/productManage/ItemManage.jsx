import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'

import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon, Modal, Popconfirm } from 'antd';
import moment from 'moment';

import { Link } from 'react-router';
const { RangePicker } = DatePicker;

// 日期 format
const dateFormat = 'YYYY/MM/DD';
const TabPane = Tabs.TabPane;


class BeautyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            loading: false,
            visible: false,
            data: [{
                key: '1',
                index: '1',
                project: 'John Brown',
                type: 32,
                price: 'New York No. 1 Lake Park',
                duration: 'New York No. 1 Lake Park',
                durationPrice: 'xx',
                createTime: 'fff',
                remark: 'xxx'
            }, {
                key: '2',
                index: '2',
                project: 'John Brown',
                type: 32,
                price: 'New York No. 1 Lake Park',
                duration: 'New York No. 1 Lake Park',
                durationPrice: 'xx',
                createTime: 'fff',
                remark: 'xxx'
            }]
        }
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({

        });
    }

    //tab切换函数
    tabCallback = (key) => {
        console.log(key);
    }


    // tab1模态框的处理函数
    showModal = () => {
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

    //表格删除
    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.data];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    }
    onDelete = (index) => {
        console.log(index);
        const dataSource = [...this.state.data];
        dataSource.splice(index, 1);
        this.setState({ data:dataSource });
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            index: count,
            name: `Edward King ${count}`,
            properties: `Edward King ${count}`,
            valateTime: `Edward King ${count}`,
            price: `Edward King ${count}`,
            createTime: `Edward King ${count}`,
            remark: `Edward King ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }

    render() {
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index'
        }, {
            title: '项目名称',
            dataIndex: 'project',
            key: 'project'
        }, {
            title: '项目类别',
            dataIndex: 'type',
            key: 'type'
        }, {
            title: '项目价格',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: '参考工时',
            dataIndex: 'duration',
            key: 'duration'
        }, {
            title: '工时单价',
            dataIndex: 'durationPrice',
            key: 'duration-price'
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'create-time'
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark'
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    this.state.data.length > 1 ?
                        (
                            <div>
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                                    <a href="#">删除</a>
                                </Popconfirm>
                            </div>
                        ) : null
                );
            },
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
                    <Tabs defaultActiveKey="1" onChange={this.tabCallback}>
                        <TabPane tab="项目管理" key="1">
                            <div>
                                <Row>
                                    <Col span={9}>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input addonBefore="项目名称" />
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input addonBefore="项目类别" />
                                        </div>
                                    </Col>
                                    <Col span={8}>

                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={1}>
                                        <span style={{ verticalAlign: 'middle', lineHeight: '28px' }}>创建日期:</span>
                                    </Col>
                                    <Col span={8}>
                                        <RangePicker defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]} format={dateFormat} />
                                    </Col>
                                    <Col span={8}>
                                        <Button type="primary" onClick={this.showModal} >查询</Button>
                                    </Col>

                                    {/*查询的模态框*/}
                                    <Modal
                                        title="项目查询"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                        width='80%'
                                    >
                                        <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                            <Col span={2}>
                                                <Button>确定</Button>
                                            </Col>
                                            <Col span={2}>
                                                <Button>新增项目</Button>
                                            </Col>
                                            <Col span={2}>
                                                <Input placeholder='可按项目名称,类型等进行搜索' />
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
                                    </Modal>


                                </Row>



                                <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                    <Col span={2}>
                                        <Button>新增项目</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button>删除项目</Button>
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
                            </div>
                        </TabPane>
                        <TabPane tab="项目类别" key="2">
                            <div>
                                <Row>
                                    <Col span={4}>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input addonBefore="类别名称" />
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                        <span style={{ verticalAlign: 'middle', lineHeight: '28px' }}>创建日期:</span>
                                    </Col>
                                    <Col span={5}>
                                        <RangePicker defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]} format={dateFormat} />
                                    </Col>
                                    <Col span={8}>
                                        <Button type="primary" onClick={this.showModal} >查询</Button>
                                    </Col>
                                </Row>


                                <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                    <Col span={2}>
                                        <Button>新增</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button>删除</Button>
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
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}
export default BeautyOrder