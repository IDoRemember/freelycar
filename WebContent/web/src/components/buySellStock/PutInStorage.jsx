import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Table, Row, Col, Popconfirm,InputNumber } from 'antd';
import { Link } from 'react-router';
import AjaxGet from '../../utils/ajaxGet'
const Option = Select.Option;
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
            <BreadcrumbCustom first="进销存管理" second="入库" />
            <Card>
                <Row gutter={24} style={{ marginBottom: "10px" }}>
                    <Col span={8} >单据编号：<span>p1231231231232123</span>
                    </Col>
                    <Col span={8} >
                        单据时间：
                        <span>2017-5-27 14:00:08</span>
                    </Col>
                    <Col span={8} >
                        制单人：
                        <span style={{verticalAlign:'middle'}}>🐟涵</span>
                    </Col>
                </Row>
                <Table className="accountTable" dataSource={this.state.data} bordered>
                    <Col
                        title="序号"
                        dataIndex="index"
                        key="index"
                    />
                    <Col
                        title="配件编号"
                        dataIndex="partNumber"
                        key="partNumber"
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
                        title="规格属性"
                        key="specification"
                        dataIndex="specification"
                    />
                    <Col
                        title="单价"
                        key="singleSummation"
                        dataIndex="singleSummation"
                    />
                    <Col
                        title="数量"
                        key="number"
                        dataIndex="number"
                        render={()=>{
                            return <InputNumber min={1}  style={{width:'100px'}} />
                        }}
                    />
                    <Col
                        title="供应商"
                        key="supplier"
                        dataIndex="supplier"
                        render={(text) => {
                            if (text) {
                                return <span> </span>
                            } else {
                                return <Select showSearch
                                    style={{ width: '100px' }}
                                    placeholder="输入供应商名称"
                                    optionFilterProp="children "
                                    onChange={this.handleChange}
                                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                >
                                    {projectOptions}
                                </Select>
                            }
                        }}
                    />
                    <Col
                        title="单项合计"
                        key="DeductionCardTime"
                        dataIndex="DeductionCardTime"
                    />
                    <Col
                        title="操作"
                        key="action"
                        render={(text, record, index) => {
                            return <span>
                                <span style={{ marginRight: '10px', cursor: 'pointer' }} onClick={this.addOneROw}>
                                    <a href="javascript:void(0);">新增</a>
                                </span>
                                <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                                    <a href="javascript:void(0);">删除</a>
                                </Popconfirm>
                            </span>
                        }}
                    />
                </Table>
                <div style={{ marginTop: '40px', borderTop: '1px solid #a1a1a1' }}>
                    <Row gutter={24} style={{ margin: "40px 0", fontSize: '18px' }}>
                        <Col span={12} >合计金额：<span>23450</span>
                        </Col>
                        <Col span={12} >
                            合计数量：
                        <span>20</span>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ margin: "40px 0", fontSize: '18px' }}>
                        <Col span={12} >
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button type="primary" style={{ width: '100px', height: '50px' }} size={'large'}>保存</Button>
                            <Button style={{ width: '100px', height: '50px' }} size={'large'}>取消</Button>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
    }
}
export default PutInStorage