import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Table, Row, Col, Popconfirm } from 'antd';
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
                project: '洗车',
                price: '20.00',
                number: '20',
                singleSummation: '20',
                DeductionCardTime: '1',
            }, {
                key: '',
                index: '',
                total: '合计',
                singleSummation: '20',
                DeductionCardTime: '1',
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
                    <Col span={12} >单据编号：<span>p1231231231232123</span>
                    </Col>
                    <Col span={12} >
                        单据时间：
                        <span>2017-5-27 14:00:08</span>
                    </Col>
                </Row>
                <Table className="accountTable" dataSource={this.state.data} bordered>
                    <Col
                        title="序号"
                        dataIndex="index"
                        key="index"
                    />
                    <Col
                        title=""
                        dataIndex="total"
                        key="total"
                    />
                    <Col
                        title="项目名称"
                        key="project"
                        dataIndex="project"
                        render={(text) => {
                            if (!text) {
                                return <span> </span>
                            } else {
                                return <Select showSearch
                                    style={{ width: '100px' }}
                                    placeholder="输入项目名称"
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
                        title="项目价格"
                        key="price"
                        dataIndex="price"
                    />
                    <Col
                        title="数量"
                        key="number"
                        dataIndex="number"
                    />
                    <Col
                        title="单项合计"
                        key="singleSummation"
                        dataIndex="singleSummation"
                    />
                    <Col
                        title="抵扣卡次"
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
                <div style={{ marginTop: '40px', borderTop: '1px solid #e9e9e9' }}>
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
                        <Col span={12}  style={{textAlign:'right'}}>
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