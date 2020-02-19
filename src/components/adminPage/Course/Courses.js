import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Course from "./Course";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class Courses extends Component {
    showCourses = () => {
        const courses = this.props.courses;
        if (courses.length === 0) return <p className="text-center h6 mt-4">No hay cursos que mostrar. Agrege un curso.</p>

        return (
            <div className="row">
                {Object.keys(courses).map(course => (
                    <Course
                        key={course}
                        info={courses[course]}
                        deleteCourse={this.props.deleteCourse}
                        removetomycourses={this.props.removetomycourses}
                    />
                ))}
            </div>
        )
    }



    render() {
        return (
            <div className="container font-Varela-13">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Administrar <b>Cursos</b></h2>
                            </div>
                            <div className="col-sm-6 text-right">
                                {this.props.teachers.length !== 0 ?
                                    <Link className="btn reduce-padding btn-default" to={"/add-course"}><FontAwesomeIcon className="add-icon align-middle" icon={faPlus} />Agregar un curso</Link>
                                    :
                                    <React.Fragment>
                                        <Link className="btn reduce-padding btn-default disabled" to={"/add-course"}><FontAwesomeIcon className="add-icon align-middle" icon={faPlus} />Agregar un curso</Link>
                                        <div className="alert alert-warning reduce-padding" role="alert">
                                            Para agregar un curso se necesita instructores registrados.
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                    {this.showCourses()}
                </div>
            </div>
        );
    }
}

export default Courses;