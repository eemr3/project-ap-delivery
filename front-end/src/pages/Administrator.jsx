import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TableUsers from '../components/TableUsers';
import { requestLogin } from '../services/deliveryAPI';
import dataTestId from '../utils/dataTestIds';

import styles from '../styles/Administrator.module.css';

const INITIAL_VALUE = {
  name: '',
  email: '',
  password: '',
  role: '',
};

function Administrator() {
  const [inputForm, setInputForm] = useState(INITIAL_VALUE);
  const [isCreated, setIsCreated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const END_POINT = '/register';
      const user = await requestLogin(END_POINT, inputForm);
      setInputForm({
        name: '',
        email: '',
        password: '',
        role: '',
      });
      setIsCreated(!isCreated);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Navbar />
      <section>
        <form className={ styles.containerForm } onSubmit={ handleSubmit }>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              value={ inputForm.name }
              onChange={ handleInputChange }
              placeholder="Nome"
              data-testid={ dataTestId[65] }
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              value={ inputForm.email }
              placeholder="E-mail"
              onChange={ handleInputChange }
              data-testid={ dataTestId[66] }
            />
          </label>
          <label htmlFor="name">
            <input
              type="password"
              name="password"
              id="password"
              value={ inputForm.password }
              placeholder="Senha"
              onChange={ handleInputChange }
              data-testid={ dataTestId[78] }
            />
          </label>

          <select
            name="role"
            id="role"
            value={ inputForm.role }
            onChange={ handleInputChange }
            data-testid={ dataTestId[68] }
          >
            <option value="administrator">Administrator</option>
            <option value="saller">Vendedor</option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>
      </section>
      <section>
        <TableUsers isCreated={ isCreated } setIsCreated={ setIsCreated } />
      </section>
    </main>
  );
}

export default Administrator;
