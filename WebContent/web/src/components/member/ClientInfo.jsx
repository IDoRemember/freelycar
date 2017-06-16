import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, DatePicker, Modal ,Radio} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link } from 'react-router';
const RadioGroup = Radio.Group;
const columns = [
    { title: '序号', dataIndex: 'indexNum', key: 'indexNum' },
    { title: '姓名', dataIndex: 'customerName', key: 'customerName' },
    { title: '手机号码', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: '车牌号码', dataIndex: 'busNumber', key: 'busNumber' },
    { title: '品牌', dataIndex: 'carBrand', key: 'carBrand' },
    { title: '是否会员', dataIndex: 'isMember', key: 'isMember' },
    { title: '总消费次数', dataIndex: 'consumeCount', key: 'consumeCount' },
    { title: '最近到店时间', dataIndex: 'latelyTime', key: 'latelyTime' },
    {
        title: '操作', dataIndex: 'operation', key: 'operation', render: (text, record, index) => {
            return <span>
                <span style={{ marginRight: '10px' }}>
                    <Link to="" >
                        <span >开卡</span>
                    </Link>
                    <Link to="">
                        <span style={{ marginLeft: '5px' }}> 修改</span>
                    </Link>
                    <Link to="">
                        <span style={{ marginLeft: '5px' }}> 删除</span>
                    </Link>
                </span>

            </span>
        }
    },
]
const data = [
    {
        key: 1,
        indexNum: '1',
        customerName: '海蜇',
        phoneNumber: '15251873222',
        busNumber: '苏A234567',
        carBrand: '玛莎',
        isMember: '是',
        consumeCount: '4',
        latelyTime: '2017-05-23',
    },
    {
        key: 2,
        indexNum: '2',
        customerName: 'JZW',
        phoneNumber: '15251873232',
        busNumber: '苏A123456',
        carBrand: '维修',
        isMember: '否',
        consumeCount: '5',
        latelyTime: '2017-05-24',

    },
    {
        key:3,
        indexNum: '3',
        customerName: 'JZW',
        phoneNumber: '15251873232',
        busNumber: '苏A123456',
        carBrand: '维修',
        isMember: '否',
        consumeCount: '5',
        latelyTime: '2017-05-24',

    },
    {
        key: 4,
        indexNum: '4',
        customerName: 'JZW',
        phoneNumber: '15251873232',
        busNumber: '苏A123456',
        carBrand: '维修',
        isMember: '否',
        consumeCount: '5',
        latelyTime: '2017-05-24',

    }

];

class ClientInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            visible: false
        }
    }
    handleChange = (value) => {
        console.log(`selected ${value}`)
    }
    timeonChange = (time) => {
        console.log(time)
    }
    render() {

        const plateOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })
        return (
            <div>
                <BreadcrumbCustom first="会员管理" second="客户信息" />

                <div style={{ display: 'inline-block', marginBottom: '25px' }}>到店日期：
                <DatePicker onChange={this.timeonChange} />

                    <Select showSearch
                        style={{ width: '140px', marginRight: '8px', marginLeft: '26px' }}
                        placeholder="输入手机号或车牌号"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    >
                        {plateOptions}
                    </Select>
                    <Button type="primary">查询</Button>
                </div>

                <div>
                    <Button ><Icon type='plus'></Icon>新增客户</Button>
                    <Button style={{ marginLeft: '30px' }}>会员统计</Button>
                </div>
                <Card style={{ marginTop: '20px' }}>
                    <div>
                        <Table columns={columns} dataSource={data}>

                        </Table>
                    </div>
                </Card>
            </div>
        )
    }


}
export default ClientInfo