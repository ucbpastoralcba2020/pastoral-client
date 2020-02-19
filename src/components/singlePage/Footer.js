import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCross } from '@fortawesome/free-solid-svg-icons';

class Footer extends Component {
    render() {
        return (
            <footer id="footer" className="bg-purple shadow-top">
                <div className="container d-flex justify-content-center align-middle" >
                    <ul>
                        <li className="social-network"><a href="https://www.facebook.com/catopastoral/" rel="noopener noreferrer" target="_blank"><FontAwesomeIcon className="fa" icon={faFacebookF}/></a></li>
                        <li className="social-network"><a href="mailto:pastoraluniversitaria2019@gmail.com"><FontAwesomeIcon className="fa" icon={faEnvelope}/></a></li>
                        <li className="social-network"><a href="https://www.ucbcba.edu.bo/pastoral-universitaria/" rel="noopener noreferrer" target="_blank"><FontAwesomeIcon className="fa" icon={faCross}/></a></li>
                    </ul>                    
                </div>
                <small className="text-white d-flex justify-content-center">&copy; Todos los derechos reservados. WCossioR</small>                
            </footer>
        );
    }
}

export default Footer;