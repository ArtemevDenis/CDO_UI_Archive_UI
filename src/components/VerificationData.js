import React from 'react';
import {Card} from 'antd';


class VerificationData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            acceptPersonalData: false,
        };
        this.props.setAcceptPersonalData(false);
        this.props.setCorrectData(false);
    }

    curDate() {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        return (day + "." + month + "." + year);
    }

    info() {
        let body = '<div className="row" style={{margin: "0px"}}>';
        if (this.props.typeRequest === "Study") {
            body += "<div className={'col-md-4'} style={{textAlign: 'right'}}>ФИО заявителя на момент обучения:</div>";

        } else if (this.props.typeRequest === "Work") {
            body += "<div className={'col-md-4'} style={{textAlign: 'right'}}>ФИО заявителя на момент работы:</div>";
        }
        /* if (this.props.typeRequest !== "Search") */
        body += "<div className={'col-md-8'}>" + this.props.oldFIO + "</div>";
        body += "</div>";
        return body;
    }

    selectTypeReq() {
        if (this.props.typeRequest === "Study")
            return "Учеба";
        else if (this.props.typeRequest === "Work")
            return "Работа";
        else if (this.props.typeRequest === "Search")
            return "Поиск сведений";
        return "";
    }

    selectReq() {
        if (this.props.request === "workPeriod")
            return " : Архивная спрвка о подтверждении периода работы";
        else if (this.props.request === "confStudy")
            return " : Архивная справка о подтверждении обучения";
        else if (this.props.request === "confDiploma")
            return " : Архивная справка о подтверждении диплома";
        else if (this.props.request === "docPrivet")
            return " : Документ из личного дела";
        else if (this.props.request === "unclaimedWorkBook")
            return " : Невостребованные трудовые книжки";
        return "";
    }

    selectWayGet() {
        if (this.props.wayGet === "Mail")
            return "По почте";
        else if (this.props.wayGet === "Email")
            return "По электронной почте на адрес";
        else if (this.props.wayGet === "Personally")
            return "Лично";
        else if (this.props.wayGet === "Confidant")
            return "Через доверенное лицо";
        else if (this.props.wayGet === "Courier")
            return "Курьерская служба";
    }


    render() {
        return (
            <div>
                <Card title="Проверка данных">
                    <div className={"row"} style={{margin: 0}}>

                        <div className={"col-md-4"} style={{textAlign: "right"}}>Дата подачи заявления:
                        </div>
                        <div className={"col-md-8"}>{this.curDate()}</div>
                        <div className={"col-md-4"} style={{textAlign: "right"}}><h6>Данные заявителя:</h6></div>
                        <div className={"col-md-8"}/>
                        <hr/>
                        <div className={"col-md-4"}
                             style={{textAlign: "right"}}>{this.props.formOrganization === "Entity" ? "Название организации:" : "ФИО заявителя:"}</div>
                        <div className={"col-md-8"}>{this.props.FIO}</div>


                        {this.props.typeRequest === "Study" &&
                        <div className={'col-md-4'} style={{textAlign: 'right'}}>ФИО заявителя на момент
                            обучения:</div>}
                        {this.props.typeRequest === "Work" &&
                        <div className={'col-md-4'} style={{textAlign: 'right'}}>ФИО заявителя на момент
                            работы:</div>}
                        {this.props.formOrganization === "Entity" &&
                        <div className={'col-md-4'} style={{textAlign: 'right'}}>ФИО исполнителя:</div>}
                        {this.props.typeRequest !== "Search" &&
                        <div className={'col-md-8'}> {this.props.oldFIO}</div>}

                        {this.props.formOrganization !== "Entity" &&
                        <div className={"col-md-4"} style={{textAlign: "right"}}>Категория обращения:</div>}
                        {
                            this.props.formOrganization !== "Entity" &&
                            <div className={"col-md-8"}>{this.selectTypeReq()} {this.selectReq()}</div>}


                        <div className={"col-md-4"} style={{textAlign: "right"}}><h6>Контактные данные:</h6></div>
                        <div className={"col-md-8"}/>
                        <div className={"col-md-4"} style={{textAlign: "right"}}>E-mail:</div>
                        <div className={"col-md-8"}>{this.props.email}</div>
                        <div className={"col-md-4"} style={{textAlign: "right"}}>Телефон:</div>
                        <div className={"col-md-8"}>{this.props.phone}</div>
                        <div className={"col-md-4"} style={{textAlign: "right"}}><h6>Способ получения:</h6></div>
                        <div className={"col-md-8"}/>
                        <div className={"col-md-4"} style={{textAlign: "right"}}>Способ получения:</div>
                        <div className={"col-md-8"}>{this.selectWayGet()}</div>
                        {this.props.wayGet === "Mail" && <>
                            <div className={"col-md-4"} style={{textAlign: "right"}}>Данные будут отправленны по
                                адресу:
                            </div>
                            <div
                                className={"col-md-8"}>Город: {this.props.city}, улица: {this.props.street},
                                дом: {this.props.house}<br/>Индекс: {this.props.index}
                            </div>
                        </>}
                        {this.props.wayGet === "Email" && <>
                            <div className={"col-md-4"} style={{textAlign: "right"}}>Данные будут отправлены на
                                электронную
                                почту:
                            </div>
                            <div
                                className={"col-md-8"}>{this.props.email}
                            </div>
                        </>}
                        <div className={"col-md-4"} style={{textAlign: "right"}}><h6>Подтверждение:</h6></div>
                        <div className={"col-md-8"}/>
                        <div className={"col-md-4"} style={{textAlign: "right"}}>Даю согласие на обработку персональных
                            данных:
                        </div>
                        <div className={"col-md-8"}><label className="containerCheckbox">
                            <input type="checkbox"
                                   checked={this.state.acceptPersonalData}
                                   onChange={(e) => {
                                       this.setState({acceptPersonalData: e.target.checked});
                                       this.props.setAcceptPersonalData(e.target.checked)
                                   }}/>
                            <span className="checkMark"></span></label></div>

                        <div className={"col-md-4"} style={{textAlign: "right"}}>Подтверждаю корректность введенных
                            данных:
                        </div>
                        <div className={"col-md-8"} style={{paddingTop: 10 + "px", paddingBottom: 10 + "px"}}><label
                            className="containerCheckbox">
                            <input type="checkbox"
                                   checked={this.state.correctData}
                                   onChange={(e) => {
                                       this.setState({correctData: e.target.checked});
                                       this.props.setCorrectData(e.target.checked)
                                   }}/>
                            <span className="checkMark"></span></label></div>

                    </div>
                </Card>
            </div>
        )
    }
}

export default VerificationData

/*
<div dangerouslySetInnerHTML={{__html: this.info()}}/>

<div dangerouslySetInnerHTML={{__html: this.info()}}/>
*/