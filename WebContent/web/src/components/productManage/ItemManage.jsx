import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'

import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon, Modal } from 'antd';
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
            filteredInfo: null,
            sortedInfo: null,
            selectedRowKeys: [],
            loading: false,
            visible: false
        }
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
            key: 'operation'
        }];

        //表格
        const data = [{
            key: '1',
            index: '1',
            project: 'John Brown',
            type: 32,
            price: 'New York No. 1 Lake Park',
            duration: 'New York No. 1 Lake Park',
            durationPrice: 'xx',
            createTime: 'fff',
            remark: 'xxx',
            operation: 'zz'


        }, {
            key: '2',
            index: '2',
            project: 'John Brown',
            type: 32,
            price: 'New York No. 1 Lake Park',
            duration: 'New York No. 1 Lake Park',
            durationPrice: 'xx',
            createTime: 'fff',
            remark: 'xxx',
            operation: 'zz'
        }, {
            key: '3',
            index: '3',
            project: 'John Brown',
            type: 32,
            price: 'New York No. 1 Lake Park',
            duration: 'New York No. 1 Lake Park',
            durationPrice: 'xx',
            createTime: 'fff',
            remark: 'xxx',
            operation: 'zz'
        }, {
            key: '4',
            index: '4',
            project: 'John Brown',
            type: 32,
            price: 'New York No. 1 Lake Park',
            duration: 'New York No. 1 Lake Park',
            durationPrice: 'xx',
            createTime: 'fff',
            remark: 'xxx',
            operation: 'zz'
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
                                        title="Basic Modal"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                        width = '80%'
                                    >
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
                                                    dataSource={data}
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
                                            dataSource={data}
                                            bordered
                                        />
                                    </Col>
                                </Row>





                            </div>




                        </TabPane>
                        <TabPane tab="项目类别" key="2">Content of Tab Pane 2</TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}
export default BeautyOrder