import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

class NewAccount extends Component {
    state = {
        redirect: false,
        roles: ["Estudiante", "Instructor", "Administrador"],
        careers: [
            "Ninguna",
            "Antropología",
            "Comunicación Social",
            "Derecho",
            "Filosofía y Letras",
            "Psicología",
            "Ing. Ambiental",
            "Ing. Civil",
            "Ing. Industrial",
            "Ing. Internet de las Cosas",
            "Ing. Química",
            "Ing. Mecatrónica",
            "Ing. de Sistemas",
            "Ing. de Telecomunicaciones",
            "Administración de Empresas",
            "Contaduría Pública (Auditoría)",
            "Ing. Comercial",
            "Ing. Empresarial",
            "Ing. Financiera",
            "Enfermería"
        ],
        alert: null,
    }

    componentDidMount() {
        $('#ci').keyup(function (e) {
            if (/\D/g.test(this.value)) {
                // Filter non-digits from input value.
                this.value = this.value.replace(/\D/g, '');
            }
        });
        $('#cellPhoneNumber').keyup(function (e) {
            if (/\D/g.test(this.value)) {
                // Filter non-digits from input value.
                this.value = this.value.replace(/\D/g, '');
            }
        });
    }

    nameRef = React.createRef();
    firstSurnameRef = React.createRef();
    secondSurnameRef = React.createRef();
    emailRef = React.createRef();
    passwordRef = React.createRef();
    confirmPasswordRef = React.createRef();
    cellPhoneNumberRef = React.createRef();
    idCardRef = React.createRef();
    collegeCareerRef = React.createRef();


    showAlert = (msg, category) => {
        const alert = {
            msg: msg,
            category: category
        }
        this.setState({
            alert: alert
        })

        setTimeout(() => {
            this.setState({
                alert: null
            });
        }, 4000)
    }

    saveValues = (e) => {

        e.preventDefault();

        const user = {
            name: this.nameRef.current.value,
            firstSurname: this.firstSurnameRef.current.value,
            secondSurname: this.secondSurnameRef.current.value,
            email: this.emailRef.current.value,
            password: this.passwordRef.current.value,
            cellPhoneNumber: this.cellPhoneNumberRef.current.value,
            idCard: this.idCardRef.current.value,
            collegeCareer: this.collegeCareerRef.current.value,
        }
        const confirm = this.confirmPasswordRef.current.value;

        if (user.idCard.trim() === "" ||
            user.name.trim() === "" ||
            user.firstSurname.trim() === "" ||
            user.secondSurname.trim() === "" ||
            user.email.trim() === "" ||
            user.cellPhoneNumber.trim() === "" ||
            user.password.trim() === "" ||
            confirm.trim() === "") {
            this.showAlert("Todos los campos son obligatorios", "alert-danger");
            return;
        }
        if (user.idCard.length < 5) {
            this.showAlert("El ci ingresado no es valido", "alert-danger");
            return;
        }
        if (user.idCard.length > 9) {
            this.showAlert("El ci ingresado no es valido", "alert-danger");
            return;
        }
        if (user.cellPhoneNumber.length !== 8) {
            this.showAlert("El celular ingresado no es valido", "alert-danger");
            return;
        }

        if (user.password.length < 6) {
            this.showAlert("El password debe ser de al menos 6 caracteres", "alert-danger");
            return;
        }

        if (user.password !== confirm) {
            this.showAlert("Los passwords no son iguales", "alert-danger");
            return;
        }
        this.register(user);
    }

    register = async (user) => {
        try {
            const resp = await axios.post(process.env.REACT_APP_URL_BACKEND + "/api/user/add", user);
            if (resp.status === 200) {
                Swal.fire(
                    'Registro existoso.',
                    'Ahora ya puedes iniciar sesión.',
                    'success'
                )
                this.setRedirect();
            }
        } catch (error) {
            if (error.response.data.msg) {
                this.showAlert(error.response.data.msg, "alert-danger");
            }
            if (error.response.data.errors) {
                this.showAlert(error.response.data.errors[0].msg, "alert-danger");
            }
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }

    render() {
        return (
            <div className="container font-Varela-13 d-flex align-items-center justify-content-center">
                <div className="table-wrapper shadow-auth" style={{ width: "50em" }}>
                    <div class="table-title bg-purple">
                        <div class="row text-center">
                            <div class="col-12">
                                <Link to="/pastoral" className="d-flex justify-content-start link text-white">Ir pagina principal</Link>
                                <h2>Crear <b>Cuenta</b></h2>
                            </div>
                        </div>
                    </div>
                    <form className="mt-3" onSubmit={this.saveValues}>
                        {this.state.alert ? (<div className={`alert ${this.state.alert.category}`} role="alert" >{this.state.alert.msg}</div>) : null}

                        <div className="row">
                            <div className="my-2 col-md-6">
                                <label htmlFor="ci">Ci: </label>
                                <input name="ci" id="ci" ref={this.idCardRef} type="text" className="form-control" placeholder="Ci" />
                            </div>
                            <div className="my-2 col-md-6">
                                <label htmlFor="name2">Nombre: </label>
                                <input name="name2" id="name2" ref={this.nameRef} type="text" className="form-control" placeholder="Nombre" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 my-2">
                                <label htmlFor="firstSurname">Ap. paterno: </label>
                                <input name="firstSurname" id="firstSurname" ref={this.firstSurnameRef} type="text" className="form-control" placeholder="Apellido paterno" />
                            </div>
                            <div className="col-md-6 my-2">
                                <label htmlFor="secondSurname">Ap. materno: </label>
                                <input name="secondSurname" id="secondSurname" ref={this.secondSurnameRef} type="text" className="form-control" placeholder="Apellido materno" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 my-2">
                                <label htmlFor="email2">Email: </label>
                                <input name="email2" type="text" ref={this.emailRef} className="form-control" id="email2" aria-describedby="emailHelp" placeholder="Correo electrónico" />
                            </div>
                            <div className="col-md-6 my-2">
                                <label htmlFor="cellPhoneNumber">Celular: </label>
                                <input name="cellPhoneNumber" id="cellPhoneNumber" ref={this.cellPhoneNumberRef} type="text" className="form-control" placeholder="Celular" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 my-2">
                                <label htmlFor="collegeCareer">Carrera: </label>
                                <div class="alert alert-info reduce-padding" role="alert">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />Este campo no es obligatorio
                                                </div>
                                <select name="collegeCareer" id="collegeCareer" ref={this.collegeCareerRef} type="text" className="form-control" defaultValue={this.state.noCareer} >
                                    {
                                        this.state.careers.map((career, i) => {
                                            return (
                                                <option value={career}>{career}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 my-2">
                                <label htmlFor="password">Contraseña: </label>
                                <input name="password" type="password" ref={this.passwordRef} className="form-control" id="password" placeholder="Contraseña" />
                            </div>
                            <div className="col-md-6 my-2">
                                <label htmlFor="confirm">Confirmar contraseña: </label>
                                <input name="confirm" type="password" ref={this.confirmPasswordRef} className="form-control" id="confirm" placeholder="Confirmar contraseña" />
                            </div>
                        </div>
                        {this.renderRedirect()}
                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" className="btn btn-purple">Registrarme</button>
                        </div>
                    </form>
                    <Link to={"/login"} className="link">Volver a iniciar sesión</Link>
                </div>
            </div>
        );
    }
}

export default NewAccount;