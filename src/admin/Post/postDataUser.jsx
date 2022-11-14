import React from 'react'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

const PostDataUser = (usr) => {

    return (
        <tr>
            <td align="center">{usr.no}</td>
            <td align="center">{usr.id}</td>
            <td align="center">{usr.username}</td>
            <td align="center">{usr.loginTime}</td>
        </tr>
    )
}

export default PostDataUser;