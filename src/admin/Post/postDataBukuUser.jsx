import React from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap';

export default function postDataBukuUser(buku) {

    const newTo = { 
        pathname: "/detailbuku", 
        param1: buku.id 
    };

    return (
        
            <div className="col-md-4 p-2">
                <figure className="figure content-buku">
                    <br></br>
                    <img style={{objectFit:"cover", maxWidth:"27vw", maxHeight:"60vh"}} src={buku.gambar} alt="gambar" />
                    <figcaption class="figure-caption"><h5>{buku.judulBuku.substring(0, 39)}</h5></figcaption>
                    <br></br>
                    <Button variant="danger">
                        <Link to={newTo} style={{color:'white'}}>
                            Detail
                        </Link>
                    </Button>{' '}
                    <Button variant="primary" onClick={() => buku.tambah(buku.id, buku.judulBuku, buku.pengarang, buku.penerbit, buku.kategori, buku.harga, buku.stok, buku.gambar)} >Beli</Button>{' '}
                </figure>
            </div>
        
    )
}
