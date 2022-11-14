import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase';
import firebaseConfig from './firebase/firebaseConfig';
import App from './App';
import RouteUser from './user/RouteUser';

class Main extends Component {

    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);

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
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state);
    }

    login(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u)
            this.handleHistoryUser(u.user.email);
        }).catch((err) => {
            console.log(err);
            alert(err);
            this.setState({
                email: '',
                password: ''
            })
        })

        // this.handleHistoryUser();
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

    logout() {
        firebase.auth().signOut();
        window.location.reload();
    }

    onLoginGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                this.handleHistoryUser(result.user.email);
                /** @type {firebase.auth.OAuthCredential} */
                // var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = credential.accessToken;
                // The signed-in user info.
                // var user = result.user;

            }).catch((error) => {
                alert(error);
                console.log(error)
            });
    }

    render() {
        return this.state.user ? (
            <div>
                <HandleCekUser user={this.state.user.email} uid={this.state.user.uid} logout={this.logout} handleHistoryUser={this.handleHistoryUser} />
            </div>
        ) : (
            <div className="Login">
                <div className="card-login">
                    <h1>Login</h1>
                    <p id="t-login-1">Email*</p>
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Enter your email" />
                    <p id="t-login-2">Password*</p>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Enter your password" /><br />
                    <button onClick={this.login}>Login</button>
                    <a href="/signup" id="btn-signup">atau</a>

                    <button className="btn-login-g" onClick={this.onLoginGoogle} >
                        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                            alt="logo" style={{ width: 25, backgroundColor: "white", padding: 4, borderRadius: "15px", marginRight: "10px" }} />
                        <p style={{ marginTop: "15px" }}>Masuk dengan Google</p>
                    </button>
                </div>
            </div>
        )
    }
}


const HandleCekUser = (usr) => {
    console.log(usr);
    if (usr.user === "admin@gmail.com") {
        // console.log('masuk');
        return <App />;
    } else {
        // console.log('masuk');
        // return <User />
        return <RouteUser />
    }
}

export default withRouter(Main);