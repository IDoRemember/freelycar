import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import PartsDetail from '../tables/PartsDetail.jsx'
import { Row, Col, Card, Button, Input } from 'antd';
class BeautyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return <div>
            <CustomerInfo MemberButton={true} />
            <Card style={{marginBottom:'10px'}}>
                <span style={{fontSize:'18px'}}>故障描述：</span><Input type="textarea" rows={3} style={{display:'inline-block',marginBottom:'10px'}}/>
                <span style={{fontSize:'18px'}}>维修建议：</span><Input type="textarea" rows={3} style={{display:'inline-block'}}/>
            </Card>
            <ServiceTable />
            <PartsDetail />

            <Card>
                <div style={{ textAlign: 'right' }}>
                    整单金额
                <span style={{ margin: '0 10px', color: 'red', fontWeight: 'bold', fontSize: '20px' }}> 43.00</span>
                    元
                </div>
            </Card>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>结算</Button>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>保存</Button>
            <Button type="primary" style={{ float: 'right', margin: '10px', width: '100px', height: '50px' }} size={'large'}>重新开单</Button>
        </div>
    }
}
export default BeautyOrder