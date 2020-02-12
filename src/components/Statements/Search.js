import React from 'react';

import {Card, Form, Input} from 'antd';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.setField = this.setField.bind(this);

    }

    componentDidMount() {
        this.setField();
    }


    validatePhone = (rule, value, callback) => {
        const {form} = this.props;
        if (value.length > 5) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    setField() {
        this.props.form.setFieldsValue({
            FIO: this.props.FIO,
            email: this.props.email,
            phone: this.props.phone,

        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        //xs: 8, sm: 16, md: 24, lg: 32
        // разбивка для колонок формы
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 24},
                md: {span: 12},
                lg: {span: 6}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 24},
                md: {span: 12},
                lg: {span: 18}
            },
        };
        return (
            <div>
                < Card title="Заявление">
                    <Form {...formItemLayout}>
                        <Form.Item label="ФИО (полностью)">
                            {getFieldDecorator("FIO", {
                                rules: [{
                                    required: true,
                                    message: 'Введите ФИО!',
                                    whitespace: true
                                }],
                            })(<Input placeholder={"Иванов Иван Иванович"}
                                      onChange={(e) => {
                                          this.setState({FIO: e.target.value});
                                          this.props.setFIO(e.target.value);
                                      }}/>)}
                        </Form.Item>
                        <Form.Item label="E-mail">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'Email введен некорректно!',
                                    },
                                    {
                                        required: true,
                                        message: 'Введите ваш email!',
                                    },
                                ],
                            })(<Input placeholder={"email@email.ru"} onChange={(e) => {
                                this.setState({email: e.target.value});
                                this.props.setEmail(e.target.value);
                            }}/>)}
                        </Form.Item>
                        <Form.Item label="Телефонный номер">
                            {getFieldDecorator('phone', {
                                rules: [
                                    {required: true, message: 'Введите номер телефона'},
                                    {
                                        validator: this.validatePhone,
                                    },
                                ],
                            })(<Input type="number" prefix="+" style={{width: 174}}
                                // this.setState({email: e.target.value});
                                      placeholder={"79990000000"} onChange={(e) => {
                                this.props.setPhone(e.target.value);
                            }}/>)}
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        )
    }
}

const SearchForm = Form.create({})(Search);
export default SearchForm