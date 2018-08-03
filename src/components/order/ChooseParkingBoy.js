import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, Alert, Radio, Table, message  } from 'antd';
import React from 'react';
import ResourceAPi from '../../api/ResourceAPI';
import {Link} from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

class ChooseParkingBoy extends React.Component {
    state = {
        value: 1,
    }
    columns = [
        { title: 'ID', dataIndex: 'id', key: 'id'},
        { title: '姓名', dataIndex: 'nickname', key: 'nickname' },
        { title: '停车场数量', dataIndex: 'lotNumber', key: 'lotNumber' },
        { title: '停车数', dataIndex: 'carNumber', key: 'carNumber' },
        { title: '总车位', dataIndex: 'total', key: 'total' },
        { title: '', key: 'operation', render: (text, record) => (
            <Radio value={record.id} />
        ),},
    ];

    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    getStatusCode(statusCode) {
        if (statusCode === 200) {
            this.props.dispatchOrderSuccess(this.props.orderId);
            message.success('指派成功！');
        } else {
            message.error('指派失败！');
        }
    }

    handleSubmit() {
        ResourceAPi.dispatchOrder(this.props.orderId, this.state.value, (statusCode) => this.getStatusCode(statusCode));
        this.props.onCancel();
        this.setState({
            value: undefined
        })
    }

    componentDidMount() {
        this.props.getAllParkingBoys();
    }
    render() {
        return (
            <Modal
                visible={this.props.visible}
                title="Create a new collection"
                onCancel={this.props.onCancel}
                onOk={() => this.handleSubmit()}

            >
                <RadioGroup onChange={(e) => this.onChange(e)} value={this.state.value}>
                    <Table
                        columns={this.columns}
                        dataSource={this.props.parkingBoys}
                    />
                </RadioGroup>
            </Modal>
        );
    }
}


export default ChooseParkingBoy;