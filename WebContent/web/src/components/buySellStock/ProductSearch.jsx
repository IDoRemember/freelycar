import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx';
import ServiceTable from '../tables/ServiceTable.jsx';
import PartsDetail from '../tables/PartsDetail.jsx';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import AjaxGet from '../../utils/ajaxGet'
import update from 'immutability-helper'
import $ from 'jquery'
import { Row, Col, Card, Button, Input, Select, Menu, Icon, Switch, TreeSelect, Table } from 'antd';
const Option = Select.Option,
    SubMenu = Menu.SubMenu,
    Search = Input.Search
class ProductSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            pagination: {},
            tradeName: '',
            category: '',
            theme: 'light',
            current: '1',
            conlums: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => {
                    return <span>{index + 1}</span>
                }
            }, {
                title: '库存编号',
                dataIndex: 'number',
                key: 'number'
            }, {
                title: '配件名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '配件类别',
                dataIndex: 'category',
                key: 'category'
            }, {
                title: '配件品牌',
                dataIndex: 'brand',
                key: 'brand'

            }, {
                title: '规格',
                dataIndex: 'specification',
                key: 'specification'
            }, {
                title: '属性',
                dataIndex: 'attribute',
                key: 'attribute'
            }, {
                title: '配件价格',
                dataIndex: 'price',
                key: 'price'
            }, {
                title: '可用库存',
                dataIndex: 'stock',
                key: 'stock'
            }, {
                title: '供应商',
                dataIndex: 'supplier',
                key: 'supplier'
            }, {
                title: '联系方式',
                dataIndex: 'phone',
                key: 'phone'
            }],
            data: []
        }
    }
    componentDidMount() {
        this.getList(1, 10)
        this.getTypeList(1, 10)
    }
    getTypeList = (page, pageSize) => {
        $.ajax({
            url: 'api/inventory/listtype',
            data: {
                page: page,
                pagination: {},
                number: pageSize
            },
            success: (result) => {
                if (result.code == '0') {
                    console.log(result)
                    for (let item of result.data) {
                        this.setState({ options: update(this.state.options, { $push: [item] }) })
                    }
                }
            }
        })
    }
    getList = (page, pageSize) => {
        $.ajax({
            url: 'api/inventory/list',
            data: {
                page: page,
                number: pageSize
            },
            success: (result) => {
                if (result.code == "0") {
                    console.log(result)
                    let datalist = []
                    for (let i = 0; i < result.data.length; i++) {
                        let dataitem = {
                            key: result.data[i].id,
                            number: result.data[i].id,
                            id: result.data[i].id,
                            name: result.data[i].name,
                            category: result.data[i].type,
                            brand: result.data[i].brand,
                            specification: result.data[i].standard,
                            attribute: result.data[i].property,
                            price: result.data[i].price,
                            stock: result.data[i].amount,
                            supplier: result.data[i].providers.name,
                            createDate: result.data[i].createDate,
                            phone: result.data[i].providers.phone
                        }
                        datalist.push(dataitem)
                        if (datalist.length == result.data.length) {
                            this.setState({
                                data: datalist,
                                pagination: { total: result.realSize },
                            })
                        }
                    }
                }
            },
        })
    }
    handleChange = (value) => {
        this.setState({
            category: value
        })
    }
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.log(pagination)
        this.setState({
            pagination: pager
        })
        this.getList(pagination.current, 10)
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    startQuery = () => {
        $.ajax({
            type: 'GET',
            url: 'api/inventory/querytype',
            // contentType:'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                name: this.state.category,
                page: 1,
                number: 10
            },
            traditional: true,
            success: (result) => {
                if (result.code == "0") {

                }
                console.log(result)
            }
        })
    }
    render() {
        const plateOptions = [...new Set(this.state.options)].map((item, index) => {
            return <Option key={index} value={item.typeName + ''}>{item.typeName}</Option>
        });
        return <div>
            <BreadcrumbCustom first="进销存管理" second="库存查询" />
            <Card>
                <div>
                    <Row gutter={24} style={{ marginBottom: '10px' }}>
                        <Col span={10} style={{ verticalAlign: 'middle' }}>
                            商品名：<Search
                                placeholder="输入商品名称"
                                style={{ width: '200px', marginBottom: '10px' }}
                                onSearch={value => console.log(value)}
                                onChange={e => this.setState({ tradeName: e.target.value })}
                                value={this.state.tradeName}
                            />
                        </Col>
                        <Col span={10} style={{ verticalAlign: 'middle' }}>
                            商品类别：<Select
                                showSearch
                                style={{ width: '200px' }}
                                placeholder="选择商品类别进行搜索"
                                optionFilterProp="children"
                                onChange={(value) => this.handleChange(value)}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {plateOptions}
                            </Select>
                            <Button onClick={() => this.startQuery()} type="primary" style={{ marginLeft: '10px' }} size={'large'}>查询</Button>

                        </Col>
                    </Row>
                    < Table pagination={this.state.pagination} bordered columns={this.state.conlums} dataSource={this.state.data} onChange={(pagination) => this.handleTableChange(pagination)} />
                </div>
            </Card>
        </div>
    }
}
export default ProductSearch