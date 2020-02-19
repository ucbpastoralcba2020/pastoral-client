import React, { Component } from 'react';
import AuthService from "../../services/authService";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.auth = new AuthService();
        this.state = {
            alert: null,
        }
    }

    emailRef = React.createRef();
    passRef = React.createRef();

    render() {
        return (
            <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <div className="font-Varela-13" style={{ width: "30em" }}>
                    <div className="table-wrapper  shadow-auth">
                        <div className="table-title bg-purple">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <Link to="/pastoral" className="d-flex justify-content-start link text-white">Ir pagina principal</Link>
                                    <h2>Iniciar <b>Sesión</b></h2>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            {this.state.alert ? (<div className={`alert ${this.state.alert.category}`} role="alert" >{this.state.alert.msg}</div>) : null}
                            <div className="form-group my-4">
                                <label htmlFor="email">Email: </label>
                                <input name="email" type="email" ref={this.emailRef} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Correo electrónico" />
                            </div>
                            <div className="form-group my-4">
                                <label htmlFor="password">Contraseña: </label>
                                <input name="password" type="password" ref={this.passRef} className="form-control" id="password" placeholder="Contraseña" />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-purple">Entrar</button>
                            </div>
                        </form>
                        <Link to={"/new-account"} className="link">Crear cuenta</Link>
                    </div>
                </div>
            </div>
        );
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

    handleSubmit = (ev) => {

        ev.preventDefault();

        const email = this.emailRef.current.value;
        const pass = this.passRef.current.value;

        if (email.trim() === "" || pass.trim() === "") {
            this.showAlert("Todos los campos son obligatorios", "alert-danger");
            return;
        }

        this.auth.login(email, pass).then(resp => {
            if (resp.msg) {
                this.showAlert(resp.msg, "alert-danger");
            } else {
                if (this.auth.getUser().role === "Administrador") {
                    this.props.onAuthChange();
                    this.props.history.replace('/');
                }
                else {
                    this.props.onAuthChange();
                    this.props.history.replace('/pastoral');
                }
            }
        })
    }
}

export default withRouter(Auth);