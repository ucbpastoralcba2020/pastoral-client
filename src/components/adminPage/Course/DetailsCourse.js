import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faCalendarAlt, faCalendar, faClock, faUserTie, faMobileAlt, faMapMarkerAlt, faMoneyBill, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import AuthService from '../../../services/authService';
import { Link } from 'react-router-dom';

class DetailsCourse extends Component {

    state = {
        auth: new AuthService(),
    }

    
    render() {
        const { _id, name, parallel, quota, place, teacher, duration, startDate, endDate, description, headline, price, enrolled_students, image } = this.props.course;
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
                                        
                                        <div className="d-flex justify-content-center">
                                            <Link className="btn btn-default" to={{ pathname: "/students", students: enrolled_students, id: _id }}>Ver inscritos</Link>
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
            </React.Fragment>
        );
    }
}

export default DetailsCourse;