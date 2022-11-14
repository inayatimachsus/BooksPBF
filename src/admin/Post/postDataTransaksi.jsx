import React from 'react'
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

const PostDataTransaksi = (usr) => {

    return (
        <tr>
            <td align="center">{usr.no}</td>
            <td align="center">{usr.idTransaksi}</td>
            <td align="center">{usr.idUser}</td>
            <td align="center">{usr.idBuku}</td>
            <td align="center">{usr.username}</td>
            <td align="center">{usr.judulBuku}</td>
            <td align="center">{usr.harga}</td>
            <td align='center'>{usr.date}</td>
        </tr>
    )
}

export default PostDataTransaksi;