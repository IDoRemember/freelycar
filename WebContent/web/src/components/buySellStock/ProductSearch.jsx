import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx';
import ServiceTable from '../tables/ServiceTable.jsx';
import PartsDetail from '../tables/PartsDetail.jsx';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import AjaxGet from '../../utils/ajaxGet'
import { Row, Col, Card, Button, Input, Select } from 'antd';
const Option = Select.Option;
class ProductSearch extends React.Component {
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
            <BreadcrumbCustom first="进销存管理" second="库存查询" />
            <Card>
                <div>
                    <span>商品名：</span>
                    <Select showSearch
                        style={{ width: '200px' }}
                        placeholder="输入供应商名称"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    >
                        {plateOptions}
                    </Select>
                    <Button type="primary" style={{ margin: '10px 10px 10px 40px', width: '100px', height: '50px' }} size={'large'}>查询</Button>
                </div>
            </Card>
        </div>
    }
}
export default ProductSearch