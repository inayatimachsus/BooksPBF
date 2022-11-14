import React, { Component } from "react";
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import { Navbar, Nav, NavDropdown, Breadcrumb, Container } from 'react-bootstrap';
import PostDataKeranjang from "../admin/Post/postDataKeranjang";
import swal from "sweetalert";
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
            listKeranjang: [],
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
        const userRef = firebase.database().ref('keranjang/' + this.state.user.uid);
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
                listKeranjang: newUserState
            })
            console.log(this.state);
        })
    }

    hapusData = (id) => {
        console.log("id: "+id+" uid: "+this.state.user.uid);
        firebase.database().ref('keranjang/'+ this.state.user.uid +"/"+ id).remove();
    }

    TambahTransaksi = (id, judulBuku, harga) => {

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        firebase.database().ref('transaksi').push({
            idUser: this.state.user.uid,
            idBuku: id,
            judulBuku: judulBuku,
            username: this.state.user.email,
            harga: harga,
            date: dateTime
        }, (error) => {
            if (error) {
                swal("Error", error, "error");
            } else {
                firebase.database().ref('keranjang/'+ this.state.user.uid +"/"+ id).remove();
                swal("Terima kasih", "Terima kasih sudah membeli di Toko Kami", "success");
            }
          });
    }

    logout() {
        firebase.auth().signOut();
        window.location.reload();
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
                    <Nav.Link onClick={this.logout}><h5>Logout</h5></Nav.Link>
                </Navbar>

                <div>
                    <br></br>
                    <Container>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Keranjang</Breadcrumb.Item>
                        </Breadcrumb>
                    </Container>
                </div>

                <div>
                    {
                        this.state.listKeranjang.map(buku => {
                            return (
                                <PostDataKeranjang
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
                                    beli={this.TambahTransaksi}
                                />
                            )
                        })
                    }
                </div>
                

                {/* <div>
                    <Container>
                        <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups" >
                            <ButtonGroup className="mr-2" aria-label="First group">
                                <Button variant="secondary">1</Button>{' '}
                                <Button variant="secondary">2</Button>{' '}
                                <Button variant="secondary">3</Button>{' '}
                                <Button variant="secondary">Next</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Container>
                </div> */}


                <div className="footer bg-light mt-2">
                    <Container align="center">
                        <p className='text-center mr-3 ml-3'><h3>- Tentang Kami -</h3></p>
                        <br></br>
                        <h6>Created By : </h6>
                        <h6>Kelompok 4 - TI 3A</h6>
                    </Container>
                </div>
            </div>
        )
    }
}