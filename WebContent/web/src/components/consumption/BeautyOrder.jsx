import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router';
import update from 'immutability-helper'
import $ from 'jquery'
let a = []
class BeautyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
                programId: 1,
                payMethod: '',
                programName: '',
                parkingLocation: '',
                inventoryInfos: [],
                state: '',
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
        console.log(a)
        let newConsumOrder = []
        if (this.state.consumOrder.inventoryInfos.length < 1) {
            a.push(...value)
            newConsumOrder = update(this.state.consumOrder, { inventoryInfos: { $set: a } })
        } else {

            if (value.length < 1) {
                this.state.consumOrder.inventoryInfos.forEach((item, index) => {
                    if (item.projectId == projectId) {
                        newConsumOrder = update(this.state.consumOrder, { inventoryInfos: { $splice: [[index, 1]] } })
                    }
                })
            }
            for (let nowItem of value) {
                let same = 0, deleteIndex = null, addItem = []
                this.state.consumOrder.inventoryInfos.forEach((item, index) => {

                    console.log(index, value)

                    if (item.projectId == projectId) {
                        same = same + 1
                        let valueSame = 0
                        if (item.inventory.id == nowItem.inventory.id) {
                            valueSame++
                            newConsumOrder = update(this.state.consumOrder, { inventoryInfos: { [index]: { $set: nowItem } } })
                        } else {
                            deleteIndex= index
                            addItem.push(nowItem)

                        }
                    } else {
                        newConsumOrder = update(this.state.consumOrder, { inventoryInfos: { $push: [nowItem] } })
                    }
                })
                console.log(same)
                if (same <= value.length) {
                    newConsumOrder = update(this.state.consumOrder, { inventoryInfos: { $push: [...addItem] } })
                } else if( same >value.length){
                    console.log(deleteIndex)
                    newConsumOrder = update(this.state.consumOrder, { inventoryInfos: { $splice: [[deleteIndex, 1]] } })
                }
            }

        }
        this.setState({
            consumOrder: newConsumOrder
        }, () => {
            console.log(
                this.state.consumOrder
            )
        })
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
    render() {
        const parts = this.state.parts.map((item, index) => {
            if (this.state.parts.length > (index + 1)) {
                return <PartsDetail key={index} pushInventory={this.pushInventory} saveInfo={this.saveInfo} key={index} id={item.id} parts={item.inventoryInfos} title={item.name} optionInventory={this.state.optionInventory} programId={1} />
            }
        })
        let price = 0
        for (let item of this.state.consumOrder.projects) {
            price = price + item.price + item.pricePerUnit * item.referWorkTime
        }
        for (let item of this.state.consumOrder.inventoryInfos) {
            price = price + item.inventory.price * item.number
        }
        return <div>
            <BreadcrumbCustom first="消费开单" second="美容开单" />
            <CustomerInfo getCards={this.getCards} MemberButton={true} type={1} staffList={this.state.staffList} saveInfo={this.saveInfo} />
            <ServiceTable pushInventory={this.pushInventory} cards={this.state.cards} getPartsDetail={(parts) => this.getPartsDetail(parts)} staffList={this.state.staffList} saveInfo={this.saveInfo} optionService={this.state.optionService} programId={1} dataService={this.state.dataService} />
            {parts}
            <Card>
                <div style={{ textAlign: 'right' }}>
                    整单金额
                <span style={{ margin: '0 10px', color: 'red', fontWeight: 'bold', fontSize: '20px' }}> {price}</span>
                    元
                </div>
            </Card>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}><Link to="/app/consumption/accountingcenter">结算</Link></Button>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>保存</Button>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>重新开单</Button>
        </div>
    }
}
export default BeautyOrder