import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Row, Col, DatePicker, Radio, message } from 'antd';
import { Link } from 'react-router';
import update from 'immutability-helper';
import $ from 'jquery';
import { hashHistory } from 'react-router'
const RadioGroup = Radio.Group;
const Option = Select.Option;
class ModifyClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            type: [],
            // value: '男',
            carvalue: 'true',
            carId: '',
            typeId: '',
            havetwocar: false,
            form: {
                name: '',
                age: '',
                idNumber: '',
                gender: '',
                phone: '',
                birthday: '',
                driverLicense: '',
                recommendName: '',

            },
            cars: [],
            cards: [],

        }
    }
    componentDidMount() {
        this.getClientInfo()
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
                    let car = [];
                    var cards = obj.cards
                    // let cardItem=[];
                    // obj.cards.map((item,index)=>{
                    //         item.expirationDate=new Date(item.expirationDate),
                    //         item.payDate=new Date(item.payDate)
                    //     cardItem.push(item)
                    // })
                    obj.cars.map((item, index) => {
                        car.push({
                            id:item.id,
                            licensePlate: item.licensePlate,
                            insuranceStarttime: (item.insuranceStarttime == undefined) ? "" : (item.insuranceStarttime).substring(0, 10),
                            insuranceEndtime: (item.insuranceEndtime == undefined) ? "" : (item.insuranceEndtime).substring(0, 10),
                            insuranceAmount: item.insuranceAmount,
                            frameNumber: item.frameNumber,
                            engineNumber: item.engineNumber,
                            licenseDate: (item.licenseDate == undefined) ? "" : (item.licenseDate).substring(0, 10),
                            newCar: item.newCar,
                            lastMiles: item.lastMiles,
                            miles: item.miles,
                            type: item.type
                        })
                    })
                    this.setState({
                        cars: car,
                        // cards:cardItem
                        cards: cards
                    })

                    let clientInfo = {
                        name: obj.name,
                        age: obj.age,
                        idNumber: obj.idNumber,
                        gender: obj.gender,
                        phone: obj.phone,
                        birthday: (obj.birthday) ? (obj.birthday).substring(0, 10) : "",
                        driverLicense: obj.driverLicense,
                        recommendName: obj.recommendName,
                        points: obj.points,
                    }
                    this.setState({
                        form: clientInfo,
                    })
                }
            }
        })
    }
    //传数据
    saveData = (e) => {
        let forms = this.state.form;
        $.ajax({
            type: 'post',
            url: 'api/client/modify',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                id: this.props.params.id,
                name: forms.name,
                age: forms.age,
                idNumber: forms.idNumber,
                //radio选择
                gender: forms.gender,
                phone: forms.phone,
                //时间选择
                birthday: new Date(forms.birthday),
                driverLicense: forms.driverLicense,
                recommendName: forms.recommendName,
                cars: this.state.cars,
                cards: this.state.cards
                // cars: [{
                //     //select选择
                //     type: {
                //         id: this.state.typeId,
                //         // CarBrand:{
                //         //     // name:'lambor',
                //         //     // id:'3',

                //         // },
                //         //  type:
                //     },
                //     licensePlate: forms.licensePlate,
                //     //时间选择
                //     insuranceStarttime: forms.insuranceStarttime,
                //     //时间选择
                //     insuranceEndtime: forms.insuranceEndtime,
                //     insuranceAmount: forms.insuranceAmount,
                //     frameNumber: forms.frameNumber,
                //     engineNumber: forms.engineNumber,
                //     //时间选择
                //     licenseDate: forms.licenseDate,
                //     newCar: forms.newCar,
                //     lastMiles: forms.lastMiles,
                //     miles: forms.miles
                // }]
            }),

            success: (result) => {
                if (result.code == "0") {
                    window.history.go(-1);
                    //  hashHistory.push('/app/member/customer')
                }
            }
        })

    }
    genderonChange = (e) => {
        this.setState({
            value: e.target.value,
        });
        this.state.form.gender = e.target.value
    }
    isnewcar = (e) => {
        this.setState({
            carvalue: e.target.value,
        });
        this.state.form.newCar = e.target.value
    }
    TypehandleChange = (value) => {
        this.setState({
            typeId: value
        })
    }

    handleChange = (e) => {
        let typelist = this.state.option[e - 1].types;
        this.setState({
            carId: e,
            type: typelist
        })
    }
    // insuranceEndtimeonChange=(key,time,index)=>{
    //     ths
    //     this.state.form.insuranceStarttime=new Date(time)
    // }
    // insuranceEndtime=(time)=>{
    //     this.state.form.insuranceEndtime=new Date(time)
    // }

    licensetimeonChange = (time) => {
        this.state.form.licensetime = new Date(time);
    }
    onValueChange = (key, value) => {
        this.setState({
            form: update(this.state.form, { [key]: { $set: value } })
        })
    }
    carInfoChange = (key, value, index) => {
        if(key=='insuranceStarttime'){
            let starttime=new Date(value).getTime();
            let endtime=(this.state.cars[index].insuranceEndtime)?new Date(this.state.cars[index].insuranceEndtime):(new Date(value).getTime() + 1)
           if (starttime > endtime) {
                message.warning("截止时间必须大于开始时间")
            }else{
                this.setState({
                    cars: update(this.state.cars, { [index]: { [key]: { $set: value } } })
                })
            }
        }
         else if (key == 'insuranceEndtime') {
            let endtime = new Date(value).getTime();
            let starttime = (this.state.cars[index].insuranceStarttime) ? new Date(this.state.cars[index].insuranceStarttime) : (new Date(value).getTime() - 1)
            if (starttime > endtime) {
                message.warning("截止时间必须大于开始时间")
            } else {
                this.setState({
                    cars: update(this.state.cars, { [index]: { [key]: { $set: value } } })
                })
            }
        } else {

            this.setState({
                cars: update(this.state.cars, { [index]: { [key]: { $set: value } } })
            })
        }
    }
    birthdayonChange = (key, value) => {
        this.setState({
            form: update(this.state.form, { [key]: { $set: value } })
        })
    }
    render() {
        const brandOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        })
        const typeOptions = this.state.type.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.type}</Option>
        })
        const carsInfo = this.state.cars.map((item, index) => {
            return <Card key={index} title='车辆信息' style={{ marginTop: '20px' }}>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>车牌号：
                           <span style={{ marginLeft: '14px' }}>{item.licensePlate}</span>
                    </Col>
                    <Col span={8}>车辆品牌:
                        <span style={{ marginLeft: '35px' }}>{item.type.brand.name} </span>

                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>是否新车：
                            <div style={{ display: 'inline-block', marginLeft: '5px' }}>
                            <span>{(item.newCar) ? "是" : "否"}</span>
                        </div>
                    </Col>
                    <Col span={8}>保险开始日期:
                            <DatePicker onChange={(time) => this.carInfoChange('insuranceStarttime', time, index)} style={{ marginLeft: '10px' }} placeholder={item.insuranceStarttime}
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4} >车辆型号:
                        <span style={{ marginLeft: '10px' }}>{item.type.type}</span>
                    </Col>
                    <Col span={8} >保险截止日期:
                            <DatePicker onChange={(time) => this.carInfoChange('insuranceEndtime', time, index)} style={{ marginLeft: '10px' }} placeholder={item.insuranceEndtime}

                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>上次里程：
                            <span style={{ marginLeft: '2px' }}>{item.lastMiles}</span>
                        {/* <Input style={{ width: '150px', marginLeft: '2px' }} value={item.lastMiles} onChange={(e) => this.onValueChange('lastMiles', e.target.value)} /> */}
                    </Col>
                    <Col span={8} >保险金额：
                        <Input style={{ width: '140px', marginLeft: '25px' }} value={item.insuranceAmount} onChange={(e) => this.carInfoChange('insuranceAmount', e.target.value, index)} />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>本次里程：
                        <span style={{ marginLeft: '2px' }}>{item.miles}</span>
                        {/* <Input style={{ width: '150px', marginLeft: '14px' }} value={item.miles} onChange={(e) => this.onValueChange('miles', e.target.value)} /> */}
                    </Col>
                    <Col span={8} id="licTime">上牌时间:
                         <DatePicker onChange={(time) => this.carInfoChange('licenseDate', time, index)} style={{ marginLeft: '35px' }} placeholder={item.licenseDate}
                            getCalendarContainer={() => document.getElementById('licTime')}
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>车架号：
                         <span style={{ marginLeft: '15px' }}>{item.frameNumber}</span>
                    </Col>
                    <Col span={8} >发动机号：
                        <span style={{ marginLeft: '25px' }}>{item.engineNumber}</span>
                    </Col>
                </Row>
            </Card>

        })
        return (
            <div>
                <BreadcrumbCustom first="会员管理" second="修改客户信息" />

                <Card title='客户信息' style={{ marginTop: '15px', marginBottom: '15px' }}>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>姓名:
                            <Input style={{ width: '150px', marginLeft: '22px' }} value={this.state.form.name} onChange={(e) => this.onValueChange('name', e.target.value)} />
                        </Col>
                        <Col span={8}>年龄:
                            <Input style={{ width: '150px', marginLeft: '30px' }} value={this.state.form.age} onChange={(e) => this.onValueChange('age', e.target.value)} />
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={8} offset={4}>手机号:
                            <Input style={{ width: '150px', marginLeft: '10px' }} value={this.state.form.phone} onChange={(e) => this.onValueChange('phone', e.target.value)} />
                        </Col>
                        <Col span={8}>性别：
                            <div style={{ display: 'inline-block', marginLeft: '26px' }}>
                                <span>{this.state.form.gender}</span>
                                {/* <RadioGroup onChange={this.genderonChange} value={this.state.gender}>
                                    <Radio value={'男'}>男</Radio>
                                    <Radio value={'女'}>女</Radio>
                                </RadioGroup> */}
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '12px' }}>
                        <Col span={8} offset={4} id="birthday"><span >生日：</span>
                            <DatePicker onChange={(time) => this.birthdayonChange('birthday', time)} style={{ marginLeft: '15px' }} placeholder={this.state.form.birthday}
                                getCalendarContainer={() => document.getElementById('birthday')}
                            />

                        </Col>
                        <Col span={8}>身份证号:
                            <Input style={{ width: '150px', marginLeft: '12px' }} value={this.state.form.idNumber} onChange={(e) => this.onValueChange('idNumber', e.target.value)} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '12px' }}>
                        <Col span={8} offset={4}>行驶证号:
                            <Input style={{ width: '150px', marginLeft: '0px' }} value={this.state.form.driverLicense} onChange={(e) => this.onValueChange('driverLicense', e.target.value)} />
                        </Col>
                        <Col span={8}>推荐人:
                            <Input style={{ width: '150px', marginLeft: '25px' }} value={this.state.form.recommendName} onChange={(e) => this.onValueChange('recommendName', e.target.value)} />
                        </Col>
                    </Row>
                </Card>
                {carsInfo}
                <div style={{ marginLeft: '37%', marginTop: '20px', }}>
                    <Button type="primary" style={{ marginRight: '50px' }} size='large' onClick={this.saveData}>
                        保存
                    </Button>
                    <Button type="primary" size='large'>
                        <Link to={'app/member/customer'}>取消</Link>
                    </Button>
                </div>
            </div>
        )
    }
}
export default ModifyClient