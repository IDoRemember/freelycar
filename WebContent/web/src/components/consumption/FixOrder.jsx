import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import { Row, Col, Card, Button, Input } from 'antd';
import { Link } from 'react-router';
import update from 'immutability-helper'
import $ from 'jquery'
class FixOrder extends React.Component {
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
                programId: 2,
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
    //选择改变项目名称

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
    render() {
        console.log(this.state.parts)
        const parts = this.state.parts.map((item, index) => {
            if (this.state.parts.length > (index + 1)) {
                return <PartsDetail key={index} parts={item.inventoryInfos} title={item.name} optionInventory={this.state.optionInventory} programId={2} changeInvSelect={this.changeInvSelect} />
            }
        })
        return <div>
            <BreadcrumbCustom first="消费开单" second="美容开单" />
            <CustomerInfo getCards={this.getCards} MemberButton={true} type={1} staffList={this.state.staffList} saveInfo={this.saveInfo} />
            <Card style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '18px' }}>故障描述：</span><Input type="textarea" rows={3} style={{ display: 'inline-block', marginBottom: '10px' }} />
                <span style={{ fontSize: '18px' }}>维修建议：</span><Input type="textarea" rows={3} style={{ display: 'inline-block' }} />
            </Card>
            <ServiceTable cards={this.state.cards} getPartsDetail={(parts) => this.getPartsDetail(parts)} staffList={this.state.staffList} optionService={this.state.optionService} programId={2} dataService={this.state.dataService} />
            {parts}
            <Card>
                <div style={{ textAlign: 'right' }}>
                    整单金额
                <span style={{ margin: '0 10px', color: 'red', fontWeight: 'bold', fontSize: '20px' }}> 43.00</span>
                    元
                </div>
            </Card>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}><Link to="/app/consumption/accountingcenter">结算</Link></Button>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>保存</Button>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>重新开单</Button>
        </div>
    }
}
export default FixOrder


