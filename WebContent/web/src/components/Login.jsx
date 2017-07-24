
import React from 'react';
import { hashHistory } from 'react-router'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import logo from '../styles/imgs/logo.jpg';
import $ from 'jquery';
const FormItem = Form.Item;
message.config({
    top: 300,
})
class Login extends React.Component {
   
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.postInfo(values)
                // 
            }
        });
    };

    postInfo = (values) => {
        $.ajax({
            url: "api/admin/login",
            type: "POST",
            data: {
                account: values.userName,
                password: values.password,
                rememberMe: values.remember
            },
            success: (res) => {
                if (res.code == 0||res.code==13) {
                    localStorage.setItem("username", values.userName);
                    message.success('登录' + res.msg, 1);
                    hashHistory.push('/dashboard/index')
                } else {
                    message.error(res.msg, 1);
                }
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <img src={logo} />
                        <span>小易爱车后台管理系统</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住密码</Checkbox>
                                )}

                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

export default Form.create()(Login);