import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '../services/deliveryAPI';
import logo from '../images/logo.png';
import '../styles/Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewError, setViewError] = useState(false);
  const navigate = useHistory();
  const six = 6;
  const twelve = 12;

  const validateEmail = (e) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(e);
  };

  const submitLogin = async (event) => {
    event.preventDefault();

    try {
      const endpoint = '/register';
      const role = 'customer';
      const response = await requestLogin(endpoint, { name, email, password, role });
      console.log(response);
      localStorage.setItem('user', JSON.stringify(
        { ...response.dataValues, token: response.token },
      ));
      navigate('../customer/products');
      setViewError(false);
    } catch (error) {
      console.log(error);
      setViewError(true);
    }
  };

  return (
    <main className="register-page title-register">
      <div className="logo">
        <img src={ logo } alt="logo" />
        <h1>Cadastro</h1>
      </div>
      <form>
        <label htmlFor="name">
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Nome"
            data-testid="common_register__input-name"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            data-testid="common_register__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            data-testid="common_register__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <span
          className="msg-error"
          data-testid="common_register__element-invalid_register"
          style={ { display: viewError ? 'block' : 'none' } }
        >
          Usuário já existente
        </span>
        <button
          type="button"
          className="btn-register"
          data-testid="common_register__button-register"
          onClick={ submitLogin }
          disabled={ validateEmail(email)
            && (password.length >= six)
            && (name.length >= twelve) ? 0 : 1 }
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}

export default Register;
