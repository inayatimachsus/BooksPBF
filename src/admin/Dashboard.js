import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            dataDashboard: {
                jumlahTransaksi: '',
                jumlahBuku: '',
                jumlahUser: ''
            }
        }
    }

    getData3 = () => {
        const userRef1 = firebase.database().ref('buku');
        userRef1.once("value", (snapshot) => {
            this.setState({
                dataDashboard: {
                    ...this.state.dataDashboard,
                    jumlahBuku: snapshot.numChildren()
                }
            })
        })
    }

    getData1 = () => {
        const userRef = firebase.database().ref('user');
        userRef.once("value", (snapshot) => {
            this.setState({
                dataDashboard: {
                    ...this.state.dataDashboard,
                    jumlahUser: snapshot.numChildren()
                }
            })
        })
    }

    getData2 = () => {
        const userRef = firebase.database().ref('transaksi');
        userRef.once("value", (snapshot) => {
            this.setState({
                dataDashboard: {
                    ...this.state.dataDashboard,
                    jumlahTransaksi: snapshot.numChildren()
                }
            })
        })
    }

    componentDidMount() {
        this.getData1();
        this.getData2();
        this.getData3();
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">Dashboard</h1>
                                </div>{/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item active">Home</li>
                                    </ol>
                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>{/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            {/* Small boxes (Stat box) */}
                            <div className="row">
                                <div className="col-lg-4 col-6">
                                    {/* small box */}
                                    <div className="small-box bg-info">
                                        <div className="inner">
                                            <h3>{this.state.dataDashboard.jumlahTransaksi}</h3>
                                            <p>Transaksi</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-bag" />
                                        </div>
                                        <Link to="/datatransaksi" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                    </div>
                                </div>
                                {/* ./col */}
                                <div className="col-lg-4 col-6">
                                    {/* small box */}
                                    <div className="small-box bg-success">
                                        <div className="inner">
                                            <h3>{this.state.dataDashboard.jumlahBuku}<sup style={{ fontSize: 20 }}></sup></h3>
                                            <p>Buku</p>
                                        </div>
                                        <div className="icon">
                                            {/* <i className="ion ion-stats-bars" /> */}
                                            <i className="ion ion-ios-book" />
                                        </div>
                                        <Link to="/databuku" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                                    </div>
                                </div>
                                {/* ./col */}
                                <div className="col-lg-4 col-6">
                                    {/* small box */}
                                    <div className="small-box bg-warning">
                                        <div className="inner">
                                            <h3 style={{color:"white"}}>{this.state.dataDashboard.jumlahUser}</h3>
                                            <p style={{color:"white"}}>User</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-person" />
                                        </div>
                                        <Link to="/datauser" className="small-box-footer" ><p style={{color:"white", margin:"auto"}} >More info <i className="fas fa-arrow-circle-right" /></p></Link>
                                    </div>
                                </div>
                                {/* ./col */}
                            </div>
                            {/* /.row */}
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
            </div>
        )
    }
}