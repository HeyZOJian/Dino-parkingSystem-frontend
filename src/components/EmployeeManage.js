import React from 'react';
import { Layout, Input, Select, Button, Table, Divider, Form, Modal, Alert, AutoComplete, } from 'antd';
import {Link} from 'react-router-dom'
import ResourceAPi from '../api/ResourceAPI';
import AddEmployee from './AddEmployee';
import ModifyEmployee from './ModifyEmployee';

const { Content } = Layout;
const {Search} = Input;
const {Option} = Select;


  
  const data = [
    { key: 1, id: '1', name: 'John Brown', email: '1234@aa.com', phone: '12313132121'},
    { key: 2, id: '2', name: 'Jim Green', email: '1235@aa.com', phone: '12313132122'},
    { key: 3, id: '3', name: 'Joe Black', email: '1236@aa.com', phone: '12313132123'},
  ];

export default class EmployeeManage extends React.Component {
    state = {
        addVisible: false,
        modifyVisible: false,
        employeeId: undefined,
    };

    columns = [
        { title: 'ID', dataIndex: 'id', key: 'id'},
        {title: '用户名', dataIndex: 'username', key: 'username'},
        { title: '姓名', dataIndex: 'nickname', key: 'nickname' },
        { title: 'E-mail', dataIndex: 'email', key: 'email' },
        { title: '电话号码', dataIndex: 'phone', key: 'phone' },
        { title: '操作', key: 'operation', render: (text, record) => (
            <span>
                <a onClick={() => this.showModifyModal(record.id)}>修改</a>
                <Divider type='vertical' />
                <a href='#'>冻结</a>
            </span>
        ),
    },
        // { title: 'Action', dataIndex: 'phone', key: 'x', render: () => <a href="javascript:;">Delete</a> },
      ];

    showModal = () => {
        this.setState({ addVisible: true });
    }

    handleCancel = () => {
        this.setState({ addVisible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ addVisible: false });
        });
    }

    showModifyModal = (employeeId) => {
        this.setState({ 
            modifyVisible: true,
            employeeId: employeeId,
        });
    }

    handleModifyCancel = () => {
        this.setState({ modifyVisible: false });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    componentDidMount() {
        this.props.getAllEmployees();
    }
    render() {
        const {employees} = this.props;
        return (
            
            <Content  style={{ padding: '0 24px', minHeight: 280 }}>
                <ModifyEmployee
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.modifyVisible}
                    onCancel={this.handleModifyCancel}
                    onCreate={this.handleCreate}
                    getAllEmployees={this.props.getAllEmployees}
                    employeeId={this.state.employeeId}
                />
                <AddEmployee
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.addVisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    getAllEmployees={this.props.getAllEmployees}
                />
                <div align='right'>
                <Button type='primary' onClick={this.showModal}>新增</Button>
                <Select style={{width: 100}}>
                    <Option value = 'id'>id</Option>
                    <Option value = 'username'>用户名</Option>
                    <Option value = 'nickname'>姓名</Option>
                    <Option value = 'email'>email</Option>
                    <Option value = 'phone'>电话号码</Option>
                </Select>
                <Search style={{width: 200}}
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    enterButton
                />
                </div>
                <Table
                    columns={this.columns}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={employees}
                />
            </Content>
        );
    }
}
