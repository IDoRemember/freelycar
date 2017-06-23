import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom.jsx';
import { Card, Button, Input, Select, Menu, Icon, Row, Col, DatePicker,Radio } from 'antd';
import { Link } from 'react-router';


const RadioGroup = Radio.Group;
const Option = Select.Option;
class AddClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            man: 'man',
            female: 'female',
        }
    }
    handleChange = (value) => {
        console.log(`selected ${value}`)
    }
    timeonChange = (time) =>{
        console.log(time)
    }
    render() {
         const plateOptions = this.state.option.map((item, index) => {
            return <Option key={index} value={item.value}>{item.text}</Option>
        })
        return (
            <div>
                <BreadcrumbCustom first="会员管理" second="新增客户" />

                <Card title='客户信息' style={{marginTop:'15px'}}>
                    <Row gutter={16} style={{marginBottom:'15px'}}>
                        <Col span={8} offset={4}>姓名:
                            <Input style={{ width: '150px',marginLeft:'22px' }} />
                        </Col>
                        <Col span={8}>年龄:
                            <Input style={{ width: '150px',marginLeft:'30px' }} />
                        </Col>
                    </Row>

                      <Row gutter={16} style={{marginBottom:'15px'}}>
                        <Col span={8} offset={4}>手机号:
                            <Input style={{ width: '150px',marginLeft:'10px' }} />
                        </Col>
                        <Col span={8}>性别：
                            <div style={{ display: 'inline-block',marginLeft:'26px' }}>
                                <RadioGroup onChange={this.onChange} value={this.state.value}>
                                    <Radio value={this.state.man}>男</Radio>
                                    <Radio value={this.state.fe}>女</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                    </Row>
                      <Row gutter={16} style={{marginBottom:'12px'}}>
                        <Col span={8} offset={4}><span style={{marginRight:'15px'}}>生日：</span>
                            <DatePicker onChange={this.timeonChange}/>
                        </Col>
                        <Col span={8}>身份证号:
                            <Input style={{ width: '150px',marginLeft:'12px' }} />
                        </Col>
                    </Row>
                </Card>
                <Card title='车辆信息' style={{marginTop:'20px'}}>
                      <Row gutter={16} style={{marginBottom:'15px'}}>
                        <Col span={8} offset={4}>车牌号：
                            <Input style={{ width: '150px',marginLeft:'14px' }} />
                        </Col>
                        <Col span={8}>车辆品牌:
                            <Select showSearch
                                style={{ width: '100px',marginLeft:'35px' } }
                                placeholder="输入车牌号码"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                            >
                                {plateOptions}
                            </Select>
                        </Col>
                    </Row>
                      <Row gutter={16} style={{marginBottom:'15px'}}>
                        <Col span={8} offset={4}>车辆型号：
                            <Input style={{ width: '150px',marginLeft:'2px' }} />
                        </Col>
                        <Col span={8}>保险截止日期:
                            <DatePicker onChange={this.timeonChange} style={{marginLeft:'10px'}}/>
                        </Col>
                    </Row>
                      <Row gutter={16} style={{marginBottom:'15px',marginLeft:'10px'}}>
                        <Col span={8} offset={4}>里程数：
                            <Input style={{ width: '150px' }} />
                        </Col>
                        <Col span={8}>上牌时间:
                            <DatePicker onChange={this.timeonChange} style={{marginLeft:'25px'}} />
                            
                        </Col>
                    </Row>
                      <Row gutter={16} style={{marginBottom:'15px'}}>
                        <Col span ={8} offset={4}>车架号：
                        <Input style={{ width:'150px',marginLeft:'15px'}} />
                        </Col>
                        <Col span ={8} >发动机号：
                        <Input style={{ width:'150px',marginLeft:'25px'}}/>
                        </Col>

                    </Row>
                   

                </Card>
                 <div style={{marginLeft:'37%',marginTop:'20px',}}>
                     <Button type="primary" style={{marginRight:'50px'}} size='large'>
                         <Link to={'app/member/customer'}>保存</Link>
                     </Button>
                     <Button type="primary" size='large'>
                           <Link to={'app/member/customer'}>取消</Link>
                     </Button>
                    </div>
            </div>
        )
    }
}
export default AddClient