import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'

import { Row, Col, Card, Button, Radio, DatePicker, Table } from 'antd';
import moment from 'moment';

import { Link } from 'react-router';

// 日期 format
const dateFormat = 'YYYY/MM/DD';

//表格
const columns = [{
    title: '时间',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: '实际金额',
    className: 'column-money',
    dataIndex: 'money',
}, {
    title: '实际支出',
    dataIndex: 'address',
}];

const data = [{
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
}];




class BeautyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: 0
        }
    }


    handleModeChange = (e) => {
        const mode = e.target.value;
        this.setState({ mode: mode });
    }



    render() {
        return (
            <div>
                <BreadcrumbCustom first="收支查询" />

                <div>
                    <Row>
                        <Col span={18}>
                            <Radio.Group onChange={this.handleModeChange} value={this.state.mode} style={{ marginBottom: 8 }}>
                                <Radio.Button value="top">今日</Radio.Button>
                                <Radio.Button value="left">本月</Radio.Button>
                            </Radio.Group>

                        </Col>

                        {/*日期选择器*/}
                        <Col span={6}>
                            <div>
                                <span>查找日期 : </span>
                                <DatePicker.RangePicker
                                    defaultValue={[moment(), moment()]}
                                    format={dateFormat}
                                    showToday={true}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>


                <div>
                    <Row>
                        <Col span={12}>
                            <div style={{ background: '#ECECEC', padding: '30px', textAlign: 'center' }} >
                                <Card className="nature-income" title="实际收入">
                                    <p><h1>￥100</h1></p>
                                    <p><Link to='#' activeClassName="active">详情</Link></p>
                                </Card>
                            </div>
                        </Col>

                        <Col span={12}>
                            <div style={{ background: '#ECECEC', padding: '30px', textAlign: 'center' }}>
                                <Card className="nature-outcome" title="实际支出">
                                    <p><h1>￥100</h1></p>
                                    <p><Link to='#' activeClassName="active">详情</Link></p>
                                    
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>



                {/*历史收支查询*/}

                <div>

                    <Row>
                        <Col span={24}>
                            <div style={{ background: '#ECECEC', padding: '30px', textAlign: 'center' }} >
                                <Card title='历史收支查询' style={{textAlign:'left'}}>
                                    <Table
                                        columns={columns}
                                        dataSource={data}
                                        bordered
                                        className="accountTable"
                                    />
                                    <div style={{marginTop:'10px',float:'right'}}>
                                        <Link to="">更多>></Link>
                                    </div>
                                </Card>
                            </div>
                        </Col>


                    </Row>
                </div>



            </div>
        );









    }
}
export default BeautyOrder