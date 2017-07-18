import React from 'react';
import { Row, Col, Card, Table, Radio, Select, InputNumber, Input, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Link } from 'react-router';
import $ from 'jquery';

const columns = [
    { title: '项目费用', dataIndex: 'itemFee', key: 'itemFee' },
    { title: '配件费用', dataIndex: 'productFee', key: 'productFee' },
    { title: '实际工时', dataIndex: 'workHour', key: 'workHour' },
    { title: '工时单价', dataIndex: 'perHourCost', key: 'perHourCost' },
    { title: '合计', dataIndex: 'totalFee', key: 'totalFee' },
];
const data = [
    { key: 1, itemFee: 100, productFee: 32, workHour: 2, perHourCost: 25, totalFee: 12 }

];
const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};
const Option = Select.Option;
class CostClose extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1
        }
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    componentDidMount() {
        $.ajax({
            url: 'api/pay/consumpay',
            type: 'get',
            data:{consumOrdersId:''},
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if (res.code == '0') {
                    this.setState({
                        optionService: res.data
                    });
                }
            }
        });

    }

    render() {
        function handleChange(value) {
            console.log(`selected ${value}`);
        }
        function onChange(value) {
            console.log('changed', value);
        }
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="消费开单" second="结算中心" />
                <div style={{ fontSize: '20px', textAlign: 'center', marginBottom: '10px' }}>结算中心</div>

                <Row gutter={12} >
                    <Col span={2} offset={2}></Col>
                    <Col className="gutter-row" span={16}>
                        <div className="gutter-box">
                            <Card title="应收金额" bordered={false} >
                                <Table className="accountTable" columns={columns} dataSource={data} />
                            </Card>
                            <Card title="支付方式" bordered={false} className="choosetype">
                                <RadioGroup onChange={this.onChange} value={this.state.value}>
                                    <Radio style={radioStyle} value={1}>

                                        <div style={{ display: 'inline-block', width: '80%' }}>会员卡类:
                                        <div style={{ display: 'inline-block', marginLeft: '10px' }}><Select defaultValue="countCard" style={{ width: 120 }} onChange={handleChange}>
                                                <Option value="countCard">次卡</Option>
                                                <Option value="groupCard">组合卡</Option>
                                            </Select>
                                            </div>
                                        </div>

                                        <div style={{ display: 'inline-block' }}>会员卡号:
                                        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                                <Select defaultValue="101001" style={{ width: 120 }} onChange={handleChange}>
                                                    <Option value="101001">101001</Option>
                                                    <Option value="100020">100020</Option>
                                                </Select>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '10px', marginLeft: '20px' }}>
                                            卡扣次数：
                                            <div style={{ display: 'inline-block', margin: '10px' }}>
                                                <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                                            </div>
                                        </div>

                                    </Radio>
                                    <Radio style={radioStyle} value={2}>

                                        <div style={{ display: 'inline-block', width: '80%' }}>支付方式:
                                            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                                <Select defaultValue="现金" style={{ width: 120 }} onChange={handleChange} >
                                                    <Option value="cash">现金</Option>
                                                    <Option value="wechatpay">微信</Option>
                                                    <Option value="alipay">支付宝</Option>
                                                    <Option value="suningpay">易付宝</Option>
                                                </Select>
                                            </div>
                                        </div>


                                        <div style={{ display: 'inline-block' }}>支付金额:
                                            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                                <Input style={{ width: '120px' }} />
                                            </div>
                                        </div>
                                    </Radio>
                                </RadioGroup>
                                <div style={{ display: 'block', textAlign: 'center' }}>
                                    < Button type="primary" >确定</Button>
                                    < Button type="primary">挂单</Button>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default CostClose;