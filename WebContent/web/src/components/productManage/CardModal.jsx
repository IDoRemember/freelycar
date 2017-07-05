import React from 'react';
import { Row, Col, Card, Button, DatePicker, Table, Input, Select, Popconfirm, Modal, Form, InputNumber } from 'antd';
import { Link } from 'react-router';
// import ModalTable from '../productManage/ModalTable.jsx';
import EditableCell from '../tables/EditableCell.jsx';
import $ from 'jquery';
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
    }
};
/*父组件的表头名称*/




/*表格*/
class ModalTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //项目数据数据
            dataSource: this.props.dataSource,
            columns: this.props.columns,
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.dataSource != this.props.dataSource) {
            this.setState({
                dataSource: newProps.dataSource
            })
        }

    }

    render() {

        return (
            <div>
                <Table bordered size="small" pagination={{ pageSize: 5 }} size="small" dataSource={this.state.dataSource} columns={this.state.columns} />
            </div>
        );
    }
}



class CardModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            visible1: false,//第二个模态框的属性
            dataSource: [{
                key: '1',
                projectName: "洗车",
                restCount: 20,

            }, {
                key: '2',
                projectName: "打蜡",
                restCount: 10,
            }, {
                key: '3',
                projectName: "抢修",
                restCount: 20,

            }, {
                key: '4',
                projectName: "精洗",
                restCount: 10,
            }],
            itemData: [],//项目的数据
            count: 5,
            selectedRowKeys:[],
            selectedRows:[]
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.visible != this.props.visible) {
            this.setState({
                visible: newProps.visible
            })
        }

    }

    //加载数据
    componentDidMount() {
        this.loadData(1, 10);
    }


    loadData = (page, number, proName, programId) => {
        let jsonData = {};
        jsonData.name = proName;
        jsonData.programId = programId;
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: '/api/project/query',
            data: jsonData,
            dataType: 'json',
            type: 'get',
            success: (res) => {
                console.log(res);
                let code = res.code;
                if (code == '0') {
                    let tableDate = [];//表格显示的数据
                    let arr = res.data;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let obj = arr[i];
                        let tableItem = {};
                        for (let item in obj) {
                            if (item == 'id')
                                tableItem.key = obj[item];
                            else if (item == 'program')
                                tableItem.program = obj[item].name;
                            else
                                tableItem[item] = obj[item];
                        }
                        tableDate.push(tableItem);
                    }
                    this.setState({ itemData: tableDate, pagination: { total: res.realSize }, });
                }

            }

        });
    }



    onItemOk = (arrItem) => {
        this.setState({ visible1: false });
    }
    onItemCancel = (index, key) => {
        
        this.setState({ visible1: false ,selectedRows:[]});
    }



    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    }
    onDelete = (index) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);
        this.setState({ dataSource });
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            index: count,
            projectName: `洗车 ${count}`,
            restCount: `20 ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }
    render() {

        const FormItem = Form.Item;
        const columns = [{
            title: '项目名称',
            dataIndex: 'projectName',
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'projectName')}
                />
            ),
        }, {
            title: '可用次数',
            dataIndex: 'restCount',
            render: (text, record, index) => (
                <InputNumber size="large" min={1} defaultValue={1} onChange={this.onChange} />
            ),
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    <span>
                        <span style={{ marginRight: '10px', cursor: 'pointer' }} onClick={this.handleAdd}>
                            <a href="javascript:void(0);">新增</a>
                        </span>
                        <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                            <a href="javascript:void(0);">删除</a>
                        </Popconfirm>
                    </span>

                );
            },
        }];


        const Itemcolumns = [{
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
            key: 'program'
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
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate'
        }, {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment'
        }];

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //selectedRowKeys  key-->id
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows:selectedRows
                })

                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };



        return (
            <div>
                <Modal
                    title="项目查询"
                    visible={this.state.visible}
                    onOk={this.props.onOk()}
                    onCancel={this.props.onCancel()}
                    width='50%' >

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="卡类名称"
                            hasFeedback
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="卡类属性"
                            hasFeedback
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="售卡金额"
                            hasFeedback
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="有效期(年)"
                            hasFeedback
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="备注"
                            hasFeedback
                        >
                            <Input />
                        </FormItem>
                    </Form>
                    <Row style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={() => { this.setState({ visible1: true }) }}>关联项目</Button>
                        <Modal
                            title="项目查询"
                            visible={this.state.visible1}
                            onOk={()=>this.onItemOk()}
                            onCancel={()=>this.onItemCancel()}
                            width='50%' >

                            <Table dataSource={this.state.itemData} columns={Itemcolumns} rowSelection={rowSelection} />
                        </Modal>
                    </Row>

                    <ModalTable dataSource={this.state.selectedRows} columns={Itemcolumns} />

                </Modal>
            </div>
        )
    }
}
export default CardModal

