import React, { Component } from 'react';
import AuthService from '../../services/authService';
import axios from "axios";
import $ from "jquery";
import Swal from 'sweetalert2';

class EditUser extends Component {
    state = {
        redirect: false,
        auth: new AuthService(),
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
        changePassword: false,
        alert: null,
    }

    componentDidMount() {
        $('#ci').keyup(function (e) {
            if (/\D/g.test(this.value)) {
                this.value = this.value.replace(/\D/g, '');
            }
        });
        $('#cellPhoneNumber').keyup(function (e) {
            if (/\D/g.test(this.value)) {
                this.value = this.value.replace(/\D/g, '');
            }
        });
    }

    nameRef = React.createRef();
    firstSurnameRef = React.createRef();
    secondSurnameRef = React.createRef();
    idCardRef = React.createRef();
    roleRef = React.createRef();
    emailRef = React.createRef();
    passwordRef = React.createRef();
    confirmPasswordRef = React.createRef();
    cellPhoneNumberRef = React.createRef();
    collegeCareerRef = React.createRef();

    saveValues = (e) => {
        e.preventDefault();
        let user;
        let pass;
        let confirm;

        if (this.state.changePassword === true) {
            pass = this.passwordRef.current.value;
            confirm = this.confirmPasswordRef.current.value;
        } else {
            pass = this.props.user.password;
        }

        if (this.state.auth.getUser().role === "Administrador") {
            user = {
                _id: this.props.user._id,
                name: this.nameRef.current.value,
                firstSurname: this.firstSurnameRef.current.value,
                secondSurname: this.secondSurnameRef.current.value,
                idCard: this.idCardRef.current.value,
                role: this.roleRef.current.value,
                email: this.emailRef.current.value,
                password: pass,
                cellPhoneNumber: this.cellPhoneNumberRef.current.value,
                collegeCareer: this.collegeCareerRef.current.value
            }
        } else {
            user = {
                _id: this.props.user._id,
                name: this.props.user.name,
                firstSurname: this.props.user.firstSurname,
                secondSurname: this.props.user.secondSurname,
                idCard: this.props.user.idCard,
                role: this.props.user.role,
                email: this.emailRef.current.value,
                password: pass,
                cellPhoneNumber: this.cellPhoneNumberRef.current.value,
                collegeCareer: this.collegeCareerRef.current.value
            }
        }

        if (user.idCard.trim() === "" ||
            user.name.trim() === "" ||
            user.firstSurname.trim() === "" ||
            user.secondSurname.trim() === "" ||
            user.email.trim() === "" ||
            user.cellPhoneNumber.trim() === "") {
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

        if (this.state.changePassword === true) {
            if (user.password.trim() === "" ||
                confirm.trim() === "") {
                this.showAlert("Todos los campos son obligatorios", "alert-danger");
                return;
            }
            if (user.password !== confirm) {
                this.showAlert("Los passwords no son iguales", "alert-danger");
                return;
            }
        }
        this.editUser(user);
    }

    changePassword = () => {
        this.setState({
            changePassword: true
        })
    }

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

    editUser = async (user) => {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.state.auth.isLoggedIn()) {
            headers['token'] = this.state.auth.getToken();
        }

        try {
            const resp = await axios.put(process.env.REACT_APP_URL_BACKEND+"/api/user/update", user, { headers });
            if (resp.status === 200) {
                Swal.fire(
                    'Cuenta actualizada.',
                    'Se guardaron los cambios.',
                    'success'
                )
            }

            this.props.getUsers();
            this.props.getTeachers();
            this.props.showEditUserFn();
        } catch (error) {
            if (error.response.data.msg) {
                this.showAlert(error.response.data.msg, "alert-danger");
            }
            if (error.response.data.errors) {
                this.showAlert(error.response.data.errors[0].msg, "alert-danger");
            }
        }
    }


