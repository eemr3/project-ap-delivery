import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { requestLogin } from '../services/deliveryAPI';

const validateEmail = (e) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(e);
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewErro, setViewErro] = useState(false);
  const navigate = useNavigate();

  const emailHandleChange = ({ target }) => setEmail(target.value);
  const passwordHandleChange = ({ target }) => setPassword(target.value);

  useEffect(() => {
    const redirect = (user) => {
      switch (user.role) {
      case 'administrator':
        navigate(ROUTE_ADMIN_MANAGE);
        break;
      case 'seller':
        navigate(ROUTE_SELLER_ORDERS);
        break;
      default:
        navigate(ROUTE_CUSTOMER_PRODUCTS);
        break;
      }
    };

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) redirect(user);
  }, [navigate]);

  const submitLogin = async (event) => {
    event.preventDefault();

    try {
      const endpoint = '/login';
      const response = await requestLogin(endpoint, { email, password });
      console.log(response.user);

      const { user } = response;
      localStorage.setItem('user', JSON.stringify({ ...user, token: response.token }));

      switch (user.role) {
      case 'administrator':
        navigate(ROUTE_ADMIN_MANAGE);
        break;
      case 'seller':
        navigate(ROUTE_SELLER_ORDERS);
        break;
      default:
        navigate(ROUTE_CUSTOMER_PRODUCTS);
        break;
      }
    } catch (error) {
      console.log(error);
      setViewErro(true);
    }
  };

  const six = 6;

  return (
    <main className="login-page">
      <div className="logo">
        <img src={ logo } alt="logo" />
        <h1>G9 Delivery</h1>
      </div>
      <form>
        <label htmlFor="email">
          Login
          <input
            type="email"
            name="email"
            id="email"
            onChange={ emailHandleChange }
            placeholder="email@g9delivery.com.br"
            data-testid="common_login__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            id="password"
            onChange={ passwordHandleChange }
            placeholder="••••••"
            data-testid="common_login__input-password"
          />
        </label>

        <span
          className="msg-error"
          data-testid="common_login__element-invalid-email"
          style={ { display: viewErro ? 'block' : 'none' } }
        >
          Login inválido
        </span>

        <button
          type="submit"
          className="btn-login"
          onClick={ submitLogin }
          data-testid="common_login__button-login"
          disabled={ validateEmail(email) && (password.length >= six) ? 0 : 1 }
        >
          LOGIN
        </button>
        <hr />
        <span className="division-or">ou</span>
        <button
          type="button"
          className="btn-redirect-register"
          data-testid="common_login__button-register"
          onClick={ () => navigate('../register', { replace: true }) }
        >
          Ainda não tenho conta
        </button>
      </form>
    </main>
  );
}

export default Login;
