import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, DatePicker, Modal, Radio, Popconfirm } from 'antd';
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
            dataSource: [],
            pagination: {
            },
            selectedIds: [],
            queryValue: '',
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
                { title: '车牌号码', dataIndex: 'busNumber', key: 'busNumber' },
                { title: '品牌', dataIndex: 'carBrand', key: 'carBrand' },
                { title: '是否会员', dataIndex: 'isMember', key: 'isMember' },
                { title: '总消费次数', dataIndex: 'consumeCount', key: 'consumeCount' },
                { title: '最近到店时间', dataIndex: 'latelyTime', key: 'latelyTime' },
                {
                    title: '操作', dataIndex: 'operation', key: 'operation', render: (text, record, index) => {
                        return <span>
                            <span style={{ marginRight: '10px' }}>
                                <Link to={'app/member/memberShip/'+record.id} >
                                    <span >开卡</span>
                                </Link>
                                
                                <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete([record.id])}>
                                    <a href="javascript:void(0);" style={{ marginLeft: '5px' }}>删除</a>
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
        this.getName()

    }
    //获取所有客户姓名模糊查询然后再去根据选择的值去筛选
    /*name接口有没有？？？ */
    getName = () => {
        $.ajax({
            url: '/api/client/querynames',
            data: {
                name: "",
            },
            success: (result) => {
                console.log(result.data);
                this.setState({
                    option: result.data,
                })
            }
        })
    }
    
    queryData = () => {
        this.loadData(1, 10, this.state.clientName, this.state.clientPhone);
    }
    loadData = (page, number, clientName, clientPhone) => {
        let jsonData = {};
        jsonData.name = clientName;
        jsonData.phone = clientPhone;
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url:'/api/client/query',
            data:jsonData,
            type:'get',
            success:(res) => {
                console.log(res);
                 if (res.code == "0") {
                    //定义一个能装10条数据的容器
                    let datalist = [];
                    //调用接口后返回的数据
                    var obj = res.data;
                    //   console.log(obj);
                    //遍历所有数据并给绑定到表格上
                    for (let i = 0; i < obj.length; i++) {
                        console.log(obj[i].cars);
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
                        //？？？为什么是要datalist==res.length呢
                        if (datalist.length == obj.length) {
                            this.setState({
                                dataSource: datalist,
                                pagination: { total: res.realSize },
                            })
                        }
                    }
                }else if(res.code=="2"){
                    let datalist=[];
                    this.setState({
                    dataSource:datalist
                        
                    })
                }
            },
            
        })


    }


    //获取分页
    getList = (page, pageSize) => {
        $.ajax({
            url: "/api/client/list",
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
                    //   console.log(obj);
                    //遍历所有数据并给绑定到表格上
                    for (let i = 0; i < obj.length; i++) {
                    //   console.log(obj[i].cars);
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
                                pagination: { total: res.realSize },
                            })
                        }
                    }
                }
            },
        })

    }

    //???手机号那个搜索怎么搜呢？
    handleChange = (value) => {
        console.log(`selected ${value}`)
    }

    //这个模态框到底要不要显示新增会员数呢？
    showModal = () => {
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
        console.log(idArray);
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
                    console.log(result)
                    //过滤id    
                    for (let id of idArray) {
                        dataSource = dataSource.filter((obj) => {
                            return id !== obj.id;
                        });
                    }
                    console.log(dataSource)
                    //为什么这边要加一个判断呢

                    this.setState({
                        dataSource: dataSource,
                        pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });

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
        console.log(pagination)
        this.setState({
            pagination: pager
        })
        this.getList(pagination.current, 10)
    }




    render() {
        //  const { dataSource } = this.state;
        // const columns = this.columns;
        const plateOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.index}>{item.value}</Option>
        })
        return (
            <div>
                <BreadcrumbCustom first="会员管理" second="客户信息" />

                <div style={{ display: 'inline-block', marginBottom: '25px' }}>

                    <Col span={8} style={{ marginBottom: 16 }}>
                        <Input placeholder="请输入姓名" value={this.state.clientName} onChange={(e) => this.setState({ clientName: e.target.value })} />
                    </Col>
                    <Col span={8} style={{ marginBottom: 16, marginRight: '8px', marginLeft: '26px' }}>
                        <Input placeholder="请输入手机号" value={this.state.clientPhone} onChange={(e) => this.setState({ clientPhone: e.target.value })} />
                    </Col>
                
                    <Button type="primary" onClick={()=>this.queryData}>查询</Button>
                </div>

                <div>
                    <Button ><Link to={'app/member/addclient'}><Icon type='plus'></Icon>新增客户</Link></Button>
                    <Button style={{ marginLeft: '30px' }} onClick={()=>this.showModal}>会员统计</Button>
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
                    onOk={()=>this.hideModal}
                    onCancel={()=>this.hideModal}
                    okText="确认"
                    cancelText="取消"
                    width='25%'
                >
                    <div>
                        <p style={{ fontSize: '16px' }}>会员总数：<span>500</span></p>
                        <p style={{ fontSize: '16px' }}>本月新增：<span>30</span></p>
                        <p style={{ fontSize: '16px' }}>今日新增：<span>5</span></p>

                    </div>
                </Modal>
            </div>
        )

    }


}
export default ClientInfo