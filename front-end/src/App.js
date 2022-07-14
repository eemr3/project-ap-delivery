import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './styles/App.css';
import Login from './pages/Login';
import Products from './pages/Products';

function App() {
  return (
    <Switch>
      <Route path="/login" component={ Login } default />
      <Redirect exact from="/" to="/login" />
      <Route erender={ () => <Redirect to="/login" /> } />
      <Route path="/customer/products" component={ Products } />
    </Switch>
  );
}

export default App;
