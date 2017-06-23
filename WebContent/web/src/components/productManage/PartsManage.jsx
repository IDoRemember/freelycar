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
                number: 'numbernumber Brown',
                name: 'John Brown',
                type: 'xxxx',
                brand: 32,
                format: 'sss',
                properties: 'dfsd',
                price: 'New York No. 1 Lake Park',
                createTime: 'fff',
                remark: 'xxx'
            }, {
                key: '2',
                index: '2',
                number: 'numbernumber Brown',
                name: 'John Brown',
                type: 'xxxx',
                brand: 32,
                format: 'sss',
                properties: 'dfsd',
                price: 'New York No. 1 Lake Park',
                createTime: 'fff',
                remark: 'xxx'
            }]
        }
    }

    //表格操作
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
        this.setState({ data: dataSource });
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
    //end of modal

    //切换tab 在这里调用ajax获取数组 赋值给data
    //切换tab 在这里调用ajax获取数组 赋值给data
    //切换tab 在这里调用ajax获取数组 赋值给data
    tabCallback = (key) => {
        console.log(key);
    }

    render() {
        //tab1的 表头
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index'
        }, {
            title: '配件编号',
            dataIndex: 'number',
            key: 'number'
        }, {
            title: '配件名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '配件类别',
            dataIndex: 'type',
            key: 'type'
        }, {
            title: '配件品牌',
            dataIndex: 'brand',
            key: 'brand'
        }, {
            title: '规格',
            dataIndex: 'format',
            key: 'format'
        }, {
            title: '属性',
            dataIndex: 'properties',
            key: 'properties'
        }, {
            title: '配件价格',
            dataIndex: 'price',
            key: 'price'
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
            }
        }];


        // tab2中的表头
        const columns2 = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index'
        }, {
            title: '类型名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '所属分类',
            dataIndex: 'type',
            key: 'type'
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
            }
        }];



        // tab3中的表格
        const columns3 = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index'
        }, {
            title: '配件品牌',
            dataIndex: 'name',
            key: 'name'
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
            }
        }];

        //表格公用的多选框
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
                <BreadcrumbCustom first="产品管理" second="配件管理" />

                <Card>
                    <Tabs defaultActiveKey="1" onChange={this.tabCallback}>
                        <TabPane tab="配件管理" key="1">
                            <div>
                                <Row>
                                    <Col span={9}>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input addonBefore="配件名称" />
                                        </div>
                                    </Col>
                                    <Col span={5}>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input addonBefore="配件类别" />
                                        </div>
                                    </Col>
                                    <Col span={8}>

                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={8}>
                                        <span style={{ verticalAlign: 'middle', lineHeight: '28px' }}>创建日期:</span>
                                        <RangePicker defaultValue={[moment(), moment()]} format={dateFormat} />
                                    </Col>
                                    <Col span={8}>
                                        <Button type="primary" onClick={this.showModal}>查询</Button>
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
                                                <Button>新增配件</Button>
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
                                        <Button>新增配件</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button>删除配件</Button>
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

                        <TabPane tab="配件类别" key="2">

                            <div>
                                <Row>
                                    <Col span={9}>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input addonBefore="配件名称" />
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                        <span style={{ verticalAlign: 'middle', lineHeight: '28px' }}>创建日期:</span>
                                    </Col>
                                    <Col span={5}>
                                        <RangePicker defaultValue={[moment(), moment()]} format={dateFormat} />
                                    </Col>
                                    <Col span={3}>
                                        <Button type="primary">查询</Button>
                                    </Col>
                                </Row>


                                <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                    <Col span={2}>
                                        <Button>新增配件</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button>删除配件</Button>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Table
                                            rowSelection={rowSelection}
                                            columns={columns2}
                                            dataSource={this.state.data}
                                            bordered
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </TabPane>


                        <TabPane tab="配件品牌" key="3">
                            <div>
                                <Row>
                                    <Col span={4}>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input />
                                        </div>
                                    </Col>

                                    <Col span={3} offset={1}>
                                        <Button type="primary">查询</Button>
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
                                            columns={columns3}
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