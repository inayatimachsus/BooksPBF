import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class TambahUser extends Component {
    render() {
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Form Tambah User</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"> <Link to="/">Home</Link> </li>
                            <li className="breadcrumb-item"> <Link to="/datauser">Data User</Link> </li>
                            <li className="breadcrumb-item active">Tambah User</li>
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
                                    <h3 className="card-title">Tambahkan Data User</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                {/* <form role="form"> */}
                                    <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Username</label>
                                        <input type="text" className="form-control" id="judulBuku" placeholder="Masukkan Username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Password</label>
                                        <input type="text" className="form-control" id="pengarang" placeholder="Masukkan Password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Nama Lengkap</label>
                                        <input type="text" className="form-control" id="penerbit" placeholder="Masukkan Nama" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Alamat</label>
                                        <input type="text" className="form-control" id="kategori" placeholder="Masukkan Alamat" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">No Telepon</label>
                                        <input type="text" className="form-control" id="harga" placeholder="Masukkan No Telepon" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Status</label>
                                        <input type="text" className="form-control" id="stok" placeholder="Non-admin/Admin" />
                                    </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                    <button type="submit" className="btn btn-info">Submit</button>
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