import React from 'react';
import { Layout, Input, Select, Button, Table, Divider, Form, Modal, Alert, AutoComplete, } from 'antd';
import {Link} from 'react-router-dom'
import ResourceAPi from '../../api/ResourceAPI';
import AddEmployee from '../employee/AddEmployee';
import ModifyEmployee from '../employee/ModifyEmployee';

const { Content } = Layout;
const {Search} = Input;
const {Option} = Select;


export default class ParkingBoyManage extends React.Component {
    state = {
        visible: false,
        orderId: undefined,
    };

    columns = [
        { title: 'ID', dataIndex: 'id', key: 'id'},
        {title: '姓名', dataIndex: 'nickname', key: 'nickname'},
        { title: '电话号码', dataIndex: 'phone', key: 'phone' },
        { title: '状态', dataIndex: 'status', key: 'status' },
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

    componentDidMount() {
        this.props.getAllParkingBoys();
    }

    render() {
        const {parkingBoys} = this.props;
        return (
           
            <Content  style={{ padding: '0 24px', minHeight: 280 }}>
                <span style={{float:'right'}}>
                <Select style={{width: 100}}>
                    <Option value = 'id'>id</Option>
                    <Option value = 'platenumber'>车牌号</Option>
                    <Option value = 'type'>类型</Option>
                    <Option value = 'status'>状态</Option>
                </Select>
                <Search style={{width: 200}}
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    enterButton
                />
                </span>
                <Table
                    columns={this.columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>穿梭框</p>}
                    dataSource={parkingBoys}
                />
            </Content>
            
        );
    }
}