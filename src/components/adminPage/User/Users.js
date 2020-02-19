import React, { Component } from 'react';
import User from "./User";
import Searcher from './Searcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';


class Users extends Component {

    showUsers = () => {
        const users = this.props.users;
        if (users.length === 0) return null;

        return (
            <React.Fragment>
                {Object.keys(users).map(user => (
                    <User
                        key={user}
                        info={users[user]}
                        number={user}
                    />
                ))}
            </React.Fragment>
        )
    }

    update = () => {
        window.location.reload();
    }

    render() {

        return (
            <div className="container font-Varela-13">
                <div className="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-4">
                                <h2>Administrar <b>Usuarios</b></h2>
                            </div>
                            <div class="col-sm-2 text-left">
                                <span onClick={this.update} className="btn btn-default m-0 mb-2 reduce-padding message-update">
                                    <FontAwesomeIcon className="updateOption" icon={faRedoAlt} />
                                </span>
                            </div>
                            <div className="col-sm-6 text-right">
                                <Searcher searchUsers={this.props.searchUsers} />
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr className="mt-0 pt-0">
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido Paterno</th>
                                    <th scope="col">Apellido Materno</th>
                                    <th scope="col">Celular</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">CI</th>
                                    <th scope="col">Carrera</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="users">
                                {this.showUsers()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;