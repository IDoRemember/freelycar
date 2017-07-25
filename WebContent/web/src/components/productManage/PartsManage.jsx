import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import update from 'immutability-helper'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon, Modal, Popconfirm, Form, message } from 'antd';
import moment from 'moment';
import $ from 'jquery';
const Option = Select.Option;
import { Link } from 'react-router';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

// 日期 format
const dateFormat = 'YYYY/MM/DD';
const TabPane = Tabs.TabPane;

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

class BeautyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            loading: false,
            visible: false,
            visible2: false,
            visible3: false,
            data: [],
            tabkey: 1,
            form: {
                name: '',
                brandId: '',
                brandName: '',
                typeId: '',
                typeName: '',
                property: '',
                standard: '',
                price: '',
                comment: ''
            },
            form2: {
                typeName: '',
                comment: '',
                name: ''
            },
            brandItem: [],//配件品牌
            typeItem: [],
            inventoryName: '',//条件查询的配件名称
            inventoryTypeId: '',//条件查询的配件类别id
            inventoryBrandName: '',//条件查询的配件品牌名称
            pagination: {}
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
    onDelete = (idArray) => {
        let tabkey = this.state.tabkey;
        let url = '';
        let data = {};
        if (tabkey == 1) {
            url = '/api/inventory/delete';
            data = { inventoryIds: idArray };
        } else if (tabkey == 2) {
            url = '/api/inventory/deltype';
            data = { inventoryTypeIds: idArray };
        } else if (tabkey == 3) {
            url = '/api/inventory/delbrand';
            data = { inventoryBrandIds: idArray };
        }
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            type: 'post',
            traditional: true,
            success: (res) => {
                console.log(res);
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
                        pagination: update(this.state.pagination, { ['total']: { $set: res.realSize } })
                    });

                } else {
                    message.warning(res.msg);
                }

            }

        });
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
        //obj.id = 's11100';
        obj.name = form.name;
        obj.price = form.price;
        obj.property = form.property;
        obj.typeId = form.typeId;
        obj.brandId = form.brandId;
        obj.comment = form.comment;
        obj.standard = form.standard;
        $.ajax({
            type: 'post',
            url: 'api/inventory/add',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(obj),
            success: (result) => {
                //console.log(result);
                let code = result.code;

                if (code == '0') {
                    let dt = result.data;
                    obj.number = dt.id;
                    obj.key = dt.id;
                    obj.createDate = dt.createDate;
                    obj.brandName = this.state.form.brandName;
                    obj.typeName = this.state.form.typeName;
                    this.setState({
                        data: [...this.state.data, obj],
                    });
                }

            }
        });

    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    //end of modal



    //切换tab 在这里调用ajax获取数组 赋值给data
    //切换tab 在这里调用ajax获取数组 赋值给data
    tabCallback = (key) => {
        if (key == 1) {
            this.loadData(1, 10);
            this.loadPjBrand(1, 99);
            this.loadPjType(1, 99);
        } else if (key == 2) {
            this.loadPjData(1, 10);
        } else if (key == 3) {
            this.loadPjBrandData(1, 10);
        }

        //async
        this.setState({ tabkey: key });
    }


    //初始化数据
    componentDidMount() {

        this.loadData(1, 10);
        this.loadPjBrand(1, 99);
        this.loadPjType(1, 99);

    }

    //条件查询
    queryData = () => {
        this.loadData(1, 10, this.state.inventoryName, this.state.inventoryTypeId);
    }

    //tab2条件查询
    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    }

    handleCancel2 = (e) => {
        this.setState({
            visible2: false,
        });
    }

    queryData2 = () => {
        this.loadPjData(1, 10, this.state.inventoryName);
    }

    handleOk2 = (e) => {
        this.setState({
            visible2: false,
        });

        let form = this.state.form2;
        var obj = {};
        obj.typeName = form.typeName;
        obj.comment = form.comment;
        $.ajax({
            type: 'post',
            url: 'api/inventory/addtype',
            dataType: 'json',
            data: obj,
            success: (result) => {
                if (result.code == '0') {
                    let obj = result.data;
                    obj.key = obj.id;
                    console.log(obj);
                    this.setState({
                        data: [...this.state.data, obj],
                    });
                }
            }
        });

    }

    //tab3条件查询
    queryData3 = () => {
        this.loadPjBrandData(1, 10, this.state.inventoryBrandName);
    }

    showModal3 = () => {
        this.setState({
            visible3: true,
        });
    }
    handleOk3 = (e) => {
        this.setState({
            visible3: false,
        });

        let form = this.state.form2;
        var obj = {};
        obj.name = form.name;
        obj.comment = form.comment;
        $.ajax({
            type: 'post',
            url: 'api/inventory/addbrand',
            dataType: 'json',
            data: obj,
            success: (result) => {
                if (result.code == '0') {
                    let obj = result.data;
                    obj.key = obj.id;
                    this.setState({
                        data: [...this.state.data, obj],
                    });
                }
            }
        });

    }
    handleCancel3 = (e) => {
        this.setState({
            visible3: false,
        });
    }

    handlePageChange = (tab, p) => {
        if (tab == 'tab1') {
            this.loadData(p.current, 10, this.state.inventoryName, this.state.inventoryTypeId);
        } else if (tab == 'tab2') {
            this.loadPjData(p.current, 10, this.state.inventoryName);
        } else if (tab == 'tab3') {
            this.loadPjBrandData(p.current, 10, this.state.inventoryBrandName);
        }
    }


    //获取数据的函数
    loadData = (page, number, name, typeId) => {
        let jsonData = {};
        jsonData.name = name;
        jsonData.typeId = typeId;
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: '/api/inventory/list',
            data: jsonData,
            dataType: 'json',
            type: 'get',
            success: (res) => {
                console.log(res);
                let code = res.code;
                let tableDate = [];//表格显示的数据
                if (code == '0') {
                    let arr = res.data;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let obj = arr[i];
                        let tableItem = {};
                        for (let item in obj) {
                            if (item == 'id') {
                                tableItem.key = obj[item];
                                tableItem.number = obj[item];
                            }
                            else if (item == 'type')
                                tableItem.typeName = obj[item].typeName;
                            else if (item == 'brand')
                                tableItem.brandName = obj[item].name;
                            else
                                tableItem[item] = obj[item];
                        }
                        tableDate.push(tableItem);
                    }
                    this.setState({ data: tableDate, pagination: { total: res.realSize }, });
                } else {
                    this.setState({ data: tableDate });
                }

            }

        });
    }
    //获取配件类型
    loadPjData = (page, number, name) => {
        let jsonData = {};
        jsonData.name = name;
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: '/api/inventory/querytype',
            data: jsonData,
            dataType: 'json',
            type: 'get',
            success: (res) => {
                console.log(res);
                let code = res.code;
                let tableDate = [];//表格显示的数据
                if (code == '0') {
                    let arr = res.data;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let obj = arr[i];
                        let tableItem = {};
                        for (let item in obj) {
                            if (item == 'id') {
                                tableItem.key = obj[item];
                                tableItem.number = obj[item];
                            }
                            else if (item == 'type')
                                tableItem.typeName = obj[item].typeName;
                            else if (item == 'brand')
                                tableItem.brand = obj[item].name;
                            else
                                tableItem[item] = obj[item];
                        }
                        tableDate.push(tableItem);
                    }
                    this.setState({ data: tableDate, pagination: { total: res.realSize } });
                } else {
                    this.setState({ data: tableDate });
                }

            }

        });
    }


    //获取配件品牌
    loadPjBrandData = (page, number, name) => {
        let jsonData = {};
        jsonData.page = page;
        jsonData.number = number;
        jsonData.name = name;
        $.ajax({
            url: '/api/inventory/querybrand',
            data: jsonData,
            dataType: 'json',
            type: 'get',
            success: (res) => {
                console.log(res);
                let code = res.code;
                let tableDate = [];//表格显示的数据
                if (code == '0') {
                    let arr = res.data;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let obj = arr[i];
                        let tableItem = {};
                        for (let item in obj) {
                            if (item == 'id') {
                                tableItem.key = obj[item];
                                tableItem.number = obj[item];
                            }
                            else if (item == 'type')
                                tableItem.typeName = obj[item].typeName;
                            else if (item == 'brand')
                                tableItem.brand = obj[item].name;
                            else
                                tableItem[item] = obj[item];
                        }
                        tableDate.push(tableItem);
                    }
                    this.setState({ data: tableDate, pagination: { total: res.realSize } });
                } else {
                    this.setState({ data: tableDate });
                }

            }

        });
    }


    //获取配件品牌 下拉select
    loadPjBrand = (page, number) => {
        let jsonData = {};
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: '/api/inventory/querybrand',
            dataType: 'json',
            data: jsonData,
            type: 'get',
            success: (res) => {
                //console.log(res);
                let code = res.code;
                if (code == '0') {
                    let brandItem = [];//表格显示的数据
                    let arr = res.data;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let obj = arr[i];
                        brandItem.push(<Option key={obj.id}>{obj.name}</Option>);
                    }
                    this.setState({ brandItem: brandItem });
                }
            }
        });
    }

    //获取配件类别 下拉
    loadPjType = (page, number) => {
        let jsonData = {};
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: '/api/inventory/querytype',
            dataType: 'json',
            data: jsonData,
            type: 'get',
            success: (res) => {
                //console.log(res);
                let code = res.code;
                if (code == '0') {
                    let typeItem = [];//表格显示的数据
                    typeItem.push(<Option key='-1'>全部</Option>);
                    let arr = res.data;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let obj = arr[i];
                        typeItem.push(<Option key={obj.id}>{obj.typeName}</Option>);
                    }
                    this.setState({ typeItem: typeItem });
                }

            }
        });
    }


    //为state的form
    onValueChange = (key, value) => {
        if (key == 'type') {
            this.setState({
                form: update(this.state.form, { ['typeId']: { $set: value.key }, ['typeName']: { $set: value.label } })
            })
        } else if (key == 'brand') {
            this.setState({
                form: update(this.state.form, { ['brandId']: { $set: value.key }, ['brandName']: { $set: value.label } })
            })
        }
        else
            this.setState({
                form: update(this.state.form, { [key]: { $set: value } })
            })
    }

    //为state的form2
    onValueChange2 = (key, value) => {
        this.setState({
            form2: update(this.state.form2, { [key]: { $set: value } })
        })
    }


    render() {
        //tab1的 表头
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
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
            dataIndex: 'typeName',
            key: 'typeName'
        }, {
            title: '配件品牌',
            dataIndex: 'brandName',
            key: 'brandName'
        }, {
            title: '规格',
            dataIndex: 'standard',
            key: 'standard'
        }, {
            title: '属性',
            dataIndex: 'property',
            key: 'property'
        }, {
            title: '配件价格',
            dataIndex: 'price',
            key: 'price'
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
                        <Popconfirm title="确认要删除吗?" onConfirm={() => this.onDelete([record.key])}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    </div>
                );
            }
        }];


        // tab2中的表头
        const columns2 = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '类型名称',
            dataIndex: 'typeName',
            key: 'typeName'
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
                        <Popconfirm title="确认要删除吗?" onConfirm={() => this.onDelete([record.key])}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    </div>
                );
            }
        }];



        // tab3中的表格
        const columns3 = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '配件品牌',
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
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    <div>
                        <Popconfirm title="确认要删除吗?" onConfirm={() => this.onDelete([record.key])}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    </div>
                );
            }
        }];

        //表格公用的多选框
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                //selectedRowKeys  key-->id
                this.setState({
                    selectedRowKeys: selectedRowKeys
                })
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
                                    <Col span={5} style={{ verticalAlign: 'middle' }}>
                                        <div style={{ marginBottom: 16 }} >
                                            <span>配件名称：</span>
                                            <Input style={{ width: '140px' }} onChange={(e) => this.setState({ inventoryName: e.target.value })} />
                                        </div>
                                    </Col>

                                    <Col span={5} style={{ verticalAlign: 'middle' }}>
                                        <span>配件类别: </span>
                                        <Select
                                            addonBefore="配件类别"
                                            style={{ width: '140px' }}
                                            onChange={(value) => this.setState({ inventoryTypeId: value })}
                                        >
                                            {this.state.typeItem}
                                        </Select>
                                    </Col>

                                    <Col span={8}>
                                        <Button type="primary" onClick={this.queryData}>查询</Button>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                    <Col span={2}>
                                        <Button onClick={this.showModal}>新增配件</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete(this.state.selectedRowKeys)}>
                                            <Button >删除配件</Button>
                                        </Popconfirm>
                                    </Col>


                                    {/*查询的模态框*/}
                                    <Modal
                                        title="新增配件"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                        width='50%' >

                                        <Form onSubmit={this.handleSubmit} className="login-form">
                                            <FormItem
                                                {...formItemLayout}
                                                label="配件名称"
                                            >
                                                <Input placeholder="" value={this.state.form.name} onChange={(e) => this.onValueChange('name', e.target.value)} />
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="配件品牌"
                                            >
                                                <Select
                                                    style={{ width: '100%' }}
                                                    onChange={(value) => this.onValueChange('brand', value)}
                                                    labelInValue
                                                >
                                                    {this.state.brandItem}
                                                </Select>
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="所属分类"
                                            >
                                                <Select
                                                    style={{ width: '100%' }}
                                                    onChange={(value) => this.onValueChange('type', value)}
                                                    labelInValue
                                                >
                                                    {this.state.typeItem}
                                                </Select>
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="规格"
                                            >
                                                <Input placeholder="" value={this.state.form.standard} onChange={(e) => this.onValueChange('standard', e.target.value)} />
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="属性"
                                            >
                                                <Input placeholder="" value={this.state.form.property} onChange={(e) => this.onValueChange('property', e.target.value)} />
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="配件价格"
                                            >
                                                <Input placeholder="" value={this.state.form.price} onChange={(e) => this.onValueChange('price', e.target.value)} />
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="备注"
                                            >
                                                <Input placeholder="" value={this.state.form.comment} onChange={(e) => this.onValueChange('comment', e.target.value)} />
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
                                            onChange={(pagination) => this.handlePageChange('tab1', pagination)}
                                        />
                                    </Col>
                                </Row>
                            </div>

                        </TabPane>

                        <TabPane tab="配件类别" key="2">

                            <div>
                                <Row>
                                    <Col span={5}>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input addonBefore="配件名称" onChange={(e) => this.setState({ inventoryName: e.target.value })} />
                                        </div>
                                    </Col>
                                    <Col span={3}>
                                        <Button type="primary" onClick={this.queryData2}>查询</Button>
                                    </Col>
                                </Row>


                                <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                    <Col span={2}>
                                        <Button onClick={this.showModal2}>新增类别</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete(this.state.selectedRowKeys)}>
                                            <Button >删除类别</Button>
                                        </Popconfirm>
                                    </Col>


                                    {/*查询的模态框*/}
                                    <Modal
                                        title="新增配件"
                                        visible={this.state.visible2}
                                        onOk={this.handleOk2}
                                        onCancel={this.handleCancel2}
                                        width='50%' >

                                        <Form onSubmit={this.handleSubmit} className="login-form">
                                            <FormItem
                                                {...formItemLayout}
                                                label="类别名称"
                                            >
                                                <Input placeholder="" value={this.state.form2.typeName} onChange={(e) => this.onValueChange2('typeName', e.target.value)} />
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="备注"
                                            >
                                                <Input placeholder="" value={this.state.form2.comment} onChange={(e) => this.onValueChange2('comment', e.target.value)} />
                                            </FormItem>

                                        </Form>
                                    </Modal>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Table
                                            rowSelection={rowSelection}
                                            columns={columns2}
                                            dataSource={this.state.data}
                                            bordered
                                            pagination={this.state.pagination}
                                            onChange={(pagination) => this.handlePageChange('tab2', pagination)}
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
                                            <Input onChange={(e) => this.setState({ inventoryBrandName: e.target.value })} />
                                        </div>
                                    </Col>

                                    <Col span={3} offset={1}>
                                        <Button type="primary" onClick={this.queryData3}>查询</Button>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                    <Col span={2}>
                                        <Button onClick={this.showModal3}>新增品牌</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete(this.state.selectedRowKeys)}>
                                            <Button >删除品牌</Button>
                                        </Popconfirm>
                                    </Col>

                                    {/*查询的模态框*/}
                                    <Modal
                                        title="新增品牌"
                                        visible={this.state.visible3}
                                        onOk={this.handleOk3}
                                        onCancel={this.handleCancel3}
                                        width='50%' >

                                        <Form onSubmit={this.handleSubmit} className="login-form">
                                            <FormItem
                                                {...formItemLayout}
                                                label="品牌名称"
                                            >
                                                <Input placeholder="" value={this.state.form2.name} onChange={(e) => this.onValueChange2('name', e.target.value)} />
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="备注"
                                            >
                                                <Input placeholder="" value={this.state.form2.comment} onChange={(e) => this.onValueChange2('comment', e.target.value)} />
                                            </FormItem>

                                        </Form>
                                    </Modal>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Table
                                            rowSelection={rowSelection}
                                            columns={columns3}
                                            dataSource={this.state.data}
                                            bordered
                                            pagination={this.state.pagination}
                                            onChange={(pagination) => this.handlePageChange('tab3', pagination)}
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