import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import PostDataTransaksi from './Post/postDataTransaksi';

export default class DataTransaksi extends Component {
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        // this.login = this.login.bind(this);
        // this.handleChange = this.handleChange.bind(this);

        this.state = {
            listTransaksi: [],
            user: {},
        }
    }

    componentDidMount() {
        this.ambilDataDariServerAPI();
    }

    ambilDataDariServerAPI = () => {
        const userRef = firebase.database().ref('transaksi');
        userRef.on('value', (snapshot) => {
            let newUserState = [];
            snapshot.forEach(data => {
                const dataVal = data.val()
                newUserState.push({
                    idTransaksi: data.key,
                    idBuku: dataVal.idBuku,
                    idUser: dataVal.idUser,
                    username: dataVal.username,
                    judulBuku: dataVal.judulBuku,
                    harga: dataVal.harga,
                    date: dataVal.date
                })
            })
            this.setState({
                listTransaksi: newUserState
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
                                <h1>Data Transaksi</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"> <Link to="/">Home</Link> </li>
                                <li className="breadcrumb-item active">Data Transaksi</li>
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
                                    Data Transaksi AJA Bookstore
                                </div>
                            </div>                        
                            {/* /.card-header */}
                            <div className="card-body">
                            <table style={{tableLayout:"fixed"}} id="example2" className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>ID Transaksi</th>
                                    <th>ID User</th>
                                    <th>ID Buku</th>
                                    <th>Nama Pembeli</th>
                                    <th>Judul Buku</th>
                                    <th>Harga</th>
                                    <th>Tanggal Pembelian</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.listTransaksi.map(buku => {
                                        no += 1;
                                        return(
                                            <PostDataTransaksi 
                                                no={no}
                                                key={buku.idTransaksi}
                                                idTransaksi={buku.idTransaksi}
                                                idUser={buku.idUser}
                                                idBuku={buku.idBuku}
                                                username={buku.username}
                                                judulBuku={buku.judulBuku}
                                                harga={buku.harga}
                                                date={buku.date}
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