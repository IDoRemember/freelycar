import React from 'react';
import { Row, Col, Card, Select, Table, Iconconst, Popover, Popconfirm, Button, InputNumber, Icon } from 'antd';
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
import update from 'immutability-helper'
import $ from 'jquery'
import ProgramSearch from '../model/ProgramSearch.jsx'
import { Link } from 'react-router';
const Option = Select.Option;
const total = {
    key: '',
    index: '',
    total: '合计',
    singleSummation: '0'
}, columns = [{
    title: '项目名称',
    dataIndex: 'name',
    key: 'name'
}, {
    title: '可用次数',
    dataIndex: 'times',
    key: 'times'
}]


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

    handleOk = (data) => {
        console.log(data)
        let datalist = this.state.data,
            parts = []
        if (datalist.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let same = 0;
                for (let j = 0; j < datalist.length; j++) {
                    if (data[i].id == datalist[j].id) {
                        same++
                    }
                }
                if (same == 0) {
                    datalist.unshift(data[i])
                }
            }
        } else {
            datalist.push(...data)
            datalist.push(total)
        }
        this.props.getPartsDetail(datalist)
        this.setState({
            view: false,
            data: datalist
        })
    }
    onDelete = (index) => {
        const dataSource = [...this.state.data];
        dataSource.splice(index, 1);
        this.setState({ data: dataSource });
        this.props.getPartsDetail(dataSource)
    }
    render() {
        const projectOptions = this.props.optionService.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        }), staffOptions = this.props.staffList.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.name}</Option>
        }), cardOptions = this.props.cards ? this.props.cards.map((item, index) => {
            console.log(item)
            let projectInfos = []
            for (let item of item.projectInfos) {
                let obj = {
                    key: item.id,
                    name: item.project.name,
                    times: item.remaining
                }
                projectInfos.push(obj)
            }
            const content = (
                <div style={{ width: '200px' }}>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >卡类名称：</Col>
                        <Col span={12}>{item.service.name}</Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >卡类属性：</Col>
                        <Col span={12}>{item.service.type == '1' ? '组合次卡' : '次卡'}</Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >售卡金额：</Col>
                        <Col span={12}>{item.service.price}</Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >有效期：</Col>
                        <Col span={12}>{item.service.validTime}年</Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                        <Col span={12} >剩余次数明细</Col>
                    </Row>
                    <Table size={'small'} bordered columns={columns} dataSource={projectInfos} />

                </div>
            );
            const pop = <Popover arrowPointAtCenter placement="left" content={content} title="Title" style={{ zIndex: '1000' }}>
                {item.service.name + item.service.id}
            </Popover>
            return <Option key={index} value={item.id + ''} style={{ zIndex: '100' }}>{pop}</Option>
        }) : []

        return <Card bodyStyle={{ background: '#fff' }} style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '16px', marginBottom: '10px' }}> 服务项目&nbsp;&nbsp;&nbsp;
            <div style={{ display: 'inline-block', color: '#49a9ee', cursor: 'pointer' }} onClick={() => { this.setState({ view: true }) }}><Icon type="plus-circle-o" />&nbsp;增加</div>
            </div>
            <ProgramSearch programId={this.props.programId} view={this.state.view} handleCancel={this.handleCancel} handleOk={this.handleOk}></ProgramSearch>
            <Table className="accountTable" dataSource={this.state.data} bordered >
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
                    key="pricePerUnit"
                    dataIndex="pricePerUnit"
                />}
                <Col
                    title="单项小计"
                    key="totalPrice"
                    dataIndex="totalPrice"
                    render={(text, record, index) => {
                        if (index == (this.state.data.length - 1)) {
                            let total = 0
                            for (let item of this.state.data) {
                                if (item.price) {
                                    total = total + item.price + item.pricePerUnit * item.referWorkTime
                                }
                            }
                            return <span>{total}</span>
                        }
                        return <span>{record.price + record.pricePerUnit * record.referWorkTime}</span>
                    }}
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
                                optionFilterProp="children"
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
                            return <div id="memberCard"><Select showSearch
                                style={{ width: '120px', maxHeight: '200px' }}
                                placeholder="输入会员卡号"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                dropdownMatchSelectWidth={false}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {cardOptions}
                                <Option style={{ padding: '0', textAlign: 'center' }} key={-1} value={'会员开卡'}><Link to="/app/member/memberShip" style={{ width: '100%', padding: '10', display: 'block' }}>会员开卡</Link></Option>
                            </Select>
                            </div>
                        }
                    }}
                />
                <Col
                    title="抵扣卡次"
                    key="DeductionCardTime"
                    dataIndex="DeductionCardTime"
                    render={(text, record, index) => {
                        if ((index + 1) < this.state.data.length) {
                            return <InputNumber min={1}></InputNumber>
                        }
                    }}
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