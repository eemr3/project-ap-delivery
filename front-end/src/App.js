import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './styles/App.css';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Switch>
      <Route path="/login" component={ Login } default />
      <Route path="/register" component={ Register } default />
      <Redirect exact from="/" to="/login" />
      <Route render={ () => <Redirect to="/login" /> } />
    </Switch>
  );
}

export default App;