    confirmDelete = () => {
        Swal.fire({
            title: '¿Estas seguro(a) de eliminar tu cuenta?',
            text: "Esta acción no podras revertirla",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.value) {
                const { _id } = this.props.user;
                this.props.showEditUserFn()
                this.props.deleteUser(_id);
                this.state.auth.logout();
                Swal.fire(
                    'Eliminada!',
                    'Tu cuenta se eliminó.',
                    'success'
                )
            }
        })
    }

    render() {
        if (!this.props.showEditUser) return null;

        if (!this.props.user) return null;
        const { name, firstSurname, secondSurname, idCard, email, role, cellPhoneNumber, collegeCareer } = this.props.user;

        return (
            <section id="edituser" className="bg-purple pb-4" style={{ color: "#fff" }}>
                <div className="container font-Varela-13">
                    <h2 className="text-center section-title-courses">EDITAR MIS DATOS</h2>
                    <form className="my-4" onSubmit={this.saveValues}>
                        {this.state.alert ? (<div className={`alert hola ${this.state.alert.category}`} role="alert" >{this.state.alert.msg}</div>) : null}
                        {this.state.auth.getUser().role === "Administrador" ?
                            <React.Fragment>
                                <div className="row d-flex justify-content-around">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ci">Ci:</label>
                                            <input id="ci" ref={this.idCardRef} type="text" className="form-control" placeholder="Ci" defaultValue={idCard} required />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="name">Nombre:</label>
                                            <input id="name" ref={this.nameRef} type="text" className="form-control" placeholder="Nombre" defaultValue={name} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-around">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="firstSurname">Apellido Paterno:</label>
                                            <input id="firstSurname" ref={this.firstSurnameRef} type="text" className="form-control" placeholder="Apellido paterno" defaultValue={firstSurname} required />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="secondSurname">Apellido Materno:</label>
                                            <input id="secondSurname" ref={this.secondSurnameRef} type="text" className="form-control" placeholder="Apellido materno" defaultValue={secondSurname} required />
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <div className="row d-flex justify-content-around">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ci">Ci:</label>
                                            <input id="ci" type="text" className="btn-ligth-warning form-control" placeholder="Ci" defaultValue={idCard} disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="name">Nombre:</label>
                                            <input id="name" type="text" className="btn-ligth-warning form-control" placeholder="Nombre" defaultValue={name} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-around">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="firstSurname">Apellido Paterno:</label>
                                            <input id="firstSurname" type="text" className="btn-ligth-warning form-control" placeholder="Apellido paterno" defaultValue={firstSurname} disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="secondSurname">Apellido Materno:</label>
                                            <input id="secondSurname" type="text" className="btn-ligth-warning form-control" placeholder="Apellido materno" defaultValue={secondSurname} disabled />
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>

                        }
                        <div className="row d-flex justify-content-around">
                            {this.state.auth.getUser().role === "Administrador" &&
                                <div className="col-md-5">
                                    <div class="form-group">
                                        <label htmlFor="role">Rol:</label>
                                        <select id="role" ref={this.roleRef} type="text" className="form-control" defaultValue={role} required>
                                            {
                                                this.state.roles.map((role, i) => {
                                                    return (
                                                        <option key={i} value={role}>{role}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            }
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label htmlFor="cellPhoneNumber">Celular:</label>
                                    <input id="cellPhoneNumber" ref={this.cellPhoneNumberRef} name="cellPhoneNumber" type="text" className="form-control" placeholder="Celular" defaultValue={cellPhoneNumber} required />
                                </div>
                            </div>
                            {this.state.auth.getUser().role !== "Administrador" &&
                                < div className="col-md-5" />

                            }

                        </div>
                        <div className="row d-flex justify-content-around">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input id="email" ref={this.emailRef} name="email" type="email" className="form-control" placeholder="Email" defaultValue={email} required />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label htmlFor="collegeCareer">Carrera:</label>
                                    <select id="collegeCareer" ref={this.collegeCareerRef} type="text" className="form-control" defaultValue={collegeCareer} required>
                                        {
                                            this.state.careers.map((career, i) => {
                                                return (
                                                    <option key={i} value={career}>{career}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        {this.state.changePassword === true ?
                            <div className="row d-flex justify-content-around">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label htmlFor="password">Contraseña:</label>
                                        <input id="password" name="password" ref={this.passwordRef} type="password" className="form-control" placeholder="Contraseña" required />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                                        <input id="confirmPassword" name="confirmPassword" ref={this.confirmPasswordRef} type="password" className="form-control" placeholder="Confirmar contraseña" required />
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="row d-flex justify-content-around">
                                <div className="col-md-5">
                                    <button type="button" id="changePassword" onClick={this.changePassword} className="btn btn-default ml-0">Cambiar contraseña</button>
                                </div>
                                <div className="col-md-5" />
                            </div>
                        }
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-warning" onClick={() => this.props.showEditUserFn()} >Cancelar</button>

                            <button type="submit" class="btn btn-default">Guardar cambios</button>
                        </div>
                    </form>
                </div>
            </section>

        );
    }
}

export default EditUser;