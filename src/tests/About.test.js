import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';

describe('Teste o componente About', () => {
  render(<About />);

  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    const abouHeading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(abouHeading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const infoAbout = screen.getByText(/This application simulates a Pokédex/i);
    expect(infoAbout).toBeInTheDocument();

    const infoAbout2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(infoAbout2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const pokeImg = screen.getByRole('img');
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
