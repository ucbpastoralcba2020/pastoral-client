import decode from 'jwt-decode';

export default class AuthService {
    //Incializar variables importantes
    constructor(domain) {
        this.domain = domain || process.env.REACT_APP_URL_BACKEND+"/api"; //dominio del API server
        this.requestFetch = this.requestFetch.bind(this);

        this.login = this.login.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(email, password) {
        return this.requestFetch('/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }).then(response => {
            if (response.tokenReturn) {
                this.setToken(response.tokenReturn);
                this.setUser(response.user);
            }
            return Promise.resolve(response);
        })
    }

    /**
     * Verificar si existe un token de usuario y sigue siendo valido
     */
    isLoggedIn() {
        return !!this.getToken();
    }

    setToken(token) {
        console.log("token setting", token);
        localStorage.setItem('token_id', token);
    }

    getToken() {
        return localStorage.getItem('token_id');
    }

    logout() {
        console.log("logout");
        localStorage.removeItem('token_id');
        localStorage.removeItem('user');//aumentado
        console.log(this.getToken());
    }

    requestFetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.isLoggedIn()) {
            headers['token'] = this.getToken();
        }

        return fetch(this.domain + url, {
            headers,
            ...options
        }).then(response => response.json()).catch(error => Promise.reject(error));
    }


    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        if (localStorage.getItem('user') !== "undefined") {
            let objStorage = JSON.parse(localStorage.getItem('user'));
            return objStorage;
        } else {
            this.logout();
            localStorage.removeItem('user');
            localStorage.removeItem('token_id');
        }
        return null;
    }

    getUserAccess() {
        let user = this.getUser();
        if (user) {
            return user.rol;
        } else {
            return false;
        }
    }
    /*_checkStatus(resp){
        if(resp.status){

        }
    }*/

    getProfile() {
        return decode(this.getToken());
    }
}
