import React from 'react';
import { Row, Col, Card, Table, InputNumber, Input, Button, Icon, Radio, DatePicker } from 'antd';
import { Link } from 'react-router';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Tabs } from 'antd';
import $ from 'jquery';
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD 00:00:00';


class PayHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            option: [],
            payData: [],
            queryStart: '',
            queryEnd: '',
            Columns: [
                {
                    title: '序号', dataIndex: 'index', key: 'index', render: (text, record, index) => {
                        return <span>{index + 1}</span>
                    }
                },
                { title: '项目', dataIndex: 'maintainItem', key: 'maintainItem' },
                { title: '消费金额', dataIndex: 'payMoney', key: 'payMoney' },
                { title: '支付方式', dataIndex: 'payType', key: 'payType' },
              //  { title: '服务人员', dataIndex: 'servicePeople', key: 'servicePeople' },
                { title: '服务时间', dataIndex: 'serviceTime', key: 'serviceTime' },
              //  { title: '状态', dataIndex: 'serviceState', key: 'serviceState' },
            ]
        }
    }

    componentDidMount() {
        var todayStart = new Date();
        var todayEnd = new Date();
        todayStart.setHours(0);
        todayStart.setMinutes(0);
        todayStart.setSeconds(0);
        todayEnd.setHours(23);
        todayEnd.setMinutes(59);
        todayEnd.setSeconds(59)
        this.loadData(this.props.params.id, todayStart, todayEnd, 1, 10)
    }
    tabCallback = (key) => {
        if (key == 1) {
            var todayStart = new Date();
            var todayEnd = new Date();
            todayStart.setHours(0);
            todayStart.setMinutes(0);
            todayStart.setSeconds(0);
            todayEnd.setHours(23);
            todayEnd.setMinutes(59);
            todayEnd.setSeconds(59)
            this.loadData(this.props.params.id, todayStart, todayEnd, 1, 10)
        } else if (key == 2) {
            var MonthStart = new Date();
            var MonthEnd = new Date();
            MonthStart.setDate(1);
            MonthStart.setHours(0);
            MonthStart.setMinutes(0);
            MonthStart.setSeconds(0);
            MonthEnd.setHours(23);
            MonthEnd.setMinutes(59);
            MonthEnd.setSeconds(59);
            this.loadData(this.props.params.id, MonthStart, MonthEnd, 1, 10)

        } else if (key == 3) {
            var AllStart = new Date(1900, 4, 28, 0, 0, 1);
            var AllEnd = new Date(2500, 4, 28, 0, 0, 1);
            this.loadData(this.props.params.id, AllStart, AllEnd, 1, 10)
        }
    }
    queryTime = () => {
        this.loadData(this.props.params.id, new Date(this.state.queryStart), new Date(this.state.queryEnd), 1, 10)
    }

    onTimeSelected = (dates, dateStrings) => {
        this.setState({
            queryStart: dateStrings[0],
            queryEnd: dateStrings[1]
        })
        // localStorage.setItem('datastrings', dateStrings)
        // if (this.state.mode == 'payrange') {
        //     $.ajax({
        //         url: 'api/stat/payrange',
        //         data: {
        //             startTime: new Date(dateStrings[0]),
        //             endTime: new Date(dateStrings[1]),
        //         },
        //         success: (result) => {
        //             if (result.code == "0") {
        //                 console.log(result)
        //             }
        //         }
        //     })
        // }
    }

    loadData = (clientId, startTime, endTime, page, number) => {
        let jsonData = {};
        jsonData.clientId = clientId;
        jsonData.startTime = startTime;
        jsonData.endTime = endTime;
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: '/api/client/consumhist',
            dataType: 'json',
            data: jsonData,
            type: 'GET',
            success: (res) => {
                if (res.code == '0') {
                    this.setState({
                        amount: res.amount,
                    })
                  //  var objcard=res.client.cards;
                    var objpay = res.data;
                    let paylist = [];
                    for (let k = 0; k < objpay.length; k++) {
                        let payMethod = objpay[k].payMethod;
                        let paymeth;
                        switch (payMethod) {
                            case 0: paymeth = "现金";
                                break;
                            case 1: paymeth = "刷卡";
                                break;    
                            case 2: paymeth = "支付宝";
                                break;
                            case 3: paymeth = "微信";
                                break;
                            case 4: paymeth = "易付宝";
                                break;
                        }
         //               let servicePeople = objpay[k].programName == "Card" ? objcard[k].orderMaker.name : objpay[k].staffNames;

                        let payItem = {
                            key: objpay[k].id,
                            id: objpay[k].id,
                            maintainItem: objpay[k].programName,
                            payMoney: objpay[k].amount,
                            payType: paymeth,
                            // carType: "911",
                           // servicePeople: servicePeople,
                            serviceTime: objpay[k].payDate,
                            insuranceMoney: objpay[k].amount,
                          //  serviceState: "完成",
                        }
                        paylist.push(payItem);
                        if (paylist.length == objpay.length) {
                            this.setState({
                                payData: paylist,
                            })
                        }
                    }
                }
                else if (res.code == "2") {
                    this.setState({
                        payData: [],
                        amount: 0
                    })
                }
            }
        })

    }
    render() {
        return (
            <div className="card-container">
                <Tabs type="card" onChange={this.tabCallback}>
                    <TabPane tab="今日" key="1">
                        <Card>
                            <div style={{ marginBottom: '20px', fontSize: '16px' }}>合计消费：<span>{this.state.amount}</span></div>
                            <Table columns={this.state.Columns} dataSource={this.state.payData} bordered></Table>
                        </Card>
                    </TabPane>
                    <TabPane tab="本月" key="2">
                        <Card>
                            <div style={{ marginBottom: '20px', fontSize: '16px' }}>合计消费：<span>{this.state.amount}</span></div>
                            <Table columns={this.state.Columns} dataSource={this.state.payData} bordered></Table>
                        </Card>
                    </TabPane>
                    <TabPane tab="全部" key="3">
                        <Card>
                            <div style={{ marginBottom: '20px', fontSize: '16px' }}>合计消费：<span>{this.state.amount}</span></div>
                            查找日期： <DatePicker.RangePicker
                                format={dateFormat}
                                showToday={true}
                                onChange={(dates, dateStrings) => { this.onTimeSelected(dates, dateStrings) }}
                            />
                            <Button type="primary" onClick={this.queryTime} style={{ marginLeft: '10px' }}>查询</Button>
                            <Table columns={this.state.Columns} dataSource={this.state.payData} style={{ marginTop: '20px' }} bordered></Table>
                        </Card>
                    </TabPane>
                </Tabs>
            </div>
        )
    }


}
export default PayHistory