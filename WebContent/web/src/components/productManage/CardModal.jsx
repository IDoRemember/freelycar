import React from 'react';
import { Row, Col, Card, Button, DatePicker, Table, Input, Select, Popconfirm, Modal, Form,InputNumber } from 'antd';
import { Link } from 'react-router';
// import ModalTable from '../productManage/ModalTable.jsx';
import EditableCell from '../tables/EditableCell.jsx';
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
                <Table bordered dataSource={this.state.dataSource} columns={this.state.columns} />
            </div>
        );
    }
}



class CardModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            dataSource: [{
                key: '1',
                projectName: "洗车",
                restCount: 20,

            }, {
                key: '2',
                projectName: "打蜡",
                restCount: 10,
            },{
                key: '3',
                projectName: "抢修",
                restCount: 20,

            }, {
                key: '4',
                projectName: "精洗",
                restCount: 10,
            }],
            count: 5,
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.visible != this.props.visible) {
            this.setState({
                visible: newProps.visible
            })
        }

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
                <InputNumber size="large" defaultValue={1} onChange={this.onChange} />
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


                    <Row>
                        <Col span={24}>

                        </Col>
                    </Row>

                    <ModalTable dataSource={this.state.dataSource} columns={columns}  />

                </Modal>
            </div>
        )
    }
}
export default CardModal

