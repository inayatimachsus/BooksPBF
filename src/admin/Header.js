import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';

export default class Header extends Component {
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {

        }
    }

    logout() {
        firebase.auth().signOut();
        window.location.reload();
    }

    render() {
        return (
            <div>
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    {/* Left navbar links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="judul" className="nav-link" data-widget="pushmenu" ><i className="fas fa-bars" /></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="judul" className="nav-link">AJA Bookstore</a>
                        </li>
                    </ul>
                    {/* Right navbar links */}
                    <ul className="navbar-nav ml-auto">
                        {/* Messages Dropdown Menu */}

                        <li className="nav-item">
                            <a href="judul" className="nav-link">
                                <a href="judul" id="btn-logout" style={{color:"#fff"}} onClick={this.logout}>Logout</a>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

        )
    }
}