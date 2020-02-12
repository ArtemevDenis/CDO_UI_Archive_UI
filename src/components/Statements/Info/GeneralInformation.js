import React from 'react';
import {Card} from "antd/lib/index";
import "../../../css/linkButton.css"


class GeneralInformation extends React.Component {
    render() {
        return (
            <div>
                <Card title="Данные об архиве">
                    <h2>Подача заявления</h2>

                    <p>Приём посетителей: вторник, среда, пятница с 9.00 до 16.00</p>
                    <p>Адрес: Межевой канал, дом 6, пом.100</p>

                    <div className={"row"}>
                        <div className={"col-md-6"}>Выполнение запросов, архивные справки:
                            <br/>Евсеенко Екатерина Максимовна
                            <br/>тел.: <a
                                href="tel:+78127489775">8 (812) 748-97-75</a>
                            <br/>E-mail: <a
                                href="mailto:archiv@gumrf.ru">archiv@gumrf.ru</a>
                        </div>
                        <div className={"col-md-6"}>Заведующий архивом:<br/>Фомина Светлана Геннадьевна<br/>тел.: <a
                            href="tel:+78127489694">8 (812) 748-96-94</a>,
                            вн.тел. 704
                            <br/>E-mail: <a
                                href="mailto:FominaSG@gumrf.ru">FominaSG@gumrf.ru</a>
                        </div>
                    </div>
                    <p>Архивариусы: </p>
                    <ul>
                        <li>Куваева Анастасия Игоревна</li>
                        <li>Томашевич Полина Петровна</li>
                        <li>Запеканова Елена Сергеевна</li>
                    </ul>
                    {this.props.primarySettings !== false &&
                    <div><p>Для заказа справок или документов заполните форму обратной связи архива или заявление.<br/>
                        Заявление можно направить посредством электронной/почтовой связи<br/><strong>Срок исполнения запросов в течение 30 дней</strong>
                    </p>
                        <p className="linkButton"><a
                            href={"http://wrk1.gumrf.ru/files/blank_arch_doc_2019.docx"}>Бланк заявления</a></p>
                        <br/>
                    </div>
                    }

                </Card>
            </div>
        )
    }
}

export default GeneralInformation