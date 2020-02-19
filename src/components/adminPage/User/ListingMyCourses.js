import React, { Component } from 'react';
import MyCourse from "./MyCourse";

class ListingMyCourses extends Component {
    showCourses = () => {
        const courses = this.props.mycourses;
        if (courses.length === 0) return <p className="text-center h6 mt-4">No hay cursos que mostrar.</p>

        return (
            <div className="row">
                {Object.keys(courses).map(course => (
                    <MyCourse
                        key={course}
                        info={courses[course]}
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
                                <h2>Mis <b>Cursos</b></h2>
                            </div>
                        </div>
                    </div>
                    {this.showCourses()}
                </div>
            </div>
        );
    }
}

export default ListingMyCourses;