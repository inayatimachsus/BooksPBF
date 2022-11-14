import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';

class Signup extends Component {

    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);

        this.state = {
            email: "",
            password: "",
            user: {}
        }
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user
                })
                console.log("User adalah : " + user.email)
            }
            else {
                this.setState({
                    user: null
                })
            }
        })
    }

    componentDidMount() {
        this.authListener();
    }

    handleSignup(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u)
            this.handleHistoryUser(u.user.email);
            // this.props.location.push('/home');
        }).catch((err) => {
            console.log(err);
            alert(err);
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    onLoginGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                this.handleHistoryUser(result.user.email);
                // this.props.history.push('/home');
                /** @type {firebase.auth.OAuthCredential} */
                // var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = credential.accessToken;
                // The signed-in user info.
                // var user = result.user;

            }).catch((error) => {
                // console.log(error)
            });
    }

    handleHistoryUser = (email) => {

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        if (email !== 'admin@gmail.com') {
            firebase.database().ref('user').push({
                username: email,
                loginTime: dateTime
            })
            this.props.history.push('/home')
        } else {
            this.props.history.push('/')
        }


    }

    render() {
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Signup</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"> <Link to="/">Home</Link> </li>
                                        <li className="breadcrumb-item active">Sign Up</li>
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
                                    <div className="card-body">
                                        <div className="signup">
                                            <div className="column-signup">
                                                <p id="title-signup-1">Sign Up</p>
                                                {/* <p id="title-signup-2">Sign Up with</p> */}
                                                {/* <center><p style={{ marginTop: -30 }}>atau</p></center> */}

                                                <button className="btn-login-g" onClick={this.onLoginGoogle} >
                                                    <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                                                        alt="logo" style={{ width: 25, backgroundColor: "white", padding: 4, borderRadius: "15px", marginRight: "10px" }} />
                                                    <p style={{marginTop:"15px"}}>Masuk dengan Google</p>
                                                </button>

                                                <br />
                                                <p style={{}}>Atau</p>

                                                <div className="form-signup">
                                                    <label htmlFor="Email">Email</label>
                                                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />
                                                    <label htmlFor="Password">Password</label>
                                                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                                                    <button className="btn-signup-done" onClick={this.handleSignup}><i className="fa fa-arrow-right"></i></button>
                                                </div>

                                                {/* <p id="already">Already have an account? <a href="/">Sign in</a></p> */}
                                            </div>
                                            <div className="column-signup">
                                                {/* <img src="https://image.freepik.com/free-vector/secure-login-concept-illustration_114360-4582.jpg" alt="gambar" /> */}
                                            </div>
                                        </div>
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

export default withRouter(Signup);