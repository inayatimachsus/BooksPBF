import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import { Navbar, Nav, NavDropdown, Jumbotron, Container, Form, FormControl, Button } from 'react-bootstrap';
import PostDataBukuUser from '../admin/Post/postDataBukuUser';
import swal from 'sweetalert';

class User extends Component {
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            listBuku: [],
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
                listBuku: newUserState
            })
            console.log(this.state);
        })
    }

    TambahKeranjang = (id, judulBuku, pengarang, penerbit, kategori, harga, stok, gambar) => {
        firebase.database().ref('keranjang/'+this.state.user.uid).push({
            id: id,
            judulBuku: judulBuku,
            pengarang: pengarang,
            penerbit: penerbit,
            kategori: kategori,
            harga: harga,
            stok: stok,
            gambar: gambar,
        });

        swal("Berhasil", "Berhasil ditambahkan ke Keranjang!", "success");
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
                                    {/* <Nav.Link href="/listcomponent"><h5>List Buku</h5></Nav.Link> */}
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
                    {/*         
                    <p className="text-center mt-4 mb-4"></p>
                    <button onClick={this.logout}>Logout</button> */}
                    {/* {isLoggingOut && <p>Logging Out....</p>}
                    {logoutError && <p>Error logging out</p>} */}
                </Navbar>

                <div className="Container-fluid m-2">
                    <div className="row">
                        <div className="col">
                            <Jumbotron fluid>
                                <Container align="center">
                                    <h1>Selamat Datang di Aja Bookstore</h1>
                                    <br></br>
                                    <div className="row justify-content-center col-4">
                                        <Form inline>
                                            <FormControl type="text" placeholder="Cari Disini" className=" mr-sm-2" />
                                            <br></br>
                                            <Button variant="outline-success">Search</Button>
                                        </Form>
                                    </div>
                                </Container>
                            </Jumbotron>
                        </div>
                    </div>

                    <Container align="center">
                    <div className="row">
                        {
                            this.state.listBuku.map(buku => {
                                return (
                                    <PostDataBukuUser
                                        key={buku.id}
                                        id={buku.id}
                                        judulBuku={buku.judulBuku}
                                        pengarang={buku.pengarang}
                                        penerbit={buku.penerbit}
                                        kategori={buku.kategori}
                                        harga={buku.harga}
                                        stok={buku.stok}
                                        gambar={buku.gambar}
                                        tambah={this.TambahKeranjang}
                                    />
                                )
                            })
                        }
                    </div>
                    </Container>
                </div>

                <div className="footer bg-light mt-2">
                    <Container align="center">
                        <p className='text-center mr-3 ml-3'><h3>- Tentang Kami -</h3></p>
                        <br></br>
                        <h6>Created By : </h6>
                        <h6>Kelompok 4 - TI 3A</h6>
                    </Container>
                </div>
            </div>
        );
    }
}

export default User;