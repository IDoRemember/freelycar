import React from 'react';
import { Link } from 'react-router';
import BreadcrumbCustom from './BreadcrumbCustom.jsx';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon } from 'antd';
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
class IndexPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shadowStyle:false,
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
                    <Li style={{ background: '#f8e4dd' ,boxShadow:this.state.shadowStyle?'0 0 5px #888':'none'}} onMouseOver={() => this.setState({shadowStyle:true})} onMouseOut={() => this.setState({shadowStyle:false})}>
                        <Icon type="plus-circle-o" style={{ fontSize: '70px', color: '#fff', lineHeight: '120px' }} />
                    </Li>
                </UlBox>
            </div>
        )
    }

}
export default IndexPage