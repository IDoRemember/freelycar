import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router';
import update from 'immutability-helper'
import $ from 'jquery'
class BeautyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataService: [{
                key: 1,
                index: 1,
                name: '',
                price: '0',
                referWorkTime: '0',
                pricePerUnit: '0',
                memberCard: '',
                number: 1,
                singleSummation: '',
                DeductionCardTime: '1',
            }, {
                key: '',
                index: '',
                total: '合计',
                singleSummation: '0'
                // DeductionCardTime: '1',
            }],
            optionService: [],

            dataInventory: [{
                key: 1,
                index: 1,
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
            optionInventory: []
        }
    }

    componentWillMount() {
        console.log('willmount')
    }

    componentDidMount() {
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
    }


    //选择改变项目名称
    changeProjectSelect = (index, value) => {
        $.ajax({
            url: 'api/project/getbyid',
            type: 'get',
            data: { projectId: value },
            dataType: 'json',
            success: (res) => {
                if (res.code == '0') {
                    let obj = res.data;
                    obj.key = obj.id;
                    obj.index = index;
                    obj.singleSummation = obj.price * (this.state.dataService[index].number);
                    this.setState({
                        dataService: update(this.state.dataService, { [index]: { $set: obj } })
                    }, () => {
                        console.log(this.state.dataService);
                    })
                }
            }

        });
    }


    render() {
        return <div>
            <BreadcrumbCustom first="消费开单" second="美容开单" />
            <CustomerInfo MemberButton={true} type={1} />
            <ServiceTable optionService={this.state.optionService} dataService={this.state.dataService} changeProjectSelect={this.changeProjectSelect} />
            <PartsDetail />
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
export default BeautyOrder