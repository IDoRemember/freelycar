import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import { hashHistory } from 'react-router'
import { Row, Col, Card, Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router';
import update from 'immutability-helper'
import $ from 'jquery'
let a = []
class BeautyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPop: false,
            parts: [],
            staffList: [],
            optionService: [],
            dataInventory: [{
                key: -1,
                index: -1,
                name: '',
                brandName: '',
                price: '',
                number: '0',
                amount: '0',
                singleSummation: '0',
                standard: '',
            }, {
                key: '',
                index: '',
                total: '合计',
                singleSummation: '0',
                DeductionCardTime: '1'
            }],
            optionInventory: [],
            errorInfo: '',
            consumOrder: {
                carId: '',
                licensePlate: '',
                carType: '',
                carBrand: '',
                clientId: '',
                clientName: '',
                gender: '',
                phone: '',
                projects: [],
                programId: 1,
                payMethod: 0,
                programName: '美容',
                parkingLocation: '',
                inventoryInfos: [],
                state: 1,
                totalPrice: '',
                payState: 0,
                pickTime: '',
                // finishTime: '',
                // deliverTime: '',
                lastMiles: '',
                miles: '',
                // orderMaker: '',
                comment: '',
                faultDesc: '',
                repairAdvice: ''
            }
        }
    }


    getStaffList = () => {
        $.ajax({
            url: 'api/staff/list',
            type: 'get',
            dataType: 'json',
            data: {
                page: 1,
                number: 99
            },
            success: (res) => {
                if (res.code == '0') {
                    this.setState({ staffList: res.data })
                }
            }
        })
    }

    componentDidMount() {
        this.queryAdmin()
        this.getStaffList()
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
        $.ajax({
            url: 'api/project/name',
            type: 'get',
            dataType: 'json',
            success: (res) => {
                if (res.code == '0') {
                    this.setState({
                        optionService: res.data
                    });
                }
            }
        });

        $.ajax({
            url: 'api/inventory/name',
            type: 'get',
            dataType: 'json',
            success: (res) => {
                if (res.code == '0') {
                    this.setState({
                        optionInventory: res.data
                    });
                }
            }
        });
    }

    routerWillLeave = (nextLocation) => {
        if (this.state.isPop) {
            return '确认要离开？';
        } else {
            return;
        }
    }

    queryAdmin = () => {
        $.ajax({
            url: 'api/admin/getaccount',
            type: "GET",
            data: {
                account: localStorage.getItem('username'),

            },
            success: (res) => {
                this.saveInfo({
                    orderMaker: { id: res.data.role.id }
                })
            }
        })
    }

    saveInfo = (params) => {
        this.setState({
            consumOrder: update(this.state.consumOrder, { $merge: params }),
        }, () => {
            if (this.state.consumOrder.licensePlate !== '' || this.state.consumOrder.projects.length > 0) {
                this.setState({
                    isPop: true
                })
            }
        })
    }

    pushInventory = (value, projectId) => {
        let inventoryInfos = this.state.consumOrder.inventoryInfos,
            newConsumOrder,
            sameProject = []
        if (this.state.consumOrder.projects.length < 1) {
            a.push(...value)
            this.setState({
                consumOrder: update(this.state.consumOrder, { inventoryInfos: { $set: a } })
            })
        } else {
            a = []
            inventoryInfos = inventoryInfos.filter((obj) => {
                return projectId != obj.projectId;
            });
            newConsumOrder = update(this.state.consumOrder, { inventoryInfos: { $set: inventoryInfos } })
            newConsumOrder = update(newConsumOrder, { inventoryInfos: { $push: [...value] } })
            this.setState({
                consumOrder: newConsumOrder
            })
        }
    }

    combineParts = () => {
        let dataInventory = []
        for (let item of this.state.dataService) {
            dataInventory.push(item.inventoryInfos)
        }
        this.setState({
            dataInventory: dataInventory
        })
    }

    getPartsDetail = (Parts) => {
        this.setState({
            parts: Parts
        })
    }

    getCards = (cards) => {
        this.setState({
            cards: cards
        })
    }
    cancel = () => {
        message.error('请继续更改');
    }

    confirm = (isFinish) => {
        let partsPrice = 0, projectPrice = 0, price = 0
        for (let item of this.state.consumOrder.projects) {
            projectPrice = projectPrice + item.price + item.pricePerUnit * item.referWorkTime
        }
        for (let item of this.state.consumOrder.inventoryInfos) {
            partsPrice = partsPrice + item.inventory.price * item.number
        }
        price = partsPrice + projectPrice
        if (this.state.consumOrder.carId == '') {
            this.setState({
                errorInfo: '* 请输入车牌号'
            })
        } else if (Number(this.state.consumOrder.miles) < Number(this.state.consumOrder.lastMiles)) {
            this.setState({
                errorInfo: '* 本次里程不能小于上次里程'
            })
        } else if (this.state.consumOrder.pickTime == '') {
            this.setState({
                errorInfo: '* 请输入接车时间'
            })
        } else if (!this.state.consumOrder.pickCarStaff) {
            this.setState({
                errorInfo: '* 请输入接车人'
            })
        } else if (this.state.consumOrder.projects.length < 1) {
            this.setState({
                errorInfo: '* 请选择项目'
            })
        } else {
            this.setState({
                errorInfo: ''
            })
        }
        this.setState({
            consumOrder: update(this.state.consumOrder, { totalPrice: { $set: price } })
        }, () => {
            if (this.state.errorInfo == '') {
                $.ajax({
                    type: 'post',
                    url: 'api/order/book',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    // traditional: true,
                    data: JSON.stringify(this.state.consumOrder),
                    success: (res) => {
                        if (res.code != '0') {
                            message.error(res.msg)

                        }
                        if (res.code == '0') {
                            message.success(res.text);
                            this.setState({
                                isPop: false
                            }, () => {
                                if (isFinish) {
                                    hashHistory.push(`/app/consumption/costclose/${res.id}`)
                                } else {
                                    hashHistory.push(`/app/consumption/ordermanage`)
                                }
                            })
                        }
                    }
                })
            }
        })
    }

    render() {
        const parts = this.state.parts.map((item, index) => {
            if (this.state.parts.length > (index + 1)) {
                return <PartsDetail key={index} pushInventory={this.pushInventory} saveInfo={this.saveInfo} key={index} id={item.projectId} parts={item.inventoryInfos} title={item.name} optionInventory={this.state.optionInventory} programId={1} />
            }
        })
        let partsPrice = 0, projectPrice = 0, price = 0, disabled = true, builders = 0
        for (let item of this.state.consumOrder.projects) {
            projectPrice = projectPrice + item.price + item.pricePerUnit * item.referWorkTime
        }
        for (let item of this.state.consumOrder.inventoryInfos) {
            partsPrice = partsPrice + item.inventory.price * item.number
        }
        price = partsPrice + projectPrice

        if (this.state.consumOrder.carId !== '' && this.state.consumOrder.projects.length > 0 && this.state.consumOrder.pickTime !== '' && this.state.consumOrder.pickCarStaff) {
            this.state.consumOrder.projects.forEach((item, index) => {
                if (item.staffs && item.staffs.length > 0) {
                    builders++
                }
            })
            if (builders == this.state.consumOrder.projects.length) {
                disabled = false
            }
        }

        return <div>
            <BreadcrumbCustom first="消费开单" second="美容开单" />
            <CustomerInfo getCards={this.getCards} MemberButton={true} type={1} staffList={this.state.staffList} saveInfo={this.saveInfo} />
            <ServiceTable clientId={this.state.consumOrder.clientId} pushInventory={this.pushInventory} cards={this.state.cards} getPartsDetail={(parts) => this.getPartsDetail(parts)} staffList={this.state.staffList} saveInfo={this.saveInfo} optionService={this.state.optionService} programId={1} dataService={this.state.dataService} />
            {parts}
            <Card>
                <div style={{ textAlign: 'right' }}>
                    项目：
                    <span style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}> {projectPrice}&nbsp;&nbsp;</span>
                    元
                    &nbsp;&nbsp;
                    配件：
                    <span style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}> {partsPrice}&nbsp;&nbsp;</span>
                    元
                    &nbsp;&nbsp;
                    整单金额：
                    <span style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}> {price}&nbsp;&nbsp;</span>
                    元
                </div>
            </Card>
            <span style={{ color: 'red' }}>{this.state.errorInfo}</span>
            <Popconfirm title="当前开单信息确认无误吗?" onConfirm={() => this.confirm(true)} onCancel={() => this.cancel()} okText="是" cancelText="否">
                <Button type="primary" disabled={disabled} style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'} >结算</Button>
            </Popconfirm>
            <Popconfirm title="当前开单信息确认无误吗?" onConfirm={() => this.confirm(false)} onCancel={() => this.cancel()} okText="是" cancelText="否">
                <Button type="primary" disabled={disabled} style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'} >保存</Button>
            </Popconfirm>
        </div>
    }
}
export default BeautyOrder