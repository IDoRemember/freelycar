import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
//import jquery from 'jquery';
import $ from 'jquery'; 

import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon } from 'antd';
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
        }
    }

     componentDidMount() {
        console.log('开始掉接口')
        // let data = { 'aa': 'bb' };
        // axios.post('/fitness/api/sms/verification', {phone:'111'}).then((res) => {
        //     console.log(res);
        // }).catch( (error)=> {
        //     console.log(error);
        // });

        // var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onload =function(res){
        //     console.log(res);
        // };
        // xmlhttp.open('post','http://localhost:8078/freelycar/api/test/get',true);
        // xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // xmlhttp.send('a=1&b=s');
        
        
        var obj = {};
        // obj.account = "1444";
        // obj.password = '345';
        // obj.name = "kjr";
        // obj.current = true;
        // var role1 = {id:10};
        //  obj.role = role1;
        obj.page = 1;
        obj.number = 10;
      
        console.log(obj);
        $.ajax({
            url:'http://localhost:8078/freelycar/api/admin/list',
            data:obj,
            dataType:'json',
            type:'get',
            contentType:"application/json; charset=utf-8",
            success:function(data){
                console.log(data);
            }


        });


        // post with form-data (custom headers)
        // note that getHeaders() is non-standard API



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

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
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
        } , {
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
            name: 'John Brown',
            properties:'dfsd',
            valateTime:'一年',
            price: 'New York No. 1 Lake Park',
            createTime:'fff',
            remark:'xxx',
            operation:'zz'


        }, {
            key: '2',
            index: '2',
            name: 'John Brown',
            properties:'dfsd',
            valateTime:'一年',
            price: 'New York No. 1 Lake Park',
            createTime:'fff',
            remark:'xxx',
            operation:'zz'
        }, {
            key: '3',
            index: '3',
            name: 'John Brown',
            properties:'dfsd',
            valateTime:'一年',
            price: 'New York No. 1 Lake Park',
            createTime:'fff',
            remark:'xxx',
            operation:'zz'
        }, {
            key: '4',
            index: '4',
            name: 'John Brown',
            properties:'dfsd',
            valateTime:'一年',
            price: 'New York No. 1 Lake Park',
            createTime:'fff',
            remark:'xxx',
            operation:'zz'
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
                                    <Button>新增卡类</Button>
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
                                        dataSource={data}
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
export default BeautyOrder