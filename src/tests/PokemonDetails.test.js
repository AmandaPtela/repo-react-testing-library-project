import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemons/>', () => {
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
  test('Verificar informações detalhadas do pokémon selecionado', () => {
    const pedaço1 = 'This intelligent Pokémon roasts hard berries with electricity ';
    const pedaço2 = 'to make them tender enough to eat.';
    const resumosPokemons = {
      4: `The flame on its tail shows the strength of its life force. If it is
       weak, the flame also burns weakly.`,
      10: `For protection, it releases a horrible stench from the antennae
       on its head to drive away enemies.`,
      23: `It can freely detach its jaw to swallow large prey whole.
      It can become too heavy to move, however.`,
      25: pedaço1 + pedaço2,
      65: `Closing both its eyes heightens all its other senses. 
      This enables it to use its abilities to their extremes.`,
      78: `At full gallop, its four hooves barely touch the ground
       because it moves so incredibly fast.`,
      143: `What sounds like its cry may actually be its snores or the
       rumblings of its hungry belly.`,
      148: `They say that if it emits an aura from its whole body,
       the weather will begin to change instantly.`,
      151: `Apparently, it appears only to those people who are
       pure of heart and have a strong desire to see it.`,
    };

    const botaoDetalhes = screen.getByRole('link', {
      name: /more details/i,
    });
    const linkPokemon = botaoDetalhes.getAttribute('href').split('/');
    userEvent.click(botaoDetalhes);

    const tituloPokemon = screen.getByRole('heading', {
      name: `${nomesPokemons[linkPokemon[2]]} Details`,
      level: 2,
    });

    const sumario = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });

    const infoPokemon = sumario.nextSibling.textContent;
    expect(infoPokemon).toBeDefined();
    expect(infoPokemon).toBe(resumosPokemons[linkPokemon[2]]);
    expect(tituloPokemon).toBeInTheDocument();
    expect(sumario).toBeInTheDocument();
    expect(botaoDetalhes).not.toBeInTheDocument();
  });

  test('Verifica presença da seção de localização dos pokemons no jogo', () => {
    const botaoDetalhes = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(botaoDetalhes);
    const linkPokemon = botaoDetalhes.getAttribute('href').split('/');

    const locationsTitle = screen.getByRole('heading', {
      name: `Game Locations of ${nomesPokemons[linkPokemon[2]]}`,
      level: 2,
    });
    expect(locationsTitle).toBeInTheDocument();

    const locais = screen.getAllByAltText(`${nomesPokemons[linkPokemon[2]]} location`);
    const locaisPokemon = locais.map((item) => item.nextSibling.textContent);
    for (let i = 0; i !== 0; i += 1) {
      expect(locaisPokemon[i]).toBe(`${locaisPokemon}`);
    }

    const images = screen.getAllByAltText(`${nomesPokemons[linkPokemon[2]]} location`);
    for (let i = 0; i !== 0; i += 1) {
      expect(images[i]).toBeInTheDocument();
      expect(images[i]).toHaveAttribute('alt', `${nomesPokemons[linkPokemon[2]]}`);
    }
    /* const map = ["https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png",
    "https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png"]; */
    expect(images[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const favoriteCheckbox = screen.getByLabelText(/pokémon favoritado?/i);
    expect(favoriteCheckbox).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    const checked = favoriteCheckbox.getAttribute('checked', 'true');
    const coiso = nomesPokemons[linkPokemon[2]];
    const favIcon = screen.getByAltText(`${coiso} is marked as favorite`);
    if (checked) {
      expect(favIcon).toBeInTheDocument();
    }
  });
});
