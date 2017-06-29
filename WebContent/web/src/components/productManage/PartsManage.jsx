import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import update from 'immutability-helper'
import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon, Modal, Popconfirm, Form } from 'antd';
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
            data: [],
            tabkey: 1,
            form: {
                name: '',
                brandId: '',
                typeId: '',
                property: '',
                price: '',
                comment: ''
            },
            brandItem: [],//配件品牌
            typeItem:[]
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
            url = '/api/program/delete';
            data = { programIds: idArray };
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
                        //pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });

                }

            }

        });
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

        let form = this.state.form;
        var obj = {};
        obj.name = form.name;
        obj.price = form.price;
        obj.property = form.property;
        obj.typeId = form.typeId;
        obj.brandId = form.brandId;
        obj.comment = form.comment;
        console.log(obj);
        $.ajax({
            type: 'post',
            url: 'api/inventory/add',
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
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    //end of modal



    //切换tab 在这里调用ajax获取数组 赋值给data
    //切换tab 在这里调用ajax获取数组 赋值给data
    tabCallback = (key) => {
        if (key == 1) {
            //this.loadData(1, 10);
            //this.loadProgram();
        } else if (key == 2) {
            //this.loadDataTab2(1, 10);
        }

        //async
        this.setState({ tabkey: key });
    }


    //初始化数据
    componentDidMount() {

        this.loadData(1, 10);
        this.loadPjBrand(1, 99);
        this.loadPjType(1,99);

    }

    //获取数据的函数
    loadData = (page, number, typeId, name) => {
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
                if (code == '0') {
                    let tableDate = [];//表格显示的数据
                    let arr = res.data;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let obj = arr[i];
                        let tableItem = {};
                        for (let item in obj) {
                            if (item == 'id')
                                tableItem.key = obj[item];
                            else if (item == 'type')
                                tableItem.type = obj[item].typeName;
                            else if (item == 'brand')
                                tableItem.brand = obj[item].name;
                            else
                                tableItem[item] = obj[item];
                        }
                        tableDate.push(tableItem);
                    }
                    this.setState({ data: tableDate, pagination: { total: res.realSize }, });
                }

            }

        });
    }


    //获取配件品牌
    loadPjBrand = (page, number) => {
        let jsonData = {};
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: '/api/inventory/listbrand',
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

    //获取配件类别
    loadPjType = (page, number) => {
        let jsonData = {};
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: '/api/inventory/listtype',
            dataType: 'json',
            data: jsonData,
            type: 'get',
            success: (res) => {
                console.log(res);
                let code = res.code;
                if (code == '0') {
                    let typeItem = [];//表格显示的数据
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
                form: update(this.state.form, {  ['typeId']: { $set: value } })
            })
        } else if(key =='brand'){
            this.setState({
                form: update(this.state.form, {  ['brandId']: { $set: value } })
            })
        } 
        else
            this.setState({
                form: update(this.state.form, { [key]: { $set: value } })
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
            dataIndex: 'type',
            key: 'type'
        }, {
            title: '配件品牌',
            dataIndex: 'brand',
            key: 'brand'
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
                                <Popconfirm title="确认要删除吗?" onConfirm={() => this.onDelete(index)}>
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
                                <Popconfirm title="确认要删除吗?" onConfirm={() => this.onDelete(index)}>
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
                                        <span style={{ verticalAlign: 'middle', lineHeight: '28px' }}>创建日期:&nbsp;</span>
                                        <RangePicker defaultValue={[moment(), moment()]} format={dateFormat} />
                                    </Col>
                                    <Col span={8}>
                                        <Button type="primary">查询</Button>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                    <Col span={2}>
                                        <Button onClick={this.showModal}>新增配件</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button onClick={() => this.onDelete(this.state.selectedRowKeys)}>删除配件</Button>
                                    </Col>


                                    {/*查询的模态框*/}
                                    <Modal
                                        title="项目查询"
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
                                                >
                                                    {this.state.typeItem}
                                                </Select>
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="规格属性"
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