import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import videoDefault from "../../../assets/images/videoDefault.jpg";
import ReactPlayer from 'react-player';


class AddVideo extends Component {
    state = {
        redirect: false,
        video: null,
        uploadValue: 0,
        activate: false,
        nameFirebase: null,
        alert: null,
        titleLength: 100
    }

    descriptionRef = React.createRef();
    srcRef = React.createRef();

    readData = (e) => {
        const value = e.target.value;
        if (value.length === 100) {
            this.showAlert("El título es demasiado largo. Solo se permite 100 caracteres", "alert-danger");
        }
    }

    saveValues = (e) => {
        e.preventDefault();
        const video = {
            id_video: this.state.nameFirebase,
            caption: this.descriptionRef.current.value,
            src: this.state.video,
            createdAt: new Date(),
        }
        if (video.caption.length > this.state.titleLength) {
            this.showAlert("El título es demasiado largo. Solo se permite 100 caracteres", "alert-danger");
            return;
        }

        this.props.addVideo(video);
        this.setRedirect();
    }

    showAlert = (msg, category) => {
        const alert = {
            msg: msg,
            category: category
        }
        this.setState({
            alert: alert
        })

        setTimeout(() => {
            this.setState({
                alert: null
            });
        }, 4000)
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/videos' />
        }
    }
    resetPercentage = () => {
        if (this.state.video != null) {
            this.setState({
                uploadValue: 0
            })
        }
    }
    upload = (event) => {
        const file = event.target.files[0];
        const name = (new Date()).getTime();
        const storageRef = firebase.storage().ref(`/videos/${name}`);
        const task = storageRef.put(file);
        task.on("state_changed", snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage,
                nameFirebase: name
            })
        }, error => {
            console.log(error.message);
        }, () => {
            task.snapshot.ref.getDownloadURL().then((url) => {
                this.setState({
                    video: url,
                    activate: true
                })
            })
        });
    }

    deleteVideo = () => {
        if (this.state.nameFirebase === null) return null;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var desertRef = storageRef.child(`videos/${this.state.nameFirebase}`);

        desertRef.delete().then(function () {
        }).catch(function (error) {
        });
    }

    render() {
        return (
            <div className="container font-Varela-13">
                <div className="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Agregar <b>Video</b></h2>
                            </div>
                        </div>
                    </div>
                    <form className="my-4" onSubmit={this.saveValues}>
                        {this.state.alert ? (<div className={`alert hola ${this.state.alert.category}`} role="alert" >{this.state.alert.msg}</div>) : null}
                        <div className="row d-flex justify-content-around">
                            <div className="col-md-5">
                                <div class="form-group">
                                    <label for="title">Título:</label>
                                    <textarea id="title" onChange={this.readData} ref={this.descriptionRef} rows="3" name="title" type="text" className="form-control" placeholder="Título" maxLength={this.state.titleLength} required />
                                </div>
                                <input id="video" accept="video/*" name="video" ref={this.srcRef} onClick={this.resetPercentage} onChange={this.upload} type="file" required alt="video" />
                            </div>
                            <div className="col-md-5">
                                {this.state.video == null ?
                                    (
                                        <img style={{ height: "200px", objectFit: "cover" }} onLoad={this.getSize} id="img" alt="imagen-video" src={videoDefault} />
                                    ) : (
                                        <ReactPlayer
                                            url={this.state.video}
                                            controls={true}
                                            width='300px'
                                            height='200px'
                                            playing
                                        />
                                    )}
                                <br />
                                <div class="progress-bar-styles mt-4">
                                    <progress class="front-end-progress-bar" value={this.state.uploadValue} max="100"></progress>
                                </div>
                            </div>
                        </div>

                        {this.renderRedirect()}

                        <div className="mt-4 d-flex justify-content-center">
                            <Link className="btn btn-warning" onClick={this.deleteVideo} to={"/videos"}>Cancelar</Link>
                            {
                                this.state.activate ? (
                                    <button type="submit" class="btn btn-blue">Guardar</button>
                                ) : (
                                        <button type="submit" class="btn btn-blue" disabled>Guardar</button>
                                    )
                            }
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddVideo;