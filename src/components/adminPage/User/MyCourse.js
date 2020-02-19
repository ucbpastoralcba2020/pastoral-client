import React, { Component } from 'react';
import $ from "jquery";
import { Link } from 'react-router-dom';
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

        const { id_course, name, parallel, teacher, startDate, quota, image, enrolled_students } = this.props.info;


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
                        <Link to={`/mycourse/${id_course}`} className="message-info mr-3"><FontAwesomeIcon className="icon-bg" icon={faInfoCircle} /></Link>                        
                    </div>
                </div>
            </div>
        );
    }
}

export default MyCourse;