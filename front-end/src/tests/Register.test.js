import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import React from 'react'
import '@testing-library/jest-dom'
import Register from '../pages/Register'
import renderWithRouter from './utils/RenderWithRouter';

describe('Testa tela de Registro', () => {
  // beforeEach(() => renderWithRouter(<Register />))

  test('logo existe na tela', async () => {
    renderWithRouter(<Register />);
    expect(screen.getByRole('img', {alt: 'logo'})).toBeInTheDocument()
  });

  test('título existe na tela', async () => {
    renderWithRouter(<Register />);
    expect(screen.getByText(/Cadastro/i)).toBeInTheDocument()
  });

  test('inputs existem na tela', async () => {
    renderWithRouter(<Register />);
    const [nameInput, emailInput] = screen.getAllByRole('textbox');
    const passwordInput = screen.getByPlaceholderText('Senha');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('botão existe na tela', async () => {
    renderWithRouter(<Register />);
    expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument()
  });

  test('botão fica desabilitado com o nome menor que 12', async () => {
    renderWithRouter(<Register />);
    const button = screen.getByText(/Cadastrar/i);
    
    const [nameInput, emailInput] = screen.getAllByRole('textbox');
    const passwordInput = screen.getByPlaceholderText('Senha');

    userEvent.type(emailInput, 'email@teste.com');
    userEvent.type(passwordInput, '123456');
    userEvent.type(nameInput, 'John Doe');

    expect(button).not.toBeEnabled();

    userEvent.type(nameInput, 'Tester');

    expect(button).toBeEnabled();
  });

  test('botão fica desabilitado com o email inválido', async () => {
    renderWithRouter(<Register />);
    const button = screen.getByText(/Cadastrar/i);
    
    const [nameInput, emailInput] = screen.getAllByRole('textbox');
    const passwordInput = screen.getByPlaceholderText('Senha');

    userEvent.type(emailInput, 'email');
    userEvent.type(passwordInput, '123456');
    userEvent.type(nameInput, 'John Doe Tester');

    expect(button).not.toBeEnabled();

    userEvent.type(emailInput, '@test.com');

    expect(button).toBeEnabled();
  });

  test('botão fica desabilitado com o senha menor que 6', async () => {
    renderWithRouter(<Register />);
    const button = screen.getByText(/Cadastrar/i);
    
    const [nameInput, emailInput] = screen.getAllByRole('textbox');
    const passwordInput = screen.getByPlaceholderText('Senha');

    userEvent.type(emailInput, 'email@test.com');
    userEvent.type(passwordInput, '12345');
    userEvent.type(nameInput, 'John Doe Tester');

    expect(button).not.toBeEnabled();

    userEvent.type(passwordInput, '6');

    expect(button).toBeEnabled();
  });

  // test('botão redireciona para tela de produtos', async () => {
  //   const {history} = renderWithRouter(<Register />);

  //   const button = screen.getByText(/Cadastrar/i);
    
  //   const [nameInput, emailInput] = screen.getAllByRole('textbox');
  //   const passwordInput = screen.getByPlaceholderText('Senha');

  //   userEvent.type(emailInput, 'email@test.com');
  //   userEvent.type(passwordInput, '123456');
  //   userEvent.type(nameInput, 'John Doe Tester');

  //   expect(button).toBeEnabled();

  //   userEvent.click(button);

  //   expect(history.location.pathname).toEqual('/customer/products');
  // });
});

