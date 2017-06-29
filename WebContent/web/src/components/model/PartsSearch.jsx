import React from 'react';
import { Row, Col, Button, Table, Modal, Input } from 'antd';
import $ from 'jquery'
const Search = Input.Search
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
            selectedRows:[],
            visible: this.props.view,
            partName: '',
            tradeName:'',
            pagination: {},
            data: []
        }
    }
    componentDidMount() {
        this.getList(null, null, 1, 10)
    }
    componentWillReceiveProps(newProps) {
        if (newProps.view != this.state.visible) {
            this.setState({
                visible: newProps.view
            })
        }
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
                            rowKey: result.data[i].id,
                            partId: result.data[i].id,
                            partName: result.data[i].name,
                            attribute: result.data[i].property,
                            price: result.data[i].price,
                            inventory: result.data[i].amount,
                            category: result.data[i].type,
                            comment: result.data[i].comment,
                            providers: result.data[i].providers
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
    setSearchName = ()=>{
        this.setState({
            tradeName: e.target.value
        })
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
        }
        return <Modal
            visible={this.state.visible}
            width={800}
            title="配件查询"
            onOk={()=>this.props.handleOk(this.state.selectedRows)}
            onCancel={()=>this.props.handleCancel()}
            footer={[
                <Button key="back" size="large" onClick={()=>this.props.handleCancel()}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={()=>this.props.handleOk(this.state.selectedRows)}>
                    确认
            </Button>
            ]}
        >
            <Row gutter={24} style={{ marginBottom: '10px' }}>
                <Col span={10} style={{ verticalAlign: 'middle' }}>
                    <Search
                        placeholder="可按配件名称、类型等进行搜索"
                        style={{ width: '200px', marginBottom: '10px' }}
                        onSearch={value => this.getList(value, -1, 1, 10)}
                        onChange={e => this.setSearchName( e.target.value)}
                        value={this.state.partName}
                    />
                </Col>
                <Col span={10} style={{ verticalAlign: 'middle' }}>
                    <Button type="primary" style={{ marginLeft: '10px' }} size={'large'}>新增配件</Button>
                </Col>
            </Row>
            <Table loading={this.state.data?false:true} pagination={this.state.pagination} bordered onChange={(pagination) => this.handleTableChange(pagination)} columns={columns} dataSource={this.state.data} rowSelection={rowSelection} />
        </Modal>
    }
}
export default IncomeDetail