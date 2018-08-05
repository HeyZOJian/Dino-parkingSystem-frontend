import React from 'react';
import { Layout, Input, Select, Button, Table, Divider, Form, Modal, Alert, AutoComplete, message } from 'antd';
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
        employeePosition: '',
    };

    columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', align: 'center'},
        {title: '用户名', dataIndex: 'username', key: 'username', align: 'center'},
        { title: '姓名', dataIndex: 'nickname', key: 'nickname', align: 'center' },
        { title: 'E-mail', dataIndex: 'email', key: 'email', align: 'center' },
        { title: '电话号码', dataIndex: 'phone', key: 'phone', align: 'center' },
        { title: '职位', dataIndex: 'position', key: 'position', align: 'center' },
        { title: '操作', key: 'operation', align: 'center', render: (text, record) => (
            <span>
                <a onClick={() => this.showModifyModal(record.id, record.position)}>修改</a>
                <Divider type='vertical' />
                <a onClick={() => this.updateEmployeeStatus(record.id, record.status)}>{record.status ? '冻结' : '恢复'}</a>
            </span>
        ),
    },
        // { title: 'Action', dataIndex: 'phone', key: 'x', render: () => <a href="javascript:;">Delete</a> },
      ];

      updateEmployeeStatus = (employeeId, employeeStatus) => {
        employeeStatus = employeeStatus ? false : true;
        this.props.updateEmployeeStatus(employeeId, employeeStatus);
    }

    getStatusCode(statusCode, cause, id) {
        if (statusCode === 204) {
            this.props.updateEmployeeStatus(id);
            message.success('操作成功！');
        } else {
            message.error(`操作失败！原因：${cause}`);
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

    showModifyModal = (employeeId, employeePosition) => {
        this.setState({ 
            modifyVisible: true,
            employeeId: employeeId,
            employeePosition: employeePosition,
        });
    }

    handleModifyCancel = () => {
        this.setState({ modifyVisible: false });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    // componentDidMount() {
    //     this.props.getAllEmployees();
    // }

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
                    employeePosition={this.state.employeePosition}
                />
                <AddEmployee
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.addVisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    getAllEmployees={this.props.getAllEmployees}
                />
                <Button type='primary' onClick={this.showModal} style={{marginBottom: 10}}>新增</Button>
                <span style={{float:'right',marginBottom: 10}}>
                <Select style={{width: 100,marginRight: 5}} onChange={this.handleOptionvalue}>
                    {/* <Option value = 'id'>id</Option> */}
                    <Option value = 'all'>全部</Option>
                    <Option value = 'username'>用户名</Option>
                    <Option value = 'nickname'>姓名</Option>
                    <Option value = 'email'>E-mail</Option>
                    <Option value = 'phone'>电话号码</Option>
                </Select>
                <Search style={{width: 200}}
                    placeholder="input search text"
                    onSearch={value => {          
                        if(this.state.optionValue){
                            this.props.getSearchEmployees(this.state.optionValue,value)
                        }else{
                            alert("选择不能为空！")
                        }
                    }}
                    enterButton
                />
                </span>
                <Table
                    bordered
                    rowKey='id'
                    columns={this.columns}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={employees}
                />
            </Content>
        );
    }
}
