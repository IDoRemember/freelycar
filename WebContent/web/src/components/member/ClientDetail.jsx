import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, Popconfirm, DatePicker } from 'antd';
import { Link } from 'react-router';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import CarTable from '../tables/CarTable.jsx';
import $ from 'jquery';
const { MonthPicker, RangePicker } = DatePicker;
const payData = [
    {
        key: 1,
        indexNum: 1,
        maintainItem: "洗车",
        payMoney: "20",
        payType: "支付宝",
        carType: "911",
        servicePeople: "小易,小爱",
        serviceTime: "2017-5-23",
        insuranceMoney: "3000",
        serviceState: "已完成",
    }
]

class ClientDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
            value: this.props.value,
            editable: false,
            cardColumns: [{
                title: '卡号',
                dataIndex: 'cardNum',
                key: 'cardNum'
            },  {
                title: '卡名称',
                dataIndex: 'cardname',
                key: 'cardname'
            },{
                title: '会员卡类',
                dataIndex: 'cardClasses',
                key: 'cardClasses'
            }, {
                title: '开卡时间',
                dataIndex: 'transactionTime',
                key: 'transactionTime'
            }, {
                title: '制单人',
                dataIndex: 'makePeople',
                key: 'makePeople'
            }],

            carColumns: [{
                title: '车牌号码',
                dataIndex: 'carNum',
                key: 'carNum'
            }, {
                title: '品牌',
                dataIndex: 'brand',
                key: 'brand'
            }, {
                title: '车辆型号',
                dataIndex: 'carType',
                key: 'carType'
            }, {
                title: '里程数',
                dataIndex: 'mileageNum',
                key: 'mileageNum'
            }, {
                title: '发动机号',
                dataIndex: 'engineNumber',
                key: 'engineNumber'
            }, {
                title: '是否新车',
                dataIndex: 'newcar',
                key: 'newcar'
            }, {
                title: '保险金额',
                dataIndex: 'insuranceMoney',
                key: 'insuranceMoney'
            }, {
                title: '保险有效期',
                dataIndex: 'insuranceTime',
                key: 'insuranceTime'
            },
            // { title: '备注', dataIndex: 'other', key: 'other' },
            {
                title: '操作', dataIndex: 'operation', key: 'operation', render: (text, record, index) => {
                    return <span>
                        <span style={{ marginRight: '10px' }}>
                            <Link to="" >
                                <span >开卡</span>
                            </Link>
                            <Link to="">
                                <span style={{ marginLeft: '5px' }}> 修改</span>
                            </Link>
                            <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(record.id)}>
                                <a href="javascript:void(0);" style={{ marginLeft: '5px' }}>删除</a>
                            </Popconfirm>
                        </span>

                    </span>
                }
            }],

            payColumns: [{
                title: '序号',
                dataIndex: 'indexNum',
                key: 'indexNum'
            }, {
                title: '保养项目',
                dataIndex: 'maintainItem',
                key: 'maintainItem'
            }, {
                title: '消费金额',
                dataIndex: 'payMoney',
                key: 'payMoney'
            }, {
                title: '支付方式',
                dataIndex: 'payType',
                key: 'payType'
            }, {
                title: '服务人员',
                dataIndex: 'servicePeople',
                key: 'servicePeople'
            }, {
                title: '服务时间',
                dataIndex: 'serviceTime',
                key: 'serviceTime'
            }, {
                title: '状态',
                dataIndex: 'serviceState',
                key: 'serviceState'
            }],

            form: {
                name: '',
                phone: '',
                birthday: '',
                gender: '',
                drivingLicense: '',
                idNumber: '',
                points: '',
            },
            cardData: [],
            carData: [],
            payData: []
        }
    }
    componentDidMount() {

        this.getClientInfo()

    }
    getClientInfo = () => {
        $.ajax({
            url: 'api/client/detail',
            dataType: 'json',
            type: 'GET',
            data: {
                clientId: this.props.params.id,
            },

            success: (res) => {
                if (res.code == '0') {
                    var obj = res.client;
                    var objcar = obj.cars;
                    var objcard = obj.cards;
                    var objpay = res.data;
                    console.log(objpay)
                    let carlist = [];
                    let cardlist = [];
                    let paylist = [];
                    //获取车辆信息
                    for (let i = 0; i < objcar.length; i++) {
                        let carItem = {
                            key: objcar[i].id,
                            carNum: objcar[i].licensePlate,
                            brand: objcar[i].type.brand.name,
                            carType: objcar[i].type.type,
                            mileageNum: objcar[i].lastMiles,
                            newcar: (objcar[i].newCar) ? "是" : "否",
                            engineNumber: objcar[i].engineNumber,
                            insuranceMoney: objcar[i].insuranceAmount,
                            insuranceTime: objcar[i].insuranceEndtime,
                            other: "",
                        }
                        carlist.push(carItem);
                        if (carlist.length == objcar.length) {
                            this.setState({
                                carData: carlist,
                            })
                        }
                    }
                    //获取卡信息

                    for (let j = 0; j < objcard.length; j++) {
                        let cardItem = {
                            key: objcard[j].id,
                            cardNum: objcard[j].id,
                            cardClasses: objcard[j].service.type ? "次卡" : "组合次卡",
                            transactionTime: objcard[j].payDate,
                            cardname:objcard[j].service.name,
                            makePeople: objcard[j].orderMaker.name,
                        }
                        cardlist.push(cardItem);
                        if (cardlist.length == objcard.length) {
                            this.setState({
                                cardData: cardlist,
                            })
                        }
                    }
                    let clientInfo = {
                        name: obj.name,
                        phone: obj.phone,
                        birthday: obj.birthday,
                        gender: obj.gender,
                        driverLicense: obj.driverLicense,
                        idNumber: obj.idNumber,
                        points: obj.points,

                    }

                    this.setState({
                        form: clientInfo,

                    })

                   // 获取消费记录
                    for (let k = 0; k < objpay.length; k++) {
                        let payItem = {
                            key: objpay[k].id,
                            indexNum: objpay[k].id,
                            maintainItem: (objpay[k].type == 0) ? '买卡' : '消费',
                            payMoney: objpay[k].amount,
                            payType: "支付宝",
                            carType: "911",
                            servicePeople: "小易,小爱",
                            serviceTime: "2017-5-23",
                            insuranceMoney: "3000",
                            serviceState: "已完成",
                        }
                         paylist.push(payItem);
                        if (paylist.length == objpay.length) {
                            this.setState({
                                payData: paylist,
                            })
                        }
                    }
                }
            }
        })
    }
    onDelete = (carId) => {
        console.log(carId);
        $.ajax({
            type: 'post',
            url: 'api/client/delete',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                clientIds: 23,
                carId: carId,
            },
            traditional: true,
            success: (result) => {
                if (result.code == "0") {
                    let dataSource = [...this.state.dataSource];
                    console.log(result)
                    //过滤id   
                    dataSource = dataSource.filter((carId) => {
                        return id !== carId;
                    });
                    console.log(dataSource)
                    this.setState({
                        dataSource: dataSource,
                        pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                    });

                }

            }
        })
    }
    onChange = (e) => {
        console.log("radio change", e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    onHandleChange = (e, key) => {
        console.log(key)
        let form = this.state.form
        form[key] = e.target.value
        this.setState({
            form: form
        })
    }
    onChange = (date, dateString) => {
        console.log(date, dateString);
    }
    onOk = (value) => {
        console.log('onOk: ', value);
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div>
                <BreadcrumbCustom first='会员管理' second='客户信息' third='详细信息' />
                <Card title="客户资料" bordered={false} style={{ marginBottom: '15px' }}>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={3}></Col>
                        <Col span={6}>姓名：<span style={{ width: '200px' }} >{this.state.form.name}</span></Col>
                        <Col span={6}>手机号：<span style={{ width: '200px' }} >{this.state.form.phone} </span></Col>
                        <Col span={6}>生日：<span>{this.state.form.birthday}</span></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={3}></Col>
                        <Col span={6}>性别：<span style={{ width: '200px' }} >{this.state.form.gender}</span></Col>
                        <Col span={6}>身份证号：<span style={{ width: '200px' }}>{this.state.form.idNumber}</span></Col>
                        <Col span={6}>行驶证号：<span style={{ width: '200px' }} >{this.state.form.driverLicense}</span></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={3}></Col>
                        <Col span={6}>积分：<span>{this.state.form.points}</span></Col>
                    </Row>
                </Card>
                <Card title="会员卡信息" className="accountTable" style={{ marginBottom: '15px' }}>
                    <Button style={{ marginBottom: '20px' }}><Icon type='idcard'></Icon>开卡</Button>

                    <Table columns={this.state.cardColumns} dataSource={this.state.cardData} bordered></Table>
                </Card>
                <Card title="车辆信息" className="accountTable" style={{ marginBottom: '15px' }}>
                    <Table columns={this.state.carColumns} dataSource={this.state.carData}></Table>
                </Card>
                <Card title="消费记录" className="accountTable" >
                    <Table columns={this.state.payColumns} dataSource={this.state.payData} bordered></Table>
                    <p style={{ float: 'right', marginRight: '30px' }}><Link to={'app/member/customer/1/payhistory'}> 更多</Link></p>
                </Card>
            </div>
        )
    }
}
export default ClientDetail