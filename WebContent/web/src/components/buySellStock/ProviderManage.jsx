import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx'
import ServiceTable from '../tables/ServiceTable.jsx'
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import PartsDetail from '../tables/PartsDetail.jsx';
import { Row, Col, Card, Button, Select } from 'antd';
import AjaxGet from '../../utils/ajaxGet';
const Option = Select.Option;
class ProviderManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: []
        }
    }
    componentDidMount() {
        AjaxGet('GET', 'data/LicensePlate.json', (res) => {
            this.setState({ option: res.data })
        })
    }
    render() {
        const plateOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })
        return <div>
            <BreadcrumbCustom first="产品管理" second="供应商管理" />
            <Card>
                <span>供应商名称：</span>
            <Select showSearch
                style={{ width: '200px' }}
                placeholder="输入供应商名称"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
            >
                {plateOptions}
            </Select>                  
                <Button type="primary" style={{margin: '10px', width: '100px', height: '50px' }} size={'large'}>查询</Button>
            </Card >
        </div >
    }
}
export default ProviderManage