import React, { Component } from 'react';
import Student from './Student';

class ListingStudents extends Component {

    state = {
        received: false,
        students: []
    }
    showUsers = () => {
        const students = this.state.students;
        if (students.length === 0) return null;
        return (
            <React.Fragment>
                {Object.keys(students).map(student => (
                    <Student
                        key={student}
                        info={students[student]}
                        number={student}
                        idCourse={this.props.idCourse}
                        removeStudent={this.props.removeStudent}
                        students={this.state.students}
                        setStudents={this.setStudents}
                    />
                ))}
            </React.Fragment>
        )
    }

    setStudents = (students) => {
        this.setState({
            students: students
        })
    }

    render() {

        const students = this.props.students;
        if (!this.state.received) {
            if (students.length > 0) {
                this.setState({
                    students: this.props.students,
                    received: true
                })
            }
        }


        return (
            <div className="container font-Varela-13">
                <button className="mt-3 btn btn-warning ml-0" onClick={this.props.hideStudents} to={"/"}>Atrás</button>
                <div className="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Administrar <b>Inscritos</b></h2>
                            </div>
                        </div>
                    </div>
                    {this.props.students.length !== 0 ?
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className="mt-0 pt-0">
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellido Paterno</th>
                                        <th scope="col">Apellido Materno</th>
                                        <th scope="col">Celular</th>
                                        <th scope="col">CI</th>
                                        <th scope="col">Carrera</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="students">
                                    {this.showUsers()}
                                </tbody>
                            </table>
                        </div>
                        :
                        <p className="text-center h6 mt-4">No hay inscritos.</p>
                    }
                </div>
            </div>
        );
    }
}

export default ListingStudents;