import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, Alert } from 'antd';
import React from 'react';
import ResourceAPI from '../../api/ResourceAPI';
import { Link } from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const ModifyParkingLot = Form.create()(
    class extends React.Component {
        state = {
            confirmDirty: false,
            autoCompleteResult: [],
            visible: false,
            context: '',
        };

        getStatusCode(statusCode) {
            if (statusCode === 200) {
                this.setState({
                    visible: true,
                    context: <Alert message="Success Text" type="success" />,
                })
            } else {
                this.setState({
                    visible: true,
                    context: <Alert message="Error Text" type="error" />,
                })
            }
        }
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    console.log(this.props.parkingLotId);
                    ResourceAPI.modifyParkingLotInfo({ id: this.props.parkingLotId, ...values }, (statusCode) => this.getStatusCode(statusCode));
                }
            });
        }

        handleConfirmBlur = (e) => {
            const value = e.target.value;
            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        }

        // compareToFirstPassword = (rule, value, callback) => {
        //     const form = this.props.form;
        //     if (value && value !== form.getFieldValue('password')) {
        //         callback('Two passwords that you enter is inconsistent!');
        //     } else {
        //         callback();
        //     }
        // }

        // validateToNextPassword = (rule, value, callback) => {
        //     const form = this.props.form;
        //     if (value && this.state.confirmDirty) {
        //         form.validateFields(['confirm'], { force: true });
        //     }
        //     callback();
        // }

        handleWebsiteChange = (value) => {
            let autoCompleteResult;
            if (!value) {
                autoCompleteResult = [];
            } else {
                autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
            }
            this.setState({ autoCompleteResult });
        }
        showModal = () => {
            this.setState({
                visible: true,
            });
        }

        handleOk = () => {
            this.props.getAllParkingLots();
            this.setState({ visible: false });
            this.props.onCancel();
            this.props.form.resetFields();
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const { autoCompleteResult } = this.state;

            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                },
            };
            // const tailFormItemLayout = {
            //     wrapperCol: {
            //         xs: {
            //             span: 24,
            //             offset: 0,
            //         },
            //         sm: {
            //             span: 16,
            //             offset: 8,
            //         },
            //     },
            // };

            const websiteOptions = autoCompleteResult.map(website => (
                <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
            ));
            return (
                <Modal
                    visible={this.props.visible}
                    title="Modify the parkingLot"
                    okText="Modify"
                    onCancel={this.props.onCancel}
                    onOk={this.handleSubmit}

                >
                    <Form onSubmit={this.handleSubmit}>
                        <Modal
                            visible={this.state.visible}
                            title="Title"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Link to='/App/ParkingLotManage'>
                                    <Button key="submit" type="primary" onClick={this.handleOk}>
                                        确定
                            </Button>
                                </Link>,
                            ]}
                        >
                            {this.state.context}
                        </Modal>
                        <FormItem
                            {...formItemLayout}
                            label="停车场名称"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'Please input the parkingLot name!',
                                }
                                    // , {
                                    //     validator: this.validateToNextPassword,
                                    // }
                                ],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="停车场大小"
                        >
                            {getFieldDecorator('size', {
                                rules: [{
                                    required: true, message: 'Please input the size of the parkingLot!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
)


export default ModifyParkingLot;