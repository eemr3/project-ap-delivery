import React from 'react';
import { Link } from 'react-router-dom';

const TITLE = 'Cevarápida';
function Navbar() {
  const { name, role } = JSON.parse(localStorage.getItem('user'));

  if (role === 'seller') {
    return (
      <header className="header">
        <h2>{TITLE}</h2>
        <nav className="navbar">
          <Link
            to="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
          <h3 data-testid="customer_products__element-navbar-user-full-name">
            { name }
          </h3>
          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.removeItem('user') }
            className="exit-btn"
          >
            Sair
          </Link>
        </nav>
      </header>
    );
  }

  if (role === 'administrator') {
    return (
      <header className="header">
        <h2>{TITLE}</h2>
        <nav className="navbar">
          <h3 data-testid="customer_products__element-navbar-user-full-name">
            { name }
          </h3>
          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.removeItem('user') }
            className="exit-btn"
          >
            Sair
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="header">
      <h2>{TITLE}</h2>
      <nav className="navbar">
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus pedidos
        </Link>
        <h3 data-testid="customer_products__element-navbar-user-full-name">
          { name }
        </h3>
        <Link
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => localStorage.removeItem('user') }
          className="exit-btn"
        >
          Sair
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
