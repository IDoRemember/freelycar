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
            data: [{
                key: 1,
                index: 1,
                partNumber: 'p2342232',
                name: '玻璃水',
                category: '美容保养',
                specification: '通用',
                singleSummation: '20',
                number: '1111'
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
            <BreadcrumbCustom first="进销存管理" second="出库" />
            <Card>
                <Row gutter={24} style={{ marginBottom: "10px" }}>
                    <Col span={8} >单据编号：<Input style={{ width: '200px' }} />
                    </Col>
                    <Col span={8} >
                        单据时间：
                        <DatePicker.RangePicker
                            defaultValue={[moment(), moment()]}
                            format={dateFormat}
                            showToday={true}
                        />
                    </Col>
                    <Col span={8} >
                        <div style={{ height: '28px',lineHeight:'28px' }}>
                            制单人：
                            <span style={{ verticalAlign: 'middle' }}>🐟涵</span>
                        </div>
                    </Col>
                </Row>
                <Table dataSource={this.state.data} bordered>
                    <Col
                        title="序号"
                        dataIndex="index"
                        key="index"
                    />
                    <Col
                        title="配件名称"
                        key="name"
                        dataIndex="name"
                    />
                    <Col
                        title="配件类别"
                        key="category"
                        dataIndex="category"
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
                        key="univalent"
                        dataIndex="univalent"
                    />
                    <Col
                        title="出库数量"
                        key="number"
                        dataIndex="number"
                    />
                    <Col
                        title="总计"
                        key="total"
                        dataIndex="total"
                    />
                    <Col
                        title="创建时间"
                        key="creatTime"
                        dataIndex="creatTime"
                    />
                </Table>
            </Card>
        </div>
    }
}
export default PutInStorage