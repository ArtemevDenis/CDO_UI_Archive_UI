import React from 'react';
import {Button, Card, Form, Radio} from "antd";


class MainConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formOrganization: this.props.formOrganization,
            typeRequest: this.props.typeRequest,
            request: this.props.request,
        };
    }

    componentDidMount() {
        this.setField();
    }

    setField() {
        this.props.form.setFieldsValue({
            formOrganization: this.state.formOrganization,
            typeRequest: this.state.typeRequest,
            request: this.state.request
        });
    };


    isDisableNext() {
        if (this.state.request === "salaryCertificate" || this.state.request === "duplicateDiploma" || this.state.request === "academicReference")
            return true;
        if (this.state.formOrganization === "Entity")
            return false;
        else if (this.state.formOrganization === "Individual" && this.state.typeRequest === "Search")
            return false;
        else if (this.state.formOrganization === "Individual" && this.state.typeRequest !== "Search" && this.state.typeRequest !== "" && this.state.request !== "")
            return false;
        return true;
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Card title="Форма обратной связи архива">
                    <Form>
                        <Form.Item label={"Вы являетесь:"}>
                            {getFieldDecorator('formOrganization')(<Radio.Group onChange={(e) => {
                                this.props.setFormOrg(e.target.value);
                                this.setState({formOrganization: e.target.value, typeRequest: "", request: ""});
                            }} disabled={false}>
                                <Radio.Button value="Individual">Физическим лицом</Radio.Button>
                                <Radio.Button value="Entity">Юридическим лицом</Radio.Button>
                            </Radio.Group>)}
                        </Form.Item>
                        {this.state.formOrganization === "Individual" &&
                        <Form.Item label={"Выберите тип запроса:"}>
                            {getFieldDecorator('typeRequest')(<Radio.Group onChange={(e) => {
                                this.setState({typeRequest: e.target.value, request: ""});
                                this.props.setTypeReq(e.target.value);
                            }}>
                                <Radio.Button value="Work">Работа</Radio.Button>
                                <Radio.Button value="Study">Учеба</Radio.Button>
                                <Radio.Button value="Search">Поиск сведений</Radio.Button>
                            </Radio.Group>)}
                        </Form.Item>}
                        {(this.state.formOrganization === "Individual" && this.state.typeRequest === "Work") &&
                        <Form.Item label={"Тип справки для работы:"}>
                            {getFieldDecorator('request')(<Radio.Group onChange={(e) => {
                                this.setState({request: e.target.value});
                                this.props.setRequest(e.target.value);
                            }}>
                                <Radio.Button value="workPeriod">Архивная справка о подтверждении периода
                                    работы</Radio.Button>
                                <Radio.Button value="salaryCertificate">Справка о заработной плате</Radio.Button>
                                <Radio.Button value="unclaimedWorkBook">Невостребованные трудовые книжки</Radio.Button>
                            </Radio.Group>)}
                        </Form.Item>}
                        {(this.state.formOrganization === "Individual" && this.state.typeRequest === "Study") &&
                        <Form.Item label={"Тип справки для учебы:"}>
                            {getFieldDecorator('request')(<Radio.Group onChange={(e) => {
                                this.setState({request: e.target.value});
                                this.props.setRequest(e.target.value);
                            }}>
                                <Radio.Button value="confStudy">Архивная справка о подтверждении
                                    обучения</Radio.Button>
                                <Radio.Button value="confDiploma">Архивная справка о подтверждении
                                    диплома</Radio.Button>
                                <Radio.Button value="docPrivet">Документ из личного дела</Radio.Button>
                                <Radio.Button value="academicReference">Академическая справка</Radio.Button>
                                <Radio.Button value="duplicateDiploma">Дубликат диплома</Radio.Button>
                            </Radio.Group>)}
                        </Form.Item>}
                    </Form>

                    {(this.state.request === "salaryCertificate" || this.state.request === "duplicateDiploma" || this.state.request === "academicReference")
                    && <div>
                        <h5>Архив справки данного вида не оформляет!</h5>
                        <p>За информацией обратитесь в <strong>общий отдел</strong>.</p>
                        <p>Контакты общего отдела:</p>
                        <p><a href="tel:+7 (812) 748-96-92">+7 (812) 748-96-92</a></p>
                        <p><a href="mailto:otd_o@gumrf.ru">otd_o@gumrf.ru</a></p>
                        <p>Адрес: 198035, г. Санкт-Петербург, ул. Двинская, 5/7</p>
                        <p>По результатам запроса с Вами свяжутся по указанному в заявлении номеру телефона</p>
                    </div>
                    }
                </Card>
                <br/>
                <Button
                    disabled={this.isDisableNext()}
                    type="primary" onClick={() => {
                    this.props.setPrimarySettings(false);
                }}>Перейти к оформлению заявления</Button>
            </div>
        )
    }
}

const MainConfigForm = Form.create({})(MainConfig);
export default MainConfigForm