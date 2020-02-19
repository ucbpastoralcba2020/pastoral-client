import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import imgDefault from "../../../assets/images/default.png";

class AddImage extends Component {
    state = {
        redirect: false,
        image: null,
        uploadValue: 0,
        width: null,
        height: null,
        activate: false,
        nameFirebase: null,
        alert: null,
        titleLength: 100
    }

    descriptionRef = React.createRef();
    srcRef = React.createRef();

    saveValues = (e) => {
        e.preventDefault();
        const img = {
            id_image: this.state.nameFirebase,
            caption: this.descriptionRef.current.value,
            src: this.state.image,
            thumbnail: this.state.image,
            createdAt: new Date(),
            thumbnailWidth: this.state.width,
            thumbnailHeight: this.state.height,
        }
        if (img.caption.length === this.state.titleLength) {
            this.showAlert("El título es demasiado largo. Solo se permite 100 caracteres", "alert-danger");
            return;
        }
        this.setRedirect();
        this.props.addImage(img);
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/images' />
        }
    }
    resetPercentage = () => {
        if (this.state.image != null) {
            this.setState({
                uploadValue: 0
            })
        }
    }
    upload = (event) => {
        const file = event.target.files[0];
        const name = (new Date()).getTime();
        const storageRef = firebase.storage().ref(`/photos/${name}`);
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
                    image: url,
                    activate: true
                })
            })
        });
    }

    getSize = () => {
        var x = parseInt(document.getElementById("img").naturalWidth);
        var y = parseInt(document.getElementById("img").naturalHeight);
        this.setState({
            width: x,
            height: y
        })
    }
    readData = (e) => {
        const value = e.target.value;
        if (value.length === 100) {
            this.showAlert("El título es demasiado largo. Solo se permite 100 caracteres", "alert-danger");
        }
    }

    deleteImg = () => {
        if (this.state.nameFirebase === null) return null;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var desertRef = storageRef.child(`photos/${this.state.nameFirebase}`);

        desertRef.delete().then(function () {
        }).catch(function (error) {
        });
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

    render() {
        return (
            <div className="container font-Varela-13">
                <div className="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Agregar <b>Imagen</b></h2>
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
                                <input id="image" accept="image/*" name="video" ref={this.srcRef} onClick={this.resetPercentage} onChange={this.upload} type="file" alt="imagen" required />
                            </div>
                            <div className="col-md-5">
                                <img className="mt-2" style={{ height: "200px", objectFit: "cover" }} onLoad={this.getSize} id="img" alt="vista-imagen" src={this.state.image != null ? this.state.image : imgDefault} />
                                <br />
                                <div class="progress-bar-styles mt-4">
                                    <progress class="front-end-progress-bar" value={this.state.uploadValue} max="100"></progress>
                                </div>
                            </div>
                        </div>


                        {this.renderRedirect()}

                        <div className="mt-4 d-flex justify-content-center">
                            <Link className="btn btn-warning" onClick={this.deleteImg} to={"/images"}>Cancelar</Link>
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

export default AddImage;