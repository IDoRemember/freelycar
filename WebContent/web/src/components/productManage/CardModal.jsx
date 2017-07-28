import React from 'react';
import { Row, Col, Card, Button, DatePicker, Table, Input, Select, Popconfirm, Modal, Form, InputNumber, message } from 'antd';
import { Link } from 'react-router';
// import ModalTable from '../productManage/ModalTable.jsx';
import update from 'immutability-helper'
import EditableCell from '../tables/EditableCell.jsx';
import $ from 'jquery';
const Option = Select.Option;
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
            visible1: false,//第二个模态框的属性
            itemData: [],//项目的数据
            count: 5,
            selectedRowKeys: [],
            selectedRows: [],
            form: {
                name: '',
                type: '',
                price: '',
                validTime: '',
                comment: ''
            },
            pagination: {}

        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.visible != this.props.visible) {
            this.setState({
                visible: newProps.visible,
                form: update(this.state.form,
                    {
                        name: { $set: newProps.modifyData.name ? newProps.modifyData.name : '' },
                        type: { $set: newProps.modifyData.type ? newProps.modifyData.type : '' },
                        price: { $set: newProps.modifyData.price ? newProps.modifyData.price : '' },
                        validTime: { $set: newProps.modifyData.validTime ? newProps.modifyData.validTime : '' },
                        comment: { $set: newProps.modifyData.comment ? newProps.modifyData.comment : '' },

                    })
            })
        }

    }

    //加载数据
    componentDidMount() {
        console.log(this.props.modifyData);
        this.loadData(1, 10);
    }


    loadData = (page, number, proName, programId) => {
        let jsonData = {};
        jsonData.name = proName;
        jsonData.programId = programId;
        jsonData.page = page;
        jsonData.number = number;
        $.ajax({
            url: 'api/project/query',
            data: jsonData,
            dataType: 'json',
            type: 'get',
            success: (res) => {
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
                } else {
                    this.setState({ itemData: [], pagination: { total: 0 } });
                }

            }

        });
    }


    onItemOk = (arrItem) => {
        this.setState({ visible1: false });
    }
    onItemCancel = (index, key) => {
        this.setState({ visible1: false, selectedRows: [] });
    }


    onOk = () => {
        let p = this.props;
        let obj = this.state.form;

        let projs = [];
        for (let item of this.state.selectedRows) {
            let projInfo = {};
            let proj = {};
            proj.id = item.key;
            projInfo.project = proj;
            projInfo.times = (item.times == undefined ? 1 : item.times);

            projs.push(projInfo);
        }
        obj.projectInfos = projs;

        //check field require
        if (obj.name == '') {
            message.warn('卡类名称是必填项');
            return false;
        }
        if (obj.price == '') {
            message.warn('售卡金额是必填项');
            return false;
        }
        if (obj.type == '') {
            message.warn('卡类属性是必填项');
            return false;
        }
        if (obj.validTime == '') {
            message.warn('有效期是必填项');
            return false;
        }
        if (projs.length == 0) {
            message.warn('必须关联项目');
            return false;
        }



        $.ajax({
            url: 'api/service/add',
            data: JSON.stringify(obj),
            dataType: 'json',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            traditional: true,
            success: (res) => {
                if (res.code == '0') {
                    //调用父类的onok
                    obj.key = res.data.id
                    obj.createDate = res.data.createDate;
                    obj.type = obj.type == 0 ? '次卡' : '组合卡';

                    p.onOk(obj)

                    //清空模态框数据
                    let form0 = {
                        name: '',
                        type: '',
                        price: '',
                        validTime: '',
                        comment: ''
                    }

                    this.setState({ selectedRows: [], form: form0 });
                }
            }


        });
    }

    //处理翻页
    handlePageChange = (p) => {
        this.loadData(p.current, 10)
    }

    //为form的赋值
    handleChange = (key, value) => {
        this.setState({
            form: update(this.state.form, { [key]: { $set: value } })
        })
    }

    //为项目中赋值times的属性
    onChangeTimes = (index, value) => {
        console.log(index + "---" + value);
        this.setState({
            selectedRows: update(this.state.selectedRows, { [index]: { ['times']: { $set: value } } })
        })
    }

    onCancel = () => {
        this.setState({ visible: false });
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


        const Itemcolumns2 = [{
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
            title: '可用次数',
            dataIndex: 'times',
            key: 'times',
            render: (text, record, index) => {
                return <InputNumber min={1} max={99} defaultValue={1} onChange={(e) => { this.onChangeTimes(index, e) }} />
            }

        }];

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let oldRows = this.state.selectedRows;
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
        };


        return (
            <div>
                <Modal
                    title="新增卡类"
                    visible={this.props.visible}
                    onOk={() => this.onOk()}
                    onCancel={() => this.props.onCancel()}
                    width='50%' >

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="卡类名称"
                            hasFeedback
                        >
                            <Input onChange={(e) => { this.handleChange('name', e.target.value) }} value={this.state.form.name} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="卡类属性"
                            hasFeedback
                        >
                            <Select defaultValue="1" style={{ width: 120 }} onChange={(e) => { this.handleChange('type', e) }} value={this.state.form.type}>
                                <Option value="0">次卡</Option>
                                <Option value="1">组合卡</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="售卡金额"
                            hasFeedback
                        >
                            <Input onChange={(e) => { this.handleChange('price', e.target.value) }} value={this.state.form.price} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="有效期(年)"
                            hasFeedback
                        >
                            <Input onChange={(e) => { this.handleChange('validTime', e.target.value) }} value={this.state.form.validTime} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="备注"
                            hasFeedback
                        >
                            <Input onChange={(e) => { this.handleChange('comment', e.target.value) }} value={this.state.form.comment} />
                        </FormItem>
                    </Form>
                    <Row style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={() => { this.setState({ visible1: true }) }}>关联项目</Button>
                        <Modal
                            title="关联项目"
                            visible={this.state.visible1}
                            onOk={() => this.onItemOk()}
                            onCancel={() => this.onItemCancel()}
                            width='50%' >

                            <Table dataSource={this.state.itemData}
                                columns={Itemcolumns}
                                rowSelection={rowSelection}
                                pagination={this.state.pagination}
                                onChange={(pagination) => this.handlePageChange(pagination)} />
                        </Modal>
                    </Row>

                    <ModalTable dataSource={this.state.selectedRows} columns={Itemcolumns2} />

                </Modal>
            </div>
        )
    }
}
export default CardModal

