import React from "react"
import {Card, Form, Input, Radio} from "antd";

class WayGet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wayGet: this.props.wayGet,
            city: this.props.city,
            street: this.props.street,
            house: this.props.house,
            index: this.props.index,
            lackOfComplaints: this.props.lackOfComplaints
        };
    }


    componentDidMount() {
        this.setField();
    }

    setField() {
        this.props.form.setFieldsValue({
            wayGet: this.state.wayGet,
            city: this.state.city,
            street: this.state.street,
            house: this.state.house,
            index: this.state.index,
            lackOfComplaints: this.state.lackOfComplaints
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

            <Card title="Способ получения информации">
                <Form {...formItemLayout}>
                    <Form.Item label="Способ получения данных">
                        {getFieldDecorator('wayGet')
                        (<Radio.Group onChange={(e) => {
                            this.setState({wayGet: e.target.value});
                            this.props.setWayGet(e.target.value);
                        }}>
                            {this.props.formOrganization !== "Entity" &&
                            <Radio.Button value="Personally">Лично</Radio.Button>}
                            {this.props.formOrganization !== "Entity" &&
                            <Radio.Button value="Сonfidant">Доверенное лицо</Radio.Button>}
                            {this.props.formOrganization !== "Entity" &&
                            <Radio.Button value="Email">По электронной почте</Radio.Button>}
                            {this.props.formOrganization === "Entity" &&
                            <Radio.Button value="Courier">Курьерская служба</Radio.Button>}
                            <Radio.Button value="Mail">По почте</Radio.Button>
                        </Radio.Group>)}
                    </Form.Item>
                    {this.state.wayGet === "Email" && <div>
                        <p>Данные будут высланы на {this.props.email}</p>
                    </div>}
                    {this.state.wayGet === "Mail" && <div>
                        <Form.Item label="Населенный пункт">
                            {getFieldDecorator('city')
                            (<Input type="text" placeholder="Санкт-Петербург"
                                    onChange={(e) => {
                                        this.setState({city: e.target.value});
                                        this.props.setCity(e.target.value);
                                    }}/>)}
                        </Form.Item>
                        <Form.Item label="Улица">
                            {getFieldDecorator('street')
                            (<Input type="text" placeholder="Невский проспект" onChange={(e) => {
                                this.setState({street: e.target.value});
                                this.props.setStreet(e.target.value);
                            }}/>)}
                        </Form.Item>
                        <Form.Item label="Дом">
                            {getFieldDecorator('house')
                            (<Input type="text" placeholder="28" onChange={(e) => {
                                this.setState({house: e.target.value});
                                this.props.setHouse(e.target.value);
                            }}/>)}
                        </Form.Item>
                        <Form.Item label="Индекс">
                            {getFieldDecorator('index')
                            (<Input type="number" placeholder="191186" onChange={(e) => {
                                this.setState({index: e.target.value});
                                this.props.setIndex(e.target.value);
                            }}/>)}
                        </Form.Item>
                    </div>}
                </Form>
                {this.state.wayGet === "Mail" && <div className={"row"}>
                    <div className={"col-md-3"}></div>
                    <div className={"col-md-9"}><label className="containerCheckbox">В случае утери документов почтой к
                        университету претензий иметь не
                        буду<input type="checkbox"
                                   checked={this.state.lackOfComplaints}
                                   onChange={(e) => {
                                       this.setState({lackOfComplaints: e.target.checked});
                                       this.props.setLackOfComplaints(e.target.checked);
                                   }}/>
                        <span className="checkMark"></span></label></div>
                </div>
                }
            </Card>
        )
    }
}


const WayGetForm = Form.create({})(WayGet);
export default WayGetForm;