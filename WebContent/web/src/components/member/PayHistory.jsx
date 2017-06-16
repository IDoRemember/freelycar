import React from 'react';
import { Row, Col, Card, Table, InputNumber, Input, Button, Icon, Radio, DatePicker } from 'antd';
import { Link } from 'react-router';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const TodayColumns = [
    { title: '序号', dataIndex: 'indexNum', key: 'indexNum' },
    { title: '保养项目', dataIndex: 'maintainItem', key: 'maintainItem' },
    { title: '消费金额', dataIndex: 'payMoney', key: 'payMoney' },
    { title: '支付方式', dataIndex: 'payType', key: 'payType' },
    { title: '服务人员', dataIndex: 'servicePeople', key: 'servicePeople' },
    { title: '服务时间', dataIndex: 'serviceTime', key: 'serviceTime' },
    { title: '状态', dataIndex: 'serviceState', key: 'serviceState' },
]
const todayData = [
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

    rend() {
        return (
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="今日" key="1">
                        <div>合计消费：<span></span></div>
                        <Table></Table>
                    </TabPane>
                    <TabPane tab="本月" key="2">
                        <Table></Table>
                    </TabPane>
                    <TabPane tab="全部" key="3">
                        <Table></Table>
                    </TabPane>
                </Tabs>
            </div>
        )
    }


}
export default PayHistory