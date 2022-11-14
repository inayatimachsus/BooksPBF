import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import PostDataUser from './Post/postDataUser';

export default class DataUser extends Component {
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            listUser: []
        }
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user
                })
                // this.props.handleUser(user.email);
                console.log("User adalah : " + user.email)
            }
            else {
                this.setState({
                    user: null
                })
                // this.props.handleUser(null);
            }
        })
    }

    componentDidMount() {
        this.authListener();
        this.ambilDataDariServerAPI();
    }

    ambilDataDariServerAPI = () => {
        const userRef = firebase.database().ref('user');
        userRef.on('value', (snapshot) => {
            let newUserState = [];
            snapshot.forEach(data => {
                const dataVal = data.val()
                newUserState.push({
                    id: data.key,
                    username: dataVal.username,
                    loginTime: dataVal.loginTime
                })
            })
            this.setState({
                listUser: newUserState
            })
            console.log(this.state);
        })
    }

    render() {
        var no = 0;
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Data User</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"> <Link to="/">Home</Link> </li>
                                        <li className="breadcrumb-item active">Data User</li>
                                    </ol>
                                </div>
                            </div>
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">
                                            Data Login User AJA Bookstore
                                </div>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>ID User</th>
                                                    <th>Username</th>
                                                    <th>Login Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.listUser.map(user => {
                                                        no += 1;
                                                        return (
                                                            <PostDataUser
                                                                no={no}
                                                                key={user.id}
                                                                id={user.id}
                                                                username={user.username}
                                                                loginTime={user.loginTime}
                                                            />
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </section>
                    {/* /.content */}
                </div>
            </div>
        )
    }
}