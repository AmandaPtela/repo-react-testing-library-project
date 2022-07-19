import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';

describe('Teste o componente About', () => {
  const { container } = render(<About />);
  const paragrafos = container.querySelectorAll('p');

  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    const aboutHeading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    expect(paragrafos.length).toBe(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const pokeImg = screen.getByRole('img');
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
