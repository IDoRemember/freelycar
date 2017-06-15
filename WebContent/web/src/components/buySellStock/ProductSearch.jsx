import React from 'react';
import CustomerInfo from '../forms/EditCustomerInfo.jsx';
import ServiceTable from '../tables/ServiceTable.jsx';
import PartsDetail from '../tables/PartsDetail.jsx';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import AjaxGet from '../../utils/ajaxGet'
import { Row, Col, Card, Button, Input, Select, Menu, Icon, Switch, TreeSelect, Table} from 'antd';
const Option = Select.Option,
    SubMenu = Menu.SubMenu,
    TreeNode = TreeSelect.TreeNode;
class ProductSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
            theme: 'light',
            current: '1',
            conlums: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index'
            }, {
                title: '库存编号',
                dataIndex: 'number',
                key: 'number'
            }, {
                title: '配件名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '配件类别',
                dataIndex: 'category',
                key: 'category'
            }, {
                title: '配件品牌',
                dataIndex: 'brand',
                key: 'brand'
                
            },{
                title: '规格',
                dataIndex: 'specification',
                key: 'specification'
            },{
                title: '属性',
                dataIndex: 'attribute',
                key: 'attribute'
            },{
                title: '配件价格',
                dataIndex: 'price',
                key: 'price'
            },{
                title: '可用库存',
                dataIndex: 'stock',
                key: 'stock'
            },{
                title: '供应商',
                dataIndex: 'supplier',
                key: 'supplier'
            },{
                title: '联系方式',
                dataIndex: 'phone',
                key: 'phone'
            }],
            data: [{
                key: '1',
                index: '1',
                number:'1111222233333',
                name:'涵涵',
                category:'美容保养',
                time: 'John Brown',
                actualIncome: 32,
                phone: '18362981113',
            }, {
                key: '2',
                index: '2',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }, {
                key: '3',
                index: '3',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }, {
                key: '4',
                index: '4',
                time: 'John Brown',
                actualIncome: 32,
                actualPay: 'New York No. 1 Lake Park',
            }]
        }
    }
    componentDidMount() {
        AjaxGet('GET', 'data/LicensePlate.json', (res) => {
            this.setState({ option: res.data })
        })
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
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
                    <TreeSelect showSearch
                        style={{ width: '300px' }}
                        placeholder="输入供应商名称"
                        allowClear
                        treeDefaultExpandAll
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    >
                        <TreeNode value="parent 1" title="parent 1" key="0-1">
                            <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                                <TreeNode value="leaf1" title="my leaf" key="random" />
                                <TreeNode value="leaf2" title="your leaf" key="random1" />
                            </TreeNode>
                            <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                                <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
                            </TreeNode>
                        </TreeNode>
                    </TreeSelect>

                    <Button type="primary" style={{ margin: '10px 10px 10px 40px', width: '100px', height: '50px' }} size={'large'}>查询</Button>
                    < Table className="accountTable" bordered columns={this.state.conlums} dataSource={this.state.data} onChange={this.handleChange} />
                </div>
                <div>
                </div>
            </Card>
        </div>
    }
}
export default ProductSearch