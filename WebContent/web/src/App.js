import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content, Footer } = Layout;
import './styles/index.less';
import SiderCustom from './components/SiderCustom.jsx';
import HeaderCustom from './components/HeaderCustom.jsx';
import Page from './components/Page.jsx';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        };
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (<Layout className="ant-layout-has-sider" >
            <SiderCustom path={this.props.location.pathname}
                collapsed={this.state.collapsed}
            />
            <Layout >
                <HeaderCustom toggle={this.toggle} />
                <Content style={{ margin: '0 16px', overflow: 'initial' }} > {this.props.children} </Content>
                <Footer style={
                    { textAlign: 'center' }} >
                </Footer>
            </Layout>
        </Layout>
        );
    }
}

export default App;