import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { addDataToAPI } from '../redux/action'
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import swal from 'sweetalert';

export default class TambahBuku extends Component {
    constructor(props) {
        super(props);

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            listBuku: [],
            user: {},
            listTambahData: {
                id: '',
                judulBuku: '',
                pengarang: '',
                penerbit: '',
                kategori: '',
                harga: '',
                stok: '',
                gambar: '',
                jumlahHalaman: '',
                tglRilis: '',
                deskripsi: '',
            }
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
                    jumlahHalaman: dataVal.jumlahHalaman,
                    tglRilis: dataVal.tglRilis,
                    deskripsi: dataVal.deskripsi
                })
            })
            this.setState({
                listBuku: newUserState
            })
            console.log(this.state);
        })
    }

    componentDidMount() {
        this.authListener();
        this.ambilDataDariServerAPI();
    }

    handleChange = (e) => {
        let { listTambahData } = this.state;
        listTambahData[e.target.name] = e.target.value
        this.setState({
            listTambahData
        })
        console.log(this.state)
    }

    TambahData = () => {
        firebase.database().ref('buku').push({
            id: this.state.listBuku.length+1,
            judulBuku: this.state.listTambahData.judulBuku,
            pengarang: this.state.listTambahData.pengarang,
            penerbit: this.state.listTambahData.penerbit,
            kategori: this.state.listTambahData.kategori,
            harga: this.state.listTambahData.harga,
            stok: this.state.listTambahData.stok,
            gambar: this.state.listTambahData.gambar,
            jumlahHalaman: this.state.listTambahData.jumlahHalaman,
            tglRilis: this.state.listTambahData.tglRilis,
            deskripsi: this.state.listTambahData.deskripsi,
        }).catch((error) => {
            swal("Error", error, "error");
        })
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
                                    <h1>Form Tambah Buku</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"> <Link to="/">Home</Link> </li>
                                        <li className="breadcrumb-item"> <Link to="/databuku">Data Buku</Link> </li>
                                        <li className="breadcrumb-item active">Tambah Buku</li>
                                    </ol>
                                </div>
                            </div>
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-2"></div>
                                {/* left column */}
                                <div className="col-md-8">
                                    {/* general form elements */}
                                    <div className="card card-info">
                                        <div className="card-header">
                                            <h3 className="card-title">Tambahkan Data Buku</h3>
                                        </div>
                                        {/* /.card-header */}
                                        {/* form start */}
                                        <form >
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Judul Buku</label>
                                                    <input type="text" className="form-control" id="judulBuku" name="judulBuku" onChange={this.handleChange} placeholder="Masukkan Judul Buku" value={this.state.listTambahData.judulBuku}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Pengarang</label>
                                                    <input type="text" className="form-control" id="pengarang" name="pengarang" onChange={this.handleChange} placeholder="Pengarang Buku" value={this.state.listTambahData.pengarang}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Penerbit</label>
                                                    <input type="text" className="form-control" id="penerbit" name="penerbit" onChange={this.handleChange} placeholder="Penerbit Buku" value={this.state.listTambahData.penerbit} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Kategori</label>
                                                    <input type="text" className="form-control" id="kategori" name="kategori" onChange={this.handleChange} placeholder="Kategori Buku" value={this.state.listTambahData.kategori} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Harga</label>
                                                    <input type="text" className="form-control" id="harga" name="harga" onChange={this.handleChange} placeholder="Harga Buku per Biji" value={this.state.listTambahData.harga} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Stok</label>
                                                    <input type="text" className="form-control" id="stok" name="stok" onChange={this.handleChange} placeholder="Jumlah Stok yang Tersedia" value={this.state.listTambahData.stok} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Gambar</label>
                                                    <input type="text" className="form-control" id="gambar" name="gambar" onChange={this.handleChange} placeholder="Masukkan Nama File" value={this.state.listTambahData.gambar} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Jumlah Halaman</label>
                                                    <input type="text" className="form-control" id="gambar" name="jumlahHalaman" onChange={this.handleChange} placeholder="Masukkan Jumlah Halaman" value={this.state.listTambahData.jumlahHalaman} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Tanggal Rilis</label>
                                                    <input type="text" className="form-control" id="gambar" name="tglRilis" onChange={this.handleChange} placeholder="Masukkan Tanggal Rilis" value={this.state.listTambahData.tglRilis} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Deskripsi</label>
                                                    <textarea type="text" className="form-control" id="gambar" name="deskripsi" onChange={this.handleChange} placeholder="Masukkan Deskripsi" value={this.state.listTambahData.deskripsi} />
                                                </div>
                                            </div>
                                            {/* /.card-body */}
                                            <div className="card-footer">
                                                <button className="btn btn-info" onClick={this.TambahData}>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                    {/* /.card */}
                                </div>
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