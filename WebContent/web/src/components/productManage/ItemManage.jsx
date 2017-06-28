import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import update from 'immutability-helper'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon, Modal, Form, Popconfirm } from 'antd';
import moment from 'moment';
import $ from 'jquery';
import { Link } from 'react-router';
const Option = Select.Option;
const { RangePicker } = DatePicker;
const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
    }
};


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
            selectedIds: [],
            data: [],
            form: {
                name: '',
                programId: '',
                program: '',
                price: '',
                referWorkTime: '',
                pricePerUnit: '',
                comment: ''
            },
            programItem: [],
            projName: '',//条件查询的项目名称
            progId: '',//条件查询的项目类别id
            pagination:{}
        }
    }

    //初始化数据
    componentDidMount() {

        this.loadData(1, 10);
        this.loadProgram();

    }

    //条件查询
    queryData = () => {
        this.loadData(1, 10, this.state.projName, this.state.progId);
    }


    //获取数据的函数
    loadData = (page, number, proName, programId) => {
        let jsonData = {};
        jsonData.name = proName;
        jsonData.programId = programId;
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: '/api/project/query',
            data: jsonData,
            dataType: 'json',
            type: 'get',
            success: (res) => {
                console.log(res);
                let code = res.code;
                if (code == '0') {
                    let tableDate = [];//表格显示的数据
                    let arr = res.data;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let obj = arr[i];
                        let tableItem = {};
                        for (let item in obj) {
                            if (item == 'id')
                                tableItem.key = obj[item];
                            else if (item == 'program')
                                tableItem.program = obj[item].name;
                            else
                                tableItem[item] = obj[item];
                        }
                        tableDate.push(tableItem);
                    }
                    this.setState({ data: tableDate ,pagination: { total: res.realSize }, });
                }

            }

        });
    }


    loadProgram = () => {
        $.ajax({
            url: '/api/program/listall',
            dataType: 'json',
            type: 'get',
            success: (res) => {
                let code = res.code;
                if (code == '0') {
                    let programItem = [];//表格显示的数据
                    let arr = res.data;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let obj = arr[i];
                        programItem.push(<Option key={obj.id}>{obj.name}</Option>);
                    }
                    this.setState({ programItem: programItem });
                }

            }

        });
    }



    handleChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        })
        this.loadData(pagination.current, 10)
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
        this.setState({
            visible: false,
        });

        let form = this.state.form;
        var obj = {};
        obj.name = form.name;
        obj.price = form.price;
        obj.referWorkTime = form.referWorkTime;
        obj.pricePerUnit = form.pricePerUnit;
        obj.comment = form.comment;
        obj.program = { id: form.programId };

        $.ajax({
            type: 'post',
            url: 'api/project/add',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(obj),
            success: (result) => {
                console.log(result);
                let code = result.code;

                if (code == '0') {

                    obj.program = result.data.program.name;
                    obj.key = result.data.id;

                    this.setState({
                        data: [...this.state.data, obj],
                    });
                }

            }
        });






    }

    //为state的form
    onValueChange = (key, value) => {
        if (key == 'program') {
            console.log(value);
            this.setState({
                form: update(this.state.form, { ['program']: { $set: value.label }, ['programId']: { $set: value.key } })
            })
        } else
            this.setState({
                form: update(this.state.form, { [key]: { $set: value } })
            })
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
        };
    }

    onDelete = (idArray) => {
        $.ajax({
            url: '/api/project/delete',
            data: { projectIds: idArray },
            dataType: 'json',
            type: 'post',
            traditional: true,
            success: (res) => {
                //console.log(res);
                let code = res.code;
                if (code == '0' || code == '18') {
                    let dataSource = [...this.state.data];

                    for (let id of idArray) {
                        dataSource = dataSource.filter((obj) => {
                            return id !== obj.key;
                        });
                    }
                    //console.log(dataSource)
                    this.setState({
                        data: dataSource,
                        //pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });

                }

            }

        });


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
            title: '项目名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '项目类别',
            dataIndex: 'program',
            key: 'program'
        }, {
            title: '项目价格',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: '参考工时',
            dataIndex: 'referWorkTime',
            key: 'referWorkTime'
        }, {
            title: '工时单价',
            dataIndex: 'pricePerUnit',
            key: 'pricePerUnit'
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
            render: (text, record, index) => {
                return (
                    <div>
                        <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete([record.key])}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    </div>
                );
            },
        }];

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //selectedRowKeys  key-->id
                this.setState({
                    selectedIds: selectedRowKeys
                })

                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };


        return (
            <div >
                <BreadcrumbCustom first="产品管理" second="项目管理" />

                <Card>
                    <Tabs defaultActiveKey="1" onChange={this.tabCallback}>
                        <TabPane tab="项目管理" key="1">
                            <div>
                                <Row>
                                    <Col span={8}>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input addonBefore="项目名称" value={this.state.projName} onChange={(e) => this.setState({ projName: e.target.value })} />
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div style={{ marginBottom: 16 }}>
                                            <Select addonBefore="项目类别"
                                                    style={{ width: '100%' }}
                                                    onChange={(e)=> this.setState({progId:e})}
                                            >
                                                {this.state.programItem}
                                            </Select>


                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <Button type="primary" onClick={this.queryData}>查询</Button>
                                    </Col>
                                </Row>
                                <Row>

                                </Row>
                                <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                    <Col span={2}>
                                        <Button onClick={this.showModal} >新增项目</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button onClick={() => this.onDelete(this.state.selectedIds)}>删除项目</Button>
                                    </Col>

                                    {/*新增的模态框*/}
                                    <Modal
                                        title="新增项目"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                        width='50%'
                                    >
                                        <Form onSubmit={this.changehandleSubmit}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="项目名称"
                                                hasFeedback
                                            >
                                                <Input value={this.state.form.name} onChange={(e) => this.onValueChange('name', e.target.value)} />
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="项目类别"
                                                hasFeedback
                                            >
                                                {/*<Input value={this.state.form.program} onChange={(e) => this.onValueChange('program', e.target.value)} />*/}
                                                <Select
                                                    style={{ width: '100%' }}
                                                    onChange={(value) => this.onValueChange('program', value)}
                                                    labelInValue
                                                >
                                                    {this.state.programItem}
                                                </Select>


                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="项目价格"
                                                hasFeedback
                                            >
                                                <Input value={this.state.form.price} onChange={(e) => this.onValueChange('price', e.target.value)} />
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="参考工时"
                                                hasFeedback
                                            >
                                                <Input value={this.state.form.referWorkTime} onChange={(e) => this.onValueChange('referWorkTime', e.target.value)} />
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="工时单价"
                                                hasFeedback
                                            >
                                                <Input value={this.state.form.pricePerUnit} onChange={(e) => this.onValueChange('pricePerUnit', e.target.value)} />
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="备注"
                                                hasFeedback
                                            >
                                                <Input value={this.state.form.comment} onChange={(e) => this.onValueChange('comment', e.target.value)} />
                                            </FormItem>
                                        </Form>



                                    </Modal>



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
            </div >
        );
    }
}
export default BeautyOrder