import React, { Component } from 'react';
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


class MyCourse extends Component {
    componentDidMount() {
        this.theSameSize();
    }

    theSameSize = () => {
        $(document).ready(function () {
            var heights = $(".course").map(function () {
                return $(this).height();
            }).get(),

                maxHeight = Math.max.apply(null, heights);

            $(".course").height(maxHeight);
        });
    }


    render() {

        const { id_course, name, teacher, startDate, endDate, image, removed } = this.props.info;
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
            <div class="rounded mt-4 item font-Varela-13">
                <div className="row m-0 hover-slick border-slick">
                    <div class="img-mycourse col-md-4 pl-0 pr-0">
                        <img src={image} style={{ objectFit: "cover" }} alt="imagen-curso" class="w-100 h-100" />
                    </div>
                    <div class="col-md-8">
                        <div class="card-block p-3 h-100 d-flex flex-column">
                            <h4 class="card-title mt-0"><strong>{name}</strong></h4>
                            <p class="text-secondary">
                                <strong>Instructor: {teacher.name + " " + teacher.firstSurname + " " + teacher.secondSurname}</strong>
                            </p>
                            {today >= startDate && today <= endDate && !removed &&
                                <div class="alert alert-secondary" role="alert">
                                    <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                    El curso se esta llevando a cabo.
                              </div>
                            }
                            {removed && today <= startDate &&
                                <div class="alert alert-danger" role="alert">
                                    <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                    El curso fue suspendido.
                              </div>
                            }
                            {today > endDate && !removed &&
                                <div class="alert alert-success" role="alert">
                                    <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                    El curso se completó.
                              </div>
                            }
                            {today < startDate && !removed &&
                                <div class="alert alert-info" role="alert">
                                    <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                                    El curso recién comenzará.
                              </div>
                            }
                            <p>Comienza: {startDate}</p>
                            <p>Termina: {endDate}</p>
                            <div className="text-right mt-auto p-1 mx-1 mb-1">
                                <span style={{ cursor: "pointer" }} onClick={() => this.props.openModalDetails(id_course)} className="message-info mr-3"><FontAwesomeIcon className="icon-bg" icon={faInfoCircle} /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyCourse;