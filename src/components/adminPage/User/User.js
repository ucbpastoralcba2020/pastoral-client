import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class User extends Component {

    render() {
        const number = parseInt(this.props.number, 10) + 1;
        const { _id, name, firstSurname, secondSurname, email, role, idCard, cellPhoneNumber, collegeCareer } = this.props.info;
        return (
            <React.Fragment>
                <tr>
                    <th scope="row">{number}</th>
                    <td>{name}</td>
                    <td>{firstSurname}</td>
                    <td>{secondSurname}</td>
                    <td>{cellPhoneNumber}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                    <td>{idCard}</td>
                    <td>{collegeCareer}</td>
                    <td className="text-center">
                        <Link to={`/edit-user/${_id}`} key={_id} className="message-edit mr-2"><FontAwesomeIcon className="icon" icon={faEdit} /></Link>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default User;