import React from 'react';
import './App.css';
import Header from './admin/Header';
import Menu from './admin/Menu';
import Dashboard from './admin/Dashboard';
import Footer from './admin/Footer';
import DataBuku from './admin/DataBuku';
import TambahBuku from './admin/TambahBuku';
import EditBuku from './admin/EditBuku';
import DataUser from './admin/DataUser';
import TambahUser from './admin/TambahUser';
import EditUser from './admin/EditUser';
import DataTransaksi from './admin/DataTransaksi';
import { Switch, Route } from 'react-router-dom';
import Signup from './admin/Signup';
// import Login from './start/Login';
// import Register from './start/Register';

function App() {
  return (
      <div className="wrapper">
        {/* <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} /> */}
        <Header/>
        <Menu/>
        <Switch>          
          <Route path="/" exact component={Dashboard} />
          <Route path="/databuku" exact component={DataBuku} />
          <Route path="/databuku/tambah" exact component={TambahBuku} />
          <Route path="/databuku/edit" exact component={EditBuku} />
          <Route path="/datauser" exact component={DataUser} />
          <Route path="/datauser/tambah" exact component={TambahUser} />
          <Route path="/datauser/edit" exact component={EditUser} />
          <Route path="/datatransaksi" exact component={DataTransaksi} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
        <Footer/>
      </div>
  );
}

export default App;
