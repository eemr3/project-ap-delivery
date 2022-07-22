import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TableUsers from '../components/TableUsers';
import { requestADM } from '../services/deliveryAPI';
import dataTestId from '../utils/dataTestIds';

import styles from '../styles/Administrator.module.css';

const INITIAL_VALUE = {
  name: '',
  email: '',
  password: '',
  role: 'Cliente',
};

const checkName = (name) => /^[a-zA-ZÀ-ü ]{12}/g.test(name);
const checkEmail = (email) => /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(email);
const checkPassword = (password) => /[\w\D]{6}/g.test(password);

function Administrator() {
  const [inputForm, setInputForm] = useState(INITIAL_VALUE);
  const [isCreated, setIsCreated] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorApi, setErrorAip] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await requestADM(inputForm);
      setInputForm({
        name: '',
        email: '',
        password: '',
        role: 'Cliente',
      });

      setIsCreated(!isCreated);
      console.log(user);
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        setErrorAip(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const validateInputs = () => {
      const errorCases = [
        !checkName(inputForm.name),
        !checkEmail(inputForm.email),
        !checkPassword(inputForm.password),
        inputForm.role.length === 0,
      ];

      setIsDisabled(errorCases.some((item) => item));
    };
    validateInputs();
  }, [
    inputForm.email,
    inputForm.name,
    inputForm.password,
    inputForm.role.length,
  ]);

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
              data-testid={ dataTestId[64] }
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
              data-testid={ dataTestId[65] }
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
              data-testid={ dataTestId[66] }
            />
          </label>

          <select
            name="role"
            id="role"
            value={ inputForm.role }
            onChange={ handleInputChange }
            data-testid={ dataTestId[67] }
          >
            <option defaultValue value="customer">
              Cliente
            </option>
            <option value="seller">Vendedor</option>
          </select>
          <button
            disabled={ isDisabled }
            data-testid={ dataTestId[68] }
            type="submit"
          >
            Cadastrar
          </button>
        </form>
        {errorApi ? (
          <span data-testid={ dataTestId[74] } style={ { color: 'orangered' } }>
            {errorApi}
          </span>
        ) : (
          ''
        )}
      </section>
      <section>
        <TableUsers isCreated={ isCreated } setIsCreated={ setIsCreated } />
      </section>
    </main>
  );
}

export default Administrator;
