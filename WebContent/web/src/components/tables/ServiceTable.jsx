import React from 'react';
import { Row, Col, Card, Select, Table, Iconconst, Popover, Popconfirm, Button, InputNumber, Icon } from 'antd';
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
import update from 'immutability-helper'
import $ from 'jquery'
import ProgramSearch from '../model/ProgramSearch.jsx'
const Option = Select.Option;
const total = {
    key: '',
    index: '',
    total: '合计',
    singleSummation: '0'
}
class ServiceTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: false,
            data: []
        }
    }

    componentDidMount() {
    }

    handleCancel = () => {
        this.setState({
            view: false
        })
    }

    handleChange = (index, value) => {
        this.props.changeProjectSelect(index, value);
    }

    handleOk = (data) => {
        console.log(data)
        let datalist = this.state.data,
            parts = []
        if (datalist.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let same = 0;
                for (let j = 0; j < datalist.length; j++) {
                    if (data[i].partId == datalist[j].partId) {
                        same++
                    }
                }
                if (same == 0) {
                    datalist.push(data[i])
                    datalist.push(total)
                }
            }
        } else {
            datalist.push(...data)
            datalist.push(total)
        }
        for (let item of datalist) {
            // parts.push(item.inventoryInfos)
            if (item.inventoryInfos) {
                parts.push(...item.inventoryInfos)
            }
        }
        console.log(parts)
        this.props.getPartsDetail(parts)
        this.setState({
            view: false,
            data: datalist
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
        }), staffOptions = this.props.staffList.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        }), cardOptions = this.props.cards ? this.props.cards.map((item, index) => {
            const content = (
                <div>
                    <p>Content</p>
                    <p>Content</p>
                </div>
            );
            const pop = <Popover placement="rightTop" content={content} title="Title">
                <Button type="primary">Hover me</Button>
            </Popover>
            return <Option key={index} value={item.id + ''}>{item.service.name + item.service.id}{pop}</Option>
        }) : []

        return <Card bodyStyle={{ background: '#fff' }} style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '16px', marginBottom: '10px' }}> 服务项目&nbsp;&nbsp;&nbsp;
            <div style={{ display: 'inline-block', color: '#49a9ee', cursor: 'pointer' }} onClick={() => { this.setState({ view: true }) }}><Icon type="plus-circle-o" />&nbsp;增加</div>
            </div>
            <ProgramSearch programId={this.props.programId} view={this.state.view} handleCancel={this.handleCancel} handleOk={this.handleOk}></ProgramSearch>
            <Table className="accountTable" dataSource={this.state.data} bordered>
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
                        if ((index + 1) < this.state.data.length) {
                            return <Select showSearch
                                style={{ width: '100px' }}
                                defaultValue={text}
                                placeholder="输入项目名称"
                                onSelect={(e) => this.handleChange(index, e)}
                            >
                                {projectOptions}
                            </Select>
                        }
                    }
                    }
                />
                <Col
                    title="项目价格"
                    key="price"
                    dataIndex="price"
                />
                {this.props.programId == '2' && <Col
                    title="参考工时"
                    key="referWorkTime"
                    dataIndex="referWorkTime"
                />}
                {this.props.programId == '2' && <Col
                    title="工时单价"
                    key="price"
                    dataIndex="price"
                />}
                <Col
                    title="单项小计"
                    key="singleSummation"
                    dataIndex="singleSummation"
                />
                <Col
                    title="施工人员"
                    key="builder"
                    dataIndex="builder"
                    render={(text, record, index) => {
                        if ((index + 1) < this.state.data.length) {
                            return <Select showSearch
                                style={{ width: '160px', maxHeight: '500px' }}
                                placeholder="输入施工人员"
                                optionFilterProp="children "
                                mode="multiple"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {staffOptions}
                            </Select>
                        }
                    }}
                />
                <Col
                    title="会员卡号"
                    key="memberCard"
                    dataIndex="memberCard"
                    render={(text, record, index) => {
                        if ((index + 1) < this.state.data.length) {
                            return <Select showSearch
                                style={{ width: '100px' }}
                                placeholder="输入会员卡号"
                                optionFilterProp="children "
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {cardOptions}
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