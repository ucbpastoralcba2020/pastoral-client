import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import imgDefault from "../../../assets/images/default.png";
import $ from "jquery";
import Swal from "sweetalert2";
import AuthService from '../../../services/authService';


class AddCourse extends Component {
    state = {
        redirect: false,
        image: null,
        uploadValue: 0,
        nameFirebase: null,
        options: ["Más tarde", "Ahora"],
        alert: null,
        nameLength: 100,
        placeLength: 100,
        headlineLength: 250,
        descriptionLength: 2500,
        teachers: this.props.teachers,
        activate: false,
        auth: new AuthService()
    }

    componentDidMount() {
        $('#parallel').keyup(function (e) {
            if (/\D/g.test(this.value)) {
                this.value = this.value.replace(/\D/g, '');
            }
        });
        $('#duration').keyup(function (e) {
            if (/\D/g.test(this.value)) {
                this.value = this.value.replace(/\D/g, '');
            }
        });
        $('#quota').keyup(function (e) {
            if (/\D/g.test(this.value)) {
                this.value = this.value.replace(/\D/g, '');
            }
        });
        $('#price').keyup(function (e) {
            if (/\D/g.test(this.value)) {
                this.value = this.value.replace(/\D/g, '');
            }
        });
    }

    nameRef = React.createRef();
    parallelRef = React.createRef();
    quotaRef = React.createRef();
    placeRef = React.createRef();
    teacherRef = React.createRef();
    durationRef = React.createRef();
    startDateRef = React.createRef();
    endDateRef = React.createRef();
    descriptionRef = React.createRef();
    headlineRef = React.createRef();
    priceRef = React.createRef();
    inOfferRef = React.createRef();
    imageRef = React.createRef();

    deleteImg = () => {
        if (this.state.nameFirebase === null) return null;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var desertRef = storageRef.child(`photos/${this.state.nameFirebase}`);

        desertRef.delete().then(function () {
        }).catch(function (error) {
        });
    }

    readData = (e) => {
        const nameField = e.target.name;
        const value = e.target.value;
        if (nameField === "nombre") {
            if (value.length === this.state.nameLength) {
                this.showAlert(`El ${nameField} es demasiado largo. Solo se permite 100 caracteres`, "alert-danger", nameField);
            }
        }
        if (nameField === "lugar") {
            if (value.length === this.state.placeLength) {
                this.showAlert(`El ${nameField} es demasiado largo. Solo se permite 100 caracteres`, "alert-danger", nameField);
            }
        }
        if (nameField === "titular") {
            if (value.length === this.state.headlineLength) {
                this.showAlert(`El ${nameField} es demasiado largo. Solo se permite 250 caracteres`, "alert-danger", nameField);
            }
        }

        if (nameField === "descripción") {
            if (value.length === this.state.descriptionLength) {
                this.showAlert(`La ${nameField} es muy larga. Solo se permite 2500 caracteres`, "alert-danger", nameField);
            }
        }
    }

