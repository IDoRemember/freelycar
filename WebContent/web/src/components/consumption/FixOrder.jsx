import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import { Row, Col, Card, Button, Input, Popconfirm, message } from 'antd';
import { Link } from 'react-router';
import update from 'immutability-helper'
import $ from 'jquery'
let a = []
class FixOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idUrl: '',
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
                programId: 2,
                payMethod: 0,
                programName: '',
                parkingLocation: '',
                inventoryInfos: [],
                state: 0,
                totalPrice: '',
                payState: '',
                pickTime: '',
                finishTime: '',
                deliverTime: '',
                createDate: '',
                lastMiles: '',
                miles: '',
                orderMaker: '',
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
        this.getStaffList()
        $.ajax({
            url: 'api/project/name',
            type: 'get',
            dataType: 'json',
            success: (res) => {
                console.log(res);
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
                //console.log(res);
                if (res.code == '0') {
                    this.setState({
                        optionInventory: res.data
                    });
                }
            }
        });
    }

    saveInfo = (params) => {
        this.setState({
            consumOrder: update(this.state.consumOrder, { $merge: params })
        }, () => {
            console.log(this.state.consumOrder)
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
            }, () => {
                console.log(
                    this.state.consumOrder
                )
            })
        } else {

            inventoryInfos = inventoryInfos.filter((obj) => {
                return projectId !== obj.projectId;
            });
            console.log(inventoryInfos, value)
            newConsumOrder = update(this.state.consumOrder, { inventoryInfos: { $set: inventoryInfos } })
            newConsumOrder = update(newConsumOrder, { inventoryInfos: { $push: [...value] } })
            this.setState({
                consumOrder: newConsumOrder
            }, () => {
                console.log(
                    this.state.consumOrder
                )
            })
        }
    }


    combineParts = () => {
        let dataInventory = []
        console.log(this.state.dataService)
        for (let item of this.state.dataService) {
            console.log(item.inventoryInfos)
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
        console.log(cards)
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
        this.setState({
            consumOrder: update(this.state.consumOrder, { totalPrice: { $set: price } })
        }, () => {
            $.ajax({
                type: 'post',
                url: 'api/order/book',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                // traditional: true,
                data: JSON.stringify(this.state.consumOrder),
                success: (res) => {
                    console.log(res)
                    if (res.code == '0') {
                        message.success(res.text);
                        if (isFinish) {
                            hashHistory.push(`/app/consumption/accountingcenter/${res.id}`)
                        } else {
                            hashHistory.push(`/app/consumption/ordermanage`)
                        }
                    }
                }
            })
        })
    }

    render() {
        console.log(this.state.parts)
        const parts = this.state.parts.map((item, index) => {
            if (this.state.parts.length > (index + 1)) {
                return <PartsDetail key={index} pushInventory={this.pushInventory} saveInfo={this.saveInfo} key={index} id={item.projectId} parts={item.inventoryInfos} title={item.name} optionInventory={this.state.optionInventory} programId={2} />
            }
        })
        let partsPrice = 0, projectPrice = 0, price = 0
        for (let item of this.state.consumOrder.projects) {
            projectPrice = projectPrice + item.price + item.pricePerUnit * item.referWorkTime
        }
        for (let item of this.state.consumOrder.inventoryInfos) {
            partsPrice = partsPrice + item.inventory.price * item.number
        }
        price = partsPrice + projectPrice
        return <div>
            <BreadcrumbCustom first="消费开单" second="维修开单" />
            <CustomerInfo getCards={this.getCards} MemberButton={true} type={1} staffList={this.state.staffList} saveInfo={this.saveInfo} />
            <Card style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '18px' }}>故障描述：</span><Input type="textarea" rows={2} style={{ display: 'inline-block', marginBottom: '10px' }} onChange={(e) => { this.saveInfo({ faultDesc: e.target.value }) }} />
                <span style={{ fontSize: '18px' }}>维修建议：</span><Input type="textarea" rows={2} style={{ display: 'inline-block' }} onChange={(e) => { this.saveInfo({ repairAdvice: e.target.value }) }} />
            </Card>
            <ServiceTable pushInventory={this.pushInventory} cards={this.state.cards} getPartsDetail={(parts) => this.getPartsDetail(parts)} staffList={this.state.staffList} saveInfo={this.saveInfo} optionService={this.state.optionService} programId={2} dataService={this.state.dataService} />
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
            <Popconfirm title="当前开单信息确认无误吗?" onConfirm={() => this.confirm(true)} onCancel={() => this.cancel()} okText="是" cancelText="否">
                <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'} >结算</Button>
            </Popconfirm>
            <Popconfirm title="当前开单信息确认无误吗?" onConfirm={() => this.confirm(false)} onCancel={() => this.cancel()} okText="是" cancelText="否">
                <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'} >保存</Button>
            </Popconfirm>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>重新开单</Button>
        </div>
    }
}
export default FixOrder


