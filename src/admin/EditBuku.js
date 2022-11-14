import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';

class EditBuku extends Component {

    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            idBuku: this.props.idBuku,
            listBuku: [],
            user: {},
            listEditData: {
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

    

    updateData = (e) => {

        let path = "/databuku";
        // let history = useHistory();

        e.preventDefault();
        console.log(this.state);
        firebase.database().ref('buku/' + this.props.idBuku).set({
            id: this.state.listEditData.id,
            judulBuku: this.state.listEditData.judulBuku,
            pengarang: this.state.listEditData.pengarang,
            penerbit: this.state.listEditData.penerbit,
            kategori: this.state.listEditData.kategori,
            harga: this.state.listEditData.harga,
            stok: this.state.listEditData.stok,
            gambar: this.state.listEditData.gambar,
            jumlahHalaman: this.state.listEditData.jumlahHalaman,
            tglRilis: this.state.listEditData.tglRilis,
            deskripsi: this.state.listEditData.deskripsi
        }).catch(error => {
            alert(error);
        })

        this.setState({
            listEditData: {
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
        }, () => { this.props.history.push(path); window.location.reload();}
        )

    }

    getData = (idBuku) => {

        if (idBuku !== 0 && idBuku !== '') {
            console.log("id ada")
            firebase.database().ref('buku/' + idBuku).on('value', (snapshot) => {
                const data = snapshot.val();
                this.setState({
                    listEditData: {
                        id: data.id,
                        judulBuku: data.judulBuku,
                        pengarang: data.pengarang,
                        penerbit: data.penerbit,
                        kategori: data.kategori,
                        harga: data.harga,
                        stok: data.stok,
                        gambar: data.gambar,
                        jumlahHalaman: data.jumlahHalaman,
                        tglRilis: data.tglRilis,
                        deskripsi: data.deskripsi
                    }
                }, () => console.log(this.state) )
                // console.log(this.state);
            })
        } else {
            this.setState({
                listEditData: {
                    id: '',
                    judulBuku: '',
                    pengarang: '',
                    penerbit: '',
                    kategori: '',
                    harga: '',
                    stok: '',
                    gambar: ''
                }
            })

            console.log("Id null")
        }
    }

    componentDidMount() {
        // this.getData(this.props.idBuku);
        this.getData(this.props.location.param1)
    }

    handleChange = (e) => {
        let { listEditData } = this.state;
        listEditData[e.target.name] = e.target.value
        this.setState({
            listEditData
        })
        console.log(this.state)
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
                                    <h1>Form Edit Buku</h1>
                                    <h1>id: {this.props.idBuku}</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"> <Link to="/">Home</Link> </li>
                                        <li className="breadcrumb-item"> <Link to="/databuku">Data Buku</Link> </li>
                                        <li className="breadcrumb-item active">Edit Buku</li>
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
                                    <div className="card card-warning">
                                        <div className="card-header">
                                            <h3 className="card-title">Edit Data Buku</h3>
                                        </div>
                                        {/* /.card-header */}
                                        {/* form start */}
                                        {/* <form role="form"> */}
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Judul Buku</label>
                                                    <input type="text" className="form-control" id="judulBuku" name="judulBuku" onChange={this.handleChange} placeholder="Masukkan Judul Buku" value={this.state.listEditData.judulBuku} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Pengarang</label>
                                                    <input type="text" className="form-control" id="pengarang" name="pengarang" onChange={this.handleChange} placeholder="Pengarang Buku" value={this.state.listEditData.pengarang} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Penerbit</label>
                                                    <input type="text" className="form-control" id="penerbit" name="penerbit" onChange={this.handleChange} placeholder="Penerbit Buku" value={this.state.listEditData.penerbit} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Kategori</label>
                                                    <input type="text" className="form-control" id="kategori" name="kategori" onChange={this.handleChange} placeholder="Kategori Buku" value={this.state.listEditData.kategori} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Harga</label>
                                                    <input type="text" className="form-control" id="harga" name="harga" onChange={this.handleChange} placeholder="Harga Buku per Biji" value={this.state.listEditData.harga} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Stok</label>
                                                    <input type="text" className="form-control" id="stok" name="stok" onChange={this.handleChange} placeholder="Jumlah Stok yang Tersedia" value={this.state.listEditData.stok} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Gambar</label>
                                                    <input type="text" className="form-control" id="gambar" name="gambar" onChange={this.handleChange} placeholder="Masukkan Nama File" value={this.state.listEditData.gambar} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Jumlah Halaman</label>
                                                    <input type="text" className="form-control" id="gambar" name="jumlahHalaman" onChange={this.handleChange} placeholder="Masukkan Jumlah Halaman" value={this.state.listEditData.jumlahHalaman} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Tanggal Rilis</label>
                                                    <input type="text" className="form-control" id="gambar" name="tglRilis" onChange={this.handleChange} placeholder="Masukkan Tanggal Rilis" value={this.state.listEditData.tglRilis} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Deskripsi</label>
                                                    <textarea type="text" className="form-control" id="gambar" name="deskripsi" onChange={this.handleChange} placeholder="Masukkan Deskripsi" value={this.state.listEditData.deskripsi} />
                                                </div>
                                            </div>
                                            {/* /.card-body */}
                                            <div className="card-footer">
                                                <button className="btn btn-warning" onClick={this.updateData}>
                                                    Submit
                                                </button>
                                            </div>
                                        {/* </form> */}
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

const mapStateToProps = (state) => {
    return {
        idBuku: state.idBuku
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleId: (cek) => dispatch({ type: 'ADD_IDBUKU', newValue: cek })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBuku));