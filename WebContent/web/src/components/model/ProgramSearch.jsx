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
    title: '项目名称',
    dataIndex: 'name',
    key: 'name'
}, {
    title: '项目类别',
    dataIndex: 'program',
    key: 'program',
    render: (text, record, index) => {
        return <span>{text.name}</span>
    }

}, {
    title: '项目价格',
    dataIndex: 'price',
    key: 'price'
}, {
    title: '参考工时',
    dataIndex: 'referWorkTime',
    key: 'referWorkTime'
}, {
    title: '工时单价',
    dataIndex: 'pricePerUnit',
    key: 'pricePerUnit'
}, {
    title: '备注',
    dataIndex: 'comment',
    key: 'comment'
}];
class ProgramSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            selectedRows: [],
            typeList: [],
            value: 1,
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
            url: 'api/program/list',
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
            url: 'api/project/query',
            data: {
                name: name,
                programId: this.props.programId,
                page: page,
                number: pageSize
            },
            success: (result) => {
                if (result.code == "0") {
                    this.setState({ loading: false })
                    let datalist = []
                    for (let item of result.data) {
                        item.key = item.id
                        datalist.push(item)
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
            partName: value,
            type: -1
        })
    }
    setSearchType = (value) => {
        this.setState({
            type: value,
            partName: null
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
                let oldRows = this.state.selectedRows
                for (let item of selectedRows) {
                    oldRows = oldRows.filter((obj) => {
                        return item.key !== obj.key;
                    });
                }
                oldRows.push.apply(oldRows, selectedRows)
                this.setState({
                    selectedRows: oldRows
                })
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
            visible={this.props.view}
            width={800}
            title="项目查询"
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
                <Col span={10} style={{ verticalAlign: 'middle' }} id="provider-area">
                    项目名称：
                    <Input
                        placeholder="按项目名称进行搜索"
                        style={{ width: '150px', marginBottom: '10px', marginLeft: '20px' }}

                        onChange={e => this.setSearchName(e.target.value)}
                        value={this.state.partName}
                    />
                </Col>
                {/* <Col span={10} style={{ verticalAlign: 'middle' }}>
                    项目类别：
                     <Select
                        showSearch
                        style={{ width: '120px', marginLeft: '20px' }}
                        placeholder="选择项目类别"
                        optionFilterProp="children"
                        optionLabelProp="children"
                        labelInValue
                        onChange={(value) => this.setSearchType(value)}
                        getPopupContainer={() => document.getElementById('provider-area')}
                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    >
                        {partTypeOptions}
                    </Select>
                </Col> */}
                <Col span={2}>
                    <Button type="primary" onClick={() => { this.getList(this.state.partName, this.state.type, 1, 10) }}>查询</Button>
                </Col>
            </Row>
            <Table loading={this.state.loading} pagination={this.state.pagination} bordered onChange={(pagination) => this.handleTableChange(pagination)} columns={columns} dataSource={this.state.data} rowSelection={rowSelection} />
        </Modal>
    }
}
export default ProgramSearch