import React from 'react';
import { Layout, Input, Select, Button, Table, Divider, Form, Modal, Alert, AutoComplete, } from 'antd';
import {Link} from 'react-router-dom'
import ResourceAPi from '../../api/ResourceAPI';
import AddEmployee from '../employee/AddEmployee';
import ModifyEmployee from '../employee/ModifyEmployee';
import ChooseParkingBoy from './ChooseParkingBoy';

const { Content } = Layout;
const {Search} = Input;
const {Option} = Select;

export default class OrderManage extends React.Component {
    state = {
        visible: false,
        orderId: undefined,
    };

    columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', align: 'center'},
        {title: '车牌号', dataIndex: 'plateNumber', key: 'platenumber', align: 'center'},
        { title: '类型', dataIndex: 'type', key: 'nickname', align: 'center' },
        { title: '状态', dataIndex: 'status', key: 'status', align: 'center' },
        { title: '操作', key: 'operation', align: 'center', render: (text, record) => (
            <span>
                <a onClick={() => this.dispatchOrder(record.id)}>{record.status === '无人处理' ? '指派' : ''}</a>
            </span>
        ),
    },
        // { title: 'Action', dataIndex: 'phone', key: 'x', render: () => <a href="javascript:;">Delete</a> },
      ];
    
    dispatchOrder(orderId) {
        this.props.getAllParkingBoys();
        this.setState({
            visible: true,
            orderId: orderId,
        });
    }

    onCancel() {
        this.setState({ visible: false });
    }

    handleOptionvalue = (value) =>{
        
        console.log(value);
        this.setState({optionValue:value})
        
    }

    // componentDidMount() {
    //     this.props.getAllOrders();
    // }
    render() {
        const {orders} = this.props;
        return (
            
            <Content  style={{ padding: '0 24px', minHeight: 280 }}>
                <ChooseParkingBoy 
                    visible={this.state.visible}
                    orderId={this.state.orderId}
                    onCancel={() => this.onCancel()}
                    getAllParkingBoys={this.props.getAllParkingBoys}
                    parkingBoys={this.props.parkingBoys}
                    dispatchOrderSuccess={this.props.dispatchOrderSuccess}
                />
                <span style={{float:'right',marginBottom: 10}}>
                <Select style={{width: 100,marginRight: 5}} onChange={this.handleOptionvalue}>
                    {/* <Option value = 'id'>id</Option> */}
                    <Option value = 'all'>全部</Option>
                    <Option value = 'plateNumber'>车牌号</Option>
                    <Option value = 'type'>类型</Option>
                    <Option value = 'status'>状态</Option>
                </Select>
                <Search style={{width: 200}}
                    placeholder="input search text"
                    onSearch={value => {
                        if(this.state.optionValue){
                            this.props.getSearchOrders(this.state.optionValue,value)      
                        }else{
                            alert("选择不能为空！")
                        }
                                           
                    }}
                    enterButton
                />
                </span>
                <Table style={{clear:"both"}}
                    bordered
                    rowKey='id'
                    columns={this.columns}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={orders}
                />
            </Content>
        );
    }
}