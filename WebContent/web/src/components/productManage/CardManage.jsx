import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import EditableCell from '../tables/EditableCell.jsx'
//import jquery from 'jquery';
import $ from 'jquery';

import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon, Popconfirm, Modal } from 'antd';
import moment from 'moment';

import { Link } from 'react-router';
const { RangePicker } = DatePicker;

// 日期 format
const dateFormat = 'YYYY/MM/DD';
const TabPane = Tabs.TabPane;


//可编辑的table 
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }


        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index'
        }, {
            title: '卡类名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '卡类属性',
            dataIndex: 'properties',
            key: 'properties'
        }, {
            title: '售卡金额',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: '有效期(年)',
            dataIndex: 'valateTime',
            key: 'valateTime'
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'create-time'
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark'
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    this.state.dataSource.length > 1 ?
                        (
                            <div>
                                <a onClick={this.showModal}>修改</a>
                                &nbsp;&nbsp;
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                                    <a href="#">删除</a>
                                </Popconfirm>
                            </div>
                        ) : null
                );
            },
        }];

        this.state = {
            dataSource: [{
                key: '1',
                index: '1',
                name: 'John Brown',
                properties: 'dfsd',
                valateTime: '一年',
                price: 'New York No. 1 Lake Park',
                createTime: 'fff',
                remark: 'xxx',
                operation: 'zz'
            }, {
                key: '2',
                index: '2',
                name: 'John Brown',
                properties: 'dfsd',
                valateTime: '一年',
                price: 'New York No. 1 Lake Park',
                createTime: 'fff',
                remark: 'xxx',
                operation: 'zz'
            }],
            count: 3,
        };
    }

    // 模态框的处理函数
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

    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    }
    onDelete = (index) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);
        this.setState({ dataSource });
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
        const { dataSource } = this.state;
        const columns = this.columns;
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
                <BreadcrumbCustom first="产品管理" second="配件管理" />

                <Card>
                    <div>
                        <Row>
                            <Col span={5}>
                                <div style={{ marginBottom: 16 }}>
                                    <Input addonBefore="卡类名称" />
                                </div>
                            </Col>

                            <Col span={1}>
                                <span style={{ verticalAlign: 'middle', lineHeight: '28px' }}>创建日期:</span>
                            </Col>
                            <Col span={8}>
                                <RangePicker defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]} format={dateFormat} />
                            </Col>
                            <Col span={8}>
                                <Button type="primary">查询</Button>
                            </Col>
                        </Row>



                        <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                            <Col span={2}>
                                <Button className="editable-add-btn" onClick={this.handleAdd}>新增卡类</Button>
                            </Col>
                            <Col span={8}>
                                <Button>删除卡类</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Table
                                    rowSelection={rowSelection}
                                    columns={columns}
                                    dataSource={dataSource}
                                    bordered
                                />
                            </Col>
                        </Row>

                    </div>

                </Card>

                  {/*模态框*/}
                                <Modal
                                    title="项目查询"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    width='80%' >
                                    <Row type="flex" justify="center" style={{ marginTop: '40px', marginBottom: '20px' }}>
                                        <div>
                                            <Input addonBefore="卡类名称"  />
                                        </div>
                                            <div>
                                                <Input addonBefore="卡类名称"  />
                                            </div>
                                        <Col span={24}>
                                            <Input addonBefore="卡类属性"  />
                                        </Col>
                                        <Col span={24}>
                                            <Input addonBefore="卡类名称"  />
                                        </Col>
                                        <Col span={24}>
                                            <Input addonBefore="卡类名称"  />
                                        </Col>
                                        <Col span={24}>
                                            <Input addonBefore="卡类名称"  />
                                        </Col>

                                    </Row>

                                        <Row>
                                            <Col span={24}>
                                                <Table
                                                    columns={this.columns}
                                                    dataSource={this.state.dataSource}
                                                    bordered
                                                />
                                            </Col>
                                        </Row>

                                </Modal>


            </div>
        );
    }
}
export default EditableTable
