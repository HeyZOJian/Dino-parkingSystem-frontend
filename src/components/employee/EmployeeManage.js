import React from 'react';
import { Layout, Input, Select, Button, Table, Divider, Form, Modal, Alert, AutoComplete, } from 'antd';
import {Link} from 'react-router-dom'
import ResourceAPi from '../../api/ResourceAPI';
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
        optionValue:'',
        context: '',
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
                <a onClick={() => this.changeEmployeeStatus(record.id, record.status)}>{record.status ? '冻结' : '恢复'}</a>
            </span>
        ),
    },
        // { title: 'Action', dataIndex: 'phone', key: 'x', render: () => <a href="javascript:;">Delete</a> },
      ];

    changeEmployeeStatus = (employeeId, employeeStatus) => {
        employeeStatus = employeeStatus ? false : true;
        ResourceAPi.changeEmployeeStatus(employeeId, employeeStatus, (statusCode) => this.getStatusCode(statusCode))
    }

    getStatusCode(statusCode) {
        if (statusCode === 204) {
            this.setState({
                statusVisible: true,
                context: <Alert message="Success Text" type="success" />,
            })
        } else {
            this.setState({
                statusVisible: true,
                context: <Alert message="Error Text" type="error" />,
            })
        }
    }

    showModal = () => {
        this.setState({ addVisible: true });
    }

    handleCancel = () => {
        this.setState({ addVisible: false });
    }

    // handleSearch = (value) =>{
    //     console.log(this.state);
    //     console.log(value);
    //     const optionValue = this.state.optionValue;
    //     //this.props.searchEmployees(optionValue,value)
    //     //ResourceAPi.searchEmployees(optionValue,value);
    // }

    handleOptionvalue = (value) =>{
        
        console.log(value);
        this.setState({optionValue:value})
        
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

    handleOk = () => {
        this.props.getAllEmployees();
          this.setState({ statusVisible: false });
      }


    componentDidMount() {
        this.props.getAllEmployees();
    }
    render() {
        const {employees} = this.props;
        return (
            
            <Content  style={{ padding: '0 24px', minHeight: 280 }}>
                <Modal
                    visible={this.state.statusVisible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Link to='/App/EmployeeManage'>
                            <Button key="submit" type="primary" onClick={this.handleOk}>
                                确定
                            </Button>
                        </Link>,
                    ]}
                >
                    {this.state.context}
                </Modal>
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
                <Button type='primary' onClick={this.showModal}>新增</Button>
                <span style={{float:'right'}}>
                <Select style={{width: 100}} onChange={this.handleOptionvalue}>
                    <Option value = 'id'>id</Option>
                    <Option value = 'username'>用户名</Option>
                    <Option value = 'nickname'>姓名</Option>
                    <Option value = 'email'>E-mail</Option>
                    <Option value = 'phone'>电话号码</Option>
                </Select>
                <Search style={{width: 200}}
                    placeholder="input search text"
                    onSearch={value => {
                        if(this.state.optionValue&&value){
                            this.props.getSearchEmployees(this.state.optionValue,value)
                        }else{
                            alert("AAAAAAA")
                        }
                    }}
                    //getSearchEmployees={this.props.getSearchEmployees}
                    enterButton
                />
                </span>
                <Table
                    columns={this.columns}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={employees}
                />
            </Content>
        );
    }
}
