/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout, Badge, message } from 'antd';
import { hashHistory } from 'react-router'
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import screenfull from 'screenfull';
import $ from 'jquery';
// import { gitOauthToken, gitOauthInfo } from '../axios';
// import { queryString } from '../utils';
import avater from '../styles/imgs/user.png';
message.config({
    top: 300,
})

class HeaderCustom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: ''
        };
    }
    componentDidMount() {
        // let user = localStorage.getItem('username')

        // console.log(user)
        // this.setState({
        //     user: user
        // })
        this.queryAdmin();
        // const QueryString = queryString();
        // if (QueryString.hasOwnProperty('code')) {
        //     console.log(QueryString);
        //     const _user = JSON.parse(localStorage.getItem('user'));
        //     !_user && gitOauthToken(QueryString.code).then(res => {
        //         console.log(res);
        //         gitOauthInfo(res.access_token).then(info => {
        //             this.setState({
        //                 user: info
        //             });
        //             localStorage.setItem('user', JSON.stringify(info));
        //         });
        //     });
        //     _user && this.setState({
        //         user: _user
        //     });
        // }
        //  const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        // if (!_user && QueryString.hasOwnProperty('code')) {
        // gitOauthToken(QueryString.code).then(res => {
        //     gitOauthInfo(res.access_token).then(info => {
        //         this.setState({
        //             user: info
        //         });
        //         localStorage.setItem('user', JSON.stringify(info));
        //     });
        // });
        // } else {
        // this.setState({
        //     user: _user
        // });
        // }
    };
    // screenFull=()=> {
    //     if (screenfull.enabled) {
    //         screenfull.request();
    //     }

    // };
    queryAdmin = () => {
        $.ajax({
            url: 'api/admin/getaccount',
            type: "GET",
            data: {
                account: localStorage.getItem('username'),
            
            },
            success: (res) => {
                console.log(res.data.name);
                this.setState({
                    user: res.data.name
                })
            }
        })
    }
    logOut = () => {
        localStorage.removeItem('username');
        console.log(localStorage.getItem('username'))
        this.setState({
            user: localStorage.getItem('username')
        })
        $.ajax({
            url: 'api/admin/logout',
            type: "GET",
            success: () => {
                message.success('退出成功！');
                hashHistory.push('/login')
            }
        })

    }
    handleClick = (e) => {
        if (e.key == "1") {
            this.logOut();
        }
        console.log('Clicked: ', e);
        this.setState({ current: e.key });
    }

    render() {
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                <Icon
                    className="trigger custom-trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                 <span style={{float:"right",marginRight:"40px",fontWeight:"600",fontSize:'16px'}}>{this.state.user}</span>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.handleClick}

                >
                    {/* <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item> */}
                    {/*<Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>*/}
                    <SubMenu title={<span className="avatar">
                        <img src={avater} alt="头像" />
                        <i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                          
                            <Menu.Item key="1" >退出登录</Menu.Item>
                        </MenuItemGroup>
                        {/* <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup> */}
                    </SubMenu>
                </Menu>
               
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>
        )
    }
}

export default HeaderCustom;