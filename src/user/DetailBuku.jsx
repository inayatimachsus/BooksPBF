import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import { Navbar, Nav, NavDropdown, Breadcrumb, Button, Container } from 'react-bootstrap';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';

export default class Keranjang extends Component {
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            detailBuku: {},
            user: {}
        }
    }

    linkAnak = {
        pathname: "/kategori/anak",
        param: 'Anak'
    };

    linkRemaja = {
        pathname: "/kategori/remaja",
        param: 'Remaja'
    };

    linkDewasa = {
        pathname: "/kategori/dewasa",
        param: 'Dewasa'
    };

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user
                })

                this.ambilDataDariServerAPI();

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

    ambilDataDariServerAPI = () => {
        const userRef = firebase.database().ref('buku/' + this.props.location.param1);
        userRef.on('value', (snapshot) => {

            const dataVal = snapshot.val()

            this.setState({
                detailBuku: {
                    id: snapshot.key,
                    judulBuku: dataVal.judulBuku,
                    pengarang: dataVal.pengarang,
                    penerbit: dataVal.penerbit,
                    kategori: dataVal.kategori,
                    harga: dataVal.harga,
                    stok: dataVal.stok,
                    gambar: dataVal.gambar,
                    deskripsi: dataVal.deskripsi,
                    tglRilis: dataVal.tglRilis,
                    jumlahHalaman: dataVal.jumlahHalaman
                }
            })
            console.log(this.state);
        })
    }

    TambahKeranjang = () => {
        firebase.database().ref('keranjang/' + this.state.user.uid).push({
            id: this.state.detailBuku.id,
            judulBuku: this.state.detailBuku.judulBuku,
            pengarang: this.state.detailBuku.pengarang,
            penerbit: this.state.detailBuku.penerbit,
            kategori: this.state.detailBuku.kategori,
            harga: this.state.detailBuku.harga,
            stok: this.state.detailBuku.stok,
            gambar: this.state.detailBuku.gambar,
        });

        swal("Berhasil", "Berhasil ditambahkan ke Keranjang!", "success");
    }

    render() {

        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#"><h4>AJA BOOKSTORE</h4></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/home"><h5>Home</h5></Nav.Link>
                                <Nav className="justify-content-end" activeKey="/home">
                                    <Nav.Link href="/keranjang"><h5>Keranjang</h5></Nav.Link>
                                    <NavDropdown title="Kategori" id="collasible-nav-dropdown">
                                        <NavDropdown.Item ><Link style={{color:"#343a40"}} to={this.linkAnak}>Anak</Link></NavDropdown.Item>
                                        <NavDropdown.Item ><Link style={{color:"#343a40"}} to={this.linkRemaja}>Remaja</Link></NavDropdown.Item>
                                        <NavDropdown.Item ><Link style={{color:"#343a40"}} to={this.linkDewasa}>Dewasa</Link></NavDropdown.Item>
                                        {/* <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Terserah</NavDropdown.Item> */}
                                    </NavDropdown>
                                </Nav>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>

                    <p className="text-center mt-4 mb-4"></p>
                    <Nav.Link href="#pricing"><h5>Logout</h5></Nav.Link>
                </Navbar>

                <div>
                    <br></br>
                    <Container>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Detail Buku</Breadcrumb.Item>
                        </Breadcrumb>
                    </Container>
                </div>

                <div>
                    <div className="row">
                        <div className="col-md-4 p-2">
                            <Container align="center">
                                <figure className="figure">
                                    <img style={{ maxWidth: "20vw", marginLeft: "10vw" }} src={this.state.detailBuku.gambar} alt="gambar" />
                                </figure>
                            </Container>
                        </div>

                        <div className="col-md-6 bg-light p-2 pr-5">
                            {/* <h3>id: {this.props.location.param1}</h3> */}
                            <h3 className='featurette-heading text-center'>{this.state.detailBuku.judulBuku}</h3>
                            <br></br>
                            <p className='text-justify'>{this.state.detailBuku.deskripsi}</p>
                            <p className='text-justify'>Penulis : {this.state.detailBuku.pengarang}</p>
                            <p className='text-justify'>Penerbit : {this.state.detailBuku.penerbit}</p>
                            <p className='text-justify'>Tahun Terbit : {this.state.detailBuku.tglRilis}</p>
                            <p className='text-justify'>Tebal Buku : {this.state.detailBuku.jumlahHalaman} Halaman</p>
                            <h4 className='text-justify'>Rp. {this.state.detailBuku.harga}</h4>
                            <Button variant="warning" ><Link style={{color:"white"}} to="/home">Cancel</Link></Button>{' '}
                            <Button variant="success" onClick={this.TambahKeranjang}>Beli</Button>{' '}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}