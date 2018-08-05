import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, Alert } from 'antd';
import React from 'react';
import ResourceAPi from '../../api/ResourceAPI';
import { Link } from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const ModifyEmployee = Form.create()(
    class extends React.Component {
        state = {
            confirmDirty: false,
            autoCompleteResult: [],
            visible: false,
            context: '',
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
                    console.log('Received values of form: ', values);
                    console.log(this.props.employeeId);
                    ResourceAPi.modifyEmployeeInfo({ id: this.props.employeeId, ...values }, (statusCode) => this.getStatusCode(statusCode));
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
            this.props.getAllEmployees();
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
            return (
                <Modal
                    visible={this.props.visible}
                    title="修改员工信息"
                    okText="modify"
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
                                <Link to='/App/EmployeeManage'>
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
                            label="E-mail"
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'E-mail格式错误!',
                                }, {
                                    message: '请输入E-mail!',
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
                    </Form>
                </Modal>
            );
        }
    }
)


export default ModifyEmployee;