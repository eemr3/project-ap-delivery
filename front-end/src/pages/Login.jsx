import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.png';
import { requestLogin } from '../services/deliveryAPI';
import styles from '../styles/Login.module.css';

const validateEmail = (e) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(e);
};

const ROUTE_CUSTOMER_PRODUCTS = '/customer/products';
const ROUTE_ADMIN_MANAGE = '/administrator';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewError, setViewError] = useState(false);
  const navigate = useHistory();

  const emailHandleChange = ({ target }) => setEmail(target.value);
  const passwordHandleChange = ({ target }) => setPassword(target.value);

  useEffect(() => {
    const redirect = (user) => {
      switch (user.role) {
      case 'administrator':
        navigate.push(ROUTE_ADMIN_MANAGE);
        break;
      case 'seller':
        navigate.push(ROUTE_SELLER_ORDERS);
        break;
      default:
        navigate.push(ROUTE_CUSTOMER_PRODUCTS);
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
      localStorage.setItem('user', JSON.stringify({ ...user, token: response.hasToken }));

      switch (user.role) {
      case 'administrator':
        navigate.push(ROUTE_ADMIN_MANAGE);
        break;
      case 'seller':
        navigate.push(ROUTE_SELLER_ORDERS);
        break;
      default:
        navigate.push(ROUTE_CUSTOMER_PRODUCTS);
        break;
      }
    } catch (error) {
      console.log(error);
      setViewError(true);
    }
  };

  const six = 6;

  return (
    <main className={ styles.loginPage }>
      <div className={ styles.logo }>
        <img src={ logo } alt="logo" />
        <h1>Entrar</h1>
      </div>
      <form className={ styles.formContainer }>
        <label className={ styles.labelForm } htmlFor="email">
          <input
            className={ styles.inputForm }
            type="email"
            name="email"
            id="email"
            onChange={ emailHandleChange }
            placeholder="Email"
            data-testid="common_login__input-email"
          />
        </label>
        <label className={ styles.labelForm } htmlFor="password">
          <input
            className={ styles.inputForm }
            type="password"
            name="password"
            id="password"
            onChange={ passwordHandleChange }
            placeholder="Senha"
            data-testid="common_login__input-password"
          />
        </label>

        <span
          className={ styles.msgError }
          data-testid="common_login__element-invalid-email"
          style={ { display: viewError ? 'block' : 'none' } }
        >
          Email ou senha inválidos
        </span>

        <button
          type="submit"
          className={ styles.btnLogin }
          onClick={ submitLogin }
          data-testid="common_login__button-login"
          disabled={ validateEmail(email) && (password.length >= six) ? 0 : 1 }
        >
          Continuar
        </button>
        <div className={ styles.redirectRegisterContainer }>
          <button
            type="button"
            className={ styles.btnRegisterText }
          >
            Não possui conta?
          </button>
          <button
            type="button"
            className={ styles.btnRedirectRegister }
            data-testid={ styles.commonLogin__buttonRegister }
            onClick={ () => navigate.push('../register', { replace: true }) }
          >
            Criar conta
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
