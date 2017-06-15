import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input } from 'antd';
import { Link } from 'react-router';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
const Option = Select.Option;
const columns = [
    { title: '序号', dataIndex: 'indexNum', key: 'indexNum' },
    { title: '时间', dataIndex: 'accountMonth', key: 'accountMonth' },
    { title: '实收金额', dataIndex: 'receiveMoney', key: 'receiveMoney' },
    { title: '实际支出', dataIndex: 'actualOutlay', key: 'actualOutlay' },
]
const data = [
    {
        key: 1,
        indexNum: '1',
        accountMonth: '2017-06',
        receiveMoney: '122345',
        actualOutlay: '4555',
    },
    {
        key: 2,
        indexNum: '2',
        accountMonth: '2017-05',
        receiveMoney: '223444',
        actualOutlay: '4000',
    },
    {
        key: 3,
        indexNum: '3',
        accountMonth: '2017-04',
        receiveMoney: '5421424',
        actualOutlay: '4000',
    },
    {
        key: 4,
        indexNum: '4',
        accountMonth: '2017-03',
        receiveMoney: '673444',
        actualOutlay: '4300',
    },
    {
        key: 5,
        indexNum: '5',
        accountMonth: '2017-02',
        receiveMoney: '89424',
        actualOutlay: '7900',
    },
    {
        key: 6,
        indexNum: '6',
        accountMonth: '2017-01',
        receiveMoney: '27844',
        actualOutlay: '4034',
    },
    {
        key: 7,
        indexNum: '7',
        accountMonth: '2017-03',
        receiveMoney: '673444',
        actualOutlay: '4300',
    },
    {
        key: 8,
        indexNum: '8',
        accountMonth: '2017-02',
        receiveMoney: '89424',
        actualOutlay: '7900',
    },
    {
        key: 9,
        indexNum: '9',
        accountMonth: '2017-01',
        receiveMoney: '27844',
        actualOutlay: '4034',
    },
    
];

class HistoricalAccount extends React.Component {
     constructor(props) {
        super(props)
        this.state = {
            option: [],
        }
    }
    render(){
          function handleChange(value) {
            console.log(`selected ${value}`);
        }
       return (
            <div>
                <BreadcrumbCustom first="收支管理" second="历史收支查询" />
                
                    <div style={{ display: 'inline-block', marginTop: '20px'}}>选择年份:
                    <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                    <Select defaultValue="2015" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="2015">2015</Option>
                        <Option value="2016">2016</Option>
                        <Option value="2017">2017</Option>
                        <Option value="2018">2018</Option>
                        <Option value="2019">2019</Option>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>    
                    </Select>
                    </div>
                    </div>
                <Card style={{marginTop:'20px'}}>
                    <Table  className="accountTable" columns={columns} dataSource={data} ></Table>
                </Card>
        </div>
       ) 
    }
}
export default HistoricalAccount