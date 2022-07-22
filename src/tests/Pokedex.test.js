import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Verifica presença do título da página', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Verifica se página possui um título', () => {
    const headingPokedex = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(headingPokedex).toBeInTheDocument();
  });

  describe('Verifica uso do botão "Next"', () => {
    test('Teste botão next', () => {
      const botao = screen.getByTestId('next-pokemon');
      expect(botao).toBeInTheDocument();
    });

    test('Ao clicar no botão, o próximo pokémon aparece', () => {
      const pokemons = ['4', '10', '23', '25', '65', '78', '143', '148', '151'];
      const botaoNext = screen.getByTestId('next-pokemon');
      userEvent.click(botaoNext);
      const alink = screen.getByText('More details');
      const alinkAtt = alink.getAttribute('href').split('/');
      if (alinkAtt[2] === pokemons[8]) {
        expect(alink).toHaveAttribute('href', `/pokemons/${pokemons[0]}`);
      }
      expect(alink).toHaveAttribute('href', `/pokemons/${alinkAtt[2]}`);
    });
  });

  describe('Verificar botões de filtro', () => {
    test('Verificar nome dos botões de filtro', () => {
      const botoesFiltro = screen.getAllByTestId('pokemon-type-button');
      const nomeBotoes = ['Electric', 'Fire', 'Bug',
        'Poison', 'Psychic', 'Normal', 'Dragon'];

      expect(botoesFiltro).toHaveLength(botoesFiltro.length);
      for (let i = 0; i <= botoesFiltro.length - 2; i += 1) {
        expect(botoesFiltro[i]).toHaveTextContent(nomeBotoes[i]);
      }
    });

    test('Verifica se, ao clicar no botão, o filtro é aplicado', () => {
      const botoesFiltro = screen.getAllByRole('button');
      const nomeBotoes = ['Electric', 'Fire', 'Bug',
        'Poison', 'Psychic', 'Normal', 'Dragon'];
      const tipo = screen.getByTestId('pokemon-type');

      if (userEvent.click(botoesFiltro[0])) {
        expect(tipo.textContent).toBe(nomeBotoes);
      }

      userEvent.click(botoesFiltro[1]);
      expect(tipo.textContent).toBe('Electric');

      userEvent.click(botoesFiltro[2]);
      expect(tipo.textContent).toBe('Fire');

      userEvent.click(botoesFiltro[3]);
      expect(tipo.textContent).toBe('Bug');

      userEvent.click(botoesFiltro[4]);
      expect(tipo.textContent).toBe('Poison');

      userEvent.click(botoesFiltro[5]);
      expect(tipo.textContent).toBe('Psychic');

      userEvent.click(botoesFiltro[6]);
      expect(tipo.textContent).toBe('Normal');

      userEvent.click(botoesFiltro[7]);
      expect(tipo.textContent).toBe('Dragon');
    });

    test('Verifica se nome do botão é "All"', () => {
      const botaoAll = screen.getByTestId('');
      expect(botaoAll).toHaveTextContent('All');
    });
  });
});
