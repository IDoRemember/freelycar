import React from 'react';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button,Icon } from 'antd';
import { Link } from 'react-router';

const columns = [
    {
        title: ' ', dataIndex: 'delete', key: 'delete', render: () => {
            return <div><Icon type="delete" style={{cursor:'pointer'}}/></div>
        }
    },
    { title: '单据编号', dataIndex: 'id', key: 'id',render:(text,record,index)=>{
        return <div><Link to={`/app/consumption/ordermanage/${text}`}>{text}</Link></div>
    } },
    { title: '单据时间', dataIndex: 'createDate', key: 'createDate' },
    { title: '车牌号码', dataIndex: 'licensePlate', key: 'licensePlate' },
    { title: '客户名称', dataIndex: 'clientName', key: 'clientName' },
    { title: '手机号码', dataIndex: 'phone', key: 'phone' },
    { title: '项目类别', dataIndex: 'programName', key: 'programName' },
    { title: '车辆状态', dataIndex: 'state', key: 'state' },
    { title: '停车位置', dataIndex: 'parkingLocation', key: 'parkingLocation' },
    { title: '接车时间', dataIndex: 'pickTime', key: 'pickTime' },
    { title: '交车时间', dataIndex: 'deliverTime', key: 'deliverTime' },
    { title: '结算状态', dataIndex: 'payState', key: 'payState' },
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
                           <Table columns={columns} dataSource={this.props.data} ></Table>
                       </Card>
                   </div>
                </Row>
            </div>
        )
    }
}
export default OrderTable