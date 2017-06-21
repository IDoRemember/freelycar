import React from 'react';
import { Link } from 'react-router';
import BreadcrumbCustom from './BreadcrumbCustom.jsx';
import { Row, Col, Card, Table, Select, InputNumber, Input, Button, Icon } from 'antd';

class IndexPage extends React.Component {
    render() {
        return (
            <div style={{ background: '#ECECEC' }}>
                 <BreadcrumbCustom />
                <Row gutter={16}>
                    <Col span={8}>
                        <Card  bordered={false}>Card content</Card>
                    </Col>
                    <Col span={8}>
                        <Card  bordered={false}>Card content</Card>
                    </Col>
                    <Col span={8}>
                        <Card  bordered={false}>Card content</Card>
                    </Col>
                </Row>
            </div>
        )
    }

}
export default IndexPage