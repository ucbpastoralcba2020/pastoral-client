import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import $ from "jquery";
import AuthService from '../../services/authService';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            auth: new AuthService()
        }
    }

    logout = () => {
        this.props.hideEditUserFn();
        this.authService.logout();
    }

    scrollToTop = () => {
        scroll.scrollToTop();
    };

    scrollingEffect() {
        $(window).scroll(function () {
            if ($("nav").offset().top > 90) {
                $("nav").addClass("bg-purple navbar-light shadow");
            } else {
                $("nav").removeClass("bg-purple navbar-light shadow");
            }
        });
    }
    selectionNav() {
        $('.navbar-nav .nav-item-container').click(function () {
            $('.navbar-nav .nav-item-container').removeClass('active');
            $(this).addClass('active');
        })
    }

    componentDidMount() {
        this.scrollingEffect();
        this.selectionNav();
    }

    render() {
        return (
            <React.Fragment>
                <nav id="navbar" className="navbar py-4 navbar-expand-lg navbar-dark fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="/pastoral">CRISTÓFOROS</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item-container mr-3 active">
                                    <Link className="nav-link" to={"slider"} smooth={true} offset={-90}>Inicio </Link>
                                </li>
                                <li className="nav-item-container mr-3">
                                    <Link className="nav-link" to={"about"} style={{ whiteSpace: "nowrap" }} smooth={true} offset={-90}>Quiénes somos</Link>
                                </li>
                                <li className="nav-item-container mr-3">
                                    <Link className="nav-link" to={"gallery"} smooth={true} offset={-90}>Recuerdos</Link>
                                </li>
                                <li className="nav-item-container mr-3">
                                    <Link className="nav-link" to={"offers"} smooth={true} offset={-90}>Cursos</Link>
                                </li>
                                {!this.state.auth.getUser() ?
                                    <React.Fragment>
                                        <li>
                                            <button type="button" className="btn reduce-padding btn-warning ml-0" onClick={this.goToLogin}>Iniciar Sesión</button>
                                        </li>
                                        <li>
                                            <button type="button" className="btn reduce-padding btn-default ml-0" onClick={this.goToRegister}>Registro</button>
                                        </li>
                                    </React.Fragment>
                                    :
                                    <li className="nav-item dropdown">
                                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.state.auth.getUser().role + ": " + this.state.auth.getUser().name + " " + this.state.auth.getUser().firstSurname}
                                        </span>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <button className="dropdown-item cursor-pointer" onClick={this.goToEditUser} >Editar mis datos</button>
                                            {this.state.auth.getUser().role !== "Administrador" &&
                                                <Link className="dropdown-item cursor-pointer" to={"mycourses"} smooth={true} offset={-90}>Mis cursos</Link>
                                            }
                                            {this.state.auth.getUser().role === "Administrador" &&
                                                <span className="dropdown-item cursor-pointer" onClick={this.goToPastoralAdmin}>Volver a administrar</span>
                                            }
                                            <div className="dropdown-divider"></div>
                                            <span className="dropdown-item cursor-pointer" onClick={this.logout} >Cerrar Sesión</span>
                                        </div>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }

    goToEditUser = () => {
        this.props.showEditUserFn();
    }

    goToLogin = () => {
        let url = window.location.href.replace("/pastoral", "");
        document.location.href = url + "/login";
    }

    goToRegister = () => {
        let url = window.location.href.replace("/pastoral", "");
        document.location.href = url + "/new-account";
    }
    goToPastoralAdmin = () => {
        let url = window.location.href.replace("/pastoral", "");
        document.location.href = url;
    }

}
