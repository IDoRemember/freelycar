import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Table, Row, Col, Popconfirm, DatePicker } from 'antd';
import { Link } from 'react-router';
import moment from 'moment';
import AjaxGet from '../../utils/ajaxGet'
const Option = Select.Option;
// 日期 format
const dateFormat = 'YYYY/MM/DD';
class PutInStorage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            conlums: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index'
            }, {
                title: '商品名称',
                dataIndex: 'commodityName',
                key: 'commodityName'
            }, {
                title: '商品类别',
                dataIndex: 'category',
                key: 'category'
            }, {
                title: '属性',
                dataIndex: 'attribute',
                key: 'attribute'

            }, {
                title: '单价',
                dataIndex: 'unitPrice',
                key: 'unitPrice'
            },{
                title: '数量',
                dataIndex: 'amount',
                key: 'amount'
            },{
                title: '供应商',
                dataIndex: 'supplier',
                key: 'supplier'
            }, {
                title: '合计',
                dataIndex: 'total',
                key: 'total'
            }],
            data: [{
                key: '1',
                index: '1',
                commodityName: '玻璃水',
                attribute:'通用',
                amount:'2',
                unitPrice:'20',
                supplier:'海蜇',
                total:'300',
                category: '美容保养'
            }],
            option: []
        }
    }
    componentDidMount() {
        AjaxGet('GET', 'data/LicensePlate.json', (res) => {
            this.setState({ option: res.data })
        })
    }
    render() {
        const projectOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })
        return <div>
            <BreadcrumbCustom first="进销存管理" second="库存单据" third="入库明细"/>
            <Card>
                <Row gutter={24} style={{ marginBottom: "10px" }}>
                    <Col span={8} >单据编号：<span>p22321123123</span>
                    </Col>
                </Row>
                < Table className="accountTable" bordered columns={this.state.conlums} dataSource={this.state.data} onChange={this.handleChange} />

            </Card>
        </div>
    }
}
export default PutInStorage