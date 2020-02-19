import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import AuthService from '../../services/authService';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            auth: new AuthService()
        }
        // aqui falta controlar usuarios permiso
    }

    logout = () => {
        this.authService.logout();
        this.props.onAuthChange();
    }

    componentDidMount() {
        this.selectionNav();
    }

    selectionNav() {
        $('.navbar-nav .nav-item-admin').click(function () {
            $('.navbar-nav .nav-item-admin').removeClass('active');
            $(this).addClass('active');
        })
    }

    goToPastoral = () => {
        let url = window.location.href;
        document.location.href = url + "pastoral";
    }

    render() {
        return (
            <nav className="navbar font-Varela-13 py-3 navbar-expand-lg navbar-dark bg-blue">
                <div className="container">
                    <span className="navbar-brand cursor-pointer" onClick={this.goToPastoral}>Pastoral</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item-admin mr-4 active">
                                <Link className="nav-link" style={{ fontSize: "13px" }} to={"/"}>Cursos</Link>
                            </li>
                            <li className="nav-item-admin mr-4">
                                <Link className="nav-link" to={"/formmainpage"}>Página principal</Link>
                            </li>
                            <li className="nav-item-admin mr-4">
                                <Link className="nav-link" to={"/images"}>Imagenes</Link>
                            </li>
                            <li className="nav-item-admin mr-4">
                                <Link className="nav-link" to={"/videos"}>Videos</Link>
                            </li>
                            <li className="nav-item-admin mr-4">
                                <Link className="nav-link" to={"/users"}>Usuarios</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.auth.getUser().name + " " + this.state.auth.getUser().firstSurname}
                                </Link>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to={`/edit-user/${this.state.auth.getUser()._id}`} className="dropdown-item">Cambiar mis datos</Link>
                                    {this.state.auth.getUser().role !== "Administrador" &&
                                        <Link to="/mycourses" className="dropdown-item">Mis cursos</Link>
                                    }
                                    <div class="dropdown-divider"></div>
                                    <Link className="dropdown-item" onClick={this.logout} >Cerrar Sesión</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;