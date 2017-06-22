import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import React from 'react';
import EditableCell from '../tables/EditableCell.jsx';

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '车牌号码',
            dataIndex: 'carNum',
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'carNum')}
                />
            ),
        }, {
            title: '品牌',
            dataIndex: 'brand',
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'brand')}
                />
            ),
        }, {
            title: '车辆型号',
            dataIndex: 'carType',
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'carType')}
                />
            ),
        }, {
            title: '里程数',
            dataIndex: 'mileageNum',
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'mileageNum')}
                />
            ),
        }, {
            title: '发动机号',
            dataIndex: 'engineNum',
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'engineNum')}
                />
            ),
        }, {
            title: '是否二手车',
            dataIndex: 'oldcar',
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'oldcar')}
                />
            ),
        },
        {
            title: '保险金额',
            dataIndex: 'insuranceMoney',
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'insuranceMoney')}
                />
            ),
        }, {
            title: '保险有效期',
            dataIndex: 'insuranceTime',
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'insuranceTime')}
                />
            ),
        }, {
            title: '备注',
            dataIndex: 'other',
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'other')}
                />
            ),
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                     <span>
                            <span style={{ marginRight: '10px', cursor: 'pointer' }}onClick={this.handleAdd}>
                                <a href="javascript:void(0);">新增</a>
                        </span>
                            <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                                <a href="javascript:void(0);">删除</a>
                            </Popconfirm>
                        </span>
                    // this.state.dataSource.length > 1 ?
                    //     (
                            
                    //         <Popconfirm title="确认要删除嘛?" onConfirm={() => this.onDelete(index)}>
                    //             <a href="#">删除</a>
                    //         </Popconfirm>
                    //     ) : null
                );
            },
        }];

        this.state = {
            dataSource: [{
                key: 1,
                carNum: "苏A123456",
                brand: "保时捷",
                carType: "911",
                mileageNum: "3000",
                oldcar: "否",
                insuranceMoney: "3000",
                insuranceTime: "2018-5-23",
                other: "",
            }, {
                key: '2',
                carNum: "苏A123456",
                brand: "保时捷",
                carType: "911",
                mileageNum: "3000",
                oldcar: "否",
                insuranceMoney: "3000",
                insuranceTime: "2018-5-23",
                other: "",
            }],
            count: 3,
        };
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
    onChange = (value) =>{
        console.log(value);
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        };
        console.log(count)
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }
    render() {
      
        const columns = this.columns;
        return (
            <div>
                <Table bordered dataSource={this.state.dataSource} columns={columns} />
            </div>
        );
    }
}

export default EditableTable