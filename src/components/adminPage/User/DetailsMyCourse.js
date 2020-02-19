import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faCalendarAlt, faCalendar, faClock, faUserTie, faMobileAlt, faMapMarkerAlt, faMoneyBill, faInfoCircle, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import AuthService from '../../../services/authService';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

class DetailsMyCourse extends Component {
    state = {
        auth: new AuthService(),
        isEnrolled: null
    }

    componentDidMount() {
        this.isEnrolled();
    }

    addStudent = () => {
        let { _id, idCard, name, firstSurname, secondSurname, cellPhoneNumber, collegeCareer } = this.state.auth.getUser();
        let courseId = this.props.course._id;

        let now = new Date();
        let day = now.getDate();
        let month = now.getUTCMonth();
        let year = now.getFullYear();

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
        ]

        let date = day + " de " + months[month] + " del " + year;


        let student = {
            _id,
            idCard,
            name,
            firstSurname,
            secondSurname,
            cellPhoneNumber,
            collegeCareer,
            enrolledDate: date
        }

        Swal.fire({
            title: '¿Quieres inscribirte?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Si, inscribirme!'
        }).then((result) => {
            if (result.value) {
                this.props.addStudent(student, courseId);
                Swal.fire(
                    'Inscrito!',
                    `Aproximate a Pastoral para cancelar el monto de ${this.props.course.price}`,
                    'success'
                ).then(() => window.location.reload())
            }
        })

    }

    isEnrolled = () => {
        let authId = this.state.auth.getUser()._id;
        let students = this.props.course.enrolled_students;
        let currentUser = students.filter(stud => (
            stud._id == authId
        ))

        if (currentUser.length != 0) {
            this.setState({
                isEnrolled: currentUser[0]
            })
        }
        return;
    }

    render() {
        const { id_course, name, parallel, quota, place, teacher, duration, startDate, endDate, description, headline, price, enrolled_students, image } = this.props.course;
        const allEnrolled = enrolled_students.length;

        return (
            <React.Fragment>
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
                                        {!this.state.isEnrolled ?
                                            <div className="d-flex justify-content-center">
                                                <button type="button" className="btn btn-blue" onClick={this.addStudent}>Inscribirme</button>
                                            </div>
                                            :
                                            <div class="alert alert-info" role="alert">
                                                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />Te has inscrito el {this.state.isEnrolled.enrolledDate}
                                            </div>
                                        }
                                        <div className="d-flex justify-content-center">
                                            <Link className="btn btn-default" to={{ pathname: "/students", students: enrolled_students, id: id_course }}>Ver inscritos</Link>
                                        </div>
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
                <Enroll />
            </React.Fragment>
        );
    }
}

export default DetailsMyCourse;