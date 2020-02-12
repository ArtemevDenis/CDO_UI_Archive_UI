import React from 'react';

import {Card, DatePicker, Form, Input, Select} from 'antd';

const {Option} = Select;

class Work extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FIO: this.props.FIO,
            oldFIO: this.props.oldFIO,
            dayOfBirthday: this.props.dayOfBirthday,
            dateEnd: this.props.dateEnd,
            edu: this.props.edu,
            worker: this.props.worker,
            email: this.props.email,
            phone: this.props.phone,

        };
        this.setField = this.setField.bind(this);

    }

    // componentDidUpdate() {
    //     if (this.state.FIO !== null &&
    //         this.state.oldFIO !== null &&
    //         this.state.dayofbirthday !== null &&
    //         this.state.dateEnd !== null &&
    //         this.state.edu !== null &&
    //         this.state.worker !== null &&
    //         this.state.email !== null &&
    //         this.state.phone !== null)
    //         this.props.setStatus(true);
    //     else
    //         this.props.setStatus(false);
    // }

    componentDidMount() {
        this.setField();
    }

    validatorYear = (rule, value, callback) => {
        const now = new Date();
        if (value > now.getFullYear() || value < 1970)
            callback("Введите год окончания")
    };

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
            old_FIO: this.props.oldFIO,
            day_of_birthday: this.props.dayOfBirthday,
            date_end: this.props.dateEnd,
            edu: this.props.edu,
            worker: this.props.worker,
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
                        <Form.Item label="ФИО (на момент увольнения)">
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
                                        this.props.setDayOfBirthday(date)
                                    }
                                }}/>)}
                        </Form.Item>
                        <Form.Item label="Выберете год увольнения">
                            {getFieldDecorator('date_end', {
                                rules: [{
                                    len: 4,
                                    required: true,
                                    message: 'Выберете год увольнения!',
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
                            />)
                            }
                        </Form.Item>
                        <Form.Item label="Учебное заведение">
                            {getFieldDecorator("Edu", {
                                rules: [{
                                    required: true,
                                    message: 'Введите учебное заведение',
                                    whitespace: true
                                }],
                            })(
                                <Select
                                    showSearch
                                    style={{width: 200}}
                                    placeholder="Учебное заведение"
                                    optionFilterProp="children"
                                    onChange={(value) => {
                                        this.setState({edu: value});
                                        this.props.setEdu(value);
                                    }}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }>
                                    <Option value="LVIMU">ЛВИМУ</Option>
                                    <Option value="GMA">ГМА</Option>
                                    <Option value="LIVT">ЛИВТ</Option>
                                    <Option value="GUVK">ГУВК</Option>
                                    <Option value="GUMRF">ГУМРФ</Option>
                                    <Option value="LRU">ЛРУ</Option>
                                    <Option value="KVT">КВТ</Option>
                                    <Option value="KITSF">КИТСФ</Option>
                                    <Option value="LAU">ЛАУ</Option>
                                    <Option value="LMU">ЛМУ</Option>
                                    <Option value="MK">МК</Option>
                                    <Option value="MGAFT">МГАВТ</Option>
                                    <Option value="college_GUMRF">Колледж ГУМРФ</Option>
                                </Select>)}
                        </Form.Item>
                        <Form.Item label="Должность">
                            {getFieldDecorator('worker', {
                                rules: [{
                                    required: true,
                                    message: 'Введите должность!',
                                    whitespace: true
                                }],
                            })(<Input placeholder={"Специалист по техническим и программным средствам"}
                                      onChange={(e) => {
                                          this.setState({worker: e.target.value});
                                          this.props.setWorker(e.target.value);
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
                                        required: true,
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

const WorkForm = Form.create({})(Work);
export default WorkForm