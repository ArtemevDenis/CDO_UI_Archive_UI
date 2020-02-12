import React from "react"
import {Card} from "antd";


import {ToastContainer} from 'react-toastify';

import SimpleReactFileUpload from "./AttachDocumentsComponents/Upload";


class AttachDocuments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FIO: this.props.FIO,
        };
    }


    render() {
        return (
            <Card title="Загрузите необходимые документы:">
                {this.props.formOrganization === "Entity"
                    ? <SimpleReactFileUpload
                        FIO={this.props.FIO}
                        type={"inquiry"}
                        listFile={this.props.inquiryFile}
                        setFileList={this.props.addFileToDataForm}
                        nameField={"Запрос"} path={'/api/upload'}/>
                    : <div>
                        {this.props.wayGet === "Сonfidant"
                        && <SimpleReactFileUpload
                            FIO={this.props.FIO}
                            type={"proxyDoc"}
                            listFile={this.props.proxyDocFile}
                            setFileList={this.props.addFileToDataForm}
                            nameField={"Доверенность"} path={'/api/upload'}/>}

                        {this.props.typeRequest !== "Search"
                        && <div><SimpleReactFileUpload
                            FIO={this.props.FIO}
                            type={"passport"}

                            listFile={this.props.passportFile}
                            setFileList={this.props.addFileToDataForm}
                            nameField={"Документ удостоверяющий личность"} path={'/api/upload'}/>
                            {this.props.typeRequest === "Work"
                            && <SimpleReactFileUpload
                                FIO={this.props.FIO}
                                type={"workbook"}
                                listFile={this.props.workbookFile}
                                setFileList={this.props.addFileToDataForm}
                                nameField={"Трудовая книжка"} path={'/api/upload'}/>}
                            {this.props.typeRequest === "Study"
                            && <SimpleReactFileUpload
                                FIO={this.props.FIO}
                                type={"copyDiploma"}

                                listFile={this.props.copyDiplomaFile}
                                setFileList={this.props.addFileToDataForm}
                                nameField={"Копия диплома"} path={'/api/upload'}/>}
                        </div>}
                        {this.props.typeRequest === "Search"
                        && <div>
                            <SimpleReactFileUpload
                                FIO={this.props.FIO}
                                type={"kinshipDoc"}
                                listFile={this.props.kinshipDocFile}
                                setFileList={this.props.addFileToDataForm}
                                nameField={"Документы подтверждающие родство"} path={'/api/upload'}/>
                            <SimpleReactFileUpload
                                FIO={this.props.FIO}
                                type={"statement"}
                                listFile={this.props.statementFile}
                                setFileList={this.props.addFileToDataForm}
                                nameField={"Заявление"} path={'/api/upload'}/>
                        </div>}
                    </div>}
                <div className="form-group">
                    <ToastContainer/>
                </div>
            </Card>)
    }
}

export default AttachDocuments;