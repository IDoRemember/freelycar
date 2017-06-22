import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon,Popconfirm} from 'antd';
import { Link } from 'react-router';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import CarTable from '../tables/CarTable.jsx';
const cardColumns = [
    { title: '卡号', dataIndex: 'cardNum', key: 'cardNum' },
    { title: '会员卡类', dataIndex: 'cardClasses', key: 'cardClasses' },
    { title: '开卡时间', dataIndex: 'transactionTime', key: 'transactionTime' },
    { title: '剩余次数', dataIndex: 'resCount', key: 'resCount' },
    { title: '制单人', dataIndex: 'makePeople', key: 'makePeople' },
]
const cardData = [
    {
        key: 1,
        cardNum: '100010',
        cardClasses: '次卡',
        transactionTime: '2017-06-12',
        resCount: '15',
        makePeople: '小易',
    }
]

const carColumns = [
    { title: '车牌号码', dataIndex: 'carNum', key: 'carNum' },
    { title: '品牌', dataIndex: 'brand', key: 'brand' },
    { title: '车辆型号', dataIndex: 'carType', key: 'carType' },
    { title: '里程数', dataIndex: 'mileageNum', key: 'mileageNum' },
    { title: '发动机号', dataIndex: 'engineNum', key: 'engineNum' },
    { title: '是否二手车', dataIndex: 'oldcar', key: 'oldcar' },
    { title: '保险金额', dataIndex: 'insuranceMoney', key: 'insuranceMoney' },
    { title: '保险有效期', dataIndex: 'insuranceTime', key: 'insuranceTime' },
    { title: '备注', dataIndex: 'other', key: 'other' },
    {
        title: '操作', dataIndex: 'operation', key: 'operation', render: (text, record, index) => {
            return <span>
                <span style={{ marginRight: '10px' }}>
                    <Link to="" >
                        <span >新增</span>
                    </Link>
                    <Link to="">
                        <span style={{ marginLeft: '5px' }}> 删除</span>
                    </Link>
                </span>

            </span>
        }
    },
]
const carData = [
    {
        key: 1,
        carNum: "苏A123456",
        brand: "保时捷",
        carType: "911",
        mileageNum: "3000",
        oldcar: "否",
        insuranceMoney: "3000",
        insuranceTime: "2018-5-23",
        other: "",
    }
]
const payColumns = [
    { title: '序号', dataIndex: 'indexNum', key: 'indexNum' },
    { title: '保养项目', dataIndex: 'maintainItem', key: 'maintainItem' },
    { title: '消费金额', dataIndex: 'payMoney', key: 'payMoney' },
    { title: '支付方式', dataIndex: 'payType', key: 'payType' },
    { title: '服务人员', dataIndex: 'servicePeople', key: 'servicePeople' },
    { title: '服务时间', dataIndex: 'serviceTime', key: 'serviceTime' },
    { title: '状态', dataIndex: 'serviceState', key: 'serviceState' },

]
const payData = [
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

class ClientDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
            value:this.props.value,
            editable:false,
            form:{
                name:'陈钰涵',
                phone:'18362981113',
                birthday:'2003-12-12',
                gender:'女',
                drivingLicense:'198288912',
                idCard:'2932032329309209320',
                ownerState:'新手'
            }
        }
    }
    onChange = (e) => {
        console.log("radio change", e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    handleChange = (e) =>{
        const value =e.target.value;
        this.setState({value});
    }
    check =() =>{
        this.setState({editable:false});
        if(this.props.onChange){
            this.props.onChange(this.state.value);
        }
    }
    edit =()=>{
        this.setState({editable:true});
    }
    onHandleChange=(e,key)=>{
        console.log(key)
        let form = this.state.form
        form[key] = e.target.value
        this.setState({
            form:form
        })
    }
    render() {
        const{value,editable} =this.state;
        return (
            <div>
                <BreadcrumbCustom first='会员管理' second='客户信息' third='详细信息' />
                <Card title="客户资料" bordered={false} style={{ marginBottom: '15px' }}>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={3}></Col>
                        <Col span={6}>姓名：<Input value={this.state.form.name} onChange={(e)=>this.onHandleChange(e,'name')} style={{width:'200px'}}/></Col>
                        <Col span={6}>手机号：<Input value={this.state.form.phone} onChange={(e)=>this.onHandleChange(e,'phone')} style={{width:'200px'}}/></Col>
                        <Col span={6}>生日：<Input value={this.state.form.birthday} onChange={(e)=>this.onHandleChange(e,'birthday')} style={{width:'200px'}}/></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={3}></Col>
                        <Col span={6}>性别：<Input value={this.state.form.gender} onChange={(e)=>this.onHandleChange(e,'gender')} style={{width:'200px'}}/></Col>
                        <Col span={6}>身份证号：<Input value={this.state.form.idCard} onChange={(e)=>this.onHandleChange(e,'idCard')} style={{width:'200px'}}/></Col>
                        <Col span={6}>行驶证号：<Input value={this.state.form.drivingLicense} onChange={(e)=>this.onHandleChange(e,'drivingLicense')} style={{width:'200px'}}/></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={3}></Col>
                        <Col span={6}>车主状态：<Input value={this.state.form.ownerState} onChange={(e)=>this.onHandleChange(e,'ownerState')} style={{width:'200px'}}/></Col>
                        <Col span={6}>积分：<span>21212</span></Col>
                    </Row>
                </Card>
                <Card title="会员卡信息" className="accountTable" style={{ marginBottom: '15px' }}>
                    <Button style={{ marginBottom: '20px'}}><Icon type='idcard'></Icon>开卡</Button>
                    
                   <Table columns={cardColumns} dataSource={cardData} bordered></Table>
                </Card>
                <Card title="车辆信息" className="accountTable" style={{ marginBottom: '15px' }}>
                    <CarTable></CarTable>

                </Card>
                <Card title="消费记录" className="accountTable" >
                    <Table columns={payColumns} dataSource={payData} bordered></Table>
                    <p style={{ float: 'right',marginRight:'30px' }}><Link to = {'app/member/customer/1/payhistory'}> 更多</Link></p>
                </Card>
            </div>
        )
    }
}
export default ClientDetail