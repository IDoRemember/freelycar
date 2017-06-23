import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button,Icon } from 'antd';
import { Link } from 'react-router';

const columns = [
    {
        title: ' ', dataIndex: 'delete', key: 'delete', render: () => {
            return <div><Icon type="delete" style={{cursor:'pointer'}}/></div>
        }
    },
    { title: '单据编号', dataIndex: 'receiptNumber', key: 'receiptNumber',render:(text,record,index)=>{
        return <div><Link to={`/app/consumption/ordermanage/${text}`}>{text}</Link></div>
    } },
    { title: '单据时间', dataIndex: 'receiptTime', key: 'receiptTime' },
    { title: '车牌号码', dataIndex: 'busNumber', key: 'busNumber' },
    { title: '客户名称', dataIndex: 'customerName', key: 'customerName' },
    { title: '手机号码', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: '项目类别', dataIndex: 'itemClassification', key: 'itemClassification' },
    { title: '车辆状态', dataIndex: 'carState', key: 'carState' },
    { title: '停车位置', dataIndex: 'carPark', key: 'carPark' },
    { title: '接车时间', dataIndex: 'receiveCarTime', key: 'receiveCarTime' },
    { title: '交车时间', dataIndex: 'handCarTime', key: 'handCarTime' },
    { title: '结算状态', dataIndex: 'closeState', key: 'closeState' },
    {
        title: '操作', dataIndex: 'operation', key: 'operation', render: (text, record, index) => {
            return <span>
                <span style={{ marginRight: '10px' }}>
                    <Link to="" >
                      <span > 查看</span>
                    </Link>
                     <Link to="">
                       <span style={{marginLeft:'5px'}}> 修改</span>
                    </Link>
                </span>

            </span>
        }
    },
]
const data = [
    {
        key: 1,
        receiptNumber: '02933123334',
        receiptTime: '2017-05-24',
        busNumber: '苏A2345',
        customerName: '海蜇',
        phoneNumber: '15251873222',
        itemClassification: '洗车',
        carState: '已接车', carPark: '  ',
        receiveCarTime: '2017-05-24 14:00:00',
        handCarTime: '  ',
        closeState: '已结算',

    },
    {
        key: 2,
        receiptNumber: '02933123335',
        receiptTime: '2017-05-24',
        busNumber: '苏A12345',
        customerName: 'JZW',
        phoneNumber: '15251873232',
        itemClassification: '维修',
        carState: '已交车', carPark: '  ',
        receiveCarTime: '2017-05-24 14:00:00',
        handCarTime: '  ',
        closeState: '已结算',

    }

];

class OrderTable extends React.Component {
     constructor(props) {
        super(props)
        this.state = {
            option: [],
        }
    }
    render(){
        return(
            <div className="gutter-example">
                <Row gutter={8}>
                   <div className="gutter-box">
                       <Card bordered>
                           <Table columns={columns} dataSource={data} ></Table>
                       </Card>
                   </div>
                </Row>
            </div>
        )
    }
}
export default OrderTable