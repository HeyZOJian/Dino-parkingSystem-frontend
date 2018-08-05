import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, Alert } from 'antd';
import React from 'react';
import ResourceAPi from '../../api/ResourceAPI';
import { Link } from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const ModifyParkingBoy = Form.create()(
    class extends React.Component {
        state = {
            confirmDirty: false,
            autoCompleteResult: [],
            visible: false,
            context: '',
            workStatus: '',
        };

        getStatusCode(statusCode) {
            if (statusCode === 204) {
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
                    console.log('Received values of form: ', {...values, workStatus: this.state.workStatus});
                    console.log(this.props.parkingBoyId);
                    ResourceAPi.modifyEmployeeInfo({ id: this.props.parkingBoyId, ...values, workStatus: this.state.workStatus }, (statusCode) => this.getStatusCode(statusCode));
                }
            });
        }

        handleConfirmBlur = (e) => {
            const value = e.target.value;
            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        }

        compareToFirstPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('Two passwords that you enter is inconsistent!');
            } else {
                callback();
            }
        }

        validateToNextPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        }

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
            this.props.getAllParkingBoys();
            this.setState({ visible: false });
            this.props.onCancel();
            this.props.form.resetFields();
        }

        handleChange (value) {
            this.setState({
                workStatus: value
            })
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
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                },
            };

            const websiteOptions = autoCompleteResult.map(website => (
                <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
            ));
            console.log(this.props.workStatus)
            return (
                <Modal
                    visible={this.props.visible}
                    title="修改停车员信息"
                    onCancel={this.props.onCancel}
                    onOk={this.handleSubmit}

                >
                    <Form onSubmit={this.handleSubmit}>
                        <Modal
                            visible={this.state.visible}
                            title="提示"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Link to='/App/ParkingBoyManage'>
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
                            label="姓名"
                        >
                            {getFieldDecorator('nickname', {
                                rules: [{
                                    message: 'Please input your E-mail!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="电话号码"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{ message: '请输入电话号码!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="状态"
                        >
                                <Select style={{ width: 315 }} onChange={(value) => this.handleChange(value)}>
                                    <Option disabled={this.props.workStatus === '上班'} value="onduty">上班</Option>
                                    <Option disabled={this.props.workStatus === '下班'} value="offduty">下班</Option>
                                    <Option disabled={this.props.workStatus === '迟到'} value="late">迟到</Option>
                                    <Option disabled={this.props.workStatus === '请假'} value="leave">请假</Option>
                                </Select>
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
)


export default ModifyParkingBoy;