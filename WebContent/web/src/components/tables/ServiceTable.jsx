import React from 'react';
import { Row, Col, Card, Select, Table, Iconconst, Popconfirm, Button, InputNumber } from 'antd';
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
import update from 'immutability-helper'
import $ from 'jquery'
const Option = Select.Option;
class ServiceTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }

    numberChange = (index, value) => {
        console.log(index, value);
        let price = this.state.data[index].price;
        this.setState({
            data: update(this.state.data, { [index]: { singleSummation: { $set: price * value } } })
        }, () => {
            console.log(this.state.data);
        })
    }

    handleChange = (index, value) => {
        this.props.changeProjectSelect(index,value);
    }


    addOneROw = () => {
        let oneRow = {
            key: this.state.data.length,
            index: this.state.data.length,
            project: 'xiuche',
            price: '30.00',
            number: '20',
            singleSummation: '20',
            DeductionCardTime: '1',
        }
        let data = this.state.data
        data.splice(data.length - 1, 0, oneRow)
        this.setState({
            data: data
        })
    }
    onDelete = (index) => {
        const dataSource = [...this.state.data];
        dataSource.splice(index, 1);
        this.setState({ data: dataSource });
    }
    render() {
        const projectOptions = this.props.optionService.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        })

        return <Card bodyStyle={{ background: '#fff' }} style={{ marginBottom: '10px' }}>
            <Button type="primary" style={{ marginBottom: '10px' }}>增加服务项目</Button>
            <Table className="accountTable" dataSource={this.props.dataService} bordered>
                <Col
                    title="序号"
                    dataIndex="index"
                    key="index"
                    render={(text, record, index) => {
                        return <span>{index + 1}</span>
                    }}
                />
                <Col
                    title=""
                    dataIndex="total"
                    key="total"
                />
                <Col
                    title="项目名称"
                    key="name"
                    dataIndex="name"
                    render={(text, record, index) => {
                        if (index + 1 < this.props.dataService.length) {
                            return <Select showSearch
                                style={{ width: '100px' }}
                                placeholder="输入项目名称"
                                defaultValue={this.props.dataService[index].name}
                                onSelect={(e) => this.handleChange(index, e)}
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
                    render={(text, record, index) => {
                        if (index + 1 < this.props.dataService.length) {
                            return <InputNumber min={1} max={99} defaultValue={1} onChange={(e) => { this.numberChange(index, e) }} />
                        }
                    }}
                />
                <Col
                    title="参考工时"
                    key="referWorkTime"
                    dataIndex="referWorkTime"
                />
                <Col
                    title="工时单价"
                    key="pricePerUnit"
                    dataIndex="pricePerUnit"
                />
                <Col
                    title="单项小计"
                    key="singleSummation"
                    dataIndex="singleSummation"
                />
                <Col
                    title="会员卡号"
                    key="memberCard"
                    dataIndex="memberCard"
                    render={(text, record, index) => {
                        if (index + 1 < this.props.dataService.length) {
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
                    title="抵扣卡次"
                    key="DeductionCardTime"
                    dataIndex="DeductionCardTime"
                />
                <Col
                    title="操作"
                    key="action"
                    render={(text, record, index) => {
                        if (!record.total) {
                            return <span>
                                <span style={{ marginRight: '10px', cursor: 'pointer' }} onClick={this.addOneROw}>
                                    <a href="javascript:void(0);">新增</a>
                                </span>
                                <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                                    <a href="javascript:void(0);">删除</a>
                                </Popconfirm>
                            </span>
                        }
                    }}
                />
            </Table>
        </Card>
    }
}
export default ServiceTable