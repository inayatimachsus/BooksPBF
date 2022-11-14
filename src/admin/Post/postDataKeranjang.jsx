import React from 'react';
import { Container, Button } from 'react-bootstrap';

export default function postDataKeranjang(buku) {
    return (
        <div className="row content-keranjang">
                <div className="col-md-4 p-2">
                    <Container align="center">
                    <figure className="figure">
                        <img style={{maxWidth:"20vw", marginLeft:"10vw"}} src={buku.gambar} alt="gambar" />
                    </figure>
                    </Container>
                </div>

                <div className="col-md-7 bg-light p-3 pr-5">
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                            <h3 className='featurette-heading text-left'>{buku.judulBuku}</h3>
                            <h4 className='text-justify'>Rp.{buku.harga}</h4>
                            <Button variant="warning" onClick={() => buku.hapus(buku.id)} >Cancel</Button>{' '}
                            <Button variant="success" onClick={() => buku.beli(buku.id, buku.judulBuku, buku.harga)}>Beli</Button>{' '}
                </div>
                <br /><br />
        </div>
    )
}
