import React from 'react';
import { Layout, Input, Select, Button, Table, Divider, Form, Modal, Alert, AutoComplete,Transfer, Spin } from 'antd';
import {Link} from 'react-router-dom'
import ResourceAPi from '../../api/ResourceAPI';
import AddEmployee from '../employee/AddEmployee';
import ModifyEmployee from '../employee/ModifyEmployee';
import axios from 'axios'
import ModifyParkingBoy from './ModifyParkingBoy';

const { Content } = Layout;
const {Search} = Input;
const {Option} = Select;
const {confirm} = Modal;


export default class ParkingBoyManage extends React.Component {
    state = {
        visible: false,
        orderId: undefined,
        mockData: [],
        targetKeys: [],
        expandedRowKeys: [],
        recordId:'',
        loading: false,
        parkingBoyId: '',
        workStatus: '',
    };

    columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', align: 'center'},
        {title: '姓名', dataIndex: 'nickname', key: 'nickname', align: 'center'},
        { title: '电话号码', dataIndex: 'phone', key: 'phone', align: 'center' },
        { title: '状态', dataIndex: 'workStatus', key: 'workStatus', align: 'center' },
        { title: '操作', key: 'operation', align: 'center', render: (text, record) => (
            <span>
                <a onClick={() => this.showModifyModal(record.id, record.workStatus)}>修改</a>
                <Divider type='vertical' />
                <a onClick={() => this.updateParkingBoyStatus(record.id, record.status)}>{record.status ? '冻结' : '恢复'}</a>
            </span>
        ),
    },
        // { title: 'Action', dataIndex: 'phone', key: 'x', render: () => <a href="javascript:;">Delete</a> },
    ];

    updateParkingBoyStatus(id, parkingBoyStatus) {
        if (parkingBoyStatus) {
            this.setState({
                expandedRowKeys: [],
            })
        }
        parkingBoyStatus = parkingBoyStatus ? false : true;
        this.props.updateParkingBoyStatus(id, parkingBoyStatus);
    }

    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }

    getManagedParkingLot(response) {
        return response.data;
    }

    handleChange = (targetKeys, direction, moveKeys) => {
        const self = this;
        confirm({
            title: '你确定要执行该操作吗？',
            onOk() {
                console.log(targetKeys, direction, moveKeys);
                self.props.manageParkingBoysParkingLots(self.state.recordId, direction, moveKeys,
                    direction === 'right' ?
                        self.props.parkingLots.filter(parkingLot => moveKeys.some(id => id === parkingLot.id)) :
                        self.props.managedParkingLots.filter(parkingLot => moveKeys.some(id => id === parkingLot.id))
                )
            },
            onCancel() {},
        });
    }
    
    
      getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
          const data = {
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            chosen: Math.random() * 2 > 1,
          };
          if (data.chosen) {
            targetKeys.push(data.key);
          }
          mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
      }

    onExpand(expanded, record) {
        if (expanded && record.id != this.state.recordId) {
            this.setState({
                loading:true
            })
            this.props.getParkingLotsByParkingBoyId(record.id, () => this.setState({
                recordId: record.id,
                expandedRowKeys: [record.id],
                loading: false
            }));
        } else if (expanded){
            this.setState({
                expandedRowKeys: [record.id]
            })
        } else {
            this.setState({
                expandedRowKeys: []
            })
        }
    }

    handleOptionvalue = (value) =>{
        
        console.log(value);
        this.setState({optionValue:value})
        
    }

    showModifyModal = (parkingBoyId, workStatus) => {
        this.setState({
            visible: true,
            parkingBoyId,
            workStatus,
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    componentDidMount() {
        // this.props.getAllParkingBoys();
        this.props.getNoManagedParkingLots();
    }

    render() {
        const {parkingBoys} = this.props;
        return (
           
            <Content  style={{ padding: '0 24px', minHeight: 280 }}>
                <ModifyParkingBoy
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    getAllParkingBoys={this.props.getAllParkingBoys}
                    parkingBoyId={this.state.parkingBoyId}
                    workStatus={this.state.workStatus}
                />
                <span style={{float:'right', marginBottom: 10}}>
                <Select style={{width: 100}} onChange={this.handleOptionvalue}>
                    {/* <Option value = 'id'>id</Option> */}
                    <Option value = 'all'>全部</Option>
                    <Option value = 'nickname'>姓名</Option>
                    <Option value = 'phone'>电话</Option>
                    <Option value = 'workStatus'>状态</Option>
                </Select>
                <Search style={{width: 200}}
                    placeholder="input search text"
                    onSearch={value => {
                        if(this.state.optionValue){
                            this.props.getSearchParkingBoys(this.state.optionValue,value)
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
                    expandedRowRender={record => 
                        <Spin spinning={this.state.loading}>
                            <Transfer
                                disabled={record.status === false}
                                rowKey={record => record.id}
                                titles={['可选停车场', '管理的停车场']}
                                dataSource={[...this.props.parkingLots, ...this.props.managedParkingLots]}
                                showSearch
                                filterOption={this.filterOption}
                                targetKeys={this.props.managedParkingLots.map(parkingLot => parkingLot.id)}
                                onChange={this.handleChange}
                                render={item => item.name}
                            />
                        </Spin>
                    }
                    expandedRowKeys={this.state.expandedRowKeys}
                    dataSource={parkingBoys}
                    onExpand={(expanded, record) => {if (record.status) this.onExpand(expanded, record);}}
                />
            </Content>
            
        );
    }
}