import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../css/login.css';
import { Form, Icon, Input, Button, notification, Checkbox } from 'antd';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import * as url from '../constant/constant'

const FormItem = Form.Item;

notification.config({
  placement: 'topRight',
  top: 5,
  duration: 3,
});

class Login extends Component {

  render() {
    const AntWrappedLoginForm = Form.create()(NormalLoginForm)
    return (

      <div className="container" style={{width:'100%',height:'700px',display:'flex',alignItems:'center'}}>
        <div className="login-container" style={{width:'100%',textAlign: "center",border:"1px solid #cceff5",background:"#fafcfd",borderStyle:'outset'}}>
          <h1 className="page-title">登录</h1>
          <div className="login-content">
            <AntWrappedLoginForm onLogin={this.props.onLogin} />
          </div>
        </div>
      </div>

    );
  }
}

const openNotification = () => {
  notification['error']({
    message: 'Wrong userName or password',
    duration: 1,
    //description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    // icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    style: {
      width: 350,
      marginLeft: 0 - 725,
    },
  });
};

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // const {history} = this.props
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          //  console.log('Received values of form: ', values);
          axios.post(url.URL+"/login", {
            "username": values.userName,
            "password": values.password
          }).then(function (response) {
            console.log(response.headers.authorization)
            const token = response.headers.authorization
            sessionStorage.setItem("token", token);
            localStorage.setItem("token", token);
            localStorage.setItem("nickname", 'admin')
            localStorage.setItem("status", '1')
            window.location.href = "/App/EmployeeManage";
          }).catch(function (error) {
            console.log(error)
            openNotification();
          })
        }
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]
            })(
              <Input
                prefix={< Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]
            })(
              <Input
                prefix={< Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a> */}
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Login
          </Button>
            {/* Or
          <a href="">register now!</a> */}
          </FormItem>
        </Form>
        {/* <Link to="./EmployeeManage" >jumpppppp</Link> */}
      </div>

    );
  }
}
// NormalLoginForm.use(cors(corsOptions));

export default Login;
