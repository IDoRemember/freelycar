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
    dataIndex: 'id',
    key: 'id'
}, {
    title: '配件名称',
    dataIndex: 'name',
    key: 'name'
}, {
    title: '配件品牌',
    dataIndex: 'brandName',
    key: 'brandName'
}, {
    title: '配件类别',
    dataIndex: 'typeName',
    key: 'typeName'
}, {
    title: '属性',
    dataIndex: 'property',
    key: 'property'
}, {
    title: '规格',
    dataIndex: 'standard',
    key: 'standard'
}, {
    title: '配件价格',
    dataIndex: 'price',
    key: 'price'
}, {
    title: '可用库存',
    dataIndex: 'amount',
    key: 'amount'
}, {
    title: '备注',
    dataIndex: 'comment',
    key: 'comment'
}];
class PartsSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            selectedRows: [],
            selectedRowKeys: ['inv20170724f3popv'],
            typeList: [],
            type: '',
            visible: this.props.view,
            partName: '',
            pagination: {},
            data: [],
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
                    this.setState({ loading: false })
                    let datalist = result.data;

                    for (let item of datalist) {
                        item.key = item.id;
                    }
                    this.setState({
                        data: datalist,
                        pagination: { total: result.realSize },
                    })

                } else if (result.code == '2') {
                    this.setState({
                        data: [],
                        pagination: { total: 0 },
                    })
                }
            },
        })
    }

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        })

        this.getList(this.state.partName, this.state.type, pagination.current, 10)
    }

    setSearchName = (value) => {
        this.setState({
            partName: value
        })
    }

    setSearchType = (value) => {
        this.setState({
            type: value
        })
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys);
                this.setState({
                    selectedRows: selectedRows,
                    selectedRowKeys: selectedRowKeys
                })
            },
            selectedRowKeys: this.state.selectedRowKeys

            // getCheckboxProps: record => ({
            //     disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            // }),

        }, partTypeOptions = this.state.typeList.map((item, index) => {
            return <Option key={index} value={item.id + ''}>{item.typeName}</Option>
        }), radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return <Modal
            visible={this.state.visible}
            width='80%'
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
            <Row gutter={24} style={{ marginBottom: '10px' }} id="parts-area">
                <Col span={10} style={{ verticalAlign: 'middle' }}>
                    按配件名称进行搜索：
                    <Input
                        style={{ width: '120px', marginBottom: '10px', marginLeft: '20px' }}
                        onChange={e => this.setSearchName(e.target.value)}
                        value={this.state.partName}
                    />
                </Col>
                <Col span={10} style={{ verticalAlign: 'middle' }} >
                    按配件类别进行搜索：
                    <Select
                        showSearch
                        style={{ width: '120px', marginLeft: '20px' }}
                        optionFilterProp="children"
                        getPopupContainer={() => document.getElementById('parts-area')}
                        onChange={(value) => this.setSearchType(value)}
                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    >
                        {partTypeOptions}
                    </Select>
                </Col>
                <Col span={2}>
                    <Button type="primary" onClick={() => { this.getList(this.state.partName, this.state.type, 1, 10) }}>查询</Button>
                </Col>
            </Row>
            <Table loading={this.state.loading} pagination={this.state.pagination} bordered onChange={(pagination) => this.handleTableChange(pagination)} columns={columns} dataSource={this.state.data} rowSelection={rowSelection} />
        </Modal>
    }
}
export default PartsSearch