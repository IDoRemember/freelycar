import React from 'react';
import { Row, Col, Card, Table, InputNumber, Input, Button, Icon, Radio, DatePicker } from 'antd';
import { Link } from 'react-router';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const {  RangePicker } = DatePicker;


const TodayColumns = [
    { title: '序号', dataIndex: 'indexNum', key: 'indexNum' },
    { title: '保养项目', dataIndex: 'maintainItem', key: 'maintainItem' },
    { title: '消费金额', dataIndex: 'payMoney', key: 'payMoney' },
    { title: '支付方式', dataIndex: 'payType', key: 'payType' },
    { title: '服务人员', dataIndex: 'servicePeople', key: 'servicePeople' },
    { title: '服务时间', dataIndex: 'serviceTime', key: 'serviceTime' },
    { title: '状态', dataIndex: 'serviceState', key: 'serviceState' },
]
const TodayData = [
    {
        key: 1,
        indexNum: 1,
        maintainItem: "洗车",
        payMoney: "20",
        payType: "支付宝",
        carType: "911",
        servicePeople: "小易,小爱",
        serviceTime: "2017-5-23",
        insuranceMoney: "3000",
        serviceState: "已完成",
    }
]

const MonthColumns = [
    { title: '序号', dataIndex: 'indexNum', key: 'indexNum' },
    { title: '保养项目', dataIndex: 'maintainItem', key: 'maintainItem' },
    { title: '消费金额', dataIndex: 'payMoney', key: 'payMoney' },
    { title: '支付方式', dataIndex: 'payType', key: 'payType' },
    { title: '服务人员', dataIndex: 'servicePeople', key: 'servicePeople' },
    { title: '服务时间', dataIndex: 'serviceTime', key: 'serviceTime' },
    { title: '状态', dataIndex: 'serviceState', key: 'serviceState' },
]
const MonthData = [
    {
        key: 1,
        indexNum: 1,
        maintainItem: "洗车",
        payMoney: "20",
        payType: "支付宝",
        carType: "911",
        servicePeople: "小易,小爱",
        serviceTime: "2017-5-23",
        insuranceMoney: "3000",
        serviceState: "已完成",
    },
     {
        key: 2,
        indexNum: 2,
        maintainItem: "打蜡",
        payMoney: "40",
        payType: "支付宝",
        carType: "911",
        servicePeople: "小易,小爱",
        serviceTime: "2017-5-23",
        insuranceMoney: "3000",
        serviceState: "已完成",
    }
]

const AllColumns = [
    { title: '序号', dataIndex: 'indexNum', key: 'indexNum' },
    { title: '保养项目', dataIndex: 'maintainItem', key: 'maintainItem' },
    { title: '消费金额', dataIndex: 'payMoney', key: 'payMoney' },
    { title: '支付方式', dataIndex: 'payType', key: 'payType' },
    { title: '服务人员', dataIndex: 'servicePeople', key: 'servicePeople' },
    { title: '服务时间', dataIndex: 'serviceTime', key: 'serviceTime' },
    { title: '状态', dataIndex: 'serviceState', key: 'serviceState' },
]
const AllData = [
    {
        key: 1,
        indexNum: 1,
        maintainItem: "洗车",
        payMoney: "20",
        payType: "支付宝",
        carType: "911",
        servicePeople: "小易,小爱",
        serviceTime: "2017-5-23",
        insuranceMoney: "3000",
        serviceState: "已完成",
    }
]
 
 

class PayHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
        }
    }
    timeonChange = (time) => {
        console.log(time)
    }
    render() {
        return (
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="今日" key="1">
                        <Card>
                        <div style={{marginBottom:'20px',fontSize:'16px'}}>合计消费：<span>1800</span></div>
                        <Table columns={TodayColumns} dataSource={TodayData}  bordered></Table>
                        </Card>
                    </TabPane>
                    <TabPane tab="本月" key="2">
                        <Card>
                        <div style={{marginBottom:'20px',fontSize:'16px'}}>合计消费：<span>1800</span></div>
                        <Table columns={MonthColumns} dataSource={MonthData}  bordered></Table>
                        </Card>
                    </TabPane>
                    <TabPane tab="全部" key="3">
                        <Card>
                         <div style={{marginBottom:'20px',fontSize:'16px'}}>合计消费：<span>1800</span></div>
                        查找日期： <RangePicker onChange={this.timeonChange} />
                        <Table columns={AllColumns} dataSource={AllData} style={{marginTop:'20px' }}  bordered></Table>
                        </Card>
                    </TabPane>
                </Tabs>
            </div>
        )
    }


}
export default PayHistory