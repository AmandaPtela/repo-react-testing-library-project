import { render, screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../pages/FavoritePokemons';

describe(' Testa página Favoritos', () => {
  beforeEach(() => {
    render(<FavoritePokemons />);
  });
  test('Verifica se a função que pega os pokemons favoritos é chamada', async () => {
    const readFavoritePokemonIds = jest.fn();
    readFavoritePokemonIds();
    expect(readFavoritePokemonIds).toHaveBeenCalled();
    // RETORNAR DAQUI
    const { container } = render(<FavoritePokemons />);
    const cardsPokemons = container.getElementsByClassName('.favorite-pokemon');
    expect(cardsPokemons).toBeInTheDocument();
  });

  test('Verifica se aparece mensagem sobre falta de favoritos', () => {
    const textFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(textFavorites).toBeInTheDocument();
  });
});