    showAlert = (msg, category, field) => {
        const alert = {
            msg: msg,
            category: category,
            field: field
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

    saveValues = (e) => {
        e.preventDefault();
        let findteacher;
        findteacher = this.props.teachers.filter(t => (
            t._id === this.teacherRef.current.value
        ))
        let { _id, name, firstSurname, secondSurname, cellPhoneNumber } = findteacher[0];

        let teacher = {
            _id,
            name,
            firstSurname,
            secondSurname,
            cellPhoneNumber
        }


        let course = {

            id_course: (new Date()).getTime(),
            name: this.nameRef.current.value,
            parallel: this.parallelRef.current.value,
            quota: this.quotaRef.current.value,
            place: this.placeRef.current.value,
            teacher: teacher,
            duration: this.durationRef.current.value,
            startDate: this.startDateRef.current.value,
            endDate: this.endDateRef.current.value,
            description: this.descriptionRef.current.value,
            headline: this.headlineRef.current.value,
            price: this.priceRef.current.value,
            inOffer: this.inOfferRef.current.value,
            image: this.state.image,
            enrolled_students: [],
            nameImg: this.state.nameFirebase,
            createdAt: new Date()
        }

        if (course.name.trim() === "" ||
            course.parallel.trim() === "" ||
            course.quota.trim() === "" ||
            course.place.trim() === "" ||
            course.duration.trim() === "" ||
            course.startDate.trim() === "" ||
            course.endDate.trim() === "" ||
            course.description.trim() === "" ||
            course.headline.trim() === "" ||
            course.price.trim() === "" ||
            course.image.trim() === null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes de llenar todos los campos',
            })
            return;
        }
        if (course.name.length > this.state.nameLength) {
            this.showAlert("El nombre es demasiado largo. Solo se permite 100 caracteres", "alert-danger", "nombre");
            return;
        }
        if (course.place.length > this.state.placeLength) {
            this.showAlert("El lugar es demasiado largo. Solo se permite 100 caracteres", "alert-danger", "lugar");
            return;
        }
        if (course.headline.length > this.state.headlineLength) {
            this.showAlert("El titular es demasiado largo. Solo se permite 250 caracteres", "alert-danger", "titular");
            return;
        }
        if (course.description.length > this.state.descriptionLength) {
            this.showAlert("La descripción es demasiado larga. Solo se permite 2500 caracteres", "alert-danger", "descripción");
            return;
        }
        let teacherId = course.teacher._id;

        this.props.addCourse(course, teacherId);
        this.setRedirect();
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }
    resetPercentage = () => {
        if (this.state.image != null) {
            this.setState({
                uploadValue: 0
            })
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var desertRef = storageRef.child(`photos/${this.state.nameFirebase}`);

            desertRef.delete().then(function () {
            }).catch(function (error) {
                console.log(error);

            });
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
                nameFirebase: name,
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

    render() {
        if (this.props.teachers.length === 0) return <Redirect to="/" />;
        return (
            <div className="container font-Varela-13">
                <div className="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Agregar <b>Curso</b></h2>
                            </div>
                        </div>
                    </div>
                    <form className="my-4" onSubmit={this.saveValues}>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group mb-4">
                                    <label for="name">Nombre:</label>
                                    <textarea id="name" onChange={this.readData} maxLength={this.state.nameLength} ref={this.nameRef} name="nombre" rows="3" type="text" className="form-control" placeholder="Nombre" required />
                                    {this.state.alert ? [this.state.alert.field === "nombre" && <div className={` mt-2 alert ${this.state.alert.category}`} op="alert">{this.state.alert.msg}</div>] : null}
                                </div>
                                <input id="image" name="image" accept="image/*" ref={this.imageRef} onChange={this.upload} onClick={this.resetPercentage} type="file" required />
                                <div class="form-group mt-4">
                                    <label for="teacher">Instructor:</label>
                                    {this.props.teachers.length !== 0 &&
                                        (
                                            <select name="teacher" id="teacher" ref={this.teacherRef} type="text" className="form-control">
                                                {
                                                    this.state.teachers.map((teacher, i) => {
                                                        return (
                                                            <option key={i} value={teacher._id}>{teacher.name} {teacher.firstSurname} {teacher.secondSurname}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <img style={{ maxHeight: "200px", maxWidth: "450px", objectFit: "cover" }} src={this.state.image != null ? this.state.image : imgDefault} alt="imagen curso" />
                                <br />
                                <div class="progress-bar-styles mt-4">
                                    <progress class="front-end-progress-bar" value={this.state.uploadValue} max="100"></progress>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label for="parallel">Promoción:</label>
                                    <input id="parallel" name="parallel" ref={this.parallelRef} type="text" className="form-control" placeholder="Promoción" required />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label for="duration">Duración:</label>
                                    <input id="duration" name="duration" ref={this.durationRef} type="text" className="form-control" placeholder="Duración" required />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label for="quota">Cupo:</label>
                                    <input id="quota" ref={this.quotaRef} name="quota" type="text" className="form-control" placeholder="Cupo" required />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label for="price">Precio:</label>
                                    <input id="price" ref={this.priceRef} name="price" type="number" className="form-control" placeholder="Precio" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="inOffer">Ofertar:</label>
                                    <select id="inOffer" ref={this.inOfferRef} type="text" className="form-control" >
                                        {
                                            this.state.options.map((op, i) => {
                                                return (
                                                    <option key={i} value={op}>{op}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label for="startDate">Fecha de inicio de clases:</label>
                                    <input id="startDate" name="startDate" ref={this.startDateRef} type="date" className="form-control" placeholder="Fecha de inicio" required />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label for="endDate">Fecha de finalización de clases:</label>
                                    <input id="endDate" name="endDate" ref={this.endDateRef} type="date" className="form-control" placeholder="Fecha de finalización" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="place">Lugar:</label>
                                    <textarea id="place" onChange={this.readData} maxLength={this.state.placeLength} rows="3" name="lugar" ref={this.placeRef} type="text" className="form-control" placeholder="Lugar" required />
                                    {this.state.alert ? [this.state.alert.field === "lugar" && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="headline">Titular:</label>
                            <textarea id="headline" onChange={this.readData} maxLength={this.state.headlineLength} rows="3" name="titular" ref={this.headlineRef} type="text" className="form-control" placeholder="Titular" required />
                            {this.state.alert ? [this.state.alert.field === "titular" && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                        </div>

                        <div className="form-group">
                            <label for="description">Description:</label>
                            <textarea id="description" onChange={this.readData} maxLength={this.state.descriptionLength} rows="12" ref={this.descriptionRef} name="descripción" type="text" className="form-control" placeholder="Descripción" required />
                            {this.state.alert ? [this.state.alert.field === "descripción" && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                        </div>

                        {this.renderRedirect()}

                        <div className="d-flex justify-content-center">
                            <Link className="btn btn-warning" onClick={this.deleteImg} to={"/"}>Cancelar</Link>
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

export default AddCourse;