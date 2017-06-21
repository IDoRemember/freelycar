import React from 'react';
import { Link } from 'react-router';
import BreadcrumbCustom from './BreadcrumbCustom.jsx';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon } from 'antd';

class IndexPage extends React.Component {
    render() {
        return (
            <div style={{ background: '#ECECEC' }}>
                 <BreadcrumbCustom />
                <Row gutter={16} style={{width:'80%',marginLeft:'10%'}}>
                    <Col span={6}>
                        <Card  bordered={false} style={{backgroundColor:'#a9c3e4'}}>
                            <div style={{height:'150px',textAlign:"center"}}>
                                <span className="cardtext">消费开单</span>
                            </div>
                            </Card>
                    </Col>
                    <Col span={6}>
                        <Card  bordered={false} style={{backgroundColor:'#eafd89'}}>
                            <div style={{height:'150px',textAlign:"center"}}>
                                <span className="cardtext">收支管理</span>
                            </div>
                            </Card>
                    </Col>
                    <Col span={6}>
                        <Card  bordered={false} style={{backgroundColor:'lightblue'}}>
                            <div style={{height:'150px',textAlign:"center"}}>
                                <span className="cardtext">会员管理</span>
                            </div>
                            </Card>
                    </Col>
                    <Col span={6} >
                        <Card  bordered={false} style={{backgroundColor:'#a3c07e'}}>
                            <div style={{height:'150px',textAlign:"center"}}>
                                <span className="cardtext">进销存管理</span>
                            </div>
                            </Card>
                    </Col>
                  
                </Row>
                  <Row gutter={16} style={{width:'80%',marginLeft:'10%',marginTop:'20px'}}>
                    <Col span={6}>
                        <Card  bordered={false} style={{backgroundColor:'#ff9b6d'}}>
                            <div style={{height:'150px',textAlign:'center'}} >
                                <span className="cardtext">产品管理</span>
                            </div>
                            </Card>
                    </Col>
                    <Col span={6}>
                        <Card  bordered={false} style={{backgroundColor:'#ffd37c'}}>
                            <div style={{height:'150px',textAlign:"center"}}>
                                <span className="cardtext">数据报表</span>
                            </div>
                            </Card>
                    </Col>
                    <Col span={6}>
                        <Card  bordered={false} style={{backgroundColor:'#aeaeae'}}>
                            <div style={{height:'150px',textAlign:"center"}}>
                                <span className="cardtext">系统设置</span>
                            </div>
                            </Card>
                    </Col>
                    <Col span={6}>
                        <Card  bordered={false} style={{backgroundColor:'#f8e4dd'}}>
                            <div style={{height:'150px',textAlign:"center"}}>
                                <Icon type="plus-circle-o" style={{fontSize:'100px',color:'#fff',lineHeight:'150px'}} />
                            </div>
                            </Card>
                    </Col>
                  
                </Row>
            </div>
        )
    }

}
export default IndexPage