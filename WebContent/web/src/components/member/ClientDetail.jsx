import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, Popconfirm, DatePicker, Modal, Radio, message } from 'antd';
import { Link } from 'react-router';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import CarTable from '../tables/CarTable.jsx';
import $ from 'jquery';
import update from 'immutability-helper';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
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
            type: [],
            client:this.props.params.id,
            value: this.props.value,
            editable: false,
            visible: false,
            pagination: {
            },
            cardColumns: [{
                title: '卡号',
                dataIndex: 'cardNum',
                key: 'cardNum'
            }, {
                title: '卡名称',
                dataIndex: 'cardname',
                key: 'cardname'
            }, {
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


                            <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(record.id)}>
                                <a href="javascript:void(0);" style={{ marginLeft: '5px' }}>删除</a>
                            </Popconfirm>
                        </span>

                    </span>
                }
            }],

            payColumns: [{
                title: '序号', dataIndex: 'index', key: 'index', render: (text, record, index) => {
                    return <span>{index + 1}</span>
                }
            }, {
                title: '项目',
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
                licensePlate: '',
                insuranceStarttime: '',
                insuranceEndtime: '',
                insuranceAmount: '',
                frameNumber: '',
                engineNumber: '',
                licenseDate: '',
                newCar: '',
                lastMiles: '',
                miles: '',
            },
            cardData: [],
            carData: [],
            payData: []
        }
    }
    componentDidMount() {
        this.getBrandList();
        this.getClientInfo();
        this.queryConsumOrder();
    }
    getBrandList = () => {
        $.ajax({
            type: 'GET',
            url: '/api/car/listbrand',
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
    queryConsumOrder = () => {
        $.ajax({
            url: 'api/order/query',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                consumOrder: {
                    id: -1,
                    programId: -1,
                    payState: -1,
                    clientId: this.props.params.id
                },
                dateType: 0,
                startDate: '',
                endDate: '',
                page: 1,
                number: 3,

            }),
            success: (res) => {
                console.log(res)
            }
        })
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
                    console.log(res)
                    var obj = res.client;
                    var objcar = obj.cars;
                    var objcard = obj.cards;
                    var objpay = res.data;
                    // console.log(objpay)
                    let carlist = [];
                    let cardlist = [];
                    let paylist = [];
                    //获取车辆信息
                    for (let i = 0; i < objcar.length; i++) {
                        let carItem = {
                            key: objcar[i].id,
                            id: objcar[i].id,
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
                            cardname: objcard[j].service.name,
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
                   

                    //获取消费记录
                    for (let k = 0; k < 3; k++) {
                         let payMethod= objpay[k].payMethod;
                         let paymeth;
                         switch(payMethod){
                             case 0:  paymeth="现金";
                             break;
                             case 1:  paymeth="微信";
                             break;
                             case 2:  paymeth="支付宝";
                             break;
                             case 3:  paymeth="易付宝";
                             break;
                         }
                       
                         
                        let payItem = {

                            key: objpay[k].id,
                            id: objpay[k].id,
                            maintainItem: objpay[k].programName,
                            payMoney: objpay[k].amount,
                              payType:paymeth,
                           // carType: "911",
                            servicePeople:objpay[k].staffNames,
                            serviceTime: objpay[k].payDate,
                            insuranceMoney: objpay[k].amount,
                            serviceState: "完成",
                        }
                        paylist.push(payItem);   
                    }
                         this.setState({
                                payData: paylist,
                            })
                }

            }
        })
    }
    onDelete = (idnum) => {
        console.log(idnum);
        $.ajax({
            type: 'post',
            url: 'api/client/delcar',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                clientId: this.props.params.id,
                carId: idnum,

            },
            traditional: true,
            success: (result) => {
                this.getClientInfo()
                // if (result.code == "0") {
                //    //  this.getBrandList();
                //     let dataSource = [...this.state.carData];
                //     //？看看返回值有没有对应的dataSource有没有被删去
                //     console.log(result)
                //     //过滤id    
                //     console.log(dataSource)
                //     dataSource = dataSource.filter((obj) => {
                //         return idnum!== obj.idnum;
                //     });
                //     console.log(dataSource)
                //     //为什么这边要加一个判断呢

                //     this.setState({
                //         carData: dataSource,
                //         pagination: update(this.state.pagination, { ['total']: { $set: result.realSize } })
                //     });
                //  }
                message.success('删除成功', 1.5);

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
        let typelist = this.state.option[e - 1].types;
        console.log(this.state.option[e - 1].types)
        this.setState({
            carId: e,
            type: typelist
        })
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
    onChange = (date, dateString) => {
        console.log(date, dateString);
    }
    handleOk = () => {
        this.saveData();
        this.getClientInfo();
        this.setState({
            visible: false
        });
    }
    saveData = () => {
        let forms = this.state.form;
        $.ajax({
            type: 'post',
            url: '/api/client/addcar',
            datatype: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                //select选择
                type: {
                    id: this.state.carId,
                    // CarBrand:{
                    //     // name:'lambor',
                    //     // id:'3',

                    // },
                    type: this.state.typeId,
                },
                licensePlate: forms.licensePlate,
                //时间选择
                insuranceStarttime: forms.insuranceStarttime,
                //时间选择
                insuranceEndtime: forms.insuranceEndtime,
                insuranceAmount: forms.insuranceAmount,
                frameNumber: forms.frameNumber,
                engineNumber: forms.engineNumber,
                //时间选择
                licenseDate: forms.licenseDate,
                newCar: forms.newCar,
                lastMiles: forms.lastMiles,
                miles: forms.miles,
                client: {
                    id: this.props.params.id
                }
            }),
            success: (res) => {
                this.getClientInfo();
            }
        })
    }

    insuranceStarttimeonChange = (time) => {
        console.log(time);
        this.state.form.insuranceStarttime = new Date(time);
    }
    insuranceEndtimeonChange = (time) => {
        console.log(time);
        this.state.form.insuranceEndtime = new Date(time);
    }
    licensetimeonChange = (time) => {
        console.log(time);
        this.state.form.licensetime = new Date(time);
    }
    onValueChange = (key, value) => {
        this.setState({
            form: update(this.state.form, { [key]: { $set: value } })
        })
    }
    isnewcar = (e) => {
        console.log(e.target.value);
        this.setState({
            carvalue: e.target.value,
        });
        this.state.form.newCar = e.target.value
    }
    TypehandleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            typeId: value
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    onOk = (value) => {
        console.log('onOk: ', value);
    }
    render() {
        const { value, editable } = this.state;
        const RadioGroup = Radio.Group;
        const brandOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        })
        const typeOptions = this.state.type.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.type}</Option>
        })
        return (
            <div >
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
                    <Button style={{ marginBottom: '20px' }}><Link to={'/app/member/memberShip/' + this.props.params.id}><Icon type='idcard'></Icon><span>开卡</span></Link></Button>

                    <Table columns={this.state.cardColumns} dataSource={this.state.cardData} bordered></Table>
                </Card>
                <Card title="车辆信息" className="accountTable" style={{ marginBottom: '15px' }}>
                    <Button style={{ marginBottom: '20px' }} onClick={()=>this.showModal}><Icon type='car'></Icon>新增车辆</Button>
                    <Table columns={this.state.carColumns} dataSource={this.state.carData}></Table>
                </Card>
                <Card title="消费记录" className="accountTable" >
                    <Table columns={this.state.payColumns} dataSource={this.state.payData} bordered></Table>
                    <p style={{ float: 'right', marginRight: '30px' }}><Link to={'app/member/customer/'+this.props.params.id+'/payhistory/'}> 更多</Link></p>
                </Card>
                <Modal title="新增车辆" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    okText="保存" cancelText="取消">

                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >车牌号：
                            <Input style={{ width: '150px', marginLeft: '10px' }} value={this.state.form.licensePlate} onChange={(e) => this.onValueChange('licensePlate', e.target.value)} />
                        </Col>
                        <Col span={12} id="car-brand">车辆品牌:
                            <Select showSearch
                                style={{ width: '140px', marginLeft: '35px' }}
                                placeholder="请选择车辆品牌"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                getPopupContainer={() => document.getElementById('car-brand')}
                            >
                                {brandOptions}
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >是否新车：
                            <div style={{ display: 'inline-block', marginLeft: '5px' }}>
                                <RadioGroup onChange={this.isnewcar} value={this.state.carvalue}>
                                    <Radio value={'true'}>是</Radio>
                                    <Radio value={'false'}>否</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                        <Col span={12} id="car-type">车辆型号:
                            <Select showSearch
                                style={{ width: '150px', marginLeft: '35px' }}
                                placeholder="请选择车辆型号"
                                optionFilterProp="children"
                                onChange={this.TypehandleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                 getPopupContainer={() => document.getElementById('car-type')}
                            >
                                {typeOptions}
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >保险金额：
                        <Input style={{ width: '150px', marginLeft: '2px' }} value={this.state.form.insuranceAmount} onChange={(e) => this.onValueChange('insuranceAmount', e.target.value)} />
                        </Col>

                        <Col span={12}>保险截止日期:
                            <DatePicker onChange={this.insuranceEndtimeonChange} style={{ marginLeft: '10px', width: '150px' }} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >上次里程：
                            <Input style={{ width: '150px', marginLeft: '2px' }} value={this.state.form.lastMiles} onChange={(e) => this.onValueChange('lastMiles', e.target.value)} />
                        </Col>
                        <Col span={12}>保险开始日期:
                            <DatePicker onChange={this.insuranceStarttimeonChange} style={{ marginLeft: '10px', width: '150px' }} />
                        </Col>


                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >里程数：
                            <Input style={{ width: '150px', marginLeft: '14px' }} value={this.state.form.miles} onChange={(e) => this.onValueChange('miles', e.target.value)} />
                        </Col>
                        <Col span={12}>上牌时间:
                            <DatePicker onChange={this.licensetimeonChange} style={{ marginLeft: '35px', width: '150px' }} />

                        </Col>

                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >车架号：
                        <Input style={{ width: '150px', marginLeft: '15px' }} value={this.state.form.frameNumber} onChange={(e) => this.onValueChange('frameNumber', e.target.value)} />
                        </Col>
                        <Col span={12} >发动机号：
                        <Input style={{ width: '150px', marginLeft: '25px' }} value={this.state.form.engineNumber} onChange={(e) => this.onValueChange('engineNumber', e.target.value)} />
                        </Col>
                    </Row>



                </Modal>
            </div >
        )
    }
}
export default ClientDetail