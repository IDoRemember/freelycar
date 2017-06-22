import { Table, Input, Icon, Button, Popconfirm,InputNumber } from 'antd';
import React from 'react';
import EditableCell from '../tables/EditableCell.jsx'
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
  }),
};
class ModalTable extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
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
                key:'1',
                projectName:"洗车",
                restCount: 20,

            }, {
                key: '2',
                projectName:"打蜡",
                restCount: 10,
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
    onChange = (value) =>{
        console.log(value);
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
        const { dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Table bordered  rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

export default ModalTable