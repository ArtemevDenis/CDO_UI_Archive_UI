import React from 'react'
import "../../css/upload.css"

/**
 * @description класс для зугрузки документа
 * @author Denis Artemev
 **/
class SimpleReactFileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {};
        let fileListLocal = [];
        let renderFileList = "";
    }

    /**
     * востановление списка загруженных документов
     */
    componentWillMount() {
        this.fileListLocal = [];
        this.renderFileList = "";
        if (this.props.listFile !== undefined) {
            for (let i = 0; i < this.props.listFile.length; i++) {
                this.fileListLocal.push(this.props.listFile[i]);
            }
            this.renderFileList = this.fileListLocal.map((file) =>
                <li className={"attach-doc"} key={file.name}>{file.name}</li>)
        }
    }

    onChange(e) {
        this.fileListLocal = [];
        this.renderFileList = "";
        this.props.setFileList(e.target.files, this.props.type, this.props.FIO);

        for (let i = 0; i < e.target.files.length; i++) {
            this.fileListLocal.push(e.target.files[i]);
        }
        this.renderFileList = this.fileListLocal.map((file) =>
            <li className={"attach-doc"} key={file.name}>{file.name}</li>)
    }

    render() {
        return (
            <div>
                <div className={"file-upload"}>
                    <label>{this.props.nameField}
                        <input type="file"
                               multiple
                               onChange={this.onChange}/>
                    </label>
                </div>
                <ul className={"attach-doc"}>
                    {this.renderFileList}
                </ul>
            </div>
        )
    }
}

export default SimpleReactFileUpload;