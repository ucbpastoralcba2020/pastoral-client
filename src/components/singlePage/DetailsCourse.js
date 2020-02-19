import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faTimes, faCalendarAlt, faCalendar, faClock, faUserTie, faMobileAlt, faMapMarkerAlt, faMoneyBill, faInfoCircle, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import AuthService from '../../services/authService';
import Modal from 'react-awesome-modal';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ListingStudents from './ListingStudents';
import Swal from "sweetalert2";

class DetailsCourse extends Component {
    state = {
        auth: new AuthService(),
        showStudents: false,
        isEnrolled: null,
        students: null,
        currentCourse: null
    }

    render() {
        if (!this.props.course) return null;
        const { _id, name, parallel, quota, place, teacher, duration, startDate, endDate, description, headline, price, enrolled_students, image } = this.props.course;
        const allEnrolled = enrolled_students.length;

        let isEnrolled = false;
        if (this.props.user) {
            let mycourses = this.props.user.course;

            let result = mycourses.filter(course => (
                course._id === _id
            ));

            if (result.length !== 0) {
                isEnrolled = true;
            }
        }


        return (
            <Modal id="modalDetails" visible={this.props.visibleDetailsCourse} width="90%" effect="fadeInUp">
                {this.state.showStudents === false ?
                    <div className="scrollbar-course">
                        <span className="closemodal" onClick={() => this.props.closeModalDetails()}><FontAwesomeIcon style={{ marginLeft: "7px", marginBottom: "2px", color: "#fff" }} icon={faTimes} /></span>
                        <div className="container-course-header">
                            <div className="container">
                                <div className="row" >
                                    <div className="col-md-8 text-light">
                                        <p className="title">{name}</p>
                                        <p className="subtitle">{headline}</p>
                                        <hr className="my-4 bg-light" />
                                        <div className="row font-Varela-13">
                                            <div className="col-4">
                                                <FontAwesomeIcon icon={faUserFriends} /><span className="ml-2">Inscritos: </span>
                                                <span>{allEnrolled}/{quota}</span>
                                            </div>
                                            <div className="col-4">
                                                <FontAwesomeIcon icon={faCalendarAlt} /><span className="ml-2">Inicio: </span>
                                                <span>{startDate}</span>
                                            </div>
                                            <div className="col-4">
                                                <FontAwesomeIcon icon={faCalendar} /><span className="ml-2">Finalización: </span>
                                                <span>{endDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card position-card w-100" >
                                            <img src={image} className="card-img-top p-1" alt="..." />
                                            <div className="card-body font-Varela-13">
                                                <h4 className="card-title subtitle2">Información:</h4>
                                                <div className="row">
                                                    <div className="col-2">
                                                        <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-10 pl-0">
                                                        <p>Precio: {price} Bs</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-2">
                                                        <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-10 pl-0">
                                                        <p>Duración: {duration} hrs</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-2">
                                                        <FontAwesomeIcon icon={faGraduationCap}></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-10 pl-0">
                                                        <p>Promoción: {parallel}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-2">
                                                        <FontAwesomeIcon icon={faUserTie}></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-10 pl-0">
                                                        <p>Instructor: {teacher.name + " " + teacher.firstSurname + " " + teacher.secondSurname}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-2">
                                                        <FontAwesomeIcon icon={faMobileAlt}></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-10 pl-0">
                                                        <p>Instructor-teléfono: {teacher.cellPhoneNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-2">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-10 pl-0">
                                                        <p>El curso se llevara a cabo en: {place}</p>
                                                    </div>
                                                </div>
                                                {!this.props.user &&
                                                    <div className="d-flex justify-content-center">
                                                        <button className="btn btn-default" onClick={this.goToRegister} >Inscribirme</button>
                                                    </div>
                                                }
                                                {this.props.user &&
                                                    [this.state.auth.getUser().role === "Administrador" &&
                                                        <div className="d-flex justify-content-center">
                                                            <button className="btn btn-default" onClick={this.showStudents} >Ver inscritos</button>
                                                        </div>
                                                    ]
                                                }
                                                {this.props.user &&
                                                    [this.state.auth.getUser().role === "Instructor" && this.state.auth.getUser()._id === teacher._id &&
                                                        <React.Fragment>
                                                            <div class="alert alert-info" role="alert">
                                                                <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                                                Eres instructor de este curso
                                                        </div>
                                                            <div className="d-flex justify-content-center">
                                                                <button className="btn btn-default" onClick={this.showStudents} >Ver inscritos</button>
                                                            </div>
                                                        </React.Fragment>
                                                    ]
                                                }

                                                {this.props.user &&
                                                    [this.state.auth.getUser().role === "Estudiante" && !isEnrolled && allEnrolled < quota ?
                                                        <div className="d-flex justify-content-center">
                                                            <button className="btn btn-default" onClick={this.addStudent} >Inscribirme</button>
                                                        </div>
                                                        : [this.state.auth.getUser().role === "Estudiante" && isEnrolled ?
                                                            <div class="alert alert-info" role="alert">
                                                                <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                                                Ya te has inscrito a este curso!
                                                            </div>
                                                            :
                                                            null
                                                        ]
                                                    ]
                                                }
                                                {allEnrolled === quota &&
                                                    <div class="alert alert-danger" role="alert">
                                                        <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                                        Curso lleno!
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="jumbotron">
                                        <p className="subtitle2">También necesitas saber: </p>
                                        <hr className="my-4" />
                                        <pre style={{ overflow: "hidden", whiteSpace: "pre-wrap", textAlign: "justify" }} className="font-Varela-13">{description}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="scrollbar-course">
                        <ListingStudents
                            students={enrolled_students}
                            removeStudent={this.props.removeStudent}
                            hideStudents={this.hideStudents}
                            idCourse={_id}
                        />
                    </div>
                }
            </Modal>
        );
    }
    goToRegister = () => {

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Inicia sesión o crea una cuenta',
            showConfirmButton: false,
            timer: 3000
        }).then(() => {
            let url = window.location.href.replace("/pastoral", "");
            document.location.href = url + "/login";
        })
    }

    showStudents = () => {
        this.setState({
            showStudents: true
        })
    }
    hideStudents = () => {
        this.setState({
            showStudents: false
        })
    }
    addStudent = () => {
        let id_course = this.props.course._id;
        let idStudent = this.state.auth.getUser()._id;
        let date = new Date();
        let months = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ];
        let day = date.getDate();
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        let formatDate = day + " de " + month + " del " + year;
        let { idCard, name, firstSurname, secondSurname, cellPhoneNumber, collegeCareer } = this.state.auth.getUser();
        let student = {
            _id: idStudent,
            idCard,
            name,
            firstSurname,
            secondSurname,
            cellPhoneNumber,
            collegeCareer,
            enrolledDate: formatDate
        }
        Swal.fire({
            title: '¿Quieres inscribirte a este curso?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: 'Si, quiero!'
        }).then((result) => {
            if (result.value) {
                this.props.addStudent(id_course, student);
                Swal.fire(
                    'Inscripción exitosa!',
                    'Te has inscrito a este curso.',
                    'success'
                )
            }
        })
    }

}


export default DetailsCourse;