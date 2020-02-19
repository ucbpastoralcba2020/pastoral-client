import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import firebase from "firebase";
import Swal from "sweetalert2";


class EditCourse extends Component {
    state = {
        image: null,
        redirect: false,
        nameFirebase: null,
        options: ["Más tarde", "Ahora"],
        alert: null,
        nameLength: 100,
        placeLength: 100,
        headlineLength: 250,
        descriptionLength: 2500,
        teachers: this.props.teachers,
        activate: false,
        teacherNotFound: false
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
        let teacher;
        if (this.props.course.teacher._id !== this.teacherRef.current.value) {
            this.props.removetomycourses(this.props.course._id, this.props.course.teacher._id);
            this.props.addtomycourses(this.props.course._id, this.teacherRef.current.value);
        }
        if (this.props.teachers.length !== 0) {
            let findteacher;
            findteacher = this.props.teachers.filter(t => (
                t._id === this.teacherRef.current.value
            ))
            if (findteacher.length !== 0) {
                let { _id, name, firstSurname, secondSurname, cellPhoneNumber } = findteacher[0];
                teacher = {
                    _id,
                    name,
                    firstSurname,
                    secondSurname,
                    cellPhoneNumber
                }
            } else {
                teacher = this.props.course.teacher;
            }
        } else {
            teacher = this.props.course.teacher;
        }

        let image = null;
        let nameImg = null;

        if (this.state.image == null) {
            image = this.props.course.image;
            nameImg = this.props.course.nameImg;
        } else {
            nameImg = this.state.nameFirebase;
            image = this.state.image;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var desertRef = storageRef.child(`photos/${this.props.course.nameImg}`);

            desertRef.delete().then(function () {
            }).catch(function (error) {
                console.log(error);

            });
        }


        const course = {
            id_course: this.props.course.id_course,
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
            image: image,
            nameImg: nameImg
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
            course.price.trim() === "") {
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

        this.props.editCourse(course);
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

    render() {
        if (!this.props.course) return null;
        const { name, parallel, quota, place, teacher, duration, startDate, endDate, description, headline, price, inOffer, image } = this.props.course;

        let teacherNotFound = false;
        return (
            <div className="container font-Varela-13">
                <div className="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Editar <b>Curso</b></h2>
                            </div>
                        </div>
                    </div>
                    <form className="my-4" onSubmit={this.saveValues}>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group mb-4">
                                    <label for="name">Nombre:</label>
                                    <textarea id="name" defaultValue={name} onChange={this.readData} maxLength={this.state.nameLength} ref={this.nameRef} name="nombre" rows="3" type="text" className="form-control" placeholder="Nombre" />
                                    {this.state.alert ? [this.state.alert.field === "nombre" && <div className={` mt-2 alert ${this.state.alert.category}`} op="alert">{this.state.alert.msg}</div>] : null}
                                </div>
                                <input id="image" name="image" accept="image/*" ref={this.imageRef} onChange={this.upload} onClick={this.resetPercentage} type="file" />
                                <div class="form-group mt-4">
                                    <label for="teacher">Instructor:</label>
                                    {this.props.teachers.length !== 0 ?
                                        (
                                            <select name="teacher" id="teacher" ref={this.teacherRef} defaultValue={teacher._id} type="text" className="form-control">
                                                {
                                                    this.state.teachers.map((t, i) => {
                                                        if (t._id === teacher._id && !teacherNotFound) {
                                                            teacherNotFound = true;
                                                            return <option value={t._id}>{t.name} {t.firstSurname} {t.secondSurname}</option>
                                                        } else {
                                                            if (!teacherNotFound && this.props.teachers.length - 1 === i) {
                                                                return <React.Fragment>
                                                                    <option value={teacher._id} selected>{teacher.name} {teacher.firstSurname} {teacher.secondSurname} (Ya no es instructor)</option>
                                                                    <option value={t._id}>{t.name} {t.firstSurname} {t.secondSurname}</option>
                                                                </React.Fragment>
                                                            }
                                                            return <option value={t._id}>{t.name} {t.firstSurname} {t.secondSurname}</option>

                                                        }


                                                    })
                                                }
                                            </select>
                                        )
                                        :
                                        <span> {teacher.name} {teacher.firstSurname} {teacher.secondSurname}</span>
                                    }

                                </div>
                            </div>
                            <div className="col-md-6">
                                <img style={{ maxHeight: "200px", maxWidth: "450px", objectFit: "cover" }} src={this.state.image ? this.state.image : image} alt="imagen curso" />
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
                                    <input id="parallel" defaultValue={parallel} name="parallel" ref={this.parallelRef} type="text" className="form-control" placeholder="Promoción" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label for="duration">Duración:</label>
                                    <input id="duration" defaultValue={duration} name="duration" ref={this.durationRef} type="text" className="form-control" placeholder="Duración" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label for="quota">Cupo:</label>
                                    <input id="quota" defaultValue={quota} ref={this.quotaRef} name="quota" type="text" className="form-control" placeholder="Cupo" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label for="price">Precio:</label>
                                    <input id="price" defaultValue={price} ref={this.priceRef} name="price" type="number" className="form-control" placeholder="Precio" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="inOffer">Ofertar:</label>
                                    <select id="inOffer" ref={this.inOfferRef} defaultValue={inOffer} type="text" className="form-control" >
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
                                    <input id="startDate" name="startDate" defaultValue={startDate} ref={this.startDateRef} type="date" className="form-control" placeholder="Fecha de inicio" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label for="endDate">Fecha de finalización de clases:</label>
                                    <input id="endDate" name="endDate" defaultValue={endDate} ref={this.endDateRef} type="date" className="form-control" placeholder="Fecha de finalización" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="place">Lugar:</label>
                                    <textarea id="place" defaultValue={place} onChange={this.readData} maxLength={this.state.placeLength} rows="3" name="lugar" ref={this.placeRef} type="text" className="form-control" placeholder="Lugar" />
                                    {this.state.alert ? [this.state.alert.field === "lugar" && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="headline">Titular:</label>
                            <textarea id="headline" defaultValue={headline} onChange={this.readData} maxLength={this.state.headlineLength} rows="3" name="titular" ref={this.headlineRef} type="text" className="form-control" placeholder="Titular" />
                            {this.state.alert ? [this.state.alert.field === "titular" && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                        </div>

                        <div className="form-group">
                            <label for="description">Descripción:</label>
                            <textarea id="description" defaultValue={description} onChange={this.readData} maxLength={this.state.descriptionLength} rows="12" ref={this.descriptionRef} name="descripción" type="text" className="form-control" placeholder="Descripción" />
                            {this.state.alert ? [this.state.alert.field === "descripción" && <div className={`mt-2 alert ${this.state.alert.category}`} op="alert" >{this.state.alert.msg}</div>] : null}
                        </div>

                        {this.renderRedirect()}

                        <div className="d-flex justify-content-center">
                            <Link className="btn btn-warning" onClick={this.deleteImg} to={"/"}>Cancelar</Link>
                            <button type="submit" class="btn btn-blue">Guardar cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditCourse;