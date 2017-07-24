import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Row, Col, DatePicker, Radio, message } from 'antd';
import { Link } from 'react-router';
import update from 'immutability-helper';
import $ from 'jquery';
import { hashHistory } from 'react-router'
const RadioGroup = Radio.Group;
const Option = Select.Option;
class AddClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            type: [],
            value: '男',
            carvalue: 'true',
            carId: '',
            typeId: '',
            form: {
                name: '',
                age: '',
                idNumber: '',
                gender: '',
                phone: '',
                birthday: '',
                driverLicense: '',
                recommendName: '',
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

        }
    }
    componentDidMount() {
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
                console.log(this.state.option)
            }
        })
    }
    //传数据
    saveData = (e) => {
        //console.log()
        let forms = this.state.form;
        console.log(forms.name);
        console.log(forms.phone);
        console.log(forms.licensePlate);
        console.log(this.state.typeId);
        if (!(forms.name && forms.phone && forms.licensePlate && this.state.typeId)) {
            message.error("请输入必填信息")
        } else {
            $.ajax({
                type: 'post',
                url: '/api/client/add',
                datatype: 'json',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify({

                    name: forms.name,
                    age: forms.age,
                    idNumber: forms.idNumber,
                    //radio选择
                    gender: this.state.value,
                    phone: forms.phone,
                    //时间选择
                    birthday: forms.birthday,
                    driverLicense: forms.driverLicense,
                    recommendName: forms.recommendName,
                    cars: [{
                        //select选择
                        type: {
                            id: this.state.typeId,
                            // CarBrand:{
                            //     // name:'lambor',
                            //     // id:'3',

                            // },
                            //  type:
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
                        miles: forms.miles
                    }]
                }),
                success: (result) => {
                    if (result.code == "0") {
                        window.history.go(-1);
                        //  hashHistory.push('/app/member/customer')
                    }
                }
            })
    }

}
genderonChange = (e) => {
    console.log(e.target.value);
    this.setState({
        value: e.target.value,
    });
    this.state.form.gender = e.target.value
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

handleChange = (e) => {
    let typelist = this.state.option[e - 1].types;
    console.log(this.state.option[e - 1].types)
    this.setState({
        carId: e,
        type: typelist
    })
    // $.ajax({
    //     url:'/api/'
    // })

}
//时间选择函数
birthdayonChange = (time) => {
    console.log(time);
    this.state.form.birthday = new Date(time);
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
    this.state.form.licenseDate = new Date(time);
}
onValueChange = (key, value) => {
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
    return (
        <div>
            <BreadcrumbCustom first="会员管理" second="新增客户" />

            <Card title='客户信息' style={{ marginTop: '15px', marginBottom: '15px' }}>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}><span style={{ color: "red" }}>*</span>姓名:
                            <Input style={{ width: '150px', marginLeft: '22px' }} value={this.state.form.name} onChange={(e) => this.onValueChange('name', e.target.value)} />
                    </Col>
                    <Col span={8}>年龄:
                            <Input style={{ width: '150px', marginLeft: '30px' }} value={this.state.form.age} onChange={(e) => this.onValueChange('age', e.target.value)} />
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}><span style={{ color: "red" }}>*</span>手机号:
                            <Input style={{ width: '150px', marginLeft: '10px' }} value={this.state.form.phone} onChange={(e) => this.onValueChange('phone', e.target.value)} />
                    </Col>
                    <Col span={8}>性别：
                            <div style={{ display: 'inline-block', marginLeft: '26px' }}>
                            <RadioGroup onChange={this.genderonChange} value={this.state.value}>
                                <Radio value={'男'}>男</Radio>
                                <Radio value={'女'}>女</Radio>
                            </RadioGroup>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '12px' }}>
                    <Col span={8} offset={4} id="birthday"><span style={{ marginRight: '15px' }}>生日：</span>
                        <DatePicker onChange={this.birthdayonChange}
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
            <Card title='车辆信息' style={{ marginTop: '20px' }}>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}><span style={{ color: "red" }}>*</span>车牌号：
                            <Input style={{ width: '150px', marginLeft: '14px' }} value={this.state.form.licensePlate} onChange={(e) => this.onValueChange('licensePlate', e.target.value)} />
                    </Col>
                    <Col span={8} id="car-brand"><span style={{ color: "red" }}>*</span>车辆品牌:
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
                    <Col span={8} offset={4}>是否新车：
                            <div style={{ display: 'inline-block', marginLeft: '5px' }}>
                            <RadioGroup onChange={this.isnewcar} value={this.state.carvalue}>
                                <Radio value={'true'}>是</Radio>
                                <Radio value={'false'}>否</Radio>
                            </RadioGroup>
                        </div>
                    </Col>
                    <Col span={8} id='startTime'>保险开始日期:
                            <DatePicker onChange={this.insuranceStarttimeonChange} style={{ marginLeft: '10px' }}
                            getCalendarContainer={() => document.getElementById('startTime')}
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4} id="provider-area"><span style={{ color: "red" }}>*</span>车辆型号:
                            <Select showSearch
                            style={{ width: '150px', marginLeft: '10px' }}
                            placeholder="请选择车辆型号"
                            optionFilterProp="children"
                            onChange={this.TypehandleChange}
                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            getPopupContainer={() => document.getElementById('provider-area')}
                        >
                            {typeOptions}
                        </Select>
                    </Col>

                    <Col span={8} id='endTime'>保险截止日期:
                            <DatePicker onChange={this.insuranceEndtimeonChange} style={{ marginLeft: '10px' }}
                            getCalendarContainer={() => document.getElementById('endTime')}
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>上次里程：
                            <Input style={{ width: '150px', marginLeft: '2px' }} value={this.state.form.lastMiles} onChange={(e) => this.onValueChange('lastMiles', e.target.value)} />
                    </Col>
                    <Col span={8} >保险金额：
                        <Input style={{ width: '140px', marginLeft: '25px' }} value={this.state.form.insuranceAmount} onChange={(e) => this.onValueChange('insuranceAmount', e.target.value)} />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>里程数：
                            <Input style={{ width: '150px', marginLeft: '14px' }} value={this.state.form.miles} onChange={(e) => this.onValueChange('miles', e.target.value)} />
                    </Col>
                    <Col span={8} id="licTime">上牌时间:
                            <DatePicker onChange={this.licensetimeonChange} style={{ marginLeft: '35px' }}
                            getCalendarContainer={() => document.getElementById('licTime')}
                        />

                    </Col>

                </Row>
                <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={8} offset={4}>车架号：
                        <Input style={{ width: '150px', marginLeft: '15px' }} value={this.state.form.frameNumber} onChange={(e) => this.onValueChange('frameNumber', e.target.value)} />
                    </Col>
                    <Col span={8} >发动机号：
                        <Input style={{ width: '140px', marginLeft: '25px' }} value={this.state.form.engineNumber} onChange={(e) => this.onValueChange('engineNumber', e.target.value)} />
                    </Col>
                </Row>


            </Card>
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
export default AddClient