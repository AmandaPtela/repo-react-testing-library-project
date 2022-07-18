import { screen, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Requisito 1', () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  it ('Requisito 1/1 - Links', () => {
    const elemLink1 = screen.getByRole('link', {
      name: /home/i,
    });
    const elemLink2 = screen.getByRole('link', {
      name: /about/i,
    });
    const elemLink3 = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(elemLink1).toBeInTheDocument();
    expect(elemLink2).toBeInTheDocument();
    expect(elemLink3).toBeInTheDocument();


    userEvent.click(elemLink1);
    const homeText = screen.getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(homeText).toBeInTheDocument();

    userEvent.click(elemLink2);
    const aboutText = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();

    userEvent.click(elemLink3);
    const favoriteText = screen.getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });
    expect(favoriteText).toBeInTheDocument();
  });
});