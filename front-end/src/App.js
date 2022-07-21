import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './styles/App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import SaleDetails from './pages/SaleDetails';

function App() {
  return (
    <Switch>
      <Route path="/login" component={ Login } default />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Redirect exact from="/" to="/login" />
      <Route path="/customer/orders/:id" component={ SaleDetails } />
      <Route render={ () => <Redirect to="/login" /> } />
    </Switch>

  );
}

export default App;
