import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, DatePicker, Modal, Radio, Popconfirm } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link } from 'react-router';
import update from 'immutability-helper'
import $ from 'jquery';
const Option = Select.Option;
class ClientInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            visible: false,
            dataSource:[],
            columns: [
            { title: '序号', dataIndex: 'index', key: 'index',render: (text, record, index) => {
                    return <span>{index + 1}</span>
                } },
            {
                title: '姓名', dataIndex: 'customerName', key: 'customerName', render: (text, record, index) => {
                    return <Link to={'app/member/customer/' + record.uid}>{text}</Link>
                }
            },
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
                            <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                                <a href="javascript:void(0);" style={{ marginLeft: '5px' }}>删除</a>
                            </Popconfirm>
                        </span>

                    </span>
                }
            },
        ]
        }   
    }
     componentDidMount(){
        $.ajax({
            url:"/api/client/list",
            type:"GET",
            data:{
                page:1,
                number:10
            },
          //  dataType:'json',
            success:(res)=>{
              var obj=res.data;
              for(let i=0;i<obj.length;i++){
                  let dataItem={
                      key:i,
                      customerName:obj[i].name,
                    　phoneNumber:obj[i].phone,
                    　busNumber: obj[i].cars.licensePlate,
                    　carBrand: obj[i].cars.type,
                    　isMember: obj[i].cards,
                    　consumeCount:obj[i].consumTimes,
                    　latelyTime: obj[i].lastVisit,
                  }
                  this.setState({
                        dataSource: update(this.state.dataSource, { $push: [dataItem] }),
                        option: update(this.state.option, { $push: [dataItem] })
                  })

              }
            }

        })

    }
    

    handleChange = (value) => {
        console.log(`selected ${value}`)
    }
    timeonChange = (time) => {
        console.log(time)
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    }
    onDelete = (index) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);
        this.setState({ dataSource });
    }
    componentWillMount(){
        
    }
  

   

    render() {
      //  const { dataSource } = this.state;
       // const columns = this.columns;
        const plateOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })
        return (
            <div>
                <BreadcrumbCustom first="会员管理" second="客户信息" />

                <div style={{ display: 'inline-block', marginBottom: '25px' }}>

                    <Select showSearch
                        style={{ width: '140px', marginRight: '8px' }}
                        placeholder="输入客户姓名"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    >
                        {plateOptions}
                    </Select>
                    <Select showSearch
                        style={{ width: '140px', marginRight: '8px', marginLeft: '26px' }}
                        placeholder="输入手机号"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    >
                        {plateOptions}
                    </Select>
                    <Select showSearch
                        style={{ width: '140px', marginRight: '8px', marginLeft: '26px' }}
                        placeholder="输入车牌号"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    >
                        {plateOptions}
                    </Select>
                    <Button type="primary">查询</Button>
                </div>

                <div>
                    <Button ><Link to={'app/member/addclient'}><Icon type='plus'></Icon>新增客户</Link></Button>
                    <Button style={{ marginLeft: '30px' }} onClick={this.showModal}>会员统计</Button>
                </div>
                <Card style={{ marginTop: '20px' }}>
                    <div>
                        <Table dataSource={this.state.dataSource} columns={this.state.columns}>

                        </Table>
                    </div>
                </Card>
                <Modal
                    title="会员统计"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                    width='25%'
                >
                    <div>
                        <p style={{ fontSize: '16px' }}>会员总数：<span>500</span></p>
                        <p style={{ fontSize: '16px' }}>本月新增：<span>30</span></p>
                        <p style={{ fontSize: '16px' }}>今日新增：<span>5</span></p>

                    </div>
                </Modal>
            </div>
        )

    }


}
export default ClientInfo