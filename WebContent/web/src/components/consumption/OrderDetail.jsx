import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx';
import ServiceTable from '../tables/ServiceTable.jsx';
import PartsDetail from '../tables/PartsDetail.jsx';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import $ from 'jquery';
import { Row, Col, Card, Button, Input, Steps, Table, Icon } from 'antd';
const Step = Steps.Step;
const serviceColumns = [{
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: text => <a href="#">{text}</a>,
}, {
    title: '',
    dataIndex: 'total',
    key: 'total',
}, {
    title: '项目名称',
    dataIndex: 'project',
    key: 'project',
}, {
    title: '项目价格',
    dataIndex: 'price',
    key: 'price',
}, {
    title: '数量',
    dataIndex: 'number',
    key: 'number',
}, {
    title: '单项合计',
    dataIndex: 'singleSummation',
    key: 'singleSummation',
}, {
    title: '抵扣卡次',
    dataIndex: 'DeductionCardTime',
    key: 'DeductionCardTime',
}], partsDetail = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: text => <a href="#">{text}</a>,
    }, {
        title: '',
        dataIndex: 'total',
        key: 'total',
    }, {
        title: '配件名称',
        dataIndex: 'partName',
        key: 'partName',
    }, {
        title: '配件品牌',
        dataIndex: 'brand',
        key: 'brand',
    }, {
        title: '规格',
        dataIndex: 'specification',
        key: 'specification',
    }, {
        title: '属性',
        dataIndex: 'attribute',
        key: 'attribute',
    }, {
        title: '配件价格',
        dataIndex: 'price',
        key: 'price',
    }, {
        title: '可用库存',
        dataIndex: 'inventory',
        key: 'inventory',
    }, {
        title: '数量',
        dataIndex: 'number',
        key: 'number',
    }, {
        title: '单项合计',
        dataIndex: 'singleSummation',
        key: 'singleSummation',
    }
]


class BeautyDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current:2,
            programId:0,
            faultDesc:'',
            repairAdvice:'',
            form: {
                orderMaker: '',
                licensePlate: '',
                carType: '',
                brand: '',
                lastMiles: '',
                Miles: '',

                name: '',
                phone: '',
              //  drivingLicense: '',

                parkingLocation: '',
                createDate:'',
                deliverTime: '',
                finishTime: '',
                staffs: ''
            },

            serviceData: [{
                key: 1,
                index: 1,
                project: '洗车',
                price: '20.00',
                number: '20',
                singleSummation: '20',
                DeductionCardTime: '1',
            }, {
                key: '',
                index: '',
                total: '合计',
                singleSummation: '20',
                DeductionCardTime: '1',
            }],
            partsDetailData: [{
                key: 1,
                index: 1,
                partName: '洗车',
                price: '20.00',
                number: '20',
                singleSummation: '20',
                DeductionCardTime: '1'
            }, {
                key: '',
                index: '',
                total: '合计',
                singleSummation: '20',
                DeductionCardTime: '1'
            }],

        }
    }
    componentDidMount() {
        console.log("hahhahahha ")
        $.ajax({
            url: 'api/order/queryid',
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            data: {
                consumOrderId: this.props.params.orderId
            },
            success: (res) => {
                let obj = res.data;
                let stateType=obj.state;
                let programId= obj.programId;
                let faultDesc=obj.faultDesc;
                let repairAdvice=obj.repairAdvice;
                let createDate=obj.createDate;
                let staffList = obj.staffs;
                let orderMaker = obj.orderMaker.name;
                let licensePlate = obj.licensePlate;
                let carType = obj.carType;
                let brand = obj.carBrand;
                let lastMiles = obj.lastMiles;
                let Miles = obj.miles;

                let name = obj.clientName;
                let phone = obj.phone;

                let parkingLocation = obj.parkingLocation;
                let deliverTime = obj.deliverTime;
                let finishTime = obj.finishTime;
                let staffString = ''
                for (let i = 0; i < staffList.length; i++) {
                    staffString += staffList[i].name+' 、 ';
                    
                }
                    staffString=staffString.substring(0,staffString.length-2)
                console.log(res);

                this.setState({
                    current:stateType,
                    programId:programId,
                    repairAdvice:repairAdvice,
                    faultDesc:faultDesc,
                    form: {
                        orderMaker: orderMaker,
                        licensePlate: licensePlate,
                        carType: carType,
                        brand: brand,
                        lastMiles: lastMiles,
                        Miles: Miles,
                        createDate:createDate,
                        name: name,
                        phone: phone,
                        // drivingLicense: '',

                        parkingLocation: parkingLocation,
                        deliverTime: deliverTime,
                        finishTime: finishTime,
                        staffs: staffString,
                    },

                })
            }
        })
    }

    render() {
        return <div>
            <BreadcrumbCustom first="消费开单" second="单据详情" />
            <Card style={{ marginBottom: '10px' }}>当前状态：
                <Steps current={this.state.current}>
                    <Step title="接车" />
                    <Step title="完成" />
                    <Step title="交车" />
                </Steps>
            </Card>
            <CustomerInfo form={this.state.form}/>
           {this.state.programId==2 && <Card style={{ marginBottom: '10px' }}>
                <h3>故障描述：</h3>
                <p>{this.state.faultDesc}</p>
                <h3>维修建议：</h3>
                <p>{this.state.repairAdvice}</p>
            </Card>
           }
            <Card style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '18px', marginBottom: '10px' }}>服务项目</div>
                <Table className="accountTable" columns={serviceColumns} dataSource={this.state.serviceData} bordered />
            </Card>
            <Card style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '18px', marginBottom: '10px' }}>配件明细</div>
                <Table className="accountTable" columns={partsDetail} dataSource={this.state.serviceData} bordered />
            </Card>
            <Card>
                <div style={{ textAlign: 'right' }}>
                    整单金额
                <span style={{ margin: '0 10px', color: 'red', fontWeight: 'bold', fontSize: '20px' }}> 43.00</span>
                    元
                </div>
            </Card>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>结算</Button>
            {/*<Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>保存</Button>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>重新开单</Button>*/}
        </div>
    }
}
export default BeautyDetail