import React from 'react'
import Home from './User'
import Keranjang from './Keranjang';
import DetailBuku from './DetailBuku';
import {Route, Switch} from 'react-router-dom'
import KategoriUser from './KategoriUser';

export default function RouteUser() {

    return (
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route path='/keranjang' component={Keranjang} />
          <Route path='/detailBuku' component={DetailBuku} />
          <Route path='/kategori/anak' component={KategoriUser} />
          <Route path='/kategori/remaja' component={KategoriUser} />
          <Route path='/kategori/dewasa' component={KategoriUser} />
        
          {/* <Route path='/Checkout' component={Checkout}></Route> */}
          {/* <Route path='/beli' component={Beli}></Route> */}
    
          {/* <Route path="/regist" component={Regist} /> */}
        </Switch>
      );
}
