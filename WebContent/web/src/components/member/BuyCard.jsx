import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, Popconfirm, Radio, Modal } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import CardModal from '../productManage/CardModal.jsx';
import Regclient from './Regclient.jsx'
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
import $ from 'jquery'
const RadioGroup = Radio.Group;
const Option = Select.Option;
class BuyCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            option: [],
            adminList: [],
            cardList: [],
            man: 'man',
            female: 'female',
            value: 1,
            vaild: '',
            price: '',
            orderMaker: '',
            serviceId:'',
            clientId:parseInt(this.props.params.id),
            form: {
                name: '',
                phone: '',
                birthday: '',
                gender: '',
                drivingLicense: '',
                idNumber: '',
                points: '',
            },
            cardType: {
                name: '',
                price: '',
                vaild: '',
                type: '',
            }

        }
    }

    onChange = (e) => {
        console.log("radio change", e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    componentDidMount() {
        this.getService();
        this.getStaff();
    }
    getService = () => {
        $.ajax({
            url: 'api/service/query',
            type: 'GET',
            data: {

                page: 1,
                number: 99,
            },
            success: (res) => {
                console.log(res.data)
                if (res.code == '0') {
                    this.setState({
                        cardList: res.data,
                    })
                }
            }
        })
    }
    getStaff = () => {
        $.ajax({
            url: 'api/admin/list',
            type: 'GET',
            data: {
                page: 1,
                number: 99,
            },
            success: (res) => {
                console.log(res.data)
                this.setState({
                    adminList: res.data,
                })
            }
        })
    }
    // componentDidMount() {
    //     $.ajax({
    //         url: 'api/idgen/generate',
    //         data: {
    //             type: 0
    //         },
    //         success: (result) => {
    //             this.setState({
    //                 id: result.id
    //             })
    //         }
    //     })
    //     AjaxGet('GET', 'data/LicensePlate.json', (res) => {
    //         this.setState({ option: res.data })
    //     })
    // }
    showModal = () => {
        this.setState({
            visible: true
        });
    }
    CardhandleChange = (value) => {
        console.log(value)
        console.log(`selected ${value}`)
        $.ajax({
            url: 'api/service/query',
            type: 'GET',
            data: {
                name: value,
                page: 1,
                number: 99,
            },
            success: (res) => {
                console.log(res.data[0]);
                console.log(res.data[0].validTime);
                this.setState({
                    vaild: res.data[0].validTime,
                    price: res.data[0].price,
                    serviceId:res.data[0].id,
                })
            }
        })
    }

    StaffhandleChange = (value) => {
        console.log(value)
        this.setState({
            orderMaker:parseInt(value),
        })
    }
    SaveCard = () => {
        console.log('111')
            $.ajax({
                url:'api/pay/buycard',
                type:'POST',
                contentType:"application/json;charset=utf-8",
                data:JSON.stringify({
                        clientId:this.state.clientId,
                        card:{
                            service:{
                                id:this.state.serviceId

                            },
                            orderMaker:{id:this.state.orderMaker}
                        }
                })
            })
         }

        handleOk = () => {
            this.setState({
                visible: false
            });
        }
        handleCancel = () => {
            this.setState({
                visible: false
            });
        }
        render() {
            const plateOptions = this.state.option.map((item, index) => {
                return <Option key={index} value={item.value}>{item.text}</Option>
            })

            const CardOptions = this.state.cardList.map((item, index) => {
                return <Option key={index} value={item.name}>{item.name}</Option>
            })
            const StaffOptions = this.state.adminList.map((item, index) => {
                let staffId=item.id+'';
                return <Option key={index} value={staffId}>{item.name}</Option>
            })
            return (
                <div>
                    <BreadcrumbCustom first="会员管理" second="会员办理" />
                    <Card title='客户信息'  style={{display:'none'}}>
                        <Row gutter={16} style={{ marginBottom: '15px' }}>
                            <Col span={8} offset={4}>客户姓名：
                            <Select showSearch
                                    style={{ width: '140px', marginRight: '8px' }}

                                    optionFilterProp="children"
                                    onChange={this.handleChange}
                                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                >

                                </Select>
                            </Col>
                            <Col span={8}>性别：
                            <div style={{ display: 'inline-block', marginLeft: '26px' }}>
                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                        <Radio value={this.state.man}>男</Radio>
                                        <Radio value={this.state.female}>女</Radio>
                                    </RadioGroup>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginBottom: '15px' }}>
                            <Col span={8} offset={4}>手机号:
                            <Input style={{ width: '140px', marginLeft: '21px' }} />
                            </Col>
                            <Col span={8} >车牌号：
                            <Input style={{ width: '150px', marginLeft: '14px' }} />
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginBottom: '15px' }}>
                            <Col span={8} offset={4}>车辆品牌:
                            <Select showSearch
                                    style={{ width: '140px', marginLeft: '10px' }}
                                    placeholder="输入车牌号码"
                                    optionFilterProp="children"
                                    onChange={this.handleChange}
                                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                >
                                    {plateOptions}
                                </Select>
                            </Col>
                            <Col span={8} >推荐人：
                            <Input style={{ width: '150px', marginLeft: '14px' }} />
                            </Col>
                        </Row>
                    </Card>

                    <Regclient clientId={this.state.clientId}></Regclient>

                    <Card title="会员信息" style={{ marginTop: '15px' }}  >
                        <Row gutter={16} style={{ marginBottom: '15px' }}>
                            <Col span={8} offset={4}>
                                会员卡类：
                        <Select
                                    style={{ width: '140px', marginLeft: '13px' }}

                                    optionFilterProp="children"
                                    onChange={this.CardhandleChange}
                                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                >
                                    {CardOptions}
                                </Select>
                                <Icon type="plus-circle-o" onClick={this.showModal} style={{ marginLeft: '10px', color: '#108ee9', cursor: 'pointer' }} />
                            </Col>
                            <Col span={8} >卡类价格：
                            <Input style={{ width: '140px', marginLeft: '14px', color: 'red' }} value={this.state.price == '' ? '' : this.state.price + '元'} disabled />
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginBottom: '15px' }}>
                            <Col span={8} offset={4}>有效期：
                            <Input style={{ width: '140px', marginLeft: '25px', color: 'red' }} value={this.state.vaild == '' ? '' : this.state.vaild + '年'} disabled />
                            </Col>
                            <Col span={8} >会员卡号：
                            <Input style={{ width: '140px', marginLeft: '14px' }} />
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginBottom: '15px' }}>
                            <Col span={8} offset={4} >
                                <div style={{ display: 'inline-block', width: '80%' }}>支付方式:
                                 <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                        <Select defaultValue="现金" style={{ width: 140, marginLeft: 15 }} onChange={this.handleChange} >
                                            <Option value="cash">现金</Option>
                                            <Option value="wechatpay">微信</Option>
                                            <Option value="alipay">支付宝</Option>
                                            <Option value="suningpay">易付宝</Option>
                                        </Select>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} >
                                <div style={{ display: 'inline-block', width: '80%' }}>办理人员:
                                 <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                        <Select showSearch
                                            style={{ width: '140px', marginLeft: '10px' }}
                                            placeholder="选择办卡人员"
                                            optionFilterProp="children"
                                            onChange={this.StaffhandleChange}
                                            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                        >
                                            {StaffOptions}
                                        </Select>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <CardModal visible={this.state.visible} onOk={() => this.handleOk}
                        onCancel={() => this.handleCancel}>
                    </CardModal>
                    <Button type="primary" style={{ display: 'block', margin: '10px auto', width: '100px', height: '50px' }} size={'large'} onClick={this.SaveCard}>办理</Button>
                </div>
            )
        }
    }
    export default BuyCard