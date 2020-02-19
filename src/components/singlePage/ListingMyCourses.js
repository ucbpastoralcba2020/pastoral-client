import React, { Component } from 'react';
import MyCourse from "./MyCourse";
import Slider from "react-slick";
import AuthService from '../../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


class ListingMyCourses extends Component {

    state = {
        auth: new AuthService(),
        settings: {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }, { breakpoint: 1024, settings: { slidesToShow: 1 } }]
        }
    }

    showCourses = () => {
        const courses = this.props.mycourses;
        if (courses.length === 1) {
            let { id_course, name, teacher, startDate, endDate, image, removed } = courses[0];
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            if (day <= 9) {
                day = "-0" + day;
            } else {
                day = "-" + day;
            }
            if (month <= 9) {
                month = "-0" + month;
            } else {
                month = "-" + month;
            }
            let today = year + month + day;
            return (
                <div className="container">
                    <div className="rounded mt-4 item font-Varela-13">
                        <div className="row m-0 hover-slick border-slick">
                            <div className="img-mycourse col-md-4 pl-0 pr-0">
                                <img alt="imagen" src={image} style={{ objectFit: "cover" }} className="w-100 h-100" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-block p-3 h-100 d-flex flex-column">
                                    <h4 className="card-title mt-0"><strong>{name}</strong></h4>
                                    <p className="text-secondary">
                                        <strong>Instructor {teacher.name + " " + teacher.firstSurname + " " + teacher.secondSurname}</strong>
                                    </p>
                                    <p>Comienza: {startDate}</p>
                                    <p>Termina: {endDate}</p>
                                    {today >= startDate && today <= endDate && !removed &&
                                        <div className="alert alert-secondary" role="alert">
                                            <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                            El curso se esta llevando a cabo.
                                        </div>
                                    }
                                    {removed && today <= startDate &&
                                        <div className="alert alert-danger" role="alert">
                                            <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                            El curso fue suspendido.
                                        </div>
                                    }
                                    {today > endDate && !removed &&
                                        <div className="alert alert-success" role="alert">
                                            <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                            El curso se completó.
                                        </div>
                                    }
                                    {today < startDate && !removed &&
                                        <div className="alert alert-info" role="alert">
                                            <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                            El curso recién comenzará.
                                        </div>
                                    }

                                    <div className="text-right mt-auto p-1 mx-1 mb-1">
                                        <span style={{ cursor: "pointer" }} onClick={() => this.props.openModalDetails(id_course)} className="message-info mr-3"><FontAwesomeIcon className="icon-bg" icon={faInfoCircle} /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
                <Slider {...this.state.settings}>
                    {Object.keys(courses).map(course => (
                        <MyCourse
                            key={course}
                            info={courses[course]}
                            openModalDetails={this.props.openModalDetails}
                        />
                    ))}
                </Slider>
            </div>
        )
    }


    render() {
        if (!this.state.auth.getUser()) return null;

        return (
            <section id="mycourses" className="mb-5">
                <h2 className="section-title-courses text-dark"><span>MIS CURSOS</span></h2>
                {this.props.mycourses.length !== 0 ?
                    <div className="container">
                        <p className="text-center courses-description">Hola {this.state.auth.getUser().name}, {this.state.auth.getUser().role === "Instructor" ? "estás dictando" : "te inscribiste a"} estos cursos...</p>
                    </div>
                    :
                    <p className="text-center courses-description">No hay cursos que mostrar</p>
                }
                {this.showCourses()}
            </section>
        );
    }
}

export default ListingMyCourses;