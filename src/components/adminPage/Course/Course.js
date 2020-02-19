import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import Swal from 'sweetalert2';

class Course extends Component {

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

    confirmDelete = () => {
        let course = this.props.info;
        Swal.fire({
            title: '¿Estas seguro(a) de eliminar este curso?',
            text: "Esta acción no podras revertirla",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.value) {
                this.props.deleteCourse(course);
                Swal.fire(
                    'Eliminado!',
                    'El curso se eliminó.',
                    'success'
                )
            }
        })
    }


    render() {

        const { id_course, name, parallel, teacher, startDate, quota, image, enrolled_students, inOffer } = this.props.info;
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
            <div className="col-md-4 mt-5">
                <div className="bg-white course rounded shadow d-flex flex-column">
                    <img className="m-1 rounded" style={{ height: "10rem", objectFit: "cover" }} id="img" src={image} alt="imagen curso" />
                    <p className="h6 font-weight-bold text-dark mx-2 mt-2 text-center">{name}</p>
                    <p className="text-dark mx-2 mb-1 text-justify"><u>Docente:</u> {teacher.name + " " + teacher.firstSurname + " " + teacher.secondSurname}</p>
                    <p className="text-dark mx-2 mb-1 text-justify"><u>Promoción:</u> {parallel}</p>
                    <p className="text-dark mx-2 mb-1 text-justify"><u>Inicio de clases:</u> {startDate}</p>
                    <p className="text-dark mx-2 mb-2 text-justify"><u>Inscritos:</u> {enrolled_students.length} de {quota}</p>
                    <div className="text-right mt-auto p-1 mx-1 mb-1">
                        <Link to={`/edit-course/${id_course}`} className="message-edit mr-3"><FontAwesomeIcon className="icon-bg" icon={faEdit} /></Link>
                        <Link to={`/course/${id_course}`} className="message-info mr-3"><FontAwesomeIcon className="icon-bg" icon={faInfoCircle} /></Link>
                        {today < startDate ?
                            <span className="message-delete mr-3">
                                <FontAwesomeIcon onClick={this.confirmDelete} className="icon-bg" icon={faTrashAlt} />
                            </span>
                            :
                            [inOffer === "Más tarde" &&
                                <span className="message-delete mr-3">
                                    <FontAwesomeIcon onClick={this.confirmDelete} className="icon-bg" icon={faTrashAlt} />
                                </span>
                            ]

                        }                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Course;