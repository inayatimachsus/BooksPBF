import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import PostDataBuku from './Post/postDataBuku';
import { connect } from 'react-redux';

class DataBuku extends Component {
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
            listBuku: [],
            user: {}, 
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
        this.ambilDataDariServerAPI();
    }

    ambilDataDariServerAPI = () => {
        const userRef = firebase.database().ref('buku');
        userRef.on('value', (snapshot) => {
            let newUserState = [];
            snapshot.forEach(data => {
                const dataVal = data.val()
                newUserState.push({
                    id: data.key,
                    judulBuku: dataVal.judulBuku,
                    pengarang: dataVal.pengarang,
                    penerbit: dataVal.penerbit,
                    kategori: dataVal.kategori,
                    harga: dataVal.harga,
                    stok: dataVal.stok,
                    gambar: dataVal.gambar,
                })
            })
            this.setState({
                listBuku: newUserState,  
            })
            console.log(this.state.listBuku);
        })
    }

    hapusData = (id) => {
        this.props.handleId(id);
        firebase.database().ref('buku/' + id).remove();
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
                                    <h1>Data Buku</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"> <Link to="/">Home</Link> </li>
                                        <li className="breadcrumb-item active">Data Buku</li>
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
                                            <Link to="/databuku/tambah">
                                                <a href="Tambah" class="btn btn-info">+ Tambah</a>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>ID Buku</th>
                                                    <th>Judul Buku</th>
                                                    <th>Pengarang</th>
                                                    <th>Penerbit</th>
                                                    <th>Kategori</th>
                                                    <th>Harga</th>
                                                    <th>Stok</th>
                                                    <th>Gambar</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.listBuku.map(buku => {
                                                    no += 1;
                                                    return (
                                                    <PostDataBuku 
                                                        no={no}
                                                        key={buku.id}
                                                        id={buku.id}
                                                        judulBuku={buku.judulBuku}
                                                        pengarang={buku.pengarang}
                                                        penerbit={buku.penerbit}
                                                        kategori={buku.kategori}
                                                        harga={buku.harga}
                                                        stok={buku.stok}
                                                        gambar={buku.gambar}
                                                        hapus={this.hapusData}
                                                        handleIdBuku={this.props.handleId}
                                                    />
                                                    )
                                                })}
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


const mapStateToProps = (state) => {
    return {
        idBook: state.idBuku
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleId: (cek) => dispatch({ type: 'ADD_IDBUKU', newValue: cek })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataBuku);