import React from 'react';
import {Button, Steps} from 'antd';
import {post} from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import "./css/upload.css"
import "./css/linkButton.css"
import './index.css'

import AttachDocuments from "./components/AttachDocuments";
import VerificationData from "./components/VerificationData";
import GeneralInformation from "./components/Statements/Info/GeneralInformation";
import End from "./components/Statements/Info/End";

import MainConfigForm from "./components/MainConfig";
import WayGetForm from "./components/WayGet";
import StudyForm from "./components/Statements/Study";
import WorkForm from "./components/Statements/Work";
import SearchForm from "./components/Statements/Search";
import EntityForm from "./components/Statements/Entity";


const {Step} = Steps;
const width = window.innerWidth;

const sendData = new FormData();

class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            steps: [],
            primarySettings: true,

            //info from 1 form, block VerificationData
            formOrganization: null,
            typeRequest: null,
            request: null,


            eduFIO: null,
            //   dayOfBirthday: null,
            //  dateEndStudy: null,

            cpWorkbook: null,
            cpDiploma: null,

            wayGet: null,
            city: null,
            street: null,
            house: null,
            index: null,


            //study fields
            FIO: null,
            oldFIO: null,
            dayOfBirthday: null,
            dateEnd: null,
            email: null,
            phone: null,
            specialty: null,
            formTraining: null,
            isExpelled: false,


            studyStatus: false,
            workStatus: false,
            searchStatus: false,

            wayGetStatus: false,
            //
            current: 0,
        };
        this.statusStudentUpdateReturn = this.statusStudentUpdateReturn.bind(this);
        this.createDataFile = this.createDataFile.bind(this);
        this.sendDataJSON = this.sendDataJSON.bind(this);
        this.sendDataFile = this.sendDataFile.bind(this);


    }

    setFormOrg(formOrganization) {
        formOrganization !== this.state.formOrganization &&
        this.setState({formOrganization, steps: []});

    }

    setTypeReq(typeRequest) {
        typeRequest !== this.state.typeRequest &&
        this.setState({typeRequest, steps: []});
    }

    setRequest(request) {
        request !== this.state.request &&
        this.setState({request, steps: []});
    }

    setFIO(FIO) {
        this.setState({FIO});
    }

    setOldFIO(oldFIO) {
        this.setState({oldFIO});
    }

    setDayOfBirthday(dayOfBirthday) {
        this.setState({dayOfBirthday});
    }

    setDateEnd(dateEnd) {
        this.setState({dateEnd});
    }

    setEmail(email) {
        this.setState({email});
    }

    setPhone(phone) {
        this.setState({phone});
    }

    setIsExpelled(isExpelled) {
        this.setState({isExpelled});
    }

    /*WayGet component*/

    setSpecialty(specialty) {
        this.setState({specialty});
    }

    setFormTraining(formTraining) {
        this.setState({formTraining});
    }

    setCpDocs(cpWorkbook, cpDiploma) {
        this.setState({cpWorkbook, cpDiploma});
    }

    setCpAllDocs(cpAllDocs) {
        this.setState({cpAllDocs});
    }

    setWayGet(wayGet) {
        this.setState({wayGet})
    }

    setCity(city) {
        this.setState({city});
    }

    setStreet(street) {
        this.setState({street});
    }

    setHouse(house) {
        this.setState({house});
    }

    setIndex(index) {
        this.setState({index});
    }

    setEdu(edu) {
        this.setState({edu})
    }

    setStudyStatus(studyStatus) {
        this.setState({studyStatus})
    }

    setWorker(worker) {
        this.setState({worker})
    }

    setLackOfComplaints(lackOfComplaints) {
        this.setState({lackOfComplaints})
    }

    setWayGetStatus(wayGetStatus) {
        this.setState({wayGetStatus})
    }

    setPrimarySettings(primarySettings) {
        this.setState({primarySettings});
        this.updateDataInSteps();
    }

    addFileToDataForm(files, type) {
        // console.log("adding file at App");
        switch (type) {
            case "inquiry":
                this.setState({inquiryFile: files});
                //    console.log("inquiryFile", this.state.inquiryFile);
                break;
            case "proxyDoc":
                this.setState({proxyDocFile: files});
                //    console.log("proxyDocFile", this.state.proxyDocFile);
                break;
            case "passport":
                this.setState({passportFile: files});
                //     console.log("passportFile", this.state.passportFile);
                break;
            case "workbook":
                this.setState({workbookFile: files});
                //   console.log("workbookFile", this.state.workbookFile);
                break;
            case "copyDiploma":
                this.setState({copyDiplomaFile: files});
                //   console.log("copyDiplomaFile", this.state.copyDiplomaFile);
                break;
            case "kinshipDoc":
                this.setState({kinshipDocFile: files});
                //    console.log("kinshipDocFile", this.state.kinshipDocFile);
                break;
            case "statement":
                this.setState({statementFile: files});
                //   console.log("statementFile", this.state.statementFile);
                break;
        }
    }

    sendDataJSON = (pathFile) => {
        let _this = this;
        const data = JSON.stringify({
            phone: this.state.phone,
            email: this.state.email,

            pathFile: pathFile,

            formOrganization: this.state.formOrganization,
            typeRequest: this.state.typeRequest,
            request: this.state.request,

            FIO: this.state.FIO,
            oldFIO: this.state.oldFIO,
            dayOfBirthday: this.state.dayOfBirthday,
            dateEnd: this.state.dateEnd,


            isExpelled: this.state.isExpelled,
            formTraining: this.state.formTraining,
            specialty: this.state.specialty,


            worker: this.state.worker,
            edu: this.state.edu,

            wayGet: this.state.wayGet,
            city: this.state.city,
            street: this.state.street,
            house: this.state.house,
            index: this.state.index,
        });
        let request = new XMLHttpRequest();
        // посылаем запрос на адрес "/api/post"
        request.open("POST", "/api/post", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
            // получаем и парсим ответ сервера local
            //let receivedUser = JSON.parse(request.response);
            //console.log(receivedUser);   // смотрим ответ сервера
            console.log(request.response);
            if (request.response === "OK")
                _this.setState({sendStatusOK: true});
            else {
                _this.setState({sendStatusOK: false});
                toast.error('Произошла ошибка при отправке на сервер!')
            }
        });
        request.send(data);
    };

    addToSendData = (filesArray, type) => {
        //   console.log(this.state.FIO.replace(/\s/g, '_'));
        if (filesArray !== undefined)
            for (let i = 0; i < filesArray.length; i++) {
                sendData.append('file', filesArray[i], type + "_" + this.state.FIO.replace(/\s/g, '_') + "" + filesArray[i].name.replace(/\s/g, ''));
            }
    };

    sendDataFile = () => {
        post("/api/upload", sendData).then((res) => {
            this.sendDataJSON(res.data);

        }).catch(error => {
            this.setState({sendStatusOK: false});
            toast.error('Произошла ошибка при отправке на сервер!')
            // console.log(error.message);
        });
    };

    createDataFile = () => {
        this.addToSendData(this.state.inquiryFile, "inquiryFile");
        this.addToSendData(this.state.proxyDocFile, "proxyDocFile");
        this.addToSendData(this.state.passportFile, "passportFile");
        this.addToSendData(this.state.workbookFile, "workbookFile");
        this.addToSendData(this.state.copyDiplomaFile, "copyDiplomaFile");
        this.addToSendData(this.state.kinshipDocFile, "kinshipDocFile");
        this.addToSendData(this.state.statementFile, "statementFile");

        this.sendDataFile();
    };

    updateDataInSteps() {
        this.state.steps.length = 0;
        if (this.state.steps.length === 0) {
            if (this.state.formOrganization === "Individual") {
                this.state.typeRequest === "Study" && this.state.steps.push({
                    title: "Заявление",
                    key: "study",
                    content: <StudyForm
                        typeRequest={this.state.typeRequest}

                        //общие параметры
                        FIO={this.state.FIO}
                        oldFIO={this.state.oldFIO}
                        dayOfBirthday={this.state.dayOfBirthday}
                        dateEnd={this.state.dateEnd}
                        email={this.state.email}
                        phone={this.state.phone}


                        // обучение
                        specialty={this.state.specialty}
                        formTraining={this.state.formTraining}
                        isExpelled={this.state.isExpelled}
                        cpAllDocs={this.state.cpAllDocs}
                        cpWorkbook={this.state.cpWorkbook}
                        cpDiploma={this.state.cpDiploma}

                        setCpDocs={this.setCpDocs.bind(this)}
                        setFormTraining={this.setFormTraining.bind(this)}
                        setIsExpelled={this.setIsExpelled.bind(this)}
                        setPhone={this.setPhone.bind(this)}
                        setEmail={this.setEmail.bind(this)}
                        setDayOfBirthday={this.setDayOfBirthday.bind(this)}
                        setOldFIO={this.setOldFIO.bind(this)}
                        setFIO={this.setFIO.bind(this)}
                        setSpecialty={this.setSpecialty.bind(this)}
                        setCpAllDocs={this.setCpAllDocs.bind(this)}
                        setDateEnd={this.setDateEnd.bind(this)}
                        setStatus={this.setStudyStatus.bind(this)}

                    />,
                });
                this.state.typeRequest === "Work" && this.state.steps.push({
                    title: "Заявление",
                    key: "work",
                    content: <WorkForm
                        typeRequest={this.state.typeRequest}

                        //общие параметры
                        FIO={this.state.FIO}
                        oldFIO={this.state.oldFIO}
                        dayOfBirthday={this.state.dayOfBirthday}
                        dateEnd={this.state.dateEnd}
                        email={this.state.email}
                        phone={this.state.phone}
                        worker={this.state.worker}
                        //работа
                        edu={this.state.edu}

                        setPhone={this.setPhone.bind(this)}
                        setEmail={this.setEmail.bind(this)}
                        setDayOfBirthday={this.setDayOfBirthday.bind(this)}
                        setOldFIO={this.setOldFIO.bind(this)}
                        setFIO={this.setFIO.bind(this)}
                        setEdu={this.setEdu.bind(this)}
                        setDateEnd={this.setDateEnd.bind(this)}
                        setWorker={this.setWorker.bind(this)}
                    />,
                });
                this.state.typeRequest === "Search" && this.state.steps.push({
                    title: "Заявление",
                    key: "search",
                    content: <SearchForm
                        typeRequest={this.state.typeRequest}

                        //общие параметры
                        FIO={this.state.FIO}
                        email={this.state.email}
                        phone={this.state.phone}

                        setFIO={this.setFIO.bind(this)}
                        setPhone={this.setPhone.bind(this)}
                        setEmail={this.setEmail.bind(this)}
                    />,
                });
            } else if (this.state.formOrganization === "Entity") {
                this.state.steps.push({
                    title: "Заявление",
                    key: "entity",
                    content: <EntityForm

                        //общие параметры
                        FIO={this.state.FIO}
                        email={this.state.email}
                        phone={this.state.phone}
                        worker={this.state.worker}
                        oldFIO={this.state.oldFIO}

                        setFIO={this.setFIO.bind(this)}
                        setPhone={this.setPhone.bind(this)}
                        setEmail={this.setEmail.bind(this)}
                        setWorker={this.setWorker.bind(this)}
                        setOldFIO={this.setOldFIO.bind(this)}
                    />,
                });
            }
            this.state.steps.push({
                title: 'Способ получения',
                key: "wayGet",
                content:
                    <WayGetForm
                        formOrganization={this.state.formOrganization}
                        wayGet={this.state.wayGet}
                        city={this.state.city}
                        street={this.state.street}
                        house={this.state.house}
                        index={this.state.index}
                        email={this.state.email}
                        lackOfComplaints={this.state.lackOfComplaints}

                        setLackOfComplaints={this.setLackOfComplaints.bind(this)}
                        setWayGet={this.setWayGet.bind(this)}
                        setCity={this.setCity.bind(this)}
                        setStreet={this.setStreet.bind(this)}
                        setHouse={this.setHouse.bind(this)}
                        setIndex={this.setIndex.bind(this)}

                        setStatus={this.setWayGetStatus.bind(this)}
                    />,
            });

            this.state.steps.push({
                title: 'Загрузка документов',
                key: "attach",
                content:
                    <AttachDocuments
                        formOrganization={this.state.formOrganization}
                        FIO={this.state.FIO}
                        wayGet={this.state.wayGet}
                        typeRequest={this.state.typeRequest}


                        inquiryFile={this.state.inquiryFile}
                        proxyDocFile={this.state.proxyDocFile}
                        passportFile={this.state.passportFile}
                        workbookFile={this.state.workbookFile}
                        copyDiplomaFile={this.state.copyDiplomaFile}
                        kinshipDocFile={this.state.kinshipDocFile}
                        statementFile={this.state.statementFile}

                        addFileToDataForm={this.addFileToDataForm.bind(this)}
                    />,
            });
            this.state.steps.push({
                title: 'Проверка данных',
                key: "accept",
                content:
                    <VerificationData
                        formOrganization={this.state.formOrganization}
                        typeRequest={this.state.typeRequest}
                        request={this.state.request}
                        FIO={this.state.FIO}
                        oldFIO={this.state.oldFIO}
                        dayOfBirthday={this.state.dayOfBirthday}
                        dateEnd={this.state.dateEnd}
                        email={this.state.email}
                        phone={this.state.phone}
                        worker={this.state.worker}
                        specialty={this.state.specialty}
                        formTraining={this.state.formTraining}
                        isExpelled={this.state.isExpelled}
                        cpAllDocs={this.state.cpAllDocs}
                        cpWorkbook={this.state.cpWorkbook}
                        cpDiploma={this.state.cpDiploma}

                        //работа
                        edu={this.state.edu}
                        wayGet={this.state.wayGet}
                        city={this.state.city}
                        street={this.state.street}
                        house={this.state.house}
                        index={this.state.index}

                        setAcceptPersonalData={(acceptPersonalData) => {
                            this.setState({acceptPersonalData})
                        }}
                        setCorrectData={(correctData) => {
                            this.setState({correctData})
                        }}
                    />,
            });
        }
    }

    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    statusEntityUpdateReturn() {
        return this.state.FIO !== null &&
            this.state.email !== null &&
            this.state.phone !== null &&
            this.state.oldFIO !== null &&
            this.state.worker !== null
            &&
            this.state.FIO !== undefined &&
            this.state.email !== undefined &&
            this.state.phone !== undefined &&
            this.state.oldFIO !== undefined &&
            this.state.worker !== undefined
            &&
            this.state.FIO !== "" &&
            this.state.email !== "" &&
            this.state.phone !== "" &&
            this.state.oldFIO !== "" &&
            this.state.worker !== "";
    }

    statusSearchUpdateReturn() {
        return this.state.FIO !== null &&
            this.state.email !== null &&
            this.state.phone !== null
            &&
            this.state.FIO !== undefined &&
            this.state.email !== undefined &&
            this.state.phone !== undefined
            &&
            this.state.FIO !== "" &&
            this.state.email !== "" &&
            this.state.phone !== "";
    }

    statusStudentUpdateReturn() {
        return this.state.FIO !== null &&
            this.state.oldFIO !== null &&
            this.state.dayOfBirthday !== null &&
            this.state.dateEnd !== null &&
            this.state.email !== null &&
            this.state.phone !== null &&
            this.state.specialty !== null &&
            this.state.formTraining !== null &&
            this.state.isExpelled !== null

            &&
            this.state.FIO !== undefined &&
            this.state.oldFIO !== undefined &&
            this.state.dayOfBirthday !== undefined &&
            this.state.dateEnd !== undefined &&
            this.state.email !== undefined &&
            this.state.phone !== undefined &&
            this.state.specialty !== undefined &&
            this.state.formTraining !== undefined &&
            this.state.isExpelled !== undefined

            &&
            this.state.FIO !== "" &&
            this.state.oldFIO !== "" &&
            this.state.dayOfBirthday !== "" &&
            this.state.dateEnd !== "" &&
            this.state.email !== "" &&
            this.state.phone !== "" &&
            this.state.specialty !== "" &&
            this.state.formTraining !== "" &&
            this.state.isExpelled !== "";
    }

    statusWayGetUpdateReturn() {
        if (this.state.wayGet === null)
            return false;
        else if (this.state.wayGet === 'Mail' &&
            this.state.city !== "" &&
            this.state.city !== null &&
            this.state.street !== "" &&
            this.state.street !== null &&
            this.state.house !== "" &&
            this.state.house !== null &&
            this.state.index !== "" &&
            this.state.index !== null && this.state.lackOfComplaints === true) {
            return true;
        } else if (this.state.wayGet !== 'Mail')
            return true;
        else
            return false;
    }

    statusWorkUpdateReturn() {
        return this.state.FIO !== null &&
            this.state.oldFIO !== null &&
            this.state.dayOfBirthday !== null &&
            this.state.dateEnd !== null &&
            this.state.email !== null &&
            this.state.phone !== null &&
            this.state.edu !== null &&
            this.state.worker !== null
            &&
            this.state.FIO !== "" &&
            this.state.oldFIO !== "" &&
            this.state.dayOfBirthday !== "" &&
            this.state.dateEnd !== "" &&
            this.state.email !== "" &&
            this.state.phone !== "" &&
            this.state.edu !== "" &&
            this.state.worker !== ""
            &&
            this.state.FIO !== undefined &&
            this.state.oldFIO !== undefined &&
            this.state.dayOfBirthday !== undefined &&
            this.state.dateEnd !== undefined &&
            this.state.email !== undefined &&
            this.state.phone !== undefined &&
            this.state.edu !== undefined &&
            this.state.worker !== undefined;

    }

