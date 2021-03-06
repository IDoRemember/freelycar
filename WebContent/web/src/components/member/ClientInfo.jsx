import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, DatePicker, Modal, Radio, Popconfirm, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';

import { Link } from 'react-router';
import update from 'immutability-helper'
import $ from 'jquery';
const Option = Select.Option;
class ClientInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            visible: false,
            clientName: '',
            clientPhone: '',
            realSize: '',
            thisMonth: '',
            todayCount: '',
            dataSource: [],
            pagination: {
            },
            selectedIds: [],
            queryValue: '',
            type: [],
            columns: [
                {
                    title: '序号', dataIndex: 'index', key: 'index', render: (text, record, index) => {
                        return <span>{index + 1}</span>
                    }
                },
                {
                    title: '姓名', dataIndex: 'customerName', key: 'customerName', render: (text, record, index) => {
                        return <Link to={'app/member/customer/' + record.id}>{text}</Link>
                    }
                },
                { title: '手机号码', dataIndex: 'phoneNumber', key: 'phoneNumber' },
                {
                    title: '车牌号码', dataIndex: 'cars', key: 'cars', render: (text, record, index) => {
                        let carnum = '';
                        let indx = 0;
                        let length = text.length;
                        for (let item of text) {
                            if (indx < length - 1) {
                                carnum += item.licensePlate + ', ';
                            } else {
                                carnum += item.licensePlate;
                            }
                            indx++;
                        }
                        return carnum;
                    }
                },
                {
                    title: '品牌', dataIndex: 'cars', key: 'carBrand', render: (text, record, index) => {
                        let carnum = '';
                        let indx = 0;
                        let length = text.length;
                        for (let item of text) {
                            if (indx < length - 1) {
                                carnum += item.type.brand.name + ', ';
                            } else {
                                carnum += item.type.brand.name;
                            }
                            indx++;
                        }
                        return carnum;
                    }
                },
                { title: '是否会员', dataIndex: 'isMember', key: 'isMember' },
                { title: '总消费次数', dataIndex: 'consumeCount', key: 'consumeCount' },
                { title: '最近到店时间', dataIndex: 'latelyTime', key: 'latelyTime' },
                {
                    title: '操作', dataIndex: 'operation', key: 'operation', render: (text, record, index) => {
                        return <span>
                            <span style={{ marginRight: '10px' }}>
                                <Link to={'app/member/memberShip/' + record.id} >
                                    <span >开卡</span>
                                </Link>
                                <Link to={'app/member/modifyclient/' + record.id} >
                                    <span style={{ marginLeft: '15px' }}>修改</span>
                                </Link>
                                <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete([record.id])}>
                                    <a href="javascript:void(0);" style={{ marginLeft: '15px' }}>删除</a>
                                </Popconfirm>
                            </span>

                        </span>
                    }
                },
            ]
        }
    }
    //渲染完成后执行
    componentDidMount() {
        this.getList(1, 10);
        this.getName();
        this.getBrand();
    }
    getBrand = () => {
        $.ajax({
            type: 'GET',
            url: 'api/car/listbrand',
            datatype: 'json',
            contentType: 'application/json;charset=utf-8',
            data: {},
            success: (res) => {

                this.setState({
                    option: res.data,
                })
            }
        })
    }
    //  TypehandleChange = (value) => {
    //     console.log(`selected ${value}`);
    //     this.setState({
    //         typeId: value
    //     })
    // }

    //获取所有客户姓名模糊查询然后再去根据选择的值去筛选
    /*name接口有没有？？？ */
    getName = () => {
        $.ajax({
            url: 'api/client/querynames',
            data: {
                name: "",
            },
            success: (result) => {
                this.setState({
                    option: result.data,
                })
            }
        })
    }


    loadData = (page, number, clientName, clientPhone) => {
        let jsonData = {};
        jsonData.name = clientName;
        jsonData.phone = clientPhone;
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: 'api/client/query',
            data: jsonData,
            type: 'get',
            success: (res) => {
                if (res.code == "0") {
                    //定义一个能装10条数据的容器
                    let datalist = [];
                    //调用接口后返回的数据
                    var obj = res.data;
                    //遍历所有数据并给绑定到表格上
                    for (let i = 0; i < obj.length; i++) {
                        let dataItem = {
                            key: obj[i].id,
                            id: obj[i].id,
                            customerName: obj[i].name,
                            phoneNumber: obj[i].phone,
                            //busNumber:(obj[i].cars.length>1)?obj[i].cars[0].licensePlate+' ,  '+obj[i].cars[1].licensePlate.substr(0,2)+'...': obj[i].cars[0].licensePlate,
                            cars: obj[i].cars,
                            carBrand: obj[i].cars[0].type.brand.name,
                            isMember: obj[i].cards == "" ? "否" : "是",
                            consumeCount: obj[i].consumTimes,
                            latelyTime: obj[i].lastVisit,
                        }
                        datalist.push(dataItem)
                        //？？？为什么是要datalist==res.length呢
                        if (datalist.length == obj.length) {
                            this.setState({
                                dataSource: datalist,
                                pagination: { total: res.realSize },
                            })
                        }
                    }
                } else if (res.code == "2") {
                    let datalist = [];
                    this.setState({
                        dataSource: datalist

                    })
                }
            },

        })


    }


    //获取分页
    getList = (page, pageSize) => {
        $.ajax({
            url: "api/client/list",
            type: "GET",
            data: {
                page: page,
                number: pageSize
            },
            //  dataType:'json',
            success: (res) => {
                if (res.code == "0") {
                    //定义一个能装10条数据的容器
                    let datalist = [];
                    //调用接口后返回的数据
                    var obj = res.data;
                    //遍历所有数据并给绑定到表格上
                    for (let i = 0; i < obj.length; i++) {
                        let dataItem = {
                            key: obj[i].id,
                            id: obj[i].id,
                            customerName: obj[i].name,
                            phoneNumber: obj[i].phone,
                            //car:(obj[i].cars.length>1)?obj[i].cars[0].licensePlate+','+obj[i].cars[1].licensePlate.substring(0,2)+'...': obj[i].cars[0].licensePlate,
                            cars: obj[i].cars,
                            //      carBrand: obj[i].cars[0].type.brand.name,
                            isMember: obj[i].cards == "" ? "否" : "是",
                            consumeCount: obj[i].consumTimes,
                            latelyTime: obj[i].lastVisit,
                        }
                        datalist.push(dataItem)
                        if (datalist.length == obj.length) {
                            this.setState({
                                dataSource: datalist,
                                pagination: { total: res.realSize },
                            })
                        }
                    }
                }
            },
        })

    }


    //这个模态框到底要不要显示新增会员数呢？
    showModal = () => {
        $.ajax({
            url: 'api/client/stat',
            type: 'GET',
            dataType: 'json',
            data: {},
            success: (res) => {
                this.setState({
                    realSize: res.realSize,
                    thisMonth: res.thisMonth,
                    todayCount: res.today
                })
            }
        })
        this.setState({
            visible: true,

        });
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    }
    //删除对应行
    onDelete = (idArray) => {
        $.ajax({
            type: 'post',
            url: 'api/client/delete',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                clientIds: idArray
            },
            traditional: true,
            success: (result) => {
                if (result.code == "0") {
                    let dataSource = [...this.state.dataSource];
                    //？看看返回值有没有对应的dataSource有没有被删去
                    //过滤id    
                    for (let id of idArray) {
                        dataSource = dataSource.filter((obj) => {
                            return id !== obj.id;
                        });
                    }
                    //为什么这边要加一个判断呢

                    this.setState({
                        dataSource: dataSource,
                        pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });
                    message.success('删除成功', 5)
                }

            }
        })
    }
    handleSelected = (value) => {
        this.setState({ queryValue: value })
    }
    startQuery = () => {
        $.ajax({
            url: 'api/client/query',
            type: 'GET',
            dataType: 'json',
            data: {
                name: this.state.queryValue,
                page: 1,
                number: 10
            },
            traditional: true,
            success: (res) => {
                if (res.code == "0") {
                    let datalist = [];
                    let obj = res.data;
                    for (let i = 0; i < obj.length; i++) {
                        let dataItem = {
                            key: obj[i].id,
                            id: obj[i].id,
                            customerName: obj[i].name,
                            phoneNumber: obj[i].phone,
                            busNumber: obj[i].cars[0].licensePlate,
                            carBrand: obj[i].cars[0].type.brand.name,
                            isMember: obj[i].cards == "" ? "否" : "是",
                            consumeCount: obj[i].consumTimes,
                            latelyTime: obj[i].lastVisit,
                        }
                        datalist.push(dataItem)
                        if (datalist.length == obj.length) {
                            this.setState({
                                dataSource: datalist,
                                pagination: { total: result.realSize },
                            })
                        }
                    }
                }
            }
        })
    }
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        })
        this.getList(pagination.current, 10)
    }




    render() {
        //  const { dataSource } = this.state;
        // const columns = this.columns;
        // const plateOptions = this.state.option.map((item, index) => {
        //     return <Option key={index} value={item.index}>{item.value}</Option>
        // })
        //   const typeOptions = this.state.type.map((item, index) => {
        //     return <Option key={index} value={item.id + ''}>{item.type}</Option>
        // })
        return (
            <div>
                <BreadcrumbCustom first="会员管理" second="客户管理" />

                <div style={{ display: 'inline-block', marginBottom: '25px' }}>
                    <Row>
                        <div style={{ marginBottom: 16, display: "inline-block", marginRight: '20px' }} >
                            <span> 姓名：</span><Input style={{ width: "120px" }} value={this.state.clientName} onChange={(e) => this.setState({ clientName: e.target.value })} />
                        </div>

                        <div style={{ marginBottom: 16, display: "inline-block", marginRight: "20px" }}>
                            <span>手机号码：</span><Input style={{ width: "140px" }} value={this.state.clientPhone} onChange={(e) => this.setState({ clientPhone: e.target.value })} />
                        </div>
                        <Button style={{ display: 'inline-block' }} type="primary" onClick={() => this.loadData(1, 10, this.state.clientName, this.state.clientPhone)}>查询</Button>
                    </Row>
                    {/* <Col span={10} style={{ marginBottom: 16, marginRight: '8px', marginLeft: '26px' }}>
                      <span>手机号码：</span> <Input style={{width:"140px"}}  value={this.state.clientPhone} onChange={(e) => this.setState({ clientPhone: e.target.value })} />
                    </Col> */}



                </div>

                <div>
                    <Button ><Link to={'app/member/addclient'}><Icon type='plus'></Icon>新增客户</Link></Button>
                    <Button style={{ marginLeft: '30px' }} onClick={this.showModal}>会员统计</Button>
                </div>
                <Card style={{ marginTop: '20px' }}>
                    <div>
                        <Table pagination={this.state.pagination} bordered onChange={(pagination) => this.handleTableChange(pagination)} dataSource={this.state.dataSource} columns={this.state.columns}>

                        </Table>
                    </div>
                </Card>
                <Modal
                    title="会员统计"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                    width='25%'
                >
                    <div>
                        <p style={{ fontSize: '16px' }}>会员总数：<span>{this.state.realSize}</span></p>
                        <p style={{ fontSize: '16px' }}>本月新增：<span>{this.state.thisMonth}</span></p>
                        <p style={{ fontSize: '16px' }}>今日新增：<span>{this.state.todayCount}</span></p>

                    </div>
                </Modal>
            </div>
        )

    }


}
export default ClientInfo