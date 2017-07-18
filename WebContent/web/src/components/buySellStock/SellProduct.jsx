import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Table, Row, Col, Popconfirm, DatePicker } from 'antd';
import { Link } from 'react-router';
import moment from 'moment';
import $ from 'jquery'
import AjaxGet from '../../utils/ajaxGet'
const Option = Select.Option;
// 日期 format
const dateFormat = 'YYYY/MM/DD';
class PutInStorage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            inventoryOrderId:'',//搜索单据编号
            adminId:'',
            option: []
        }
    }
    componentDidMount() {

        this.loadData(1, 10);
        this.loadAdmin();
    }

    //条件查询
    conditionQuery = () => {
        this.loadData(1, 10, this.state.inventoryOrderId,this.state.adminId);
    }

    loadData = (page, number, inventoryOrderId, adminId, type) => {
        var obj = {};
        obj.inventoryOrderId = inventoryOrderId;
        obj.adminId = adminId;
        obj.type = type;
        obj.page = page;
        obj.number = number;
        $.ajax({
            url: 'api/inventory/query',
            type: 'get',
            data: obj,
            dataType: 'json',
            success: (res) => {
                if (res.code == '0') {
                    let data = [];
                    let arr = res.data;
                    for(let item of arr){
                        let invArr = item.inventoryInfos;//配件数组
                        for(let i of invArr){
                            i.key = i.id;
                            i.docNmuber = item.id;//单据编号
                            i.docType = item.type;//单据类型
                            i.createDate = item.createDate;
                            data.push(i);
                        }
                    }   

                    this.setState({
                        data: data
                    });
                }
            }

        });
    }

    loadAdmin = ()=>{
      $.ajax({
          url: 'api/admin/list',
            type: 'get',
            data: {page:1,number:99},
            dataType: 'json',
            success: (res) => {
                if(res.code=='0'){
                    this.setState({
                        option:res.data
                    });
                }
            }
      });   
    }

    handleChange = (e) => {
        this.setState({
            adminId:e
        })
    }


    render() {
        const adminOption = this.state.option.map((item, index) => {
            return <Option key={index} value={item.id+''}>{item.name}</Option>
        })
       
        return <div>
            <BreadcrumbCustom first="进销存管理" second="出库" />
            <Card>
                <Row gutter={24} style={{ marginBottom: "10px" }}>

                    <Col span={2} >
                        单据编号：
                    </Col>
                    <Col span={4} >
                        <Input style={{ width: '120px' }} size="large" value={this.state.inventoryOrderId} onChange={(e)=>{this.setState({ inventoryOrderId: e.target.value})}}/>
                    </Col>
                    <Col span={2} >
                        单据时间：
                    </Col>
                    <Col span={5} >
                        <DatePicker.RangePicker
                            defaultValue={[moment(), moment()]}
                            format={dateFormat}
                            showToday={true}
                        />
                    </Col>
                    <Col span={2} >
                        制单人：
                    </Col>
                    <Col span={5} >
                        <Select  style={{ width: 120 }} onChange={(e) => this.handleChange(e)}>
                            {adminOption}
                        </Select>
                    </Col>
                    <Button type="primary" onClick={()=>{this.conditionQuery()}}>查询</Button>
                </Row>
                <Table dataSource={this.state.data} bordered>
                    <Col
                        title="序号"
                        dataIndex="index"
                        key="index"
                        render={(text, record, index) => {
                            return <span>{index + 1}</span>
                        }}
                    />
                    <Col
                        title="配件名称"
                        key="name"
                        dataIndex="name"
                    />
                    <Col
                        title="配件类别"
                        key="typeName"
                        dataIndex="typeName"
                    />
                    <Col
                        title="单据编号"
                        key="docNmuber"
                        dataIndex="docNmuber"
                    />
                    <Col
                        title="单据类型"
                        key="docType"
                        dataIndex="docType"
                    />
                    <Col
                        title="单价"
                        key="price"
                        dataIndex="price"
                    />
                    <Col
                        title="出库数量"
                        key="amount"
                        dataIndex="amount"
                    />
                    <Col
                        title="总计"
                        key="total"
                        dataIndex="total"
                        render={(text, record, index)=>{
                            return <span>{record.price*record.amount}</span>
                        }}
                    />
                    <Col
                        title="创建时间"
                        key="createDate"
                        dataIndex="createDate"
                    />
                </Table>
            </Card>
        </div>
    }
}
export default PutInStorage