//метод для блокировки перехода дальше при не заполненных полях
    isDisabled() {
        if (this.state.steps[this.state.current].key === "study") {
            return !this.statusStudentUpdateReturn();
        } else if (this.state.steps[this.state.current].key === "work") {
            return !this.statusWorkUpdateReturn();
        } else if (this.state.steps[this.state.current].key === "search") {
            return !this.statusSearchUpdateReturn();
        } else if (this.state.steps[this.state.current].key === "wayGet") {
            return !this.statusWayGetUpdateReturn();
        } else if (this.state.steps[this.state.current].key === "entity") {
            return !this.statusEntityUpdateReturn();
        }
        return false;
    }

    isDisableSend() {
        return !!(this.state.acceptPersonalData && this.state.correctData);

    }

    render() {
        this.updateDataInSteps();
        const {current} = this.state;
        return (
            <div style={{padding: '30px'}}>
                <div style={{margin: "auto", width: 80 + '%'}}>
                    {this.state.sendStatusOK
                        ? <End/>
                        : <div>
                            <GeneralInformation primarySettings={this.state.primarySettings}/>
                            {this.state.primarySettings
                                ? <MainConfigForm
                                    formOrganization={this.state.formOrganization}
                                    request={this.state.request}
                                    typeRequest={this.state.typeRequest}
                                    setFormOrg={this.setFormOrg.bind(this)}
                                    setTypeReq={this.setTypeReq.bind(this)}
                                    setRequest={this.setRequest.bind(this)}
                                    setPrimarySettings={this.setPrimarySettings.bind(this)}
                                />
                                : this.state.steps.length !== 0
                                && <div>
                                    <Steps type="navigation" current={current} size="small"
                                           style={{marginTop: 10 + 'px'}}>
                                        {this.state.steps.map(item => (
                                            width > 500
                                                ? <Step key={item.title} title={item.title}/>
                                                : <Step key={item.title}/>
                                        ))}
                                    </Steps>
                                    <div className="steps-content">{this.state.steps[current].content}</div>
                                    <div className="steps-action">
                                        <Button style={{marginRight: 8}}
                                                onClick={() => this.setState({primarySettings: true, current: 0})}>
                                            Перейти к началу
                                        </Button>
                                        {current > 0
                                        && <Button style={{marginRight: 8}} onClick={() => this.prev()}>
                                            Предыдущий шаг
                                        </Button>}
                                        {current < this.state.steps.length - 1
                                        &&
                                        <Button type="primary" disabled={this.isDisabled()} onClick={() => this.next()}>
                                            Следующий шаг
                                        </Button>}
                                        {current === this.state.steps.length - 1
                                        && <Button disabled={!this.isDisableSend()}
                                                   type="primary"
                                                   onClick={() => this.createDataFile()}>
                                            Отправить
                                        </Button>}
                                    </div>
                                </div>}
                        </div>}
                </div>
                <div className="form-group">
                    <ToastContainer/>
                </div>
            </div>
        );
    }
}

export default App;