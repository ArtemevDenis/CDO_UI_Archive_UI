import React from 'react';
import {Card, DatePicker, Form, Input, Select, Switch} from 'antd';

const {Option} = Select;

class Study extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            FIO: this.props.FIO,
            oldFIO: this.props.oldFIO,
            dayOfBirthday: this.props.dayOfBirthday,
            dateEnd: this.props.dateEnd,
            email: this.props.email,
            phone: this.props.phone,
            specialty: this.props.specialty,
            formTraining: this.props.formTraining,
            isExpelled: this.props.isExpelled,
            cpAllDocs: this.props.cpAllDocs
        };
        this.setField = this.setField.bind(this);
        //    this.updateReturn = this.updateReturn.bind(this);

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
            FIO: this.state.FIO,
            old_FIO: this.state.oldFIO,
            day_of_birthday: this.state.dayOfBirthday,
            date_end: this.state.dateEnd,
            email: this.state.email,
            phone: this.state.phone,
            specialty: this.state.specialty,
            formTraining: this.state.formTraining,
            isExpelledSwitch: this.state.isExpelled,
            cpDocs: this.state.cpAllDocs,
            valuePropName: this.state.isExpelled,
        });
    };

    validatorYear = (rule, value, callback) => {
        const now = new Date();
        if (value > now.getFullYear() || value < 1970)
            callback("Введите год окончания обучения")
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
                        <Form.Item
                            label={"ФИО (на момент обучения)"}>
                            {getFieldDecorator('old_FIO', {
                                rules: [{
                                    required: true,
                                    message: 'Введите ФИО!',
                                    whitespace: true
                                }],
                            })(<Input placeholder={"Иванов Иван Иванович"}
                                      onChange={(e) => {
                                          this.setState({oldFIO: e.target.value});
                                          this.props.setOldFIO(e.target.value);
                                      }}/>)}
                        </Form.Item>
                        <Form.Item label="Выберете дату рождения">
                            {getFieldDecorator('day_of_birthday', {
                                rules: [{type: 'object', required: true, message: 'Выберете дату рождения!'}],
                            })(<DatePicker
                                format="DD.MM.YYYY"
                                placeholder={"06.12.1981"}
                                onChange={(date, dateString) => {
                                    if (date !== null) {
                                        this.setState({dayOfBirthday: date});
                                        this.props.setDayOfBirthday(date);
                                    }
                                }}/>)}
                        </Form.Item>
                        <Form.Item label="Введите год окончания обучения">
                            {getFieldDecorator('date_end', {
                                rules: [{
                                    len: 4,
                                    required: true,
                                    message: 'Выберете год окончания обучения!',
                                    whitespace: true,
                                    validator: this.validatorYear
                                }],
                            })(<Input placeholder={"2013"}
                                      type={"number"}
                                      style={{width: 174}}
                                      maxLength={4}
                                      onChange={(date, dateString) => {
                                          if (date !== null) {
                                              this.setState({dateEnd: date.target.value});
                                              this.props.setDateEnd(date.target.value)
                                          }
                                      }}
                            />)}
                        </Form.Item>
                        <Form.Item label="Завершене в связи с отчислением">
                            {getFieldDecorator('isExpelledSwitch', {valuePropName: "checked"})(<Switch
                                onChange={(e) => {
                                    this.setState({isExpelled: e});
                                    this.props.setIsExpelled(e);
                                }}/>)}
                        </Form.Item>
                        <Form.Item label="Форма обучения">
                            {getFieldDecorator('formTraining')
                            (<Select style={{width: 174}}
                                     placeholder={"Форма обучения"}
                                     onChange={(e) => {
                                         this.setState({formTraining: e});
                                         this.props.setFormTraining(e);
                                     }
                                     }>
                                <Option value="full-time">Очная</Option>
                                <Option value="correspondence">Заочная</Option>
                                <Option value="part-time">Очно-заочная</Option>
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="Факультет/Специальность">
                            {getFieldDecorator('specialty', {
                                rules: [
                                    {required: true, message: 'Введите факультет или специальность'},
                                ],
                            })(<Input type="text" placeholder="ИБ"
                                      onChange={(e) => {
                                          this.setState({specialty: e.target.value});
                                          this.props.setSpecialty(e.target.value);
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
                                      placeholder={"79990000000"} onChange={(e) => {
                                this.props.setPhone(e.target.value);
                                this.setState({phone: e.target.value});
                            }}/>)}
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        )
    }
}

const StudyForm = Form.create({})(Study);
export default StudyForm