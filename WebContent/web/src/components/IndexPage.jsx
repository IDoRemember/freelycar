import React from 'react';
import { Link } from 'react-router';
import BreadcrumbCustom from './BreadcrumbCustom.jsx';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon, Modal, Tree } from 'antd';
import styled from "styled-components"

const UlBox = styled.ul`
    margin:30px;
    width:calc( 100% - 60px);
`, Li = styled.li`
    margin:20px;
    float:left;
    display:inline-block;
    height:120px;
    width:calc(( 100% - 160px)/4);
    line-height:120px;
    color:#fff;
    font-size:22px;
    text-align:center;
    border-radius:5px;
`
const TreeNode = Tree.TreeNode;
class IndexPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shadowStyle: false,
            tab: [
                {
                    background: '#a9c3e4',
                    text: '消费开单',
                    url: '/app/productManage/itemManage'
                }, {
                    background: '#eafd89',
                    text: '收支管理',
                    url: '/app/productManage/itemManage'
                }, {
                    background: 'lightblue',
                    text: '会员管理',
                    url: '/app/productManage/itemManage'
                }, {
                    background: '#a3c07e',
                    text: '进销存管理',
                    url: '/app/productManage/itemManage'
                }, {
                    background: '#a9c3e4',
                    text: '产品管理',
                    url: '/app/productManage/itemManage'
                }
            ],
            nowTab: [{
                background: '#a9c3e4',
                text: '消费开单',
                url: '/app/productManage/itemManage',
                over: 'none'
            }, {
                background: 'lightblue',
                text: '会员管理',
                url: '/app/productManage/itemManage',
                over: 'none'
            }, {
                background: '#a3c07e',
                text: '进销存管理',
                url: '/app/productManage/itemManage',
                over: 'none'
            }, {
                background: '#a9c3e4',
                text: '产品管理',
                url: '/app/productManage/itemManage',
                over: 'none'
            }
            ]
        }
    }
    deleteTab = (index) => {
        let nowTab = this.state.nowTab
        nowTab.splice(index, 1)
        this.setState({
            nowTab: nowTab
        })
    }
    showIcon = (index) => {
        let nowTab = this.state.nowTab
        nowTab[index]['over'] = 'block'
        this.setState({
            nowTab: nowTab
        })
    }
    hiddenIcon = (index) => {
        let nowTab = this.state.nowTab
        nowTab[index]['over'] = 'none'
        this.setState({
            nowTab: nowTab
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }
    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    }
    render() {
        let nowLi = this.state.nowTab.map((item, index) => {
            return <Li style={{ position: 'relative', background: item.background, boxShadow: item.over == 'none' ? 'none' : '0 0 5px #888' }} key={index} onMouseOver={() => this.showIcon(index)} onMouseOut={() => this.hiddenIcon(index)}>
                <Icon type="close-circle-o" style={{ position: 'absolute', right: '5px', top: '5px', display: item.over }} onClick={() => this.deleteTab(index)} />
                <Link to={item.url} style={{ color: '#fff' }}>
                    {item.text}
                </Link>
            </Li>
        })
        return (
            <div style={{ background: '#ECECEC' }}>
                <BreadcrumbCustom />
                <UlBox className="clear" >
                    {nowLi}
                    <Li style={{ background: '#f8e4dd', boxShadow: this.state.shadowStyle ? '0 0 5px #888' : 'none' }} onMouseOver={() => this.setState({ shadowStyle: true })} onMouseOut={() => this.setState({ shadowStyle: false })}>
                        <Icon type="plus-circle-o" style={{ fontSize: '70px', color: '#fff', lineHeight: '120px' }} onClick={this.showModal} />
                    </Li>
                </UlBox>
                <Modal visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    okText="确定" cancelText="取消" width='25%'>
                    <div >
                        <Tree
                            checkable
                            /*defaultExpandedKeys={['0-0-0', '0-0-1']}
                            defaultSelectedKeys={['0-0-0', '0-0-1']}
                            defaultCheckedKeys={['0-0-0', '0-0-1']}*/
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                        >
                            <TreeNode title="消费开单" key="0-0">
                                <TreeNode title="美容开单" key="0-0-0" />
                                <TreeNode title="消费开单" key="0-0-1" />
                                <TreeNode title="单据管理" key="0-0-2" />
                            </TreeNode>
                            <TreeNode title="消费开单" key="0-0">
                                <TreeNode title="美容开单" key="0-0-0" />
                                <TreeNode title="消费开单" key="0-0-1" />
                                <TreeNode title="单据管理" key="0-0-2" />
                            </TreeNode>
                            <TreeNode title="收支管理" key="0-1">
                                <TreeNode title="收支查询" key="0-1-0" />
                                <TreeNode title="历史收支查询" key="0-1-1" />
                                <TreeNode title="其他支出" key="0-1-2" />
                            </TreeNode>
                            <TreeNode title="会员管理" key="0-2">
                                <TreeNode title="会员办理" key="0-2-0" />
                                <TreeNode title="客户管理" key="0-2-1" />
                            </TreeNode>
                            <TreeNode title="进销存管理" key="0-3">
                                <TreeNode title="库存查询" key="0-3-0" />
                                <TreeNode title="入库" key="0-3-1" />
                                <TreeNode title="出库" key="0-3-2" />
                                <TreeNode title="库存单据" key="0-3-3" />
                                <TreeNode title="供应商管理" key="0-3-4" />
                            </TreeNode>
                            <TreeNode title="产品管理" key="0-4">
                                <TreeNode title="项目管理" key="0-4-0" />
                                <TreeNode title="配件管理" key="0-4-1" />
                                <TreeNode title="卡类管理" key="0-4-2" />
                            </TreeNode>
                            <TreeNode title="数据报表" key="0-5">
                                <TreeNode title="营业汇总" key="0-5-0" />
                            </TreeNode>
                            <TreeNode title="系统设置" key="0-6">
                                <TreeNode title="员工管理" key="0-6-0" />
                                <TreeNode title="账号管理" key="0-6-0" />
                            </TreeNode>
                        </Tree>

                    </div>
                </Modal>
            </div>
        )
    }

}
export default IndexPage