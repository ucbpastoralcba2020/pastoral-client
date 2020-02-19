import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyDS5w0H02Cus9ZO6lES2JNjV3ri27ZzeL0",
    authDomain: "pastoral-29724.firebaseapp.com",
    databaseURL: "https://pastoral-29724.firebaseio.com",
    projectId: "pastoral-29724",
    storageBucket: "pastoral-29724.appspot.com",
    messagingSenderId: "185775450108",
    appId: "1:185775450108:web:c113122ff7ff015a2fb479",
    measurementId: "G-RE6WLVJQCG"
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
