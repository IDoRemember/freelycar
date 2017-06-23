import React from 'react';
import { Row, Col, Card, Select, Table, Iconconst, Popconfirm } from 'antd';
import AjaxGet from '../../utils/ajaxGet'
import AjaxSend from '../../utils/ajaxSend'
const Option = Select.Option;
class ServiceTable extends React.Component {
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
        const projectOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })

        return <Card bodyStyle={{ background: '#fff' }} style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '18px', marginBottom: '10px' }}>服务项目</div>
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
                        console.log(record)
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