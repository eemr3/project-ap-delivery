import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './components/renderWithRouter';
import Login from '../pages/Login';

describe('Testa a tela de Login', () => {
  describe('Testa se todos os componentes estão aparecendo corretamente na tela', () => {
    beforeEach(() => {
      renderWithRouter(<Login />)
    })
  
    it('Renderiza a tela de Login e verifica se existe a Imagem de logo', async () => {
      const imgLogo = await screen.findByRole('img', { name: 'logo' })
      expect(imgLogo).toBeDefined();
      expect(imgLogo).toHaveAttribute('src', 'logo.png');
      expect(imgLogo).toBeInTheDocument();
    })
  
    it('Renderiza a tela de Login e verifica se existe o texto Entrar!', async () => {
      const title = screen.getByRole('heading', { level: 1, name: /Entrar/i })
      expect(title).toHaveTextContent(/Entrar/i);
      expect(title).toBeInTheDocument();
    })
    
    it('Renderiza a tela de Login e verifica se existe um botão com o texto Continuar!', async () => {
      const button = screen.getByRole('button', { name: /Continuar/i })
      expect(button).toHaveTextContent(/Continuar/i);
      expect(button).toBeInTheDocument();
    })
  
    it('Renderiza a tela de Login e verifica se existe um botão com o texto Não possui conta?!', async () => {
      const button = screen.getByRole('button', { name: /Não possui conta/i })
      expect(button).toHaveTextContent(/Não possui conta/i);
      expect(button).toBeInTheDocument();
    })
  
    it('Renderiza a tela de Login e verifica se existe um botão com o texto Criar conta!', async () => {
      const button = screen.getByRole('button', { name: /Criar conta/i })
      expect(button).toHaveTextContent(/Criar conta/i);
      expect(button).toBeInTheDocument();
    })
  })

  // describe('Teste se ao clicar no botão Criar Conta redereciona para página correta', async () => {
  //   beforeEach(() => {
  //     const { history } = renderWithRouter(<Login />)
  //   })
    
  //   it('', () => {

  //   })
  // })
})