import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import PartsDetail from '../tables/PartsDetail.jsx';
import { Row, Col, Card, Button, Select, Table, Popconfirm } from 'antd';
import AjaxGet from '../../utils/ajaxGet';
const Option = Select.Option;
class ProviderManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
            conlums: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index'
            }, {
                title: '供应商名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks'
            }, {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            },  {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record, index) => {
                    return <span>
                        <span style={{ marginRight: '10px', cursor: 'pointer' }} onClick={this.addOneROw}>
                            <a href="javascript:void(0);">新增</a>
                        </span>
                        <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                            <a href="javascript:void(0);">删除</a>
                        </Popconfirm>
                    </span>
                }
            }],
            data: [{
                key: '1',
                index: '1',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }, {
                key: '2',
                index: '2',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }, {
                key: '3',
                index: '3',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }, {
                key: '4',
                index: '4',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }]
        }
    }
    componentDidMount() {
        AjaxGet('GET', 'data/LicensePlate.json', (res) => {
            this.setState({ option: res.data })
        })
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        }, plateOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        });
        return <div>
            <BreadcrumbCustom first="产品管理" second="供应商管理" />
            <Card>
                <div style = {{marginBottom:'40px'}}>
                <span>供应商名称：</span>
                <Select showSearch
                    style={{ width: '200px' }}
                    placeholder="输入供应商名称"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    {plateOptions}
                </Select>                            
                <Button type="primary" style={{ margin: '10px 10px 10px 40px', width: '100px', height: '50px' }} size={'large'}>查询</Button>
                </div>
                <div className="table-operations">
                    <Button onClick={this.setAgeSort}>修改</Button>
                    <Button onClick={this.clearFilters}>删除</Button>
                </div>
                < Table className="accountTable" bordered columns= { this.state.conlums } dataSource= { this.state.data } onChange= { this.handleChange } rowSelection= { rowSelection } />
            </Card >
        </div >
    }
}
export default ProviderManage