import React from 'react';
import { Layout, Input, Select, Button, Table, Divider, Modal, Alert, message } from 'antd';
import {Link} from 'react-router-dom'
import ResourceAPI from '../../api/ResourceAPI';
import AddParkingLot from '../parkingLot/AddParkingLot';
import ModifyParkingLot from '../parkingLot/ModifyParkingLot';

const { Content } = Layout;
const {Search} = Input;
const {Option} = Select;


export default class ParkingLotManage extends React.Component {
    state = {
        addVisible: false,
        modifyVisible: false,
        parkingLotId: undefined,
        context: ''
    };

    columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', align: 'center'},
        { title: '名字', dataIndex: 'name', key: 'name', align: 'center' },
        { title: '车位数', dataIndex: 'size', key: 'size', align: 'center' },
        { title: '停车数', dataIndex: 'carNum', key: 'carNum', align: 'center' },
        { title: '操作', key: 'operation', align: 'center', render: (text, record) => (
            <span>
                <a onClick={() => this.showModifyModal(record.id)}>修改</a>
                <Divider type='vertical' />
                <a disabled={record.carNum != 0} onClick={() => this.changeParkingLotStatus(record.id, record.status)}>{record.status ? '注销' : '恢复'}</a>
            </span>
        ),
    },
        // { title: 'Action', dataIndex: 'phone', key: 'x', render: () => <a href="javascript:;">Delete</a> },
      ];

    changeParkingLotStatus = (parkingLotId, parkingLotStatus) => {
        parkingLotStatus = parkingLotStatus ? false : true;
        ResourceAPI.changeParkingLotStatus(parkingLotId, parkingLotStatus, (statusCode) => this.getStatusCode(statusCode, parkingLotId))
    }

    getStatusCode(statusCode, id) {
        if (statusCode === 200) {
            this.props.updateParkingLotStatus(id);
            message.success('操作成功！');
        } else {
            message.error(`操作失败！`);
        }
    }

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

    showModifyModal = (parkingLotId) => {
        this.setState({ 
            modifyVisible: true,
            parkingLotId: parkingLotId
        });
    }

    handleModifyCancel = () => {
        this.setState({ modifyVisible: false });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

      handleOptionvalue = (value) =>{
        
        console.log(value);
        this.setState({optionValue:value})
        
    }

    // componentDidMount() {
    //     this.props.getAllParkingLots();
    // }
    
    render() {
        console.log(this.props)
        const {parkingLots} = this.props;
        return (
            
            <Content  style={{ padding: '0 24px', minHeight: 280 }}>
                <ModifyParkingLot
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.modifyVisible}
                    onCancel={this.handleModifyCancel}
                    onCreate={this.handleCreate}
                    getAllParkingLots={this.props.getAllParkingLots}
                    parkingLotId={this.state.parkingLotId}
                />
                <AddParkingLot
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.addVisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    getAllParkingLots={this.props.getAllParkingLots}
                />
                <Button type='primary' onClick={this.showModal}>新增</Button>
                <span style={{float:'right'}}>
                <Select style={{width: 100}} onChange={this.handleOptionvalue}>
                    {/* <Option value = 'id'>id</Option> */}
                    <Option value = 'name'>名字</Option>
                    <Option value = 'size'>大小</Option>
                </Select>
                <Search style={{width: 200}}
                    placeholder="input search text"
                    onSearch={value => {
                        
                        if(this.state.optionValue&&value){
                            this.props.getSearchEmployees(this.state.optionValue,value)
                        }else{
                            alert("搜索不能为空！")
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
                    dataSource={parkingLots}
                />
            </Content>
        );
    }
}