import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste componente <Pokemon/>', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const nomesPokemons = {
    4: 'Charmander',
    10: 'Caterpie',
    23: 'Ekans',
    25: 'Pikachu',
    65: 'Alakazam',
    78: 'Rapidash',
    143: 'Snorlax',
    148: 'Dragonair',
    151: 'Mew',
  };

  const tiposPokemons = {
    4: 'Fire',
    10: 'Bug',
    23: 'Poison',
    25: 'Electric',
    65: 'Psychic',
    78: 'Fire',
    143: 'Normal',
    148: 'Dragon',
    151: 'Psychic',
  };

  const pesoPokemons = {
    4: '8.5 kg',
    10: '2.9 kg',
    23: '6.9 kg',
    25: '6.0 kg',
    65: '48.0 kg',
    78: '95.0 kg',
    143: '460.0 kg',
    148: '16.5 kg',
    151: '4.0 kg',
  };

  test('Verifica se card renderiza corretamente', () => {
    const botaoDetalhes = screen.getByRole('link', {
      name: /more details/i,
    });
    const linkPokemon = botaoDetalhes.getAttribute('href').split('/');

    const nomePokemon = screen.getByTestId('pokemon-name');
    expect(nomePokemon).toHaveTextContent(nomesPokemons[linkPokemon[2]]);
    expect(nomePokemon).toBeInTheDocument();

    const tipoPokemon = screen.getByTestId('pokemon-type');
    expect(tipoPokemon).toHaveTextContent(tiposPokemons[linkPokemon[2]]);
    expect(tipoPokemon).toBeInTheDocument();

    const pesoPokemon = screen.getByTestId('pokemon-weight');
    expect(pesoPokemon).toHaveTextContent(pesoPokemons[linkPokemon[2]]);
    expect(pesoPokemon).toBeInTheDocument();
  });

  test('Verifica imagem do pokemon', () => {
    const botaoDetalhes = screen.getByRole('link', {
      name: /more details/i,
    });
    const linkPokemon = botaoDetalhes.getAttribute('href').split('/');

    const image = screen.getByRole('img');
    const linkImage = image.getAttribute('src');
    const pedaco1 = linkImage.split('25');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', `${pedaco1[0]}${linkPokemon[2]}${pedaco1[1]}`);
    expect(image).toHaveAttribute('alt', `${nomesPokemons[linkPokemon[2]]} sprite`);
  });

  test('Verificar link de Detalhes do pokemon', () => {
    const botaoDetalhes = screen.getByRole('link', {
      name: /more details/i,
    });
    const linkPokemon = botaoDetalhes.getAttribute('href');
    expect(linkPokemon).toBe(`${linkPokemon}`);
    const linkSplitted = linkPokemon.split('/');
    expect(linkSplitted[2]).toBe(linkSplitted[2]);
  });

  test('Teste ícone Favorito', () => {
    const botaoDetalhes = screen.getByRole('link', {
      name: /more details/i,
    });
    const linkPokemon = botaoDetalhes.getAttribute('href').split('/');

    const readFavoritePokemonIds = jest.fn();
    readFavoritePokemonIds();
    expect(readFavoritePokemonIds).toHaveBeenCalled();

    userEvent.click(botaoDetalhes);
    const poke = nomesPokemons[linkPokemon[2]];
    const favPokemon = screen.getByText(/pokémon favoritado/i);
    userEvent.click(favPokemon);
    const images = screen.getAllByRole('img');
    const favIcon = images.find((item) => item.src === 'http://localhost/star-icon.svg');
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('alt', `${poke} is marked as favorite`);
  });
});
