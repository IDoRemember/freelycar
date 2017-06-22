import React from 'react';
import { Row, Col, Card, Button, DatePicker, Table, Input, Select, Popconfirm, Modal, Form } from 'antd';
import { Link } from 'react-router';
import ModalTable from '../productManage/ModalTable.jsx';
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
};
class CardModal extends React.Component() {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    //end of modal

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
            name: `Edward King ${count}`,
            properties: `Edward King ${count}`,
            valateTime: `Edward King ${count}`,
            price: `Edward King ${count}`,
            createTime: `Edward King ${count}`,
            remark: `Edward King ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
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
                           <ModalTable></ModalTable>
                        </Col>
                    </Row>

                </Modal>

            </div>
        )
    }
}
export default CardModal