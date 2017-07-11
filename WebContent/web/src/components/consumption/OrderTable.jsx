import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, Modal } from 'antd';
import { Link } from 'react-router';
import update from 'immutability-helper'


class OrderTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
            finishModal: false,
            reverseModal: false,
            reverseCar: {
                workman: '',
                phone: '',
                finishTime: '',
                comment: ''
            },
            finishWork: {
                workman: '',
                phone: '',
                finishTime: '',
                comment: ''
            }
        }
    }

    openFinishModal = () => {
        this.setState({
            finishModal: true
        })
    }

    finishWork = (e) => {
        this.setState({
            finishModal: false
        });
    }

    onValueChange = (key, value) => {
        this.setState({
            finishWork: update(this.state.finishWork, { [key]: { $set: value } })
        })
    }

    reverseCar = () => {
        this.setState({ reverseModal: false })
    }
    render() {
        const columns = [
            {
                title: '单据编号', dataIndex: 'id', key: 'id', render: (text, record, index) => {
                    return <div><Link to={`/app/consumption/ordermanage/${text}`}>{text}</Link></div>
                }
            },
            { title: '单据时间', dataIndex: 'createDate', key: 'createDate' },
            { title: '车牌号码', dataIndex: 'licensePlate', key: 'licensePlate' },
            { title: '客户名称', dataIndex: 'clientName', key: 'clientName' },
            { title: '手机号码', dataIndex: 'phone', key: 'phone' },
            { title: '项目类别', dataIndex: 'programName', key: 'programName' },
            {
                title: '车辆状态', dataIndex: 'state', key: 'state',
                render: (text, record, index) => {
                    let innertext = ''
                    if (text == 0) {
                        innertext = '已接车'
                    } else if (text == 1) {
                        innertext = '已完工'
                    } else if (text == 2) {
                        innertext = ' 已交车'
                    }
                    return <span>{innertext}</span>
                }
            },
            { title: '停车位置', dataIndex: 'parkingLocation', key: 'parkingLocation' },
            { title: '接车时间', dataIndex: 'pickTime', key: 'pickTime' },
            { title: '交车时间', dataIndex: 'deliverTime', key: 'deliverTime' },
            {
                title: '结算状态', dataIndex: 'payState', key: 'payState',
                render: (text, record, index) => {
                    return <span>{text == 1 ? '已结算' : '未结算'}</span>
                }
            },
            {
                title: '操作', dataIndex: 'operation', key: 'operation', render: (text, record, index) => {
                    let innertext = ''
                    if (record.payState == 0) {
                        switch (record.state) {
                            case 0: innertext = <a href="javascript:void(0);" onClick={() => this.setState({ finishModal: true })}>完工</a>;
                                break;
                            case 1: innertext = <span><Link to="" style={{ marginRight: '10px' }}>结算</Link><a href="javascript:void(0);" onClick={() => this.setState({ reverseModal: true })}>交车</a></span>;
                                break;
                            case 2: innertext = <Link to="" >结算</Link>;
                                break;
                        }
                    } else {
                        switch (record.state) {
                            case 0: innertext = <a href="javascript:void(0);" onClick={() => this.setState({ finishModal: true })}>完工</a>;
                                break;
                            case 1: innertext = <a href="javascript:void(0);" onClick={() => this.setState({ reverseModal: true })}>交车</a>;
                                break;
                            case 2: innertext = <Link to="" >
                                <span>查看</span>
                            </Link>;
                                break;
                        }
                    }

                    return <span>
                        <span style={{ marginRight: '10px' }}>
                            {innertext}
                            <Link to="">
                                <span style={{ marginLeft: '5px' }}> 修改 </span>
                            </Link>
                        </span>
                    </span>
                }
            },
        ]
        return (
            <div className="gutter-example">
                <Modal
                    title="交车"
                    visible={this.state.reverseModal}
                    onOk={() => this.reverseCar()}
                    onCancel={() => this.setState({ reverseModal: false })}
                >
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            客户姓名：
                        </Col>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            <Input value={this.state.finishWork.workman} onChange={(e) => this.onValueChange('workman', e.target.value)} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            手机号码：
                            </Col>
                        <Col span={8}>
                            <Input value={this.state.finishWork.phone} onChange={(e) => this.onValueChange('phone', e.target.value)} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            交车时间：
                            </Col>
                        <Col span={8}>
                            <Input value={this.state.finishWork.finishTime} onChange={(e) => this.onValueChange('finishTime', e.target.value)} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            备注：
                            </Col>
                        <Col span={8}>
                            <Input type="textarea" rows={3} value={this.state.finishWork.comment} onChange={(e) => this.onValueChange('comment', e.target.value)} />
                        </Col>
                    </Row>
                </Modal>
                <Modal
                    title="完工"
                    visible={this.state.finishModal}
                    onOk={() => this.finishWork()}
                    onCancel={() => this.setState({ finishModal: false })}
                >
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            施工人员：
                        </Col>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            <Input value={this.state.finishWork.workman} onChange={(e) => this.onValueChange('workman', e.target.value)} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            手机号码：
                            </Col>
                        <Col span={8}>
                            <Input value={this.state.finishWork.phone} onChange={(e) => this.onValueChange('phone', e.target.value)} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            完工时间：
                            </Col>
                        <Col span={8}>
                            <Input value={this.state.finishWork.finishTime} onChange={(e) => this.onValueChange('finishTime', e.target.value)} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            备注：
                            </Col>
                        <Col span={8}>
                            <Input type="textarea" rows={3} value={this.state.finishWork.comment} onChange={(e) => this.onValueChange('comment', e.target.value)} />
                        </Col>
                    </Row>
                </Modal>
                <Row gutter={8}>
                    <div className="gutter-box">
                        <Card bordered>
                            <Table columns={columns} dataSource={this.props.data} ></Table>
                        </Card>
                    </div>
                </Row>
            </div>
        )
    }
}
export default OrderTable