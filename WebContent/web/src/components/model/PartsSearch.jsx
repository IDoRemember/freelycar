import React from 'react';
import { Row, Col, Button, Table, Modal, Select, Input, Radio } from 'antd';
import $ from 'jquery'
const Search = Input.Search,
    Option = Select.Option,
    RadioGroup = Radio.Group;
const columns = [{
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => {
        return <span>{index + 1}</span>
    }
}, {
    title: '配件编号',
    dataIndex: 'partId',
    key: 'partId'
}, {
    title: '配件名称',
    dataIndex: 'partName',
    key: 'partName'
}, {
    title: '配件品牌',
    dataIndex: 'brand',
    key: 'brand'
}, {
    title: '配件类别',
    dataIndex: 'category',
    key: 'category',
    render: (text, record, index) => {
        return <span>{text.typeName}</span>
    }
}, {
    title: '规格属性',
    dataIndex: 'attribute',
    key: 'attribute'
}, {
    title: '配件价格',
    dataIndex: 'price',
    key: 'price'
}, {
    title: '可用库存',
    dataIndex: 'inventory',
    key: 'inventory'
}, {
    title: '备注',
    dataIndex: 'comment',
    key: 'comment'
}];
class IncomeDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            selectedRows: [],
            typeList: [],
            value: 1,
            visible: this.props.view,
            partName: '',
            tradeName: '',
            pagination: {},
            data: []
        }
    }
    componentDidMount() {
        this.getList(null, null, 1, 10)
        this.getTypeList(1, 99)
    }
    componentWillReceiveProps(newProps) {
        if (newProps.view != this.state.visible) {
            this.setState({
                visible: newProps.view
            })
        }
    }
    getTypeList = (page, pageSize) => {
        $.ajax({
            url: 'api/inventory/querytype',
            data: {
                page: page,
                number: pageSize
            },
            success: (res) => {
                console.log(res)
                if (res.code == "0") {
                    this.setState({
                        typeList: res.data
                    })
                }
            }
        })
    }
    getList = (name, typeId, page, pageSize) => {
        $.ajax({
            url: 'api/inventory/list',
            data: {
                name: name,
                typeId: typeId,
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
                            partId: result.data[i].id,
                            partName: result.data[i].name,
                            attribute: result.data[i].property,
                            standard:result.data[i].standard,
                            price: result.data[i].price,
                            brand: result.data[i].brand.name,
                            inventory: result.data[i].amount,
                            category: result.data[i].type,
                            comment: result.data[i].comment,
                            provider: result.data[i].provider
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
    setSearchName = (value) => {
        this.setState({
            tradeName: value
        })

    }
    setSearchType = (value) => {
        this.setState({
            type: value
        })
        this.getList(null, value, 1, 10)
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRows: selectedRows
                })
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedIds: ', selectedRows);
            },

            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        }, partTypeOptions = this.state.typeList.map((item, index) => {
            return <Option key={item.id} value={item.id + ''}>{item.typeName}</Option>
        }), radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return <Modal
            visible={this.state.visible}
            width={800}
            title="配件查询"
            onOk={() => this.props.handleOk(this.state.selectedRows)}
            onCancel={() => this.props.handleCancel()}
            footer={[
                <Button key="back" size="large" onClick={() => this.props.handleCancel()}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={() => this.props.handleOk(this.state.selectedRows)}>
                    确认
            </Button>
            ]}
        >
            <Row gutter={24} style={{ marginBottom: '10px' }}>
                <Col span={10} style={{ verticalAlign: 'middle' }}>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio style={radioStyle} value={1}>
                            按配件名称进行搜索
                            {this.state.value==1&&<Search
                                placeholder="按配件名称进行搜索"
                                style={{ width: '200px', marginBottom: '10px' ,marginLeft:'20px'}}
                                onSearch={value => this.getList(value, -1, 1, 10)}
                                onChange={e => this.setSearchName(e.target.value)}
                                value={this.state.partName}
                            />}
                            </Radio>
                        <Radio style={radioStyle} value={2}>
                            按配件类别进行搜索
                            {this.state.value==2&&<Select
                                mode="combobox"
                                showSearch
                                style={{ width: '100px', marginLeft: '20px' }}
                                placeholder="输入配件类别"
                                optionFilterProp="children"
                                optionLabelProp="children"
                                labelInValue
                                onChange={(value) => this.setSearchType(value)}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {partTypeOptions}
                            </Select>}
                        </Radio>
                    </RadioGroup>


                </Col>
                {/*<Col span={12} style={{ verticalAlign: 'middle' }}>
                    <Button type="primary" style={{ marginLeft: '10px' }} size={'large'}>新增配件</Button>
                </Col>*/}
            </Row>
            <Table loading={this.state.data ? false : true} pagination={this.state.pagination} bordered onChange={(pagination) => this.handleTableChange(pagination)} columns={columns} dataSource={this.state.data} rowSelection={rowSelection} />
        </Modal>
    }
}
export default IncomeDetail