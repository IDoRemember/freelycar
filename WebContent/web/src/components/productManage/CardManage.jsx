import React from 'react';
import CustomerInfo from '../forms/CustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx'
import EditableCell from '../tables/EditableCell.jsx'
//import jquery from 'jquery';
import $ from 'jquery'; 

import { Row, Col, Card, Button, Radio, DatePicker, Table, Tabs, Input, Select, Icon } from 'antd';
import moment from 'moment';

import { Link } from 'react-router';
const { RangePicker } = DatePicker;

// 日期 format
const dateFormat = 'YYYY/MM/DD';
const TabPane = Tabs.TabPane;


//可编辑的table 
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'name')}
        />
      ),
    }, {
      title: 'age',
      dataIndex: 'age',
    }, {
      title: 'address',
      dataIndex: 'address',
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          this.state.dataSource.length > 1 ?
          (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
              <a href="#">Delete</a>
            </Popconfirm>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }],
      count: 2,
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
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
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
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}


class BeautyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: []
        }
    }

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index'
        }, {
            title: '卡类名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '卡类属性',
            dataIndex: 'properties',
            key: 'properties'
        }, {
            title: '售卡金额',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: '有效期(年)',
            dataIndex: 'valateTime',
            key: 'valateTime'
        } , {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'create-time'
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark'
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation'
        }];

        //表格
        const data = [{
            key: '1',
            index: '1',
            name: 'John Brown',
            properties:'dfsd',
            valateTime:'一年',
            price: 'New York No. 1 Lake Park',
            createTime:'fff',
            remark:'xxx',
            operation:<Button type="primary">Primary</Button>       


        }, {
            key: '2',
            index: '2',
            name: 'John Brown',
            properties:'dfsd',
            valateTime:'一年',
            price: 'New York No. 1 Lake Park',
            createTime:'fff',
            remark:'xxx',
            operation:'zz'
        }, {
            key: '3',
            index: '3',
            name: 'John Brown',
            properties:'dfsd',
            valateTime:'一年',
            price: 'New York No. 1 Lake Park',
            createTime:'fff',
            remark:'xxx',
            operation:'zz'
        }, {
            key: '4',
            index: '4',
            name: 'John Brown',
            properties:'dfsd',
            valateTime:'一年',
            price: 'New York No. 1 Lake Park',
            createTime:'fff',
            remark:'xxx',
            operation:'zz'
        }];



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
                <BreadcrumbCustom first="产品管理" second="配件管理" />

                <Card>
                        <div>
                            <Row>
                                <Col span={5}>
                                    <div style={{ marginBottom: 16 }}>
                                        <Input addonBefore="卡类名称" />
                                    </div>
                                </Col>
                         
                                <Col span={1}>
                                    <span style={{ verticalAlign: 'middle', lineHeight: '28px' }}>创建日期:</span>
                                </Col>
                                <Col span={8}>
                                    <RangePicker defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]} format={dateFormat} />
                                </Col>
                                <Col span={8}>
                                    <Button type="primary">查询</Button>
                                </Col>
                            </Row>



                            <Row style={{ marginTop: '40px', marginBottom: '20px' }}>
                                <Col span={2}>
                                    <Button>新增卡类</Button>
                                </Col>
                                <Col span={8}>
                                    <Button>删除卡类</Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Table
                                        rowSelection={rowSelection}
                                        columns={columns}
                                        dataSource={data}
                                        bordered
                                    />
                                </Col>
                            </Row>

                        </div>

                </Card>
            </div>
        );
    }
}
export default BeautyOrder