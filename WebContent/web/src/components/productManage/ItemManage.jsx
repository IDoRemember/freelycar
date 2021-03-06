import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import update from 'immutability-helper'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon, Modal, Form, Popconfirm, InputNumber, message } from 'antd';
import moment from 'moment';
import $ from 'jquery';
import PartsSearch from '../model/PartsSearch.jsx';
import { Link } from 'react-router';
const Option = Select.Option;
const { RangePicker } = DatePicker;
const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
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
            visibleType: false,
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
            form2: {
                name: '',
                comment: ''
            },
            programItem: [],
            projName: '',//条件查询的项目名称
            progId: '',//条件查询的项目类别id
            pagination: {},
            tabkey: 1,
            modal2: false,//modal之上的modal
            invData: []//关联的配件 
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
            url: 'api/project/query',
            data: jsonData,
            dataType: 'json',
            type: 'get',
            success: (res) => {
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
                            else if (item == 'program') {
                                tableItem.program = obj[item].name;
                                tableItem.programId = obj[item].id;
                            }
                            else
                                tableItem[item] = obj[item];
                        }
                        tableDate.push(tableItem);
                    }
                    this.setState({ data: tableDate, pagination: { total: res.realSize } });
                } else {
                    this.setState({ data: [] });
                }

            }

        });
    }


    //获取数据的函数
    loadDataTab2 = (page, number) => {
        let jsonData = {};
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: 'api/program/list',
            data: jsonData,
            dataType: 'json',
            type: 'get',
            success: (res) => {
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
                            else
                                tableItem[item] = obj[item];
                        }
                        tableDate.push(tableItem);
                    }
                    this.setState({ data: tableDate, pagination: { total: res.realSize } });
                } else {
                    this.setState({ data: [] });
                }

            }

        });
    }


    loadProgram = () => {
        $.ajax({
            url: 'api/program/listall',
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

        let tabkey = this.state.tabkey;
        if (tabkey == 1) {
            this.loadData(pagination.current, 10, this.state.projName, this.state.progId);
        } else if (tabkey == 2) {
            this.loadDataTab2(pagination.current, 10);
        }

    }

    //tab切换函数
    tabCallback = (key) => {
        if (key == 1) {
            this.loadData(1, 10);
            this.loadProgram();
        } else if (key == 2) {
            this.loadDataTab2(1, 10);
        }

        //async
        this.setState({ tabkey: key });
    }


    //新增 修改 配件 modal确认
    handleOk = (e) => {
        let form = this.state.form;
        var obj = {};
        obj.name = form.name;
        obj.price = form.price == '' ? 0 : form.price;
        obj.referWorkTime = form.referWorkTime;
        obj.pricePerUnit = form.pricePerUnit;
        obj.comment = form.comment;
        obj.program = { id: form.programId };

        if (form.id) {
            obj.id = form.id;
        }


        //check require
        if (form.name == '') {
            message.warn('项目名称必填项');
            return false;
        }
        if (form.programId == '') {
            message.warn('项目类别必填项');
            return false;
        }



        let arr = [];
        let invArray = this.state.invData;
        for (let i = 0, len = invArray.length; i < len; i++) {

            let obj1 = invArray[i];
            let newObj = {};//传值的obj
            newObj.number = obj1.number == undefined ? 1 : obj1.number;
            newObj.id = obj1.inventoryInfoId;
            let inventory = {};
            inventory.id = obj1.key;
            newObj.inventory = inventory;
            arr.push(newObj);
        }

        obj.inventoryInfos = arr;

        $.ajax({
            type: 'post',
            url: 'api/project/add',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(obj),
            traditional: true,
            success: (result) => {
                let code = result.code;
                if (code == '0') {
                    obj.program = this.state.form.program;
                    obj.key = result.data.id;
                    obj.createDate = result.data.createDate;

                    if (form.index) {//index occur indicate modify
                        this.setState({
                            data: update(this.state.data, { [form.index]: { $set: obj } }),
                            visible: false
                        })
                    } else {
                        this.setState({
                            data: [...this.state.data, obj],
                            visible: false
                        });

                    }



                }

            }
        });




    }

    //为state的form
    onValueChange = (key, value) => {
        if (key == 'program') {
            this.setState({
                form: update(this.state.form, { ['program']: { $set: value.label }, ['programId']: { $set: value.key } })
            })
        } else
            this.setState({
                form: update(this.state.form, { [key]: { $set: value } })
            })
    }


    //改变关联的配件中的number属性
    onInValueChange = (index, value) => {
        this.setState({
            invData: update(this.state.invData, { [index]: { ['number']: { $set: value } } })
        })
    }

    //新增项目按钮
    addProject = () => {
        //新增我要的是一个空的表单
        this.setState({
            visible: true,
            modalstate: 'add',
            form: update(this.state.form, {
                ['name']: { $set: '' },
                ['programId']: { $set: '' },
                ['program']: { $set: '' },
                ['price']: { $set: '' },
                ['referWorkTime']: { $set: '' },
                ['pricePerUnit']: { $set: '' },
                ['comment']: { $set: '' },
                ['id']: { $set: '' },
            }),
            invData: []
        })

    }

    //修改功能
    modifyMethod = (record, index) => {
        let invData = [];//local varible
        let inventoryInfos = record.inventoryInfos;
        for (let item of inventoryInfos) {
            let temp = item.inventory;
            temp.key = temp.id;
            temp.number = item.number ? item.number : 1;
            temp.inventoryInfoId = item.id;
            invData.push(temp);
        }
        this.setState({
            visible: true,
            modalstate: 'modify',
            form: update(this.state.form, {
                ['name']: { $set: record.name },
                ['programId']: { $set: record.programId },
                ['program']: { $set: record.program },
                ['price']: { $set: record.price },
                ['referWorkTime']: { $set: record.referWorkTime },
                ['pricePerUnit']: { $set: record.pricePerUnit },
                ['comment']: { $set: record.comment },
                ['id']: { $set: record.key },
                ['index']: { $set: index },//可以知道修改的是那一行
            }),
            invData: invData
        })
    }


    //表格删除
    onCellChange = (index, key) => {
        return (value) => {
        };
    }

    onDelete = (idArray) => {
        let tabkey = this.state.tabkey;
        let url = '';
        let data = {};
        if (tabkey == 1) {
            url = 'api/project/delete';
            data = { projectIds: idArray };
        } else if (tabkey == 2) {
            url = 'api/program/delete';
            data = { programIds: idArray };
        }

        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            type: 'post',
            traditional: true,
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
                        //pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });

                }
            }
        });
    }

    //删除关联的配件
    onDeleteInv = (idArray) => {
        let dataSource = [...this.state.invData];
        for (let id of idArray) {
            dataSource = dataSource.filter((obj) => {
                return id !== obj.key;
            });
        }
        this.setState({
            invData: dataSource,
            //pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
        });
    }


    //tab2的函数
    //增加配件
    handleInvOn = () => {
        let obj = {};
        obj.name = this.state.form2.name;
        obj.comment = this.state.form2.comment;

        //check require
        if (obj.name == '') {
            message.warn('配件名称必填项');
            return false;
        }

        $.ajax({
            url: 'api/program/add',
            data: obj,
            dataType: 'json',
            type: 'post',
            success: (res) => {
                if (res.code == '0') {
                    obj.key = res.data.id;
                    obj.createDate = res.data.createDate;
                    this.setState({
                        data: [...this.state.data, obj]
                    });

                }
            }
        })
        this.setState({ visibleType: false });
    }


    //为state的form
    onValueChange2 = (key, value) => {
        if (key == 'program') {
            this.setState({
                form2: update(this.state.form2, { ['program']: { $set: value.label }, ['programId']: { $set: value.key } })
            })
        } else
            this.setState({
                form2: update(this.state.form2, { [key]: { $set: value } })
            })
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
                        <a onClick={() => { this.modifyMethod(record, index) }} style={{ marginRight: '15px' }}>修改</a>
                        <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete([record.key])}>
                            <a>删除</a>
                        </Popconfirm>
                    </div>
                );
            },
        }];

        //关联配件
        const modalInv = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '配件编号',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '配件名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '配件品牌',
            dataIndex: 'brandName',
            key: 'brandName'
        }, {
            title: '配件类别',
            dataIndex: 'typeName',
            key: 'typeName'
        }, {
            title: '规格属性',
            dataIndex: 'property',
            key: 'property'
        }, {
            title: '配件价格',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: '可用库存',
            dataIndex: 'amount',
            key: 'amount'
        }, {
            title: '数量',
            dataIndex: 'count',
            key: 'count',
            render: (value, record, index) => {
                return <InputNumber min={1} max={100} defaultValue={1} onChange={(e) => this.onInValueChange(index, e)} />
            }
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
                        <Popconfirm title="确定要删除?" onConfirm={() => this.onDeleteInv([record.key])}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    </div>
                );
            },
        }];

        const columns_tab2 = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '类别名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate'
        }, {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment'
        }];

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //selectedRowKeys  key-->id
                this.setState({
                    selectedIds: selectedRowKeys
                })
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
                                    <Col span={5} style={{ verticalAlign: 'middle' }}>
                                        <span>项目名称：</span>
                                        <Input style={{ width: '140px' }} value={this.state.projName} onChange={(e) => this.setState({ projName: e.target.value })} />
                                    </Col>

                                    <Col span={5}>
                                        <div>
                                            <span>项目类别：</span>
                                            <Select
                                                style={{ width: '140px' }}
                                                onChange={(e) => this.setState({ progId: e })}
                                            >
                                                <Option key='-1'>全部</Option>
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
                                        <Button onClick={() => { this.addProject() }} >新增项目</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete(this.state.selectedIds)}>
                                            <Button >删除项目</Button>
                                        </Popconfirm>
                                    </Col>

                                    {/*新增的模态框*/}
                                    <Modal
                                        title={this.state.modalstate == 'add' ? "新增项目" : "修改项目"}
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={() => { this.setState({ visible: false }) }}
                                        width='80%'
                                    >
                                        <Form onSubmit={this.changehandleSubmit}>

                                            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                                                <Col span={10} offset={2}>
                                                    <FormItem {...formItemLayout}
                                                        label="项目名称"
                                                        hasFeedback
                                                    >
                                                        <Input value={this.state.form.name} onChange={(e) => this.onValueChange('name', e.target.value)} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={10} >
                                                    <FormItem
                                                        {...formItemLayout}
                                                        label="项目类别"
                                                        hasFeedback
                                                    >
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            onChange={(value) => this.onValueChange('program', value)}
                                                            labelInValue
                                                            defaultValue={{ key: this.state.form.programId + '', label: this.state.form.program }}
                                                        >
                                                            {this.state.programItem}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                                                <Col span={10} offset={2}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                        label="项目价格"
                                                        hasFeedback
                                                    >
                                                        <Input value={this.state.form.price} onChange={(e) => this.onValueChange('price', e.target.value)} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={10} >
                                                    <FormItem
                                                        {...formItemLayout}
                                                        label="参考工时"
                                                        hasFeedback
                                                    >
                                                        <Input value={this.state.form.referWorkTime} onChange={(e) => this.onValueChange('referWorkTime', e.target.value)} />
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                                                <Col span={10} offset={2}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                        label="备注"
                                                        hasFeedback
                                                    >
                                                        <Input value={this.state.form.comment} onChange={(e) => this.onValueChange('comment', e.target.value)} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={10} >
                                                    <FormItem
                                                        {...formItemLayout}
                                                        label="工时单价"
                                                        hasFeedback
                                                    >
                                                        <Input value={this.state.form.pricePerUnit} onChange={(e) => this.onValueChange('pricePerUnit', e.target.value)} />
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                                                <Button type="primary" onClick={() => { this.setState({ modal2: true }) }}>新增配件</Button>
                                                <PartsSearch view={this.state.modal2} handleCancel={() => { this.setState({ modal2: false }) }} handleOk={(selectedRows) => { this.setState({ modal2: false, invData: this.state.invData.concat(selectedRows) }) }}></PartsSearch>
                                            </Row>

                                            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                                                <Table
                                                    columns={modalInv}
                                                    dataSource={this.state.invData}
                                                    bordered
                                                    pagination={false}
                                                />
                                            </Row>

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

                                <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                    <Col span={2}>
                                        <Button onClick={() => this.setState({ visibleType: true })}>新增</Button>
                                        {/*新增的模态框*/}
                                        <Modal
                                            title="新增类别"
                                            visible={this.state.visibleType}
                                            onOk={() => this.handleInvOn()}
                                            onCancel={() => this.setState({ visibleType: false })}
                                            width='50%'
                                        >
                                            <Form onSubmit={this.changehandleSubmit}>

                                                <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                                                    <Col>
                                                        <FormItem {...formItemLayout}
                                                            label="类别名称"
                                                            hasFeedback
                                                        >
                                                            <Input value={this.state.form2.name} onChange={(e) => this.onValueChange2('name', e.target.value)} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <FormItem
                                                            {...formItemLayout}
                                                            label="备注"
                                                            hasFeedback
                                                        >
                                                            <Input value={this.state.form2.comment} onChange={(e) => this.onValueChange2('comment', e.target.value)} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>

                                            </Form>
                                        </Modal>
                                    </Col>
                                    {/*<Col span={8}>
                                        <Button onClick={() => this.onDelete(this.state.selectedIds)}>删除</Button>
                                    </Col>*/}
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Table
                                            //rowSelection={rowSelection}
                                            columns={columns_tab2}
                                            dataSource={this.state.data}
                                            bordered
                                            pagination={this.state.pagination}
                                            onChange={(pagination) => this.handleChange(pagination)}
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