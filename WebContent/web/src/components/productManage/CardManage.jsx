import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import EditableCell from '../tables/EditableCell.jsx'
import CardModal from './CardModal.jsx'
import $ from 'jquery';
import update from 'immutability-helper'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon, Popconfirm, Modal, Form } from 'antd';
import moment from 'moment';
import { Link } from 'react-router';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
// 日期 format
const dateFormat = 'YYYY/MM/DD';


//可编辑的table 
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //模态框状态
            visible: false,
            //会员卡类别数据
            data: [],
            modifyData: {},//点击修改的那条数据
            cardName: '',//条件查询的卡类,
            selectedRowKeys: [],
            pagination: {}
        }

    }

    componentDidMount() {
        this.loadData(1, 10);
    }

    //条件查询
    queryData = () => {
        this.loadData(1, 10, this.state.cardName);
    }


    //获取数据的函数
    loadData = (page, number, cardName) => {
        let jsonData = {};
        jsonData.name = cardName;
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: 'api/service/query',
            data: jsonData,
            dataType: 'json',
            type: 'get',
            success: (res) => {
                console.log(res);
                let code = res.code;
                if (code == '0') {
                    let arr = res.data;
                    for (let item of arr) {
                        item.key = item.id;
                    }
                    this.setState({ data: arr, pagination: { total: res.realSize }, });
                }

            }

        });
    }



    // 模态框的处理函数
    showModal = (method, record, index) => {
        if (method == 'modify') {
            record.index = index;
            this.setState({
                modifyData: record,
                visible: true
            });
        } else {
            this.setState({
                visible: true,
                modifyData: {}
            });
        }

    }

    handleOk = (obj) => {
        if (obj.index!=undefined) {
            this.setState({
                visible: false,
                modifyData: {},
                data: update(this.state.data, { [obj.index]: { $set: obj } })
            });
        } else {
            this.setState({
                visible: false,
                modifyData: {},
                data: [...this.state.data, obj]
            });

        }
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            modifyData: {}
        });
    }
    //end of modal
    //可编辑表格的处理函数
    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.data];
            dataSource[index][key] = value;
            this.setState({ data: dataSource });
        };
    }
    onDelete = (idArray) => {
        $.ajax({
            url: 'api/service/delete',
            type: 'post',
            data: { serviceIds: idArray },
            traditional: true,
            dataType: 'json',
            success: (res) => {
                let code = res.code;
                if (code == '0' || code == '18') {
                    let dataSource = [...this.state.data];

                    for (let id of idArray) {
                        dataSource = dataSource.filter((obj) => {
                            return id !== obj.key;
                        });
                    }
                    this.setState({
                        data: dataSource,
                    });

                }
            }


        });
    }
    handleChange = (p) => {
        this.loadData(p.current, 10);
    }
    render() {
        //卡类的表头
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '卡类名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '卡类属性',
            dataIndex: 'type',
            key: 'type',
            render: (text, record, index) => {
                return <span>{text == 0 ? '次卡' : '组合卡'}</span>
            }
        }, {
            title: '售卡金额',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: '有效期(年)',
            dataIndex: 'validTime',
            key: 'valateTime'
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'create-time'
        }, {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment'
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    <div>
                        <a onClick={() => this.showModal('modify', record, index)}>修改</a>
                        &nbsp;&nbsp;
                                <Popconfirm title="确认要删除吗?" onConfirm={() => this.onDelete([record.key])}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    </div>
                );
            },
        }];

        //表格前面选择
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {

                // let oldRows = this.state.selectedRows
                // for (let item of selectedRows) {
                //     oldRows = oldRows.filter((obj) => {
                //         return item.key !== obj.key;
                //     });
                // }
                // oldRows.push.apply(oldRows, selectedRows)
                // this.setState({
                //     selectedRows: oldRows
                // })

                this.setState({ selectedRowKeys: selectedRowKeys });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };

        //表单
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };


        return (
            <div>
                <BreadcrumbCustom first="产品管理" second="卡类管理" />

                <Card>
                    <div>
                        <Row gutter={16}>
                            <Col xs={15} sm={10} md={10} lg={6} xl={4} style={{ verticalAlign: 'middle' }}>
                                <span>卡类名称 : </span>
                                <Input style={{ width: '140px' }} onChange={(e) => this.setState({ cardName: e.target.value })} />
                            </Col>
                            <Col span={3}>
                                <Button type="primary" onClick={this.queryData}>查询</Button>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ marginTop: '40px', marginBottom: '20px' }}>
                            <Col xs={6} sm={5} md={4} lg={2} xl={2}>
                                <Button className="editable-add-btn" onClick={() => this.showModal('add')}>新增卡类</Button>
                            </Col>
                            <Col xs={2} sm={4} md={6}>
                                <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete(this.state.selectedRowKeys)}>
                                    <Button >删除卡类</Button>
                                </Popconfirm>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Table
                                    rowSelection={rowSelection}
                                    columns={columns}
                                    dataSource={this.state.data}
                                    bordered
                                    pagination={this.state.pagination}
                                    onChange={(pagination) => this.handleChange(pagination)}
                                />
                            </Col>
                        </Row>

                    </div>
                </Card>
                <CardModal visible={this.state.visible} onOk={this.handleOk} modifyData={this.state.modifyData}
                    onCancel={this.handleCancel}></CardModal>

            </div>
        );
    }
}
export default EditableTable



//可编辑的table 
class ModalEditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

    }


    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.data];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    }
    onDelete = (index) => {
        const dataSource = [...this.state.data];
        dataSource.splice(index, 1);
        this.setState({ data: dataSource });
    }
    handleAdd = () => {

    }
    render() {
        const columns = [{
            title: '项目名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '可用次数',
            dataIndex: 'count',
            key: 'count'
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

        return (
            <div>
                <Button className="editable-add-btn" onClick={this.handleAdd} style={{ marginBottom: '15px' }}>新增</Button>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    bordered
                    pagination={this.state.pagination}
                    onChange={(pagination) => this.handleChange(pagination)}
                />
            </div>
        );
    }
}

