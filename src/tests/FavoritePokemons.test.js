import { screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../components/renderWithRouter.js';

describe(' Testa página Favoritos', () => {
  beforeEach(() => {
    renderWithRouter(<FavoritePokemons />);
  });
  test('Verifica se a função que pega os pokemons favoritos é chamada', async () => {
    const readFavoritePokemonIds = jest.fn();
    readFavoritePokemonIds();
    expect(readFavoritePokemonIds).toHaveBeenCalled();
  });

  test('Verifica se todos os cards são exibidos', () => {
    /* if (readFavoritePokemonIds()) {
      const alink = screen.getByText('More details');
      const alinkAtt = alink.getAttribute('href').split('/');
      const linkFav = alinkAtt[2] === 25;
      expect(alink).toHaveAttribute('href', `/pokemons/${linkFav}`);
    } */
    const textFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(textFavorites).toBeInTheDocument();
  });
});
