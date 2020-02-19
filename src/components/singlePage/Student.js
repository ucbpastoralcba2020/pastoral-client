import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

class Student extends Component {

    confirmDelete = () => {
        const id_course = this.props.idCourse;
        const { _id } = this.props.info;
        let students = this.props.students;

        Swal.fire({
            title: '¿Estas seguro(a) de eliminar esta inscripción?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Si, dar de baja!'
        }).then((result) => {
            if (result.value) {
                students.splice(this.props.number, 1);
                this.props.setStudents(students);
                this.props.removeStudent(id_course, _id);
                Swal.fire(
                    'Inscripción eliminada!',
                    'El estudiante se eliminó de este curso.',
                    'success'
                )
            }
        })
    }


    render() {
        const number = parseInt(this.props.number, 10) + 1;
        const { name, firstSurname, secondSurname, idCard, cellPhoneNumber, collegeCareer } = this.props.info;

        return (
            <React.Fragment>
                <tr>
                    <th scope="row">{number}</th>
                    <td>{name}</td>
                    <td>{firstSurname}</td>
                    <td>{secondSurname}</td>
                    <td>{cellPhoneNumber}</td>
                    <td>{idCard}</td>
                    <td>{collegeCareer}</td>
                    <td className="text-center">
                        <span className="message-remove-student mr-2"><FontAwesomeIcon onClick={this.confirmDelete} className="icon" icon={faUserSlash} /></span>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default Student